import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: ReactNode;
  className?: string;
}

export function KpiCard({ title, value, change, trend = "neutral", icon, className }: KpiCardProps) {
  return (
    <div className={cn("bg-card rounded-lg border border-border p-5 xalco-shadow-sm animate-fade-in", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-success" />}
              {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-destructive" />}
              {trend === "neutral" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </div>
    </div>
  );
}
