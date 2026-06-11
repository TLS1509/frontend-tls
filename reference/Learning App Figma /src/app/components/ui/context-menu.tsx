import * as React from "react";
import { cn } from "./utils";

interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ContextMenuItem[];
  onItemClick?: (itemId: string) => void;
}

const ContextMenu = React.forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ className, items, onItemClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "min-w-[220px] rounded-[var(--radius-lg)] border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-lg)] animate-in fade-in-0 zoom-in-95 duration-200",
          className
        )}
        role="menu"
        {...props}
      >
        {items.map((item, index) => {
          if (item.separator) {
            return (
              <div
                key={item.id || `separator-${index}`}
                className="my-1 h-px bg-border"
                role="separator"
              />
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick?.();
                  onItemClick?.(item.id);
                }
              }}
              disabled={item.disabled}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm outline-none transition-colors",
                !item.disabled && "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                item.disabled && "pointer-events-none opacity-50",
                item.danger && !item.disabled && "text-destructive hover:text-destructive focus:text-destructive"
              )}
              role="menuitem"
            >
              {/* Icon */}
              {item.icon && (
                <span className="flex h-5 w-5 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
                  {item.icon}
                </span>
              )}

              {/* Label */}
              <span className="flex-1 text-left font-medium">{item.label}</span>

              {/* Shortcut */}
              {item.shortcut && (
                <span className="ml-auto text-xs text-muted-foreground font-normal">
                  {item.shortcut}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
ContextMenu.displayName = "ContextMenu";

// Context Menu Trigger - wrapper that handles right-click
interface ContextMenuTriggerProps {
  children: React.ReactNode;
  items: ContextMenuItem[];
  onItemClick?: (itemId: string) => void;
  disabled?: boolean;
}

function ContextMenuTrigger({
  children,
  items,
  onItemClick,
  disabled = false,
}: ContextMenuTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", handleScroll, true);
      document.addEventListener("contextmenu", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("contextmenu", handleClickOutside);
    };
  }, [isOpen]);

  const handleContextMenu = (event: React.MouseEvent) => {
    if (disabled) return;

    event.preventDefault();
    event.stopPropagation();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const menuWidth = 220; // min-width from ContextMenu
    const menuHeight = Math.min(items.length * 40, 400); // approximate height

    let x = event.clientX;
    let y = event.clientY;

    // Adjust position if menu would go off-screen
    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 10;
    }
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight - 10;
    }

    setPosition({ x, y });
    setIsOpen(true);
  };

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId);
    setIsOpen(false);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu} className="inline-block">
        {children}
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 50,
          }}
        >
          <ContextMenu items={items} onItemClick={handleItemClick} />
        </div>
      )}
    </>
  );
}

export { ContextMenu, ContextMenuTrigger, type ContextMenuItem };
