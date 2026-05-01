import * as React from "react";
import { useState } from "react";
import { cn } from "./utils";
import { Star } from "lucide-react";

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  allowHalf?: boolean;
  allowClear?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      value = 0,
      max = 5,
      onChange,
      readonly = false,
      disabled = false,
      size = "md",
      showValue = false,
      allowHalf = false,
      allowClear = true,
      icon,
      emptyIcon,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    const handleClick = (index: number, isHalf: boolean = false) => {
      if (readonly || disabled) return;

      const newValue = index + (isHalf && allowHalf ? 0.5 : 1);
      
      if (allowClear && newValue === value) {
        onChange?.(0);
      } else {
        onChange?.(newValue);
      }
    };

    const handleMouseMove = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
      if (readonly || disabled || !allowHalf) return;

      const { left, width } = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - left) / width;
      setHoverValue(index + (percent < 0.5 ? 0.5 : 1));
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
    };

    const getStarFill = (index: number) => {
      const currentValue = hoverValue ?? value;
      
      if (currentValue >= index + 1) {
        return "full";
      } else if (allowHalf && currentValue >= index + 0.5) {
        return "half";
      }
      return "empty";
    };

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        <div
          className="inline-flex items-center gap-0.5"
          onMouseLeave={handleMouseLeave}
          role="radiogroup"
          aria-label="Rating"
        >
          {Array.from({ length: max }, (_, i) => {
            const fillType = getStarFill(i);
            const isInteractive = !readonly && !disabled;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleClick(i)}
                onMouseMove={(e) => handleMouseMove(i, e)}
                disabled={disabled}
                className={cn(
                  "relative inline-flex transition-transform",
                  isInteractive && "cursor-pointer hover:scale-110",
                  disabled && "cursor-not-allowed opacity-50"
                )}
                aria-label={`${i + 1} étoile${i > 0 ? "s" : ""}`}
                role="radio"
                aria-checked={value > i}
              >
                {/* Empty star */}
                <Star
                  className={cn(
                    sizeClasses[size],
                    "text-muted-foreground/30"
                  )}
                  fill="none"
                />
                
                {/* Filled star overlay */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: fillType === "full" ? "100%" : fillType === "half" ? "50%" : "0%",
                  }}
                >
                  <Star
                    className={cn(
                      sizeClasses[size],
                      "text-warning"
                    )}
                    fill="currentColor"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {showValue && (
          <span className="ml-2 text-sm text-muted-foreground">
            {value.toFixed(allowHalf ? 1 : 0)} / {max}
          </span>
        )}
      </div>
    );
  }
);
Rating.displayName = "Rating";

// Display-only rating (non-interactive)
interface RatingDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  count?: number;
}

function RatingDisplay({
  value,
  max = 5,
  size = "md",
  showValue = true,
  count,
  className,
  ...props
}: RatingDisplayProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)} {...props}>
      <Rating value={value} max={max} size={size} readonly />
      {showValue && (
        <span className="text-sm">
          <span className="font-medium">{value.toFixed(1)}</span>
          {count !== undefined && (
            <span className="text-muted-foreground"> ({count})</span>
          )}
        </span>
      )}
    </div>
  );
}

export { Rating, RatingDisplay };
