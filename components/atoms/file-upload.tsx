"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileText, ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onFileRemove?: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  file?: File | null;
  files?: File[] | null;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
  placeholder = "اسحب الصورة أو لوجو الخاص بيك من الجهاز",
  icon,
  file,
  files,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        // Create preview for images
        if (selectedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setPreview(null);
        }

        onFileSelect(selectedFile);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize,
      accept:
        accept === "image/*"
          ? { "image/png": [], "image/jpg": [], "image/jpeg": [] }
          : accept === "video/*"
          ? { "video/mp4": [], "video/mov": [], "video/avi": [] }
          : { "application/pdf": [], "image/*": [] },
    });

  const removeFile = () => {
    setPreview(null);
    onFileSelect(null);
  };

  const removeFileOfFiles = (file: File | null) => {
    if (file) onFileRemove?.(file);
  };

  // Show file info if file exists
  if (files && files.length > 0) {
    return (
      <Card className="relative">
        <CardContent className="p-6">
          <div className={cn("space-y-4", className)}>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="w-8 h-8 text-pink-500" />
                  ) : file.type.startsWith("video/") ? (
                    <Video className="w-8 h-8 text-pink-500" />
                  ) : (
                    <FileText className="w-8 h-8 text-pink-500" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFileOfFiles(file)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {/* Add more button */}
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                isDragActive
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-300 hover:border-pink-400"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                {icon || <Upload className="w-12 h-12 text-pink-500" />}
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {isDragActive ? "اتركه هنا..." : placeholder}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    يفضل يكون مقاس الصورة 500 × 500 بكسل، وبصيغة PNG أو JPG،
                    والخلفية شفافة أو متاحة.
                  </p>
                </div>
              </div>
            </div>
            {fileRejections.length > 0 && (
              <div className="text-red-500 text-sm mt-2">
                {fileRejections[0].errors[0].message}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  if (file) {
    return (
      <Card className={cn("relative", className)}>
        <CardContent className="p-6">
          {preview ? (
            <div className="relative">
              <img
                src={preview || "/placeholder.svg"}
                alt="معاينة الصورة"
                className="max-h-[300px] w-full object-contain rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="w-8 h-8 text-pink-500" />
                ) : file.type.startsWith("video/") ? (
                  <Video className="w-8 h-8 text-pink-500" />
                ) : (
                  <FileText className="w-8 h-8 text-pink-500" />
                )}
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("relative", className)}>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragActive
              ? "border-pink-500 bg-pink-50"
              : "border-gray-300 hover:border-pink-400"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {icon || <Upload className="w-12 h-12 text-pink-500" />}
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? "اتركه هنا..." : placeholder}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                يفضل يكون مقاس الصورة 500 × 500 بكسل، وبصيغة PNG أو JPG،
                والخلفية شفافة أو متاحة.
              </p>
            </div>
          </div>
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-2 text-red-500 text-sm">
            {fileRejections[0].errors[0].message}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
