import { PageShell } from "@/components/dashboard/PageShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Package, DollarSign, TrendingDown, RotateCcw } from "lucide-react";

const inventoryMetrics = [
  { product: "Wireless Earbuds", value: "$7,098", turnover: 2.4, daysOfSupply: 42, status: "Healthy" },
  { product: "Smart Watch", value: "$4,599", turnover: 1.8, daysOfSupply: 12, status: "Low" },
  { product: "Leather Wallet", value: "$2,549", turnover: 3.1, daysOfSupply: 58, status: "Healthy" },
  { product: "Backpack Pro", value: "$0", turnover: 0, daysOfSupply: 0, status: "Out of Stock" },
  { product: "Running Shoes", value: "$6,029", turnover: 2.2, daysOfSupply: 35, status: "Healthy" },
];

const columns = [
  { key: "product", label: "Product", render: (i: typeof inventoryMetrics[0]) => <span className="font-medium">{i.product}</span> },
  { key: "value", label: "Stock Value", render: (i: typeof inventoryMetrics[0]) => <span className="font-semibold">{i.value}</span> },
  { key: "turnover", label: "Turnover Rate" },
  { key: "daysOfSupply", label: "Days of Supply" },
  {
    key: "status", label: "Status",
    render: (i: typeof inventoryMetrics[0]) => <StatusBadge label={i.status} variant={i.status === "Healthy" ? "success" : i.status === "Low" ? "warning" : "error"} />,
  },
];

export default function InventoryReport() {
  return (
    <PageShell title="Inventory Report" subtitle="Stock valuation and turnover analysis">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Stock Value" value="$28,450" change="+4.2% vs last month" trend="up" icon={<DollarSign className="h-5 w-5" />} />
        <KpiCard title="Total SKUs" value="94" change="8 new this month" trend="up" icon={<Package className="h-5 w-5" />} />
        <KpiCard title="Avg Turnover" value="2.3x" change="Monthly rate" trend="up" icon={<RotateCcw className="h-5 w-5" />} />
        <KpiCard title="Dead Stock" value="$1,200" change="3 items" trend="down" icon={<TrendingDown className="h-5 w-5" />} />
      </div>
      <DataTable columns={columns} data={inventoryMetrics} searchKey="product" searchPlaceholder="Search products..." />
    </PageShell>
  );
}
