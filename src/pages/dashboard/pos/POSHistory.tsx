import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const history = [
  { id: "POS-1247", date: "2026-02-18 14:32", customer: "Walk-in", items: 3, total: "$124.50", payment: "Card", status: "Completed" },
  { id: "POS-1246", date: "2026-02-18 13:15", customer: "James Wilson", items: 1, total: "$89.50", payment: "Cash", status: "Completed" },
  { id: "POS-1245", date: "2026-02-18 11:48", customer: "Walk-in", items: 5, total: "$267.00", payment: "Mobile", status: "Completed" },
  { id: "POS-1244", date: "2026-02-17 16:22", customer: "Sarah Chen", items: 2, total: "$149.98", payment: "Card", status: "Refunded" },
  { id: "POS-1243", date: "2026-02-17 14:05", customer: "Walk-in", items: 1, total: "$49.99", payment: "Cash", status: "Completed" },
  { id: "POS-1242", date: "2026-02-17 10:30", customer: "Alex Turner", items: 4, total: "$312.00", payment: "Card", status: "Completed" },
];

const columns = [
  { key: "id", label: "Sale ID", render: (h: typeof history[0]) => <span className="font-mono text-xs font-semibold">{h.id}</span> },
  { key: "date", label: "Date & Time" },
  { key: "customer", label: "Customer", render: (h: typeof history[0]) => <span className="font-medium">{h.customer}</span> },
  { key: "items", label: "Items" },
  { key: "total", label: "Total", render: (h: typeof history[0]) => <span className="font-semibold">{h.total}</span> },
  { key: "payment", label: "Payment" },
  {
    key: "status", label: "Status",
    render: (h: typeof history[0]) => <StatusBadge label={h.status} variant={h.status === "Completed" ? "success" : "warning"} />,
  },
];

export default function POSHistory() {
  return (
    <PageShell title="POS History" subtitle="Review past point-of-sale transactions">
      <DataTable columns={columns} data={history} searchKey="customer" searchPlaceholder="Search by customer..." />
    </PageShell>
  );
}
