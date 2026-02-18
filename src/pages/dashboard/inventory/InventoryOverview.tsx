import { PageShell } from "@/components/dashboard/PageShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Package, AlertTriangle, TrendingDown, Warehouse } from "lucide-react";

const inventoryItems = [
  { product: "Wireless Earbuds", sku: "WEB-001", inStock: 142, reserved: 8, available: 134, status: "In Stock" },
  { product: "Leather Wallet", sku: "LW-002", inStock: 85, reserved: 3, available: 82, status: "In Stock" },
  { product: "Smart Watch", sku: "SW-003", inStock: 23, reserved: 5, available: 18, status: "Low Stock" },
  { product: "Running Shoes", sku: "RS-004", inStock: 67, reserved: 2, available: 65, status: "In Stock" },
  { product: "Backpack Pro", sku: "BP-005", inStock: 0, reserved: 0, available: 0, status: "Out of Stock" },
  { product: "Yoga Mat", sku: "YM-007", inStock: 5, reserved: 1, available: 4, status: "Low Stock" },
];

const columns = [
  { key: "product", label: "Product", render: (i: typeof inventoryItems[0]) => <span className="font-medium">{i.product}</span> },
  { key: "sku", label: "SKU", render: (i: typeof inventoryItems[0]) => <span className="text-muted-foreground font-mono text-xs">{i.sku}</span> },
  { key: "inStock", label: "In Stock" },
  { key: "reserved", label: "Reserved" },
  { key: "available", label: "Available", render: (i: typeof inventoryItems[0]) => <span className="font-semibold">{i.available}</span> },
  {
    key: "status", label: "Status",
    render: (i: typeof inventoryItems[0]) => (
      <StatusBadge label={i.status} variant={i.status === "In Stock" ? "success" : i.status === "Low Stock" ? "warning" : "error"} />
    ),
  },
];

export default function InventoryOverview() {
  return (
    <PageShell title="Inventory Overview" subtitle="Monitor stock levels across your catalog">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Items" value="1,247" change="94 products" trend="up" icon={<Package className="h-5 w-5" />} />
        <KpiCard title="In Stock" value="1,108" change="88.9%" trend="up" icon={<Warehouse className="h-5 w-5" />} />
        <KpiCard title="Low Stock" value="12" change="Needs attention" trend="down" icon={<TrendingDown className="h-5 w-5" />} />
        <KpiCard title="Out of Stock" value="3" change="Critical" trend="down" icon={<AlertTriangle className="h-5 w-5" />} />
      </div>
      <DataTable columns={columns} data={inventoryItems} searchKey="product" searchPlaceholder="Search inventory..." />
    </PageShell>
  );
}
