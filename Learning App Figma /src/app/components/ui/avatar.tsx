import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import { User } from "lucide-react";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden shrink-0 bg-muted",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-24 w-24 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  icon?: React.ReactNode;
  status?: "online" | "offline" | "away" | "busy";
  showStatus?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      shape,
      src,
      alt,
      fallback,
      icon,
      status,
      showStatus = false,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const statusColors = {
      online: "bg-success",
      offline: "bg-muted-foreground",
      away: "bg-warning",
      busy: "bg-destructive",
    };

    const statusSize = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-4 w-4",
      "2xl": "h-5 w-5",
    };

    return (
      <div ref={ref} className="relative inline-block">
        <div className={cn(avatarVariants({ size, shape }), className)} {...props}>
          {src && !imageError ? (
            <img
              src={src}
              alt={alt || "Avatar"}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : fallback ? (
            <span className="font-medium select-none">
              {getInitials(fallback)}
            </span>
          ) : icon ? (
            icon
          ) : (
            <User className="h-1/2 w-1/2 text-muted-foreground" />
          )}
        </div>
        
        {showStatus && status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
              statusColors[status],
              statusSize[size || "md"]
            )}
            aria-label={`Statut: ${status}`}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

// Avatar Group pour afficher plusieurs avatars
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  shape?: VariantProps<typeof avatarVariants>["shape"];
}

function AvatarGroup({
  children,
  max = 5,
  size = "md",
  shape = "circle",
  className,
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visibleChildren = max ? childArray.slice(0, max) : childArray;
  const hiddenCount = max && childArray.length > max ? childArray.length - max : 0;

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-background"
          style={{ zIndex: visibleChildren.length - index }}
        >
          {child}
        </div>
      ))}
      {hiddenCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size, shape }),
            "ring-2 ring-background bg-muted font-medium"
          )}
          style={{ zIndex: 0 }}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}

// Avatar avec badge (notification, rôle, etc.)
interface AvatarWithBadgeProps extends AvatarProps {
  badge?: React.ReactNode;
  badgePosition?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
}

function AvatarWithBadge({
  badge,
  badgePosition = "top-right",
  className,
  ...props
}: AvatarWithBadgeProps) {
  const badgePositions = {
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  };

  return (
    <div className="relative inline-block">
      <Avatar className={className} {...props} />
      {badge && (
        <div className={cn("absolute z-10", badgePositions[badgePosition])}>
          {badge}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, AvatarWithBadge, avatarVariants };
