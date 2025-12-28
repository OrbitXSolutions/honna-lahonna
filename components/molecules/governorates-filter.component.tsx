"use client";

import { Combobox } from "../atoms/combobox";
import { getAllGovernorates } from "@/lib/api/governorates";
import type { GovernorateDto } from "@/lib/api/types";
import { IconGovernorate } from "../icons";
import { useEffect, useState, useTransition } from "react";

interface Props {
  governorateCode?: string;
  onGovernorateChange?: (governorateCode: string | undefined) => void;
  governoratesData?: GovernorateDto[];
}

export function GovernoratesFilter({
  governorateCode,
  onGovernorateChange,
  governoratesData,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [governorates, setGovernorates] = useState<GovernorateDto[]>(
    governoratesData || []
  );

  useEffect(() => {
    if (!governoratesData || governoratesData.length === 0)
      startTransition(async () => {
        const fetchedGovernorates = await getAllGovernorates();
        setGovernorates(fetchedGovernorates);
      });
  }, [governorateCode, governoratesData]);

  return (
    <Combobox
      icon={<IconGovernorate />}
      placeholder="اختر محافظة"
      name="governorate"
      items={governorates.map((governorate) => ({
        label: governorate.name,
        value: governorate.code ?? governorate.id.toString(),
      }))}
      isLoading={isPending}
      loadingText="جاري تحميل المحافظات..."
      selectedValue={governorateCode}
      onValueChange={onGovernorateChange}
    />
  );
}
