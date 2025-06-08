"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Upload, X, FileText, Video, ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { type Step2Data } from "@/lib/schemas/service-provider";

interface ServiceProviderStep2Props {
  form: UseFormReturn<Step2Data>;
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  errors?: Record<string, string[]>;
  isLoading?: boolean;
}

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles: number;
  acceptedTypes: string[];
  maxSizePerFile: number; // in MB
  label: string;
  description: string;
  icon: React.ReactNode;
}

function FileUpload({
  files,
  onFilesChange,
  maxFiles,
  acceptedTypes,
  maxSizePerFile,
  label,
  description,
  icon,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    newFiles.forEach((file) => {
      // Check file type
      if (!acceptedTypes.includes(file.type)) {
        errors.push(`${file.name}: نوع الملف غير مدعوم`);
        return;
      }

      // Check file size
      if (file.size > maxSizePerFile * 1024 * 1024) {
        errors.push(`${file.name}: حجم الملف كبير جداً (أكثر من ${maxSizePerFile}MB)`);
        return;
      }

      validFiles.push(file);
    });

    // Check total number of files
    const totalFiles = files.length + validFiles.length;
    if (totalFiles > maxFiles) {
      errors.push(`يمكنك رفع ${maxFiles} ملفات كحد أقصى`);
      const allowedCount = maxFiles - files.length;
      validFiles.splice(allowedCount);
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center space-y-2">
          {icon}
          <p className="font-medium text-muted-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">
            حتى {maxFiles} ملفات - {maxSizePerFile}MB لكل ملف
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        multiple={maxFiles > 1}
        accept={acceptedTypes.join(',')}
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files)}
      />
    </div>
  );
}

export function ServiceProviderStep2({
  form,
  onSubmit,
  onBack,
  errors,
  isLoading = false,
}: ServiceProviderStep2Props) {
  const [idFrontPreview, setIdFrontPreview] = useState<string | null>(null);
  const [idBackPreview, setIdBackPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [certificatesFiles, setCertificatesFiles] = useState<File[]>([]);
  const [documentsFiles, setDocumentsFiles] = useState<File[]>([]);

  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    file: File | null,
    fieldName: "id_card_front_image" | "id_card_back_image",
    setPreview: (preview: string | null) => void
  ) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        form.setError(fieldName, {
          type: "manual",
          message: "يجب أن يكون الملف صورة (JPEG, PNG, GIF, WebP)",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        form.setError(fieldName, {
          type: "manual",
          message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
        });
        return;
      }

      form.setValue(fieldName, file);
      form.clearErrors(fieldName);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);    } else {
      form.resetField(fieldName);
      setPreview(null);
    }
  };

  const handleVideoUpload = (file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mov"];
      if (!validTypes.includes(file.type)) {
        form.setError("video_url_file", {
          type: "manual",
          message: "يجب أن يكون الملف فيديو (MP4, WebM, OGG, AVI, MOV)",
        });
        return;
      }

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        form.setError("video_url_file", {
          type: "manual",
          message: "حجم الملف يجب أن يكون أقل من 50 ميجابايت",
        });
        return;
      }

      form.setValue("video_url_file", file);
      form.clearErrors("video_url_file");

      // Create preview
      const url = URL.createObjectURL(file);
      setVideoPreview(url);    } else {
      form.resetField("video_url_file");
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
      setVideoPreview(null);
    }
  };  const removeImage = (
    fieldName: "id_card_front_image" | "id_card_back_image",
    setPreview: (preview: string | null) => void,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    handleImageUpload(null, fieldName, setPreview);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeVideo = () => {
    handleVideoUpload(null);
    if (videoRef.current) {
      videoRef.current.value = "";
    }
  };
  // Update form values when files change
  const handleCertificatesChange = (files: File[]) => {
    setCertificatesFiles(files);
    if (files.length > 0) {
      form.setValue("certificates_images_files", files);
    } else {
      form.resetField("certificates_images_files");
    }
  };

  const handleDocumentsChange = (files: File[]) => {
    setDocumentsFiles(files);
    if (files.length > 0) {
      form.setValue("document_list_files", files);
    } else {
      form.resetField("document_list_files");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* ID Card Images */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">صور الهوية الشخصية</CardTitle>
            <CardDescription>
              ارفع صور واضحة لوجهي الهوية الشخصية للتحقق من هويتك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID Front */}
            <FormField
              control={form.control}
              name="id_card_front_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوجه الأمامي للهوية *</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!idFrontPreview && (
                        <div
                          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => idFrontRef.current?.click()}
                        >
                          <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                          <p className="font-medium text-muted-foreground mb-1">
                            انقر لرفع الوجه الأمامي
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF, WebP - حتى 5MB
                          </p>
                        </div>
                      )}

                      {idFrontPreview && (
                        <div className="relative inline-block">
                          <img
                            src={idFrontPreview}
                            alt="الوجه الأمامي للهوية"
                            className="max-w-xs max-h-40 rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage("id_card_front_image", setIdFrontPreview, idFrontRef)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={idFrontRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file, "id_card_front_image", setIdFrontPreview);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ID Back */}
            <FormField
              control={form.control}
              name="id_card_back_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوجه الخلفي للهوية *</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!idBackPreview && (
                        <div
                          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => idBackRef.current?.click()}
                        >
                          <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                          <p className="font-medium text-muted-foreground mb-1">
                            انقر لرفع الوجه الخلفي
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF, WebP - حتى 5MB
                          </p>
                        </div>
                      )}

                      {idBackPreview && (
                        <div className="relative inline-block">
                          <img
                            src={idBackPreview}
                            alt="الوجه الخلفي للهوية"
                            className="max-w-xs max-h-40 rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => removeImage("id_card_back_image", setIdBackPreview, idBackRef)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={idBackRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file, "id_card_back_image", setIdBackPreview);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Self Recording Video */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">فيديو التعريف الشخصي</CardTitle>
            <CardDescription>
              ارفع فيديو قصير تعرّف فيه بنفسك وخدماتك (مدة 30 ثانية إلى دقيقتين)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="video_url_file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>فيديو التعريف *</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!videoPreview && (
                        <div
                          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => videoRef.current?.click()}
                        >
                          <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium text-muted-foreground mb-2">
                            انقر لرفع فيديو التعريف
                          </p>
                          <p className="text-sm text-muted-foreground">
                            MP4, WebM, OGG, AVI, MOV - حتى 50MB
                          </p>
                        </div>
                      )}

                      {videoPreview && (
                        <div className="relative inline-block">
                          <video
                            src={videoPreview}
                            controls
                            className="max-w-md max-h-60 rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={removeVideo}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={videoRef}
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleVideoUpload(file);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    فيديو قصير تعرّف فيه بنفسك وتشرح خدماتك (30 ثانية - دقيقتان)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Certificates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الشهادات والمؤهلات</CardTitle>
            <CardDescription>
              ارفع صور الشهادات أو المؤهلات المتعلقة بخدماتك (اختياري)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="certificates_images_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الشهادات</FormLabel>
                  <FormControl>
                    <FileUpload
                      files={certificatesFiles}
                      onFilesChange={handleCertificatesChange}
                      maxFiles={4}
                      acceptedTypes={["image/jpeg", "image/png", "image/gif", "image/webp"]}
                      maxSizePerFile={5}
                      label="ارفع الشهادات"
                      description="PNG, JPG, GIF, WebP"
                      icon={<ImageIcon className="h-8 w-8 text-muted-foreground" />}
                    />
                  </FormControl>
                  <FormDescription>
                    ارفع صور الشهادات أو المؤهلات المتعلقة بعملك (حتى 4 ملفات)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Additional Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">مستندات إضافية</CardTitle>
            <CardDescription>
              ارفع أي مستندات أخرى تدعم طلبك (اختياري)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="document_list_files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المستندات الإضافية</FormLabel>
                  <FormControl>
                    <FileUpload
                      files={documentsFiles}
                      onFilesChange={handleDocumentsChange}
                      maxFiles={4}
                      acceptedTypes={[
                        "image/jpeg", "image/png", "image/gif", "image/webp",
                        "application/pdf", "application/msword", 
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      ]}
                      maxSizePerFile={10}
                      label="ارفع المستندات"
                      description="PNG, JPG, PDF, DOC, DOCX"
                      icon={<FileText className="h-8 w-8 text-muted-foreground" />}
                    />
                  </FormControl>
                  <FormDescription>
                    ارفع أي مستندات إضافية تدعم طلبك (حتى 4 ملفات - 10MB لكل ملف)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة للخطوة السابقة
          </Button>
          
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="min-w-[140px]"
          >
            {isLoading ? (
              "جاري الإرسال..."
            ) : (
              <>
                إرسال الطلب
                <ArrowRight className="mr-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
