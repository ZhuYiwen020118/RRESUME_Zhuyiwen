import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date?: Date | string | null, fallback = "至今") {
  if (!date) return fallback;
  const parsed = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(parsed.valueOf())) return fallback;
  return parsed.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short"
  });
}

export function parseTags(input?: string | null) {
  if (!input) return [];
  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

