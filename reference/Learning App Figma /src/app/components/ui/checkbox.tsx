"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { CheckIcon, Minus } from "lucide-react@0.487.0";

import { cn } from "./utils";

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, indeterminate, ...props }, ref) => {
  const internalRef = React.useRef<HTMLButtonElement>(null);
  const combinedRef = ref || internalRef;

  React.useEffect(() => {
    const element = (combinedRef as React.RefObject<HTMLButtonElement>).current;
    if (element && indeterminate !== undefined) {
      element.dataset.indeterminate = indeterminate ? "true" : "false";
    }
  }, [indeterminate, combinedRef]);

  return (
    <CheckboxPrimitive.Root
      ref={combinedRef as any}
      data-slot="checkbox"
      className={cn(
        "peer border bg-input-background dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[var(--radius-sm)] border-[var(--input-border)] shadow-[var(--shadow-xs)] transition-tls-fast outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        indeterminate && "data-[indeterminate=true]:bg-primary data-[indeterminate=true]:border-primary",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {indeterminate ? (
          <Minus className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
