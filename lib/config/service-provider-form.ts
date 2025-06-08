import type { FormConfig } from "@/lib/validation/types";

export interface FormFieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "url"
    | "textarea"
    | "select"
    | "checkbox"
    | "file"
    | "service-category"
    | "governorate";
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  showWhen?: (data: any) => boolean;
  validate?: (value: any) => string | null;
  gridCols?: number;
  conditionalDisplay?: {
    field: string;
    values: string[];
  };
}

export interface ServiceProviderStep1Data {
  businessName: string;
  businessType: string;
  serviceCategory: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessLicense?: File[];
  businessRegistration?: File[];
}

export interface ServiceProviderStep2Data {
  governorate: string;
  city: string;
  address: string;
  website?: string;
  description: string;
  experience: string;
  certifications?: File[];
  portfolio?: File[];
  termsAccepted: boolean;
}

export const serviceProviderStep1Config: FormFieldConfig[] = [
  {
    name: "businessName",
    label: "Business Name",
    type: "text",
    required: true,
    placeholder: "Enter your business name",
    helpText: "The official name of your business or service",
  },
  {
    name: "businessType",
    label: "Business Type",
    type: "select",
    required: true,
    options: [
      { value: "individual", label: "Individual Service Provider" },
      { value: "company", label: "Company" },
      { value: "partnership", label: "Partnership" },
      { value: "llc", label: "Limited Liability Company (LLC)" },
    ],
    helpText: "Select the legal structure of your business",
  },
  {
    name: "serviceCategory",
    label: "Service Category",
    type: "service-category",
    required: true,
    helpText: "Choose the primary category for your services",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    type: "text",
    required: true,
    placeholder: "Full name of primary contact",
    helpText: "Name of the person who will be the main point of contact",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "your.email@example.com",
    helpText: "Primary email address for business communications",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "+961 XX XXX XXX",
    helpText: "Primary phone number with country code",
  },
  {
    name: "businessLicense",
    label: "Business License",
    type: "file",
    required: true,
    multiple: true,
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize: 5 * 1024 * 1024, // 5MB
    helpText:
      "Upload your business license documents (PDF, JPG, PNG - max 5MB each)",
  },
  {
    name: "businessRegistration",
    label: "Business Registration",
    type: "file",
    required: false,
    multiple: true,
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize: 5 * 1024 * 1024, // 5MB
    helpText: "Upload business registration documents if applicable",
  },
];

export const serviceProviderStep2Config: FormFieldConfig[] = [
  {
    name: "governorate",
    label: "Governorate",
    type: "governorate",
    required: true,
    helpText: "Select the governorate where your business is located",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: true,
    placeholder: "Enter your city",
    helpText: "City or town where your business is located",
  },
  {
    name: "address",
    label: "Full Address",
    type: "textarea",
    required: true,
    placeholder: "Enter your complete business address",
    helpText: "Complete address including street, building number, and area",
  },
  {
    name: "website",
    label: "Website",
    type: "url",
    required: false,
    placeholder: "https://your-website.com",
    helpText: "Your business website URL (optional)",
  },
  {
    name: "description",
    label: "Business Description",
    type: "textarea",
    required: true,
    placeholder: "Describe your business and services...",
    helpText:
      "Detailed description of your business and the services you provide",
  },
  {
    name: "experience",
    label: "Years of Experience",
    type: "select",
    required: true,
    options: [
      { value: "0-1", label: "Less than 1 year" },
      { value: "1-3", label: "1-3 years" },
      { value: "3-5", label: "3-5 years" },
      { value: "5-10", label: "5-10 years" },
      { value: "10+", label: "More than 10 years" },
    ],
    helpText: "How many years of experience do you have in this field?",
  },
  {
    name: "certifications",
    label: "Certifications",
    type: "file",
    required: false,
    multiple: true,
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize: 5 * 1024 * 1024, // 5MB
    helpText: "Upload any relevant certifications or qualifications",
  },
  {
    name: "portfolio",
    label: "Portfolio/Work Samples",
    type: "file",
    required: false,
    multiple: true,
    accept: ".pdf,.jpg,.jpeg,.png",
    maxSize: 10 * 1024 * 1024, // 10MB
    helpText: "Upload samples of your work or portfolio (max 10MB each)",
  },
  {
    name: "termsAccepted",
    label: "I accept the Terms and Conditions",
    type: "checkbox",
    required: true,
    helpText: "You must accept the terms and conditions to register",
  },
];

// Convert field configs to match FormConfig interface
export const serviceProviderFormSteps: FormConfig[] = [
  {
    title: "Business Information",
    description: "Tell us about your business and services",
    submitButtonText: "Continue to Location Details",
    fields: serviceProviderStep1Config.map((field) => ({
      name: field.name,
      type: field.type as any,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      helpText: field.helpText,
      options: field.options,
      multiple: field.multiple,
      accept: field.accept,
      gridCols: field.gridCols,
      conditionalDisplay: field.conditionalDisplay,
      // Map validation function to validation rules format
      validationRules: field.validate
        ? [
            {
              custom: (value: string) =>
                field.validate ? field.validate(value) === null : true,
              message: "Invalid value",
            },
          ]
        : [],
    })),
  },
  {
    title: "Location & Services",
    description: "Provide location details and service information",
    submitButtonText: "Complete Registration",
    fields: serviceProviderStep2Config.map((field) => ({
      name: field.name,
      type: field.type as any,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      helpText: field.helpText,
      options: field.options,
      multiple: field.multiple,
      accept: field.accept,
      gridCols: field.gridCols,
      conditionalDisplay: field.conditionalDisplay,
      // Map validation function to validation rules format
      validationRules: field.validate
        ? [
            {
              custom: (value: string) =>
                field.validate ? field.validate(value) === null : true,
              message: "Invalid value",
            },
          ]
        : [],
    })),
  },
];
