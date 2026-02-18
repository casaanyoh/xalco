import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

const restockItems = [
  { product: "Backpack Pro", sku: "BP-005", current: 0, reorderPoint: 20, suggested: 50, supplier: "Atlas Bags Co.", status: "Critical" },
  { product: "Yoga Mat", sku: "YM-007", current: 5, reorderPoint: 15, suggested: 40, supplier: "FitGear Supply", status: "Urgent" },
  { product: "Smart Watch", sku: "SW-003", current: 23, reorderPoint: 25, suggested: 50, supplier: "TechParts Inc.", status: "Warning" },
];

const columns = [
  { key: "product", label: "Product", render: (i: typeof restockItems[0]) => <span className="font-medium">{i.product}</span> },
  { key: "sku", label: "SKU", render: (i: typeof restockItems[0]) => <span className="text-muted-foreground font-mono text-xs">{i.sku}</span> },
  { key: "current", label: "Current Stock" },
  { key: "reorderPoint", label: "Reorder Point" },
  { key: "suggested", label: "Suggested Qty", render: (i: typeof restockItems[0]) => <span className="font-semibold text-accent">{i.suggested}</span> },
  { key: "supplier", label: "Supplier" },
  {
    key: "status", label: "Urgency",
    render: (i: typeof restockItems[0]) => (
      <StatusBadge label={i.status} variant={i.status === "Critical" ? "error" : i.status === "Urgent" ? "warning" : "info"} />
    ),
  },
  {
    key: "action", label: "",
    render: () => <Button size="sm" variant="outline" className="gap-1 text-xs"><PackagePlus className="h-3.5 w-3.5" />Restock</Button>,
  },
];

export default function Restock() {
  return (
    <PageShell title="Restock" subtitle="Items that need replenishment">
      <DataTable columns={columns} data={restockItems} searchKey="product" searchPlaceholder="Search items..." />
    </PageShell>
  );
}
