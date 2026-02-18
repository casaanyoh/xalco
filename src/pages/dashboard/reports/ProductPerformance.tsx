import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const products = [
  { name: "Wireless Earbuds", unitsSold: 342, revenue: 17093, margin: "35%", trend: "Rising" },
  { name: "Smart Watch", unitsSold: 198, revenue: 39598, margin: "42%", trend: "Rising" },
  { name: "Leather Wallet", unitsSold: 285, revenue: 8545, margin: "55%", trend: "Stable" },
  { name: "Running Shoes", unitsSold: 176, revenue: 15838, margin: "38%", trend: "Declining" },
  { name: "Bluetooth Speaker", unitsSold: 148, revenue: 11839, margin: "40%", trend: "Stable" },
  { name: "Backpack Pro", unitsSold: 154, revenue: 10776, margin: "45%", trend: "Rising" },
];

const chartData = products.map((p) => ({ name: p.name.split(" ")[0], revenue: p.revenue }));

const columns = [
  { key: "name", label: "Product", render: (p: typeof products[0]) => <span className="font-medium">{p.name}</span> },
  { key: "unitsSold", label: "Units Sold", render: (p: typeof products[0]) => <span className="font-semibold">{p.unitsSold}</span> },
  { key: "revenue", label: "Revenue", render: (p: typeof products[0]) => <span className="font-semibold">${p.revenue.toLocaleString()}</span> },
  { key: "margin", label: "Margin" },
  {
    key: "trend", label: "Trend",
    render: (p: typeof products[0]) => <StatusBadge label={p.trend} variant={p.trend === "Rising" ? "success" : p.trend === "Stable" ? "info" : "warning"} />,
  },
];

export default function ProductPerformance() {
  return (
    <PageShell title="Product Performance" subtitle="Analyze product sales and margins">
      <div className="bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Product</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
            <Bar dataKey="revenue" fill="hsl(172, 66%, 40%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <DataTable columns={columns} data={products} searchKey="name" searchPlaceholder="Search products..." />
    </PageShell>
  );
}
