import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-tls disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)] shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[var(--secondary-hover)] shadow-sm",
        accent: "bg-accent text-white font-medium hover:bg-[var(--accent-hover)] shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 shadow-sm",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
        outline: "border border-border bg-background text-foreground hover:bg-muted hover:border-[var(--border-hover)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        "outline-primary": "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:border-[var(--primary-hover)]",
        "outline-secondary": "border-2 border-secondary bg-transparent text-secondary hover:bg-secondary/10 hover:border-[var(--secondary-hover)]",
        "outline-accent": "border-2 border-accent bg-transparent text-accent hover:bg-accent/10 hover:border-[var(--accent-hover)]",
        "outline-orange": "border-2 border-[#ED843A] bg-transparent text-[#ED843A] hover:bg-[#ED843A]/10 hover:border-[#ED843A] hover:brightness-110",
        "outline-yellow": "border-2 border-[#F8B044] bg-transparent text-[#F8B044] hover:bg-[#F8B044]/10 hover:border-[#F8B044] hover:brightness-110",
        "gradient-primary": "text-white font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] [background:var(--gradient-primary)]",
        "gradient-secondary": "text-white font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] [background:var(--gradient-secondary)]",
        "gradient-warm": "text-white font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] [background:var(--gradient-warm)]",
        "gradient-brand": "text-white font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] [background:var(--gradient-brand)]",
        glass: "bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-[20px] border border-primary text-primary hover:bg-white/90 hover:shadow-[0_4px_16px_rgba(85,161,180,0.25)] shadow-[0_2px_8px_rgba(85,161,180,0.15)] font-semibold",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline hover:text-[var(--primary-hover)]",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-[var(--radius-md)] has-[>svg]:px-3",
        sm: "h-8 px-3 rounded-[var(--radius-sm)] gap-1.5 has-[>svg]:px-2.5",
        lg: "h-12 px-6 rounded-[var(--radius-lg)] has-[>svg]:px-4",
        xl: "h-14 px-8 rounded-[var(--radius-lg)] has-[>svg]:px-6",
        icon: "size-10 rounded-[var(--radius-md)]",
        "icon-sm": "size-8 rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };