"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export function Card({
  children,
  className,
  hover = true,
  glow = false
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl glass glass-hover p-6",
        hover && "transition-all duration-400",
        hover && "hover:-translate-y-1",
        glow && "shadow-glow",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight effect on hover */}
      {hover && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(125, 211, 252, 0.12), transparent 40%)`
          }}
        />
      )}

      {/* Border glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-neon-400/20 via-transparent to-neon-400/20" />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}

export function CardHeader({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 space-y-1", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-xl font-semibold text-white", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-white/60", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
}
