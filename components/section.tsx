"use client";

import { ReactNode, useRef, useEffect, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn("relative mx-auto max-w-5xl px-6 py-12", className)}
    >
      {/* Section Header */}
      <div
        className={cn(
          "relative mb-8 transition-all duration-500",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        <div className="flex items-baseline gap-3">
          {eyebrow && (
            <span className="text-xs font-medium uppercase tracking-wider text-white/30">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>
        </div>
        {description && (
          <p className="mt-2 text-sm text-white/50">{description}</p>
        )}
      </div>

      {/* Section Content */}
      <div
        className={cn(
          "relative transition-all duration-500 delay-100",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}
      >
        {children}
      </div>
    </section>
  );
}
