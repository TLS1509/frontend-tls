import * as React from "react";

import { cn } from "./utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[var(--radius-md)] bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-[20px] border border-white/80 px-3 py-2 transition-tls-fast shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary focus-visible:shadow-[0_4px_16px_rgba(85,161,180,0.15)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
