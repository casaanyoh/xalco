import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { AlertTriangle } from "lucide-react";

const alerts = [
  { product: "Backpack Pro", sku: "BP-005", current: 0, threshold: 20, lastRestocked: "2025-12-15", severity: "Critical" },
  { product: "Yoga Mat", sku: "YM-007", current: 5, threshold: 15, lastRestocked: "2026-01-08", severity: "High" },
  { product: "Smart Watch", sku: "SW-003", current: 23, threshold: 25, lastRestocked: "2026-01-20", severity: "Medium" },
  { product: "Phone Case", sku: "PC-012", current: 8, threshold: 10, lastRestocked: "2026-02-01", severity: "Low" },
];

const columns = [
  {
    key: "product", label: "Product",
    render: (a: typeof alerts[0]) => (
      <div className="flex items-center gap-2">
        {a.severity === "Critical" && <AlertTriangle className="h-4 w-4 text-destructive" />}
        <span className="font-medium">{a.product}</span>
      </div>
    ),
  },
  { key: "sku", label: "SKU", render: (a: typeof alerts[0]) => <span className="text-muted-foreground font-mono text-xs">{a.sku}</span> },
  { key: "current", label: "Current" },
  { key: "threshold", label: "Threshold" },
  { key: "lastRestocked", label: "Last Restocked" },
  {
    key: "severity", label: "Severity",
    render: (a: typeof alerts[0]) => (
      <StatusBadge label={a.severity} variant={a.severity === "Critical" ? "error" : a.severity === "High" ? "warning" : a.severity === "Medium" ? "info" : "default"} />
    ),
  },
];

export default function LowStockAlerts() {
  return (
    <PageShell title="Low Stock Alerts" subtitle="Products below their reorder thresholds">
      <DataTable columns={columns} data={alerts} searchKey="product" searchPlaceholder="Search alerts..." />
    </PageShell>
  );
}
