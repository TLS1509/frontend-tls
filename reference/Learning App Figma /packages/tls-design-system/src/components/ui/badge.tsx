import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-md)] border px-2.5 py-0.5 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-tls-fast overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-[var(--primary-hover)]",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-[var(--secondary-hover)]",
        accent:
          "border-transparent bg-accent text-accent-foreground [a&]:hover:bg-[var(--accent-hover)]",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
        outline:
          "text-foreground border-border [a&]:hover:bg-muted",
        ghost:
          "border-transparent bg-muted text-foreground [a&]:hover:bg-muted/80",
      },
      size: {
        default: "h-5",
        sm: "h-4 px-2 text-[var(--text-xs)]",
        lg: "h-6 px-3 text-[var(--text-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
