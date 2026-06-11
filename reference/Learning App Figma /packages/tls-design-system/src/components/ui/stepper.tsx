import * as React from "react";
import { cn } from "./utils";
import { Check } from "lucide-react";

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "simple" | "circles";
  onStepClick?: (stepIndex: number) => void;
  allowStepClick?: boolean;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      currentStep,
      orientation = "horizontal",
      variant = "default",
      onStepClick,
      allowStepClick = false,
      ...props
    },
    ref
  ) => {
    const getStepStatus = (index: number): "complete" | "current" | "upcoming" => {
      if (index < currentStep) return "complete";
      if (index === currentStep) return "current";
      return "upcoming";
    };

    const isClickable = (index: number) => {
      return allowStepClick && index <= currentStep;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          orientation === "vertical" && "space-y-4",
          className
        )}
        aria-label="Progression"
        {...props}
      >
        <ol
          className={cn(
            "flex",
            orientation === "horizontal" ? "items-center" : "flex-col"
          )}
        >
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const clickable = isClickable(index);

            return (
              <li
                key={step.id}
                className={cn(
                  "relative flex items-center",
                  orientation === "horizontal" && index !== steps.length - 1 && "flex-1"
                )}
              >
                {/* Step button with icon and label */}
                <button
                  type="button"
                  onClick={() => clickable && onStepClick?.(index)}
                  disabled={!clickable}
                  className={cn(
                    "flex flex-col items-center gap-3 relative z-10",
                    clickable && "cursor-pointer hover:opacity-80 transition-opacity",
                    !clickable && "cursor-default"
                  )}
                >
                  {/* Icon/Number circle */}
                  <div className="relative flex items-center justify-center">
                    {variant === "circles" ? (
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                          status === "complete" && "border-primary bg-primary text-primary-foreground",
                          status === "current" && "border-primary bg-background text-primary ring-4 ring-primary/20",
                          status === "upcoming" && "border-border bg-background text-muted-foreground"
                        )}
                      >
                        {status === "complete" ? (
                          <Check className="h-5 w-5" />
                        ) : step.icon ? (
                          <div className="h-5 w-5 flex items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
                            {step.icon}
                          </div>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-lg)] border-2 transition-all",
                          status === "complete" && "border-primary bg-primary text-primary-foreground",
                          status === "current" && "border-primary bg-primary/10 text-primary ring-4 ring-primary/20",
                          status === "upcoming" && "border-border bg-muted text-muted-foreground"
                        )}
                      >
                        {status === "complete" ? (
                          <Check className="h-6 w-6" />
                        ) : step.icon ? (
                          <div className="h-6 w-6 flex items-center justify-center [&>svg]:h-6 [&>svg]:w-6">
                            {step.icon}
                          </div>
                        ) : (
                          <span className="font-medium">{index + 1}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Step content - label and description */}
                  {variant !== "simple" && (
                    <div className="flex flex-col items-center text-center max-w-[140px]">
                      <div className="flex items-center gap-2 flex-wrap justify-center">
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors",
                            status === "complete" && "text-foreground",
                            status === "current" && "text-primary",
                            status === "upcoming" && "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </span>
                        {step.optional && (
                          <span className="text-xs text-muted-foreground">(optionnel)</span>
                        )}
                      </div>
                      {step.description && (
                        <span className="text-xs text-muted-foreground mt-1">
                          {step.description}
                        </span>
                      )}
                    </div>
                  )}
                </button>

                {/* Connector line - perfectly aligned with icons */}
                {index !== steps.length - 1 && orientation === "horizontal" && (
                  <div className="flex-1 flex items-center px-4">
                    <div
                      className={cn(
                        "h-0.5 w-full transition-colors",
                        index < currentStep ? "bg-primary" : "bg-muted"
                      )}
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Vertical connector */}
                {index !== steps.length - 1 && orientation === "vertical" && (
                  <div
                    className={cn(
                      "absolute left-6 top-12 bottom-0 w-0.5 transition-colors",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

// Step navigation buttons
interface StepperNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  nextLabel?: string;
  previousLabel?: string;
  completeLabel?: string;
  disableNext?: boolean;
}

function StepperNavigation({
  className,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onComplete,
  nextLabel = "Suivant",
  previousLabel = "Précédent",
  completeLabel = "Terminer",
  disableNext = false,
  ...props
}: StepperNavigationProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return (
    <div
      className={cn("flex items-center justify-between gap-4", className)}
      {...props}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        className={cn(
          "px-4 py-2 rounded-[var(--radius-lg)] border transition-colors font-medium",
          isFirst
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-muted cursor-pointer"
        )}
      >
        {previousLabel}
      </button>

      <div className="text-sm text-muted-foreground font-medium">
        Étape {currentStep + 1} sur {totalSteps}
      </div>

      {isLast ? (
        <button
          type="button"
          onClick={onComplete}
          disabled={disableNext}
          className={cn(
            "px-4 py-2 rounded-[var(--radius-lg)] bg-primary text-primary-foreground transition-colors font-medium",
            disableNext ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-hover cursor-pointer"
          )}
        >
          {completeLabel}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          className={cn(
            "px-4 py-2 rounded-[var(--radius-lg)] bg-primary text-primary-foreground transition-colors font-medium",
            disableNext ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-hover cursor-pointer"
          )}
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}

export { Stepper, StepperNavigation };
