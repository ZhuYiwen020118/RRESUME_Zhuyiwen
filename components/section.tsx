import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-6xl px-6 py-16", className)}>
      <div className="mb-10 max-w-3xl">
        {eyebrow && (
          <p className="text-sm uppercase tracking-[0.25em] text-neon-300/70">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 text-base text-white/70">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

