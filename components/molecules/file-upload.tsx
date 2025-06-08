"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Upload, X, FileIcon, ImageIcon, VideoIcon } from "lucide-react";

interface FileUploadProps {
  id: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  value: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function FileUpload({
  id,
  name,
  accept = "*/*",
  multiple = false,
  maxFiles = 1,
  maxSize = 10, // 10MB default
  value = [],
  onChange,
  disabled = false,
  className,
  placeholder = "اسحب الملفات هنا أو انقر للاختيار",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `حجم الملف ${file.name} أكبر من ${maxSize}MB`;
    }

    // Check file type if accept is specified and not wildcard
    if (accept !== "*/*" && !accept.includes("*")) {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type.includes(type.replace("*", ""));
      });

      if (!isValidType) {
        return `نوع الملف ${file.name} غير مدعوم`;
      }
    }

    return null;
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    // Check max files limit
    if (value.length + newFiles.length > maxFiles) {
      newErrors.push(`لا يمكن رفع أكثر من ${maxFiles} ملف`);
      setErrors(newErrors);
      return;
    }

    // Validate each file
    newFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    setErrors(newErrors);

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...value, ...validFiles] : validFiles;
      onChange(updatedFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange(updatedFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (file.type.startsWith("video/")) {
      return <VideoIcon className="h-4 w-4" />;
    }
    return <FileIcon className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Card
        className={cn(
          "relative border-2 border-dashed transition-colors",
          dragActive && "border-primary bg-primary/5",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "hover:border-primary/50 cursor-pointer"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <div className="p-6 text-center">
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-1">{placeholder}</p>
          <p className="text-xs text-muted-foreground">
            الحد الأقصى: {maxFiles} {multiple ? "ملفات" : "ملف"} - {maxSize}MB
            لكل ملف
          </p>
        </div>

        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
      </Card>

      {/* Display uploaded files */}
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-2 bg-muted rounded-md"
            >
              <div className="flex items-center gap-2">
                {getFileIcon(file)}
                <div className="text-sm">
                  <p className="font-medium truncate max-w-[200px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Display errors */}
      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
