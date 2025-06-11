"use client";

import { ControllerRenderProps, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { registerAction } from "@/app/(auth)/register/action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AppButton from "../atoms/app-button";
import { Spinner } from "../ui/spinner";
import { PhoneInput } from "../ui/phone-input";
import {
  ServiceProviderCreateOrUpdate,
  ServiceProviderCreateOrUpdateDefaultValues,
  serviceProviderSchema,
  serviceProviderTestSchema,
} from "@/lib/data/models/schemas/service-provider.schema";
import { useSupabaseUser } from "@/hooks/use-supabase-user";
import { serviceProviderRegisterAction } from "@/app/service-provider/register/old_action";
import { z } from "zod/v4";
import { ImageUploader } from "../atoms/image-uploader";

type field = ControllerRenderProps;

interface fieldProps {
  disabled?: boolean;
  name: string;
  placeholder?: string;
  type?: string;
  id?: string;
  className?: string;
  field: field;
  form?: UseFormReturn;
}

interface RegisterFieldData {
  label?: string;
  isFullWidth?: boolean;
  name: keyof z.infer<typeof serviceProviderTestSchema>;
  fieldComponent: React.FC<fieldProps>;
}

const step1Fields: RegisterFieldData[] = [
  {
    name: "service_name",
    label: "الاسم الأول",
    fieldComponent: ({ disabled, name, placeholder, id, type, field }) => (
      <Input
        disabled={disabled}
        id={id || name}
        type={type || "text"}
        placeholder={placeholder || "أدخلي اسمك الأول"}
        {...field}
      />
    ),
  },
  //   {
  //     name: "logo_image_file",
  //     label: "شعار الخدمة",
  //     fieldComponent: ({ disabled, name, placeholder, id, field, form }) =>
  //       form && (
  //         <ImageUploader
  //           disabled={disabled}
  //           id={id || name}
  //           name={name}
  //           placeholder={placeholder || "أرفق شعار الخدمة"}
  //           field={field}
  //           form={form}
  //         />
  //       ),
  //   },
] as const;

export default function ServiceProviderRegisterV2Form() {
  return <h1>تسجيل كمقدم خدمة</h1>;

  //   return (
  //     <Form {...form}>
  //       <form onSubmit={onSubmit} className="space-y-6">
  //         {/* Server Error Display */}
  //         {action.hasErrored && (
  //           <div className="rounded-md bg-red-50 p-4">
  //             <p className="text-sm text-destructive text-center">
  //               {action.result?.serverError || "حدث خطأ في الخادم"}
  //             </p>
  //           </div>
  //         )}

  //         {/* Form Fields */}
  //         <div className="space-y-4">
  //           {step1Fields.map((fieldData) => (
  //             <FormField
  //               key={fieldData.name}
  //               name={fieldData.name}
  //               control={form.control}
  //               render={({ field }) => (
  //                 <FormItem className="space-y-2">
  //                   <FormLabel htmlFor={field.name}>{fieldData.label}</FormLabel>
  //                   <FormControl>
  //                     <fieldData.fieldComponent
  //                       id={field.name}
  //                       name={field.name}
  //                       disabled={action.isPending}
  //                       field={field}
  //                     />
  //                   </FormControl>
  //                   <FormMessage />
  //                 </FormItem>
  //               )}
  //             />
  //           ))}
  //         </div>

  //         {/* Submit Button */}
  //         <AppButton
  //           disabled={action.isPending}
  //           type="submit"
  //           className="w-full cursor-pointer"
  //         >
  //           {action.isPending ? (
  //             <>
  //               جاري التسجيل...
  //               <Spinner size="small" />
  //             </>
  //           ) : (
  //             "تسجيل كمقدم خدمة"
  //           )}
  //         </AppButton>
  //       </form>
  //     </Form>
  //   );
}
