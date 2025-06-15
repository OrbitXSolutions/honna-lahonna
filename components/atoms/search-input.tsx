/**
 * @file SearchInput.tsx
 * @description A reusable search input component.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"; // Assuming Input from Shadcn/UI
import { Search } from "lucide-react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
  onSearch?: (value: string | undefined) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, onChange, value, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);

    React.useEffect(() => {
      setInternalValue(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setInternalValue(newValue);
      if (onChange) {
        onChange(event);
      }
      if (onSearch && !onChange) {
        // If only onSearch is provided, trigger it on change
        onSearch(newValue);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && onSearch) {
        onSearch(internalValue as string);
      }
      if (props.onKeyDown) {
        props.onKeyDown(event);
      }
    };

    return (
      <div
        className={cn(
          "relative flex items-center rounded-0  border-b border-primary rounded-0 text-primary",
          className
        )}
      >
        <div className="absolute inset-y-0 start-0 pe-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 " />
        </div>
        <Input
          type="search"
          value={internalValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={ref}
          className="ps-6 py-2 shadow-none  border-0 " // Adjust padding for icon
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
