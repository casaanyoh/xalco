import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
  info: "bg-info/10 text-info",
  default: "bg-secondary text-secondary-foreground",
};

interface StatusBadgeProps {
  label: string;
  variant?: keyof typeof variants;
}

export function StatusBadge({ label, variant = "default" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full whitespace-nowrap",
        variants[variant] || variants.default
      )}
    >
      {label}
    </span>
  );
}
