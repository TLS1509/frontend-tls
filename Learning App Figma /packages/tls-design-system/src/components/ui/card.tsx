import * as React from "react";

import { cn } from "./utils";

function Card({ className, style, ...props }: React.ComponentProps<"div">) {
  const defaultGlassStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset',
    transition: 'all var(--duration-normal) var(--ease-smooth)',
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%)';
    e.currentTarget.style.boxShadow = '0 16px 64px 0 rgba(0, 0, 0, 0.15), 0 1px 0 0 rgba(255, 255, 255, 1) inset';
    e.currentTarget.style.backdropFilter = 'blur(30px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)';
    e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset';
    e.currentTarget.style.backdropFilter = 'blur(20px)';
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
  };

  return (
    <div
      data-slot="card"
      className={cn(
        "text-card-foreground flex flex-col gap-6 rounded-[var(--radius-xl)]",
        className,
      )}
      style={defaultGlassStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        className,
      )}
      style={{
        gap: 'var(--card-gap-sm)',
        paddingLeft: 'var(--card-padding-x)',
        paddingRight: 'var(--card-padding-x)',
        paddingTop: 'var(--card-padding-y)',
      }}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("[&:last-child]:pb-[var(--card-padding-y)]", className)}
      style={{
        paddingLeft: 'var(--card-padding-x)',
        paddingRight: 'var(--card-padding-x)',
      }}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center", className)}
      style={{
        paddingLeft: 'var(--card-padding-x)',
        paddingRight: 'var(--card-padding-x)',
        paddingBottom: 'var(--card-padding-y)',
      }}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
