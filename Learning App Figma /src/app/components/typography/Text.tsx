import { cn } from "../ui/utils";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "muted" | "small" | "large" | "lead";
  as?: "p" | "span" | "div";
  children: React.ReactNode;
}

export function Text({ 
  variant = "default",
  as = "p",
  className, 
  children, 
  ...props 
}: TextProps) {
  const Tag = as;

  const variantClasses = {
    default: "",
    muted: "text-muted-foreground",
    small: "text-[var(--text-sm)] text-muted-foreground",
    large: "text-[var(--text-lg)]",
    lead: "text-[var(--text-xl)] text-muted-foreground",
  };

  return (
    <Tag
      className={cn(
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
