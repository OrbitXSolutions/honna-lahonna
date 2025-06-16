"use client";
import { profileUpdateAction } from "@/app/_actions/service-provider/profile/profile-update.action";
import AppButton from "@/components/atoms/app-button";

import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { serviceProviderSchema } from "@/lib/data/models/schemas/service-provider.schema";

import { Check, SquarePen, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  service_description: string | null;
  disableEdit?: boolean; // Optional prop to control editability
  [key: string]: any; // Allow additional props if needed
}

const serviceDescriptionSchema = serviceProviderSchema.pick({
  service_description: true,
});
// Todos are passed from the parent Server Component and updated each time a new todo is added
// thanks to the `revalidatePath` function called inside the action.
export function ProfileServiceDescriptionField({
  service_description,
  disableEdit = false,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(service_description || "");
  const { execute, isPending, result } = useAction(profileUpdateAction, {
    onSuccess: ({ data }) => {
      toast.success("تم حفظ البيانات بنجاح");
      setIsEdit(false);
    },
    onError: ({ error }) => {
      console.error("Registration error:", error);
      const message =
        error?.validationErrors?.service_description?._errors?.join(",") ??
        error?.serverError;

      toast.error(message ?? "فشل في التسجيل");
    },
  });

  const edit = () => {
    setIsEdit(true);
  };
  const undo = () => {
    setValue(service_description || "");
    setIsEdit(false);
  };
  const save = () => {
    const validation = serviceDescriptionSchema.safeParse({
      service_description: value,
    });
    if (validation.error) {
      const errorMsg = validation.error.issues[0];

      toast.error(errorMsg.message || "خطأ في التحقق من البيانات");
      return;
    }
    execute(validation.data);
  };
  const valueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      toast.error("الحد الأقصى لعدد الأحرف هو 500");
      return;
    }
    setValue(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl text-bold">
          {"عن الخدمة"}

          {!isEdit && (
            <AppButton onClick={edit} variant={"ghost"} size={"sm"}>
              <SquarePen />
            </AppButton>
          )}

          {isEdit && (
            <>
              {!isPending && (
                <AppButton
                  variant={"ghost"}
                  size={"sm"}
                  className="text-green-700"
                  onClick={save}
                >
                  <Check />
                </AppButton>
              )}
              {isPending && (
                <span className="inline-flex">
                  <Spinner size={"small"} className="inline-flex" />
                </span>
              )}

              <AppButton
                disabled={isPending}
                variant={"ghost"}
                size={"sm"}
                onClick={undo}
              >
                <X />
              </AppButton>
            </>
          )}
        </h3>
      </div>

      <div className={"p-4 text-gray-600 text-sm bg-white rounded-2xl"}>
        {isEdit ? (
          <Textarea
            value={value}
            placeholder="اكتب عن خدمتك..."
            onChange={valueChange}
          ></Textarea>
        ) : (
          <span>{value || "ادخل وصف الخدمة"}</span>
        )}
      </div>
    </>
  );
}
