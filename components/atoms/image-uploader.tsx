/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  ControllerRenderProps,
  useController,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";

import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface Props {
  field: ControllerRenderProps;
  disabled?: boolean;
  name: string;
  placeholder?: string;
  id?: string;
  className?: string;
  form: UseFormReturn;
}
export const ImageUploader: React.FC<Props> = ({
  field,
  disabled,
  name,
  placeholder,
  id,
  className,
  form,
}: Props) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");

  //   const formSchema = z.object({
  //     image: z
  //       //Rest of validations done via react dropzone
  //       .instanceof(File)
  //       .refine((file) => file.size !== 0, "Please upload an image"),
  //   });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        field.onChange(acceptedFiles[0]);
        form.setValue(name, acceptedFiles[0]);
        form.clearErrors(name);
      } catch (error) {
        setPreview(null);
        //   field.onChange(null);
        form.resetField(name);
      }
    },
    [field.value]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground",
        className
      )}
    >
      {preview && (
        <img
          src={preview as string}
          alt="Uploaded image"
          className="max-h-[400px] rounded-lg"
        />
      )}
      <ImagePlus className={`size-40 ${preview ? "hidden" : "block"}`} />
      <Input
        {...field}
        {...getInputProps()}
        disabled={disabled}
        id={id ?? name}
        type="file"
      />
      {isDragActive ? (
        <p>Drop the image!</p>
      ) : (
        <p>Click here or drag an image to upload it</p>
      )}
    </div>
  );
};
