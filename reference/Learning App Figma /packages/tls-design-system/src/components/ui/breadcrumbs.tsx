import * as React from "react";
import { cn } from "./utils";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  maxItems?: number;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, items, separator, showHome = true, maxItems, ...props }, ref) => {
    const [collapsed, setCollapsed] = React.useState(false);

    // Add home item if requested
    const allItems = showHome
      ? [{ label: "Accueil", href: "/", icon: <Home className="h-4 w-4" /> }, ...items]
      : items;

    // Handle max items with collapse
    let displayItems = allItems;
    if (maxItems && allItems.length > maxItems) {
      const firstItems = allItems.slice(0, 1);
      const lastItems = allItems.slice(-2);
      const middleCount = allItems.length - 3;
      
      displayItems = collapsed
        ? allItems
        : [
            ...firstItems,
            { label: `... (${middleCount})`, onClick: () => setCollapsed(true) } as any,
            ...lastItems,
          ];
    }

    const defaultSeparator = separator || <ChevronRight className="h-4 w-4 text-muted-foreground" />;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center gap-2 text-sm", className)}
        {...props}
      >
        <ol className="flex items-center gap-2 flex-wrap">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isCurrent = item.current || isLast;

            return (
              <li key={index} className="flex items-center gap-2">
                {item.href && !isCurrent ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (item as any).onClick ? (
                  <button
                    onClick={(item as any).onClick}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span
                    className={cn(
                      "flex items-center gap-2",
                      isCurrent ? "text-foreground font-medium" : "text-muted-foreground"
                    )}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                )}
                {!isLast && <span aria-hidden="true">{defaultSeparator}</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs, type BreadcrumbItem };
