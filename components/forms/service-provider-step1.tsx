"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { type Step1Data } from "@/lib/schemas/service-provider";

interface ServiceProviderStep1Props {
  form: UseFormReturn<Step1Data>;
  onSubmit: (data: Step1Data) => void;
  serviceCategories: Array<{ id: string; name: string; slug?: string | null }>;
  governorates: Array<{ id: string; name: string }>;
  errors?: Record<string, string[]>;
  isLoading?: boolean;
}

export function ServiceProviderStep1({
  form,
  onSubmit,
  serviceCategories,
  governorates,
  errors,
  isLoading = false,
}: ServiceProviderStep1Props) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        form.setError("logo_image_file", {
          type: "manual",
          message: "يجب أن يكون الملف صورة (JPEG, PNG, GIF, WebP)",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        form.setError("logo_image_file", {
          type: "manual",
          message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
        });
        return;
      }

      form.setValue("logo_image_file", file);
      form.clearErrors("logo_image_file");

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.resetField("logo_image_file");
      setLogoPreview(null);
    }
  };

  const removeLogo = () => {
    handleLogoUpload(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
            <CardDescription>أدخل المعلومات الأساسية عن خدماتك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Service Name */}
            <FormField
              control={form.control}
              name="service_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الخدمة *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: خدمات تصليح الأجهزة المنزلية"
                      {...field}
                      className="text-right"
                    />
                  </FormControl>
                  <FormDescription>
                    اكتب اسم الخدمة التي تقدمها بوضوح
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Service Category */}
            <FormField
              control={form.control}
              name="service_category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>فئة الخدمة *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="اختر فئة الخدمة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    اختر الفئة التي تنتمي إليها خدمتك
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Service Description */}
            <FormField
              control={form.control}
              name="service_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف الخدمة *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اكتب وصفاً مفصلاً عن الخدمة التي تقدمها..."
                      className="min-h-[100px] text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    اشرح بالتفصيل ما تقدمه من خدمات (الحد الأدنى 50 حرف)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            {/* Years of Experience */}
            <FormField
              control={form.control}
              name="years_of_experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سنوات الخبرة *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      placeholder="5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      className="text-right"
                    />
                  </FormControl>
                  <FormDescription>
                    عدد سنوات خبرتك في هذا المجال
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Service Delivery Method */}
            <FormField
              control={form.control}
              name="service_delivery_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>طريقة تقديم الخدمة *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="اختر طريقة تقديم الخدمة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="online">عبر الإنترنت</SelectItem>
                      <SelectItem value="offline">في الموقع</SelectItem>
                      <SelectItem value="both">كلاهما</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>كيف تقدم خدماتك للعملاء</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>السيرة الذاتية *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اكتب نبذة عن نفسك وخبراتك..."
                      className="min-h-[100px] text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    نبذة مختصرة عن خبراتك ومهاراتك (الحد الأدنى 20 حرف)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرابط المخصص *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="my-service-name"
                      {...field}
                      className="text-left"
                      dir="ltr"
                    />
                  </FormControl>
                  <FormDescription>
                    رابط مخصص لصفحتك (أحرف انجليزية صغيرة وأرقام وشرطات فقط)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات التواصل</CardTitle>
            <CardDescription>أدخل معلومات التواصل الخاصة بك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {" "}
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="whatsapp_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف *</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="07XXXXXXXX"
                      {...field}
                      className="text-right"
                      dir="ltr"
                    />
                  </FormControl>
                  <FormDescription>
                    رقم هاتفك للتواصل مع العملاء
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* WhatsApp Number */}
            <FormField
              control={form.control}
              name="other_urls"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الواتساب</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="07XXXXXXXX"
                      {...field}
                      className="text-right"
                      dir="ltr"
                    />
                  </FormControl>
                  <FormDescription>
                    رقم الواتساب للتواصل السريع (اختياري)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اكتب عنوانك التفصيلي..."
                      className="min-h-[80px] text-right"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    العنوان الذي يمكن للعملاء الوصول إليك فيه
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Governorate */}
            <FormField
              control={form.control}
              name="governorate_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المحافظة *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="اختر المحافظة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {governorates.map((governorate) => (
                        <SelectItem key={governorate.id} value={governorate.id}>
                          {governorate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    المحافظة التي تقدم فيها خدماتك
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">شعار الخدمة</CardTitle>
            <CardDescription>
              ارفع شعار أو صورة تمثل خدمتك (اختياري)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="logo_image_file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رفع الشعار</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* Upload Area */}
                      {!logoPreview && (
                        <div
                          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => logoInputRef.current?.click()}
                        >
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium text-muted-foreground mb-2">
                            انقر لرفع الشعار
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF, WebP - حتى 5MB
                          </p>
                        </div>
                      )}

                      {/* Preview */}
                      {logoPreview && (
                        <div className="relative inline-block">
                          <img
                            src={logoPreview}
                            alt="معاينة الشعار"
                            className="max-w-xs max-h-40 rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={removeLogo}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      <input
                        type="file"
                        ref={logoInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleLogoUpload(file);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    شعار أو صورة تمثل عملك (JPEG, PNG, GIF, WebP - حتى 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="min-w-[120px]"
          >
            {isLoading ? (
              "جاري المعالجة..."
            ) : (
              <>
                المتابعة
                <ArrowRight className="mr-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
