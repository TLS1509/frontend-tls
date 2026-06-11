import * as React from "react";
import { cn } from "./utils";

interface RangeSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
  showTooltip?: boolean;
  showValues?: boolean;
  formatValue?: (value: number) => string;
  minDistance?: number; // Minimum distance between thumbs
}

const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      className,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = [min, max],
      onChange,
      disabled = false,
      showTooltip = true,
      showValues = true,
      formatValue = (val) => val.toString(),
      minDistance = 0,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<[number, number]>(
      value || defaultValue
    );
    const [activeThumb, setActiveThumb] = React.useState<"min" | "max" | null>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const currentValue = value || internalValue;
    const [minValue, maxValue] = currentValue;

    // Calculate percentage positions
    const minPercent = ((minValue - min) / (max - min)) * 100;
    const maxPercent = ((maxValue - min) / (max - min)) * 100;

    const updateValue = React.useCallback(
      (newValue: [number, number]) => {
        const [newMin, newMax] = newValue;
        
        // Ensure values are within bounds
        const clampedMin = Math.max(min, Math.min(max, newMin));
        const clampedMax = Math.max(min, Math.min(max, newMax));
        
        // Ensure min distance
        let finalMin = clampedMin;
        let finalMax = clampedMax;
        
        if (finalMax - finalMin < minDistance) {
          if (activeThumb === "min") {
            finalMin = Math.max(min, finalMax - minDistance);
          } else {
            finalMax = Math.min(max, finalMin + minDistance);
          }
        }

        const finalValue: [number, number] = [
          Math.round(finalMin / step) * step,
          Math.round(finalMax / step) * step,
        ];

        setInternalValue(finalValue);
        onChange?.(finalValue);
      },
      [min, max, step, minDistance, onChange, activeThumb]
    );

    const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setActiveThumb(thumb);
    };

    React.useEffect(() => {
      if (activeThumb === null) return;

      const handleMouseMove = (e: MouseEvent) => {
        if (!trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const newValue = min + (percent / 100) * (max - min);

        if (activeThumb === "min") {
          updateValue([newValue, maxValue]);
        } else {
          updateValue([minValue, newValue]);
        }
      };

      const handleMouseUp = () => {
        setActiveThumb(null);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [activeThumb, minValue, maxValue, min, max, updateValue]);

    // Keyboard navigation
    const handleKeyDown = (thumb: "min" | "max") => (e: React.KeyboardEvent) => {
      if (disabled) return;

      let newValue: [number, number] = [minValue, maxValue];

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          if (thumb === "min") {
            newValue = [Math.min(minValue + step, maxValue - minDistance), maxValue];
          } else {
            newValue = [minValue, Math.min(maxValue + step, max)];
          }
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          if (thumb === "min") {
            newValue = [Math.max(minValue - step, min), maxValue];
          } else {
            newValue = [minValue, Math.max(maxValue - step, minValue + minDistance)];
          }
          break;
        case "Home":
          e.preventDefault();
          if (thumb === "min") {
            newValue = [min, maxValue];
          } else {
            newValue = [minValue, max];
          }
          break;
        case "End":
          e.preventDefault();
          if (thumb === "min") {
            newValue = [maxValue - minDistance, maxValue];
          } else {
            newValue = [minValue, max];
          }
          break;
      }

      updateValue(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full", disabled && "opacity-50", className)}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-2 w-full rounded-full bg-muted cursor-pointer"
          onClick={(e) => {
            if (disabled) return;
            const rect = trackRef.current!.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            const clickValue = min + (percent / 100) * (max - min);
            
            // Move the closest thumb
            const distToMin = Math.abs(clickValue - minValue);
            const distToMax = Math.abs(clickValue - maxValue);
            
            if (distToMin < distToMax) {
              updateValue([clickValue, maxValue]);
            } else {
              updateValue([minValue, clickValue]);
            }
          }}
        >
          {/* Active range */}
          <div
            className="absolute h-full rounded-full bg-primary transition-all"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "h-5 w-5 rounded-full border-2 border-primary bg-background shadow-[var(--shadow-md)]",
              "transition-transform hover:scale-110 focus:scale-110",
              activeThumb === "min" && "scale-110 ring-4 ring-primary/20",
              !disabled && "cursor-grab active:cursor-grabbing"
            )}
            style={{ left: `${minPercent}%` }}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={minValue}
            aria-label="Minimum value"
            tabIndex={disabled ? -1 : 0}
            onMouseDown={handleMouseDown("min")}
            onKeyDown={handleKeyDown("min")}
          >
            {/* Tooltip for min thumb */}
            {showTooltip && activeThumb === "min" && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200">
                {formatValue(minValue)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-popover" />
              </div>
            )}
          </div>

          {/* Max thumb */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "h-5 w-5 rounded-full border-2 border-primary bg-background shadow-[var(--shadow-md)]",
              "transition-transform hover:scale-110 focus:scale-110",
              activeThumb === "max" && "scale-110 ring-4 ring-primary/20",
              !disabled && "cursor-grab active:cursor-grabbing"
            )}
            style={{ left: `${maxPercent}%` }}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={maxValue}
            aria-label="Maximum value"
            tabIndex={disabled ? -1 : 0}
            onMouseDown={handleMouseDown("max")}
            onKeyDown={handleKeyDown("max")}
          >
            {/* Tooltip for max thumb */}
            {showTooltip && activeThumb === "max" && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-200">
                {formatValue(maxValue)}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-popover" />
              </div>
            )}
          </div>
        </div>

        {/* Values display */}
        {showValues && (
          <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
            <span className="font-medium">{formatValue(minValue)}</span>
            <span className="text-xs">—</span>
            <span className="font-medium">{formatValue(maxValue)}</span>
          </div>
        )}
      </div>
    );
  }
);
RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
