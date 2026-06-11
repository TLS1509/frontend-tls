import * as React from "react";
import { useState } from "react";
import { cn } from "./utils";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: "single" | "range";
  rangeValue?: { from?: Date; to?: Date };
  onRangeChange?: (range: { from?: Date; to?: Date }) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  disabledDates?: Date[];
  locale?: string;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      value,
      onChange,
      mode = "single",
      rangeValue,
      onRangeChange,
      minDate,
      maxDate,
      disabled = false,
      disabledDates = [],
      locale = "fr-FR",
      ...props
    },
    ref
  ) => {
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const [rangeSelection, setRangeSelection] = useState(rangeValue || {});

    const daysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some((d) => isSameDay(d, date));
    };

    const isInRange = (date: Date) => {
      if (mode !== "range" || !rangeSelection.from || !rangeSelection.to) return false;
      return date >= rangeSelection.from && date <= rangeSelection.to;
    };

    const isRangeStart = (date: Date) => {
      return mode === "range" && rangeSelection.from && isSameDay(date, rangeSelection.from);
    };

    const isRangeEnd = (date: Date) => {
      return mode === "range" && rangeSelection.to && isSameDay(date, rangeSelection.to);
    };

    const handlePreviousMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
      );
    };

    const handleNextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
      );
    };

    const handleDateClick = (date: Date) => {
      if (disabled || isDateDisabled(date)) return;

      if (mode === "single") {
        onChange?.(date);
      } else {
        // Range mode
        if (!rangeSelection.from || (rangeSelection.from && rangeSelection.to)) {
          // Start new range
          const newRange = { from: date, to: undefined };
          setRangeSelection(newRange);
          onRangeChange?.(newRange);
        } else {
          // Complete range
          const newRange =
            date < rangeSelection.from
              ? { from: date, to: rangeSelection.from }
              : { from: rangeSelection.from, to: date };
          setRangeSelection(newRange);
          onRangeChange?.(newRange);
        }
      }
    };

    const renderDays = () => {
      const days = [];
      const totalDays = daysInMonth(currentMonth);
      const firstDay = firstDayOfMonth(currentMonth);

      // Empty cells for days before month start
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="p-2" />);
      }

      // Days of the month
      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        );
        const isSelected = value && isSameDay(date, value);
        const isDisabled = isDateDisabled(date);
        const isToday = isSameDay(date, new Date());
        const inRange = isInRange(date);
        const rangeStart = isRangeStart(date);
        const rangeEnd = isRangeEnd(date);

        days.push(
          <button
            key={day}
            type="button"
            onClick={() => handleDateClick(date)}
            disabled={isDisabled}
            className={cn(
              "relative p-2 text-sm rounded-[var(--radius-md)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
              isSelected && "bg-primary text-white font-medium",
              !isSelected && !isDisabled && "hover:bg-muted",
              isDisabled && "opacity-50 cursor-not-allowed",
              isToday && !isSelected && "border border-primary",
              inRange && !rangeStart && !rangeEnd && "bg-primary/10",
              rangeStart && "bg-primary text-white rounded-r-none",
              rangeEnd && "bg-primary text-white rounded-l-none"
            )}
          >
            {day}
          </button>
        );
      }

      return days;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-block rounded-[var(--radius-lg)] border bg-background p-4",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handlePreviousMonth}
            disabled={disabled}
            aria-label="Mois précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="font-medium">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleNextMonth}
            disabled={disabled}
            aria-label="Mois suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((name) => (
            <div
              key={name}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {name}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">{renderDays()}</div>

        {/* Range selection info */}
        {mode === "range" && (rangeSelection.from || rangeSelection.to) && (
          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
            {rangeSelection.from && (
              <div>
                Du: {rangeSelection.from.toLocaleDateString(locale)}
              </div>
            )}
            {rangeSelection.to && (
              <div>
                Au: {rangeSelection.to.toLocaleDateString(locale)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
Calendar.displayName = "Calendar";

// Date Picker component (Calendar with input)
interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
}

function DatePicker({
  value,
  onChange,
  placeholder = "Sélectionner une date",
  disabled = false,
  clearable = true,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    onChange?.(undefined);
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <Button
        type="button"
        variant="outline"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className="w-full justify-between"
      >
        <span className={cn(!selectedDate && "text-muted-foreground")}>
          {selectedDate ? selectedDate.toLocaleDateString("fr-FR") : placeholder}
        </span>
        {clearable && selectedDate && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            className="ml-2"
          >
            ×
          </button>
        )}
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 animate-in fade-in-0 zoom-in-95">
          <Calendar value={selectedDate} onChange={handleDateChange} />
        </div>
      )}
    </div>
  );
}

export { Calendar, DatePicker };
