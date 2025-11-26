import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5/50 bg-gradient-to-br from-white/5 via-white/2 to-transparent p-6 backdrop-blur-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

