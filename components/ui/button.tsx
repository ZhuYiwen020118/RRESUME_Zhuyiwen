"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-gradient-to-r from-neon-400 to-neon-500 text-white shadow-[0_10px_30px_rgba(13,94,255,0.35)] hover:from-neon-300 hover:to-neon-500",
  secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/15",
  outline:
    "border border-white/20 text-white hover:border-neon-400/80 hover:text-neon-200",
  ghost: "text-white/80 hover:text-white hover:bg-white/5"
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, fullWidth, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

