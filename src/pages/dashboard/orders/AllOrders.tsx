import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const orders = [
  { id: "#XL-1247", customer: "Sarah Chen", date: "2026-02-18", items: 3, total: "$249.00", channel: "Online", status: "Completed" },
  { id: "#XL-1246", customer: "James Wilson", date: "2026-02-18", items: 1, total: "$89.50", channel: "POS", status: "Processing" },
  { id: "#XL-1245", customer: "Maria Garcia", date: "2026-02-17", items: 4, total: "$432.00", channel: "Online", status: "Shipped" },
  { id: "#XL-1244", customer: "Alex Turner", date: "2026-02-17", items: 2, total: "$67.00", channel: "Online", status: "Completed" },
  { id: "#XL-1243", customer: "Walk-in", date: "2026-02-16", items: 1, total: "$124.50", channel: "POS", status: "Completed" },
  { id: "#XL-1242", customer: "Lisa Park", date: "2026-02-16", items: 6, total: "$518.00", channel: "Online", status: "Processing" },
  { id: "#XL-1241", customer: "Walk-in", date: "2026-02-15", items: 2, total: "$79.98", channel: "POS", status: "Refunded" },
];

const columns = [
  { key: "id", label: "Order ID", render: (o: typeof orders[0]) => <span className="font-mono text-xs font-semibold">{o.id}</span> },
  { key: "customer", label: "Customer", render: (o: typeof orders[0]) => <span className="font-medium">{o.customer}</span> },
  { key: "date", label: "Date" },
  { key: "items", label: "Items" },
  { key: "total", label: "Total", render: (o: typeof orders[0]) => <span className="font-semibold">{o.total}</span> },
  {
    key: "channel", label: "Channel",
    render: (o: typeof orders[0]) => <StatusBadge label={o.channel} variant={o.channel === "Online" ? "info" : "default"} />,
  },
  {
    key: "status", label: "Status",
    render: (o: typeof orders[0]) => (
      <StatusBadge
        label={o.status}
        variant={o.status === "Completed" ? "success" : o.status === "Shipped" ? "info" : o.status === "Processing" ? "warning" : "error"}
      />
    ),
  },
];

export default function AllOrders() {
  return (
    <PageShell title="All Orders" subtitle="Manage all sales orders">
      <DataTable columns={columns} data={orders} searchKey="customer" searchPlaceholder="Search orders..." />
    </PageShell>
  );
}

export function OnlineOrders() {
  const online = orders.filter((o) => o.channel === "Online");
  return (
    <PageShell title="Online Orders" subtitle="Orders from your e-commerce website">
      <DataTable columns={columns} data={online} searchKey="customer" searchPlaceholder="Search online orders..." />
    </PageShell>
  );
}

export function OfflineOrders() {
  const offline = orders.filter((o) => o.channel === "POS");
  return (
    <PageShell title="Offline Orders" subtitle="In-store POS transactions">
      <DataTable columns={columns} data={offline} searchKey="customer" searchPlaceholder="Search offline orders..." />
    </PageShell>
  );
}
