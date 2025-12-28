"use client";
import { getCategoryIconUrl, type CategoryDto } from "@/lib/api/types";
import { Combobox } from "../atoms/combobox";
import { IconCategories } from "../icons";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";

// Fetch categories via internal API route to avoid CORS issues
async function fetchCategories(): Promise<CategoryDto[]> {
  try {
    const response = await fetch("/api/service-categories");
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

interface Props {
  categorySlug?: string;
  onCategoryChange?: (categorySlug: string | undefined) => void;
  categoriesData?: CategoryDto[];
}

export function CategoriesFilter({
  categorySlug,
  categoriesData,
  onCategoryChange,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<CategoryDto[]>(
    categoriesData || []
  );

  useEffect(() => {
    if (!categories || categories.length === 0)
      startTransition(async () => {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        if (onCategoryChange && categorySlug) {
          onCategoryChange(categorySlug);
        }
      });
  }, [categorySlug, categories, onCategoryChange]);

  return (
    <Combobox
      icon={<IconCategories />}
      placeholder="اختر فئة"
      name="category"
      items={categories.map((category) => ({
        label: category.name,
        value: category.slug ?? category.id.toString(),
        icon: category.icon ? (
          <Image
            src={getCategoryIconUrl(category.icon) || ""}
            width={20}
            height={20}
            alt={category.name}
          />
        ) : undefined,
      }))}
      isLoading={isPending}
      loadingText="جاري تحميل الفئات..."
      selectedValue={categorySlug}
      onValueChange={onCategoryChange}
    />
  );
}
