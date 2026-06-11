import * as React from "react";
import { useState, useCallback } from "react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Check, ChevronsUpDown, X } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ComboboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: ComboboxOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  onCreate?: (value: string) => void;
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      className,
      options,
      value,
      onChange,
      placeholder = "Sélectionner...",
      emptyText = "Aucun résultat",
      searchPlaceholder = "Rechercher...",
      disabled = false,
      multiple = false,
      clearable = true,
      creatable = false,
      onCreate,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedValues = multiple
      ? (Array.isArray(value) ? value : value ? [value] : [])
      : value
      ? [value as string]
      : [];

    const selectedLabels = selectedValues
      .map((v) => options.find((opt) => opt.value === v)?.label)
      .filter(Boolean);

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (multiple) {
          const newValue = selectedValues.includes(optionValue)
            ? selectedValues.filter((v) => v !== optionValue)
            : [...selectedValues, optionValue];
          onChange?.(newValue);
        } else {
          onChange?.(optionValue);
          setOpen(false);
          setSearch("");
        }
      },
      [multiple, selectedValues, onChange]
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? [] : "");
      setSearch("");
    };

    const handleCreate = () => {
      if (creatable && search && onCreate) {
        onCreate(search);
        setSearch("");
      }
    };

    const displayValue = multiple
      ? selectedLabels.length > 0
        ? `${selectedLabels.length} sélectionné${selectedLabels.length > 1 ? "s" : ""}`
        : placeholder
      : selectedLabels[0] || placeholder;

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div ref={dropdownRef}>
          {/* Trigger button */}
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            onClick={() => !disabled && setOpen(!open)}
            className={cn("w-full justify-between", !value && "text-muted-foreground")}
          >
            <span className="truncate">{displayValue}</span>
            <div className="flex items-center gap-1">
              {clearable && selectedValues.length > 0 && (
                <X
                  className="h-4 w-4 opacity-50 hover:opacity-100"
                  onClick={handleClear}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>

          {/* Dropdown */}
          {open && (
            <div
              className={cn(
                "absolute z-50 mt-1 w-full rounded-[var(--radius-lg)] border bg-background shadow-[var(--shadow-lg)] animate-in fade-in-0 zoom-in-95"
              )}
            >
              {/* Search input */}
              <div className="p-2 border-b">
                <Input
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9"
                  autoFocus
                />
              </div>

              {/* Options list */}
              <div className="max-h-60 overflow-auto p-1">
                {filteredOptions.length === 0 ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    {emptyText}
                    {creatable && search && (
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCreate}
                          className="w-full"
                        >
                          Créer "{search}"
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => !option.disabled && handleSelect(option.value)}
                        disabled={option.disabled}
                        className={cn(
                          "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm outline-none transition-colors",
                          isSelected && "bg-muted",
                          !option.disabled && "hover:bg-muted/50",
                          option.disabled && "cursor-not-allowed opacity-50"
                        )}
                      >
                        {multiple && (
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded border",
                              isSelected && "border-primary bg-primary text-white"
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                        )}
                        
                        {option.icon}
                        
                        <div className="flex-1 text-left">
                          <div>{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground">
                              {option.description}
                            </div>
                          )}
                        </div>

                        {!multiple && isSelected && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Selected items (multiple mode) */}
              {multiple && selectedValues.length > 0 && (
                <div className="border-t p-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedValues.map((val) => {
                      const option = options.find((opt) => opt.value === val);
                      return (
                        <div
                          key={val}
                          className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-primary/10 px-2 py-1 text-xs"
                        >
                          <span>{option?.label}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(val);
                            }}
                            className="rounded-[var(--radius-sm)] hover:bg-primary/20"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Combobox.displayName = "Combobox";

export { Combobox };
