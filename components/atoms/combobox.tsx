"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronsDown,
  ChevronsUpDown,
  Variable,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoadingIndicator from "./loading-indicator";
import { IconX } from "../icons";
import AppButton from "./app-button";

interface Props {
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  items?: { label: string; value: string; icon?: React.ReactNode }[];
  selectedValue?: string;
  isLoading?: boolean;
  onValueChange?: (value: string | undefined) => void;
  loadingText?: string; // Optional text for loading state in popover
  emptyText?: string; // Optional text for empty state
  isOptional?: boolean; // Optional prop to remove the selected value display
  name?: string; // Optional name for the combobox, useful for forms
}
export function Combobox({
  className,
  placeholder = "اختر عنصر...",
  icon,
  items,
  isLoading = false,
  name,
  selectedValue,
  onValueChange,
  loadingText = "جاري التحميل...",
  emptyText = "لا يوجد نتائج بحث",
  isOptional = true,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedValue);

  React.useEffect(() => {
    if (selectedValue !== undefined) {
      setValue(selectedValue);
    }
  }, [selectedValue]);
  const selectedIcon = items?.find((item) => item.value === value)?.icon;
  return (
    <>
      {
        name && value && (
          <input type="hidden" name={name} value={value} />
        ) /* Optional hidden input for form submission */
      }
      <Popover open={open} onOpenChange={isLoading ? undefined : setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "justify-between",
              "border-b border-primary rounded-none text-primary",
              className
            )}
            disabled={isLoading}
          >
            <div className="flex gap-2 items-center">
              {selectedIcon ? (
                <span>{selectedIcon}</span>
              ) : (
                icon && <span>{icon}</span>
              )}
              <span className="flex-1">
                {isLoading
                  ? loadingText
                  : value
                  ? items?.find((item) => item.value === value)?.label || value
                  : placeholder}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* Remove Icon button if optional and has value*/}
              {isOptional && value && (
                <AppButton
                  // asChild
                  variant={"icon"}
                  size={"sm"}
                  className="!p-0 border-0 !gap-0"
                  onClick={() => {
                    setValue(undefined);
                    setOpen(false);
                    onValueChange?.(undefined);
                  }}
                >
                  <Variable height={2} className="!p-0 border-0 !gap-0 w-6" />
                </AppButton>
              )}
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput
              placeholder={placeholder}
              className="h-9"
              disabled={isLoading}
            />
            <CommandList>
              {isLoading ? (
                <div className="p-2 text-center text-sm text-muted-foreground">
                  {loadingText}
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyText}</CommandEmpty>
                  {items && items.length > 0 && (
                    <CommandGroup>
                      {items?.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={(currentValue) => {
                            const newValue =
                              currentValue === value ? "" : currentValue;
                            setValue(newValue);
                            setOpen(false);
                            onValueChange?.(newValue);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && <span>{item.icon}</span>}
                            <span className="flex-1">{item.label}</span>
                          </div>

                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === item.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
