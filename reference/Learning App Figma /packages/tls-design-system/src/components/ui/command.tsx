import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "./utils";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "./dialog";

interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-background",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Command.displayName = "Command";

const CommandDialog = ({ 
  children, 
  open, 
  onOpenChange 
}: { 
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-[var(--shadow-2xl)] max-w-[640px]">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    onValueChange?: (value: string) => void;
  }
>(({ className, onValueChange, ...props }, ref) => {
  return (
    <div className="flex items-center border-b px-4" cmdk-input-wrapper="">
      <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-[var(--radius-md)] bg-transparent py-3 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={(e) => onValueChange?.(e.target.value)}
        {...props}
      />
    </div>
  );
});
CommandInput.displayName = "CommandInput";

const CommandList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-h-[400px] overflow-y-auto overflow-x-hidden",
      className
    )}
    {...props}
  />
));
CommandList.displayName = "CommandList";

const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("py-8 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

const CommandGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { heading?: string }
>(({ className, heading, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  >
    {heading && (
      <div className="px-2 py-2 text-xs font-medium text-muted-foreground" cmdk-group-heading="">
        {heading}
      </div>
    )}
    <div>{children}</div>
  </div>
));
CommandGroup.displayName = "CommandGroup";

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 h-px bg-border my-1", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

const CommandItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onSelect?: () => void;
    disabled?: boolean;
  }
>(({ className, onSelect, disabled, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm outline-none transition-colors hover:bg-muted aria-selected:bg-muted data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    onClick={onSelect}
    data-disabled={disabled}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

// Search component with keyboard shortcut
export function SearchCommand({
  placeholder = "Rechercher...",
  items = [],
  onSelect,
  trigger,
}: {
  placeholder?: string;
  items: Array<{
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    keywords?: string[];
    onSelect?: () => void;
  }>;
  onSelect?: (item: any) => void;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filteredItems = items.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      item.label.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.keywords?.some((k) => k.toLowerCase().includes(searchLower))
    );
  });

  const handleSelect = (item: any) => {
    item.onSelect?.();
    onSelect?.(item);
    setOpen(false);
    setSearch("");
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] border border-input bg-background px-4 py-2 text-sm hover:bg-muted transition-tls"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{placeholder}</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder={placeholder}
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {filteredItems.length === 0 && (
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          )}
          {filteredItems.length > 0 && (
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                >
                  {item.icon}
                  <div className="flex-1">
                    <div>{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
};
