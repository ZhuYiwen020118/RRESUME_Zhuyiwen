import { HighlightMetric } from "@prisma/client";
import { Card } from "@/components/ui/card";

export function HighlightGrid({ metrics }: { metrics: HighlightMetric[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.id} className="bg-gradient-to-br from-white/10 to-white/5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            {metric.label}
          </p>
          <p className="mt-4 font-display text-4xl text-neon-300">{metric.value}</p>
          {metric.description && (
            <p className="mt-3 text-sm text-white/70">{metric.description}</p>
          )}
        </Card>
      ))}
    </div>
  );
}

