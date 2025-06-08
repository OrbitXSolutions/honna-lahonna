"use client";

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getGovernorates } from '@/lib/data/governorates';
import { cn } from '@/lib/utils';

interface Governorate {
  id: string;
  name: string;
  nameEn: string;
}

interface GovernorateSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function GovernorateSelect({
  value,
  onValueChange,
  disabled = false,
  className,
  placeholder = "اختر المحافظة",
}: GovernorateSelectProps) {
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const data = await getGovernorates();
        setGovernorates(data);
      } catch (err) {
        setError('فشل في تحميل المحافظات');
        console.error('Error fetching governorates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGovernorates();
  }, []);

  if (error) {
    return (
      <div className="text-sm text-red-500 p-2 border border-red-200 rounded-md bg-red-50">
        {error}
      </div>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled || loading}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={loading ? "جاري التحميل..." : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {governorates.map((governorate) => (
          <SelectItem key={governorate.id} value={governorate.id}>
            {governorate.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
