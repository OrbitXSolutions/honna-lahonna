"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getServiceCategories } from "@/lib/data/service-categories";
import { cn } from "@/lib/utils";

interface ServiceCategory {
  id: string;
  name: string;
  nameEn: string;
}

interface ServiceCategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function ServiceCategorySelect({
  value,
  onValueChange,
  disabled = false,
  className,
  placeholder = "اختر تصنيف الخدمة",
}: ServiceCategorySelectProps) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getServiceCategories();
        setCategories(data);
      } catch (err) {
        setError("فشل في تحميل تصنيفات الخدمات");
        console.error("Error fetching service categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="text-sm text-red-500 p-2 border border-red-200 rounded-md bg-red-50">
        {error}
      </div>
    );
  }

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || loading}
    >
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={loading ? "جاري التحميل..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
