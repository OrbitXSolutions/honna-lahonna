"use client";

import { Combobox } from "../atoms/combobox";
import { getGovernorates } from "@/lib/data/prisma/governorates";
import { IconGovernorate } from "../icons";
import { useEffect, useState, useTransition } from "react";
import { governorates as GovernorateType } from "@/lib/generated/prisma"; // Assuming this type exists or can be created

interface Props {
  governorateCode?: string;
  onGovernorateChange?: (governorateCode: string | undefined) => void;
  governoratesData?: GovernorateType[];
}

export function GovernoratesFilter({
  governorateCode,
  onGovernorateChange,
  governoratesData,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [governorates, setGovernorates] = useState<GovernorateType[]>(
    governoratesData || []
  );

  useEffect(() => {
    if (!governoratesData || governoratesData.length === 0)
      startTransition(async () => {
        const fetchedGovernorates = await getGovernorates();
        setGovernorates(fetchedGovernorates);
      });
  }, [governorateCode]);

  return (
    <Combobox
      icon={<IconGovernorate />}
      placeholder="اختر محافظة"
      name="governorate"
      items={governorates.map((governorate) => ({
        label: governorate.name,
        value: governorate.governorate_code ?? governorate.id.toString(),
      }))}
      isLoading={isPending}
      loadingText="جاري تحميل المحافظات..."
      selectedValue={governorateCode}
      onValueChange={onGovernorateChange}
    />
  );
}
