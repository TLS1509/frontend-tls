import { cn } from "../ui/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  gradient?: boolean;
  children: React.ReactNode;
}

export function Heading({ 
  level = 2,
  as,
  gradient = false,
  className, 
  children, 
  ...props 
}: HeadingProps) {
  const Tag = as || `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cn(
        gradient && "bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
