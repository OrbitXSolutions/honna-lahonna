"use client";
import { getServiceCategories } from "@/lib/data/prisma/service-categories";
import { Combobox } from "../atoms/combobox";
import { IconCategories } from "../icons";
import { useEffect, useState, useTransition } from "react";
import { service_categories } from "@/lib/generated/prisma";
import { SupabasePaths } from "@/lib/constants/supabase";
import Image from "next/image";

interface Props {
  //   children: React.ReactNode;
  categorySlug?: string;
  onCategoryChange?: (categorySlug: string | undefined) => void;
  categoriesData?: service_categories[];
}

export function CategoriesFilter({
  categorySlug,
  categoriesData,
  onCategoryChange,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<service_categories[]>(
    categoriesData || []
  );

  useEffect(() => {
    if (!categories || categories.length === 0)
      startTransition(async () => {
        const fetchedCategories = await getServiceCategories();
        setCategories(fetchedCategories);
        if (onCategoryChange && categorySlug) {
          onCategoryChange(categorySlug);
        }
      });
  }, [categorySlug]);
  return (
    <Combobox
      icon={<IconCategories />}
      placeholder="اختر فئة"
      name="category"
      items={categories.map((category) => ({
        label: category.name,
        value: category.slug ?? category.id.toString(),
        icon: (
          <Image
            src={`${SupabasePaths.SERVICE_CATEGORIES}/${category.icon}`}
            width={20}
            height={20}
            alt={category.name}
          />
        ),
      }))}
      isLoading={isPending}
      loadingText="جاري تحميل الفئات..."
      selectedValue={categorySlug}
      onValueChange={onCategoryChange}
    />
  );
}
