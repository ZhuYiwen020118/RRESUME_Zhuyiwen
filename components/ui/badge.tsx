import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default"
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "outline";
}) {
  const variants = {
    default: "border-white/[0.1] bg-white/[0.05] text-white/70",
    primary: "border-neon-400/30 bg-neon-400/10 text-neon-300",
    secondary: "border-accent-gold/30 bg-accent-gold/10 text-accent-gold",
    outline: "border-white/20 bg-transparent text-white/60 hover:border-white/30"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

