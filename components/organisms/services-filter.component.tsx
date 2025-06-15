import { CategoriesFilter } from "../molecules/categories-filter.component";
import { GovernoratesFilter } from "../molecules/governorates-filter.component";
import Form from "next/form";
import {
  Form as HookForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SearchInput } from "../atoms/search-input";
import { Input } from "../ui/input";
import AppButton from "../atoms/app-button";
import z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { getGovernorates } from "@/lib/data/prisma/governorates";
import { getServiceCategories } from "@/lib/data/prisma/service-categories";
import { FormButton } from "../atoms/form-button.component";

interface ServicesFilterProps {
  // children: React.ReactNode;
  categorySlug?: string;
  governorateCode?: string;
  queryString?: string;
}

export async function ServicesFilter({
  categorySlug,
  governorateCode,
  queryString,
}: ServicesFilterProps) {
  const governorates = await getGovernorates();
  const categories = await getServiceCategories();
  return (
    <Form
      action={""}
      className="bg-white p-3 rounded-3xl flex justify-center max-w-4xl mx-auto"
    >
      <div className="flex flex-wrap gap-5 items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label>البحث</Label>
            <SearchInput
              name="query"
              placeholder="ابحث عن خدمة"
              value={queryString}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>اختر المحافظة</Label>
            <GovernoratesFilter
              governoratesData={governorates}
              governorateCode={governorateCode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>اختر الفئة</Label>
            <CategoriesFilter
              categoriesData={categories}
              categorySlug={categorySlug}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <FormButton>بحث</FormButton>
        </div>
      </div>
    </Form>
  );
}
