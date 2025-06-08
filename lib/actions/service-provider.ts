"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import { createSsrClient } from "@/lib/supabase/server";
import {
  serviceProviderSchema,
  type ServiceProviderFormData,
  type FormState,
  initialFormState,
} from "@/lib/schemas/service-provider";
import { CacheTags } from "@/lib/constants/cache-tags";

// Helper function to upload file to Supabase
async function uploadFileToSupabase(
  file: File,
  bucket: string,
  path: string
): Promise<string> {
  const supabase = await createSsrClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(`Failed to upload file to ${bucket}/${path}:`, error);
    throw new Error(`فشل في رفع الملف: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// Helper function to upload multiple files
async function uploadMultipleFiles(
  files: File[],
  bucket: string,
  basePath: string
): Promise<string[]> {
  const uploadPromises = files.map((file, index) => {
    const fileName = `${Date.now()}_${index}_${file.name}`;
    const path = `${basePath}/${fileName}`;
    return uploadFileToSupabase(file, bucket, path);
  });

  return Promise.all(uploadPromises);
}

export async function createServiceProvider(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    console.log("Starting service provider creation...");

    // Extract and prepare form data
    const rawData: any = {};

    // Handle regular form fields
    for (const [key, value] of formData.entries()) {
      if (key.endsWith("_files") || key.endsWith("_file")) {
        // Skip file fields in this loop, handle them separately
        continue;
      }
      rawData[key] = value;
    }

    // Handle file fields
    const files: { [key: string]: File | File[] } = {};

    // Single file fields
    const logoFile = formData.get("logo_image_file") as File;
    if (logoFile && logoFile.size > 0) {
      files.logo_image_file = logoFile;
    }

    const idFrontFile = formData.get("id_card_front_image") as File;
    if (idFrontFile && idFrontFile.size > 0) {
      files.id_card_front_image = idFrontFile;
    }

    const idBackFile = formData.get("id_card_back_image") as File;
    if (idBackFile && idBackFile.size > 0) {
      files.id_card_back_image = idBackFile;
    }

    const videoFile = formData.get("video_url_file") as File;
    if (videoFile && videoFile.size > 0) {
      files.video_url_file = videoFile;
    }

    // Multiple file fields
    const certificateFiles = formData.getAll(
      "certificates_images_files"
    ) as File[];
    if (certificateFiles.length > 0 && certificateFiles[0].size > 0) {
      files.certificates_images_files = certificateFiles.filter(
        (f) => f.size > 0
      );
    }

    const documentFiles = formData.getAll("document_list_files") as File[];
    if (documentFiles.length > 0 && documentFiles[0].size > 0) {
      files.document_list_files = documentFiles.filter((f) => f.size > 0);
    }

    // Combine regular data with files for validation
    const combinedData = { ...rawData, ...files };

    // Validate the form data
    console.log("Validating form data...");
    const validationResult = serviceProviderSchema.safeParse(combinedData);

    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error);
      const errors: Record<string, string[]> = {};

      validationResult.error.errors.forEach((error) => {
        const path = error.path.join(".");
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(error.message);
      });

      return {
        success: false,
        message: "يرجى تصحيح الأخطاء في النموذج",
        errors,
        step: prevState.step || 1,
      };
    }

    const validData = validationResult.data;
    console.log("Form data validated successfully");

    // Upload files to Supabase
    console.log("Starting file uploads...");
    const uploadedFiles: { [key: string]: string | string[] } = {};

    try {
      // Upload logo image
      if (validData.logo_image_file) {
        const fileName = `${Date.now()}_logo_${validData.logo_image_file.name}`;
        uploadedFiles.logo_image = await uploadFileToSupabase(
          validData.logo_image_file,
          "images",
          `service-providers/logos/${fileName}`
        );
      }

      // Upload ID card images
      if (validData.id_card_front_image) {
        const fileName = `${Date.now()}_id_front_${
          validData.id_card_front_image.name
        }`;
        uploadedFiles.id_card_front_image = await uploadFileToSupabase(
          validData.id_card_front_image,
          "images",
          `service-providers/ids/${fileName}`
        );
      }

      if (validData.id_card_back_image) {
        const fileName = `${Date.now()}_id_back_${
          validData.id_card_back_image.name
        }`;
        uploadedFiles.id_card_back_image = await uploadFileToSupabase(
          validData.id_card_back_image,
          "images",
          `service-providers/ids/${fileName}`
        );
      }

      // Upload video
      if (validData.video_url_file) {
        const fileName = `${Date.now()}_video_${validData.video_url_file.name}`;
        uploadedFiles.video_url = await uploadFileToSupabase(
          validData.video_url_file,
          "videos",
          `service-providers/videos/${fileName}`
        );
      }

      // Upload certificates
      if (
        validData.certificates_images_files &&
        validData.certificates_images_files.length > 0
      ) {
        uploadedFiles.certificates_images = JSON.stringify(
          await uploadMultipleFiles(
            validData.certificates_images_files,
            "images",
            "service-providers/certificates"
          )
        );
      }

      // Upload documents
      if (
        validData.document_list_files &&
        validData.document_list_files.length > 0
      ) {
        uploadedFiles.document_list = JSON.stringify(
          await uploadMultipleFiles(
            validData.document_list_files,
            "images",
            "service-providers/documents"
          )
        );
      }

      console.log("File uploads completed successfully");
    } catch (uploadError) {
      console.error("File upload failed:", uploadError);
      return {
        success: false,
        message: "فشل في رفع الملفات. يرجى المحاولة مرة أخرى.",
        step: prevState.step || 1,
      };
    }

    // Save to database
    console.log("Saving to database...");
    const prisma = new PrismaClient();

    try {
      const serviceProvider = await prisma.service_providers.create({
        data: {
          service_name: validData.service_name,
          service_description: validData.service_description,
          service_category_id: validData.service_category_id,
          governorate_id: validData.governorate_id,
          years_of_experience: validData.years_of_experience,
          service_delivery_method: validData.service_delivery_method,
          address: validData.address || null,
          official_url: validData.official_url || null,
          bio: validData.bio,
          services: validData.services || null,
          facebook_url: validData.facebook_url || null,
          instagram_url: validData.instagram_url || null,
          whatsapp_url: validData.whatsapp_url || null,
          other_urls: validData.other_urls || null,
          slug: validData.slug,
          keywords: validData.keywords || null,
          notes: validData.notes || null,
          // File URLs
          logo_image: uploadedFiles.logo_image as string,
          id_card_front_image: uploadedFiles.id_card_front_image as string,
          id_card_back_image: uploadedFiles.id_card_back_image as string,
          video_url: uploadedFiles.video_url as string,
          certificates_images:
            (uploadedFiles.certificates_images as string) || null,
          document_list: (uploadedFiles.document_list as string) || null,
          // Default values
          status: "pending",
          is_deleted: false,
          created_at: new Date(),
        },
      });

      console.log("Service provider created successfully:", serviceProvider.id);

      // Revalidate cache
      revalidateTag(CacheTags.SERVICE_PROVIDERS);
      revalidateTag(CacheTags.SERVICE_CATEGORIES);
    } catch (dbError) {
      console.error("Database save failed:", dbError);
      return {
        success: false,
        message: "فشل في حفظ البيانات. يرجى المحاولة مرة أخرى.",
        step: prevState.step || 1,
      };
    } finally {
      await prisma.$disconnect();
    }

    console.log("Service provider registration completed successfully");

    // Redirect to success page
    redirect("/service-provider/register/success");
  } catch (error) {
    console.error("Service provider creation failed:", error);
    return {
      success: false,
      message: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
      step: prevState.step || 1,
    };
  }
}
