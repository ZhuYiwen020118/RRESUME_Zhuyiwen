import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormCard({
  title,
  description,
  aside,
  children,
  className
}: {
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-3xl border border-white/10 bg-ink-950/60 p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {description && <p className="text-sm text-white/60">{description}</p>}
        </div>
        {aside}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

