import { z } from "zod";

// File validation schema
const fileSchema = z.instanceof(File).refine(
  (file) => file.size <= 10 * 1024 * 1024, // 10MB max
  "File size must be less than 10MB"
);

const fileArraySchema = z.array(fileSchema).optional();

// Step 1 validation schema
export const serviceProviderStep1Schema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessType: z.enum(["individual", "company", "partnership", "llc"], {
    required_error: "Please select a business type",
  }),
  serviceCategory: z.string().min(1, "Please select a service category"),
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  businessLicense: fileArraySchema.refine(
    (files) => files && files.length > 0,
    "Business license is required"
  ),
  businessRegistration: fileArraySchema,
});

// Step 2 validation schema
export const serviceProviderStep2Schema = z.object({
  governorate: z.string().min(1, "Please select a governorate"),
  city: z.string().min(2, "City name must be at least 2 characters"),
  address: z.string().min(10, "Please provide a complete address"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  description: z.string().min(50, "Description must be at least 50 characters"),
  experience: z.enum(["0-1", "1-3", "3-5", "5-10", "10+"], {
    required_error: "Please select your years of experience",
  }),
  certifications: fileArraySchema,
  portfolio: fileArraySchema,
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Combined schema for complete form
export const completeServiceProviderSchema = serviceProviderStep1Schema.merge(
  serviceProviderStep2Schema
);

// Type definitions
export type ServiceProviderStep1Data = z.infer<
  typeof serviceProviderStep1Schema
>;
export type ServiceProviderStep2Data = z.infer<
  typeof serviceProviderStep2Schema
>;
export type CompleteServiceProviderData = z.infer<
  typeof completeServiceProviderSchema
>;

// Validation functions
export const validateStep1 = (data: Partial<ServiceProviderStep1Data>) => {
  try {
    serviceProviderStep1Schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
};

export const validateStep2 = (data: Partial<ServiceProviderStep2Data>) => {
  try {
    serviceProviderStep2Schema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
};

export const validateCompleteForm = (
  data: Partial<CompleteServiceProviderData>
) => {
  try {
    completeServiceProviderSchema.parse(data);
    return { success: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      return { success: false, errors: fieldErrors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
};
