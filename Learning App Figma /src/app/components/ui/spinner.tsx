import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import { Loader2 } from "lucide-react";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
  fullscreen?: boolean;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, variant, label, fullscreen, ...props }, ref) => {
    const spinner = (
      <div
        ref={ref}
        role="status"
        aria-label={label || "Chargement"}
        className={cn(
          "inline-flex items-center justify-center",
          fullscreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        <div className={cn(fullscreen && "flex flex-col items-center gap-4")}>
          <Loader2 className={cn(spinnerVariants({ size, variant }))} />
          {label && (
            <span className="text-sm text-muted-foreground sr-only">
              {label}
            </span>
          )}
          {label && fullscreen && (
            <span className="text-sm text-muted-foreground">{label}</span>
          )}
        </div>
      </div>
    );

    return spinner;
  }
);
Spinner.displayName = "Spinner";

// Spinner avec texte à côté
interface SpinnerWithTextProps extends SpinnerProps {
  text: string;
}

function SpinnerWithText({
  text,
  className,
  size = "sm",
  variant,
  ...props
}: SpinnerWithTextProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <Loader2 className={cn(spinnerVariants({ size, variant }))} />
      <span className="text-sm">{text}</span>
    </div>
  );
}

// Dots spinner (alternative style)
interface DotsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "muted";
}

function DotsSpinner({
  className,
  size = "md",
  variant = "default",
  ...props
}: DotsSpinnerProps) {
  const dotSize = size === "sm" ? "h-2 w-2" : size === "lg" ? "h-4 w-4" : "h-3 w-3";
  const dotColor =
    variant === "secondary"
      ? "bg-secondary"
      : variant === "muted"
      ? "bg-muted-foreground"
      : "bg-primary";

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="status"
      aria-label="Chargement"
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-pulse",
            dotSize,
            dotColor
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}

// Skeleton bar loader (horizontal bar)
interface BarLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary";
}

function BarLoader({ className, variant = "default", ...props }: BarLoaderProps) {
  const bgColor = variant === "secondary" ? "bg-secondary/20" : "bg-primary/20";
  const barColor = variant === "secondary" ? "bg-secondary" : "bg-primary";

  return (
    <div
      className={cn("w-full h-1 rounded-full overflow-hidden", bgColor, className)}
      role="status"
      aria-label="Chargement"
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full animate-[loading_1.5s_ease-in-out_infinite]",
          barColor
        )}
        style={{
          width: "40%",
        }}
      />
    </div>
  );
}

export { Spinner, SpinnerWithText, DotsSpinner, BarLoader, spinnerVariants };
