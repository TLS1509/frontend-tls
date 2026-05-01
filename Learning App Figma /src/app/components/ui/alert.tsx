import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import { X, Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-[var(--radius-lg)] border p-[var(--space-4)]",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-[var(--border)]",
        info: "",
        success: "",
        warning: "",
        destructive: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & 
    VariantProps<typeof alertVariants> & { 
      dismissible?: boolean; 
      onDismiss?: () => void;
    }
>(({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  // Auto-select icon based on variant
  const Icon = variant === "info" ? Info
    : variant === "success" ? CheckCircle2
    : variant === "warning" ? AlertTriangle
    : variant === "destructive" ? XCircle
    : Info;

  // Colors based on variant using CSS variables
  const variantStyles = {
    default: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
      iconColor: 'var(--muted-foreground)',
    },
    info: {
      background: 'rgba(74, 143, 161, 0.08)',      // info 400 à 8%
      color: 'var(--info)',
      border: '1px solid rgba(74, 143, 161, 0.2)', // info 400 à 20%
      iconColor: 'var(--info)',
    },
    success: {
      background: 'var(--success-50)',
      color: 'var(--success-600)',
      border: '1px solid var(--success-200)',
      iconColor: 'var(--success-600)',
    },
    warning: {
      background: 'rgba(248, 176, 68, 0.08)',      // warning 400 à 8%
      color: 'var(--warning)',
      border: '1px solid rgba(248, 176, 68, 0.2)', // warning 400 à 20%
      iconColor: 'var(--warning)',
    },
    destructive: {
      background: 'rgba(241, 138, 76, 0.08)',      // destructive 400 à 8%
      color: 'var(--destructive)',
      border: '1px solid rgba(241, 138, 76, 0.2)', // destructive 400 à 20%
      iconColor: 'var(--destructive)',
    },
  };

  const styles = variantStyles[variant || 'default'];

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      style={{
        background: styles.background,
        color: styles.color,
        border: styles.border,
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'flex-start',
        fontFamily: 'var(--font-body)',
      }}
      {...props}
    >
      {/* Icon alignée avec padding top */}
      <div style={{ flexShrink: 0, paddingTop: '1px' }}>
        <Icon 
          className="h-5 w-5" 
          style={{ 
            color: styles.iconColor,
            display: 'block',
          }} 
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {children}
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          style={{
            flexShrink: 0,
            padding: 'var(--space-1)',
            borderRadius: 'var(--radius-sm)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background var(--duration-base) ease',
            color: styles.iconColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, style, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("leading-none tracking-tight", className)}
    style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--font-weight-semibold)',
      marginBottom: 'var(--space-1)',
      ...style,
    }}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("[&_p]:leading-relaxed", className)}
    style={{
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-relaxed)',
      opacity: 0.9,
      ...style,
    }}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
