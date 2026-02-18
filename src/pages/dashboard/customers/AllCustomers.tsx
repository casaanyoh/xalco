import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const customers = [
  { id: "CUS-001", name: "Sarah Chen", email: "sarah@example.com", phone: "+1 555-0101", orders: 12, totalSpent: "$2,480.00", joined: "2025-08-14" },
  { id: "CUS-002", name: "James Wilson", email: "james@example.com", phone: "+1 555-0102", orders: 8, totalSpent: "$1,320.00", joined: "2025-09-22" },
  { id: "CUS-003", name: "Maria Garcia", email: "maria@example.com", phone: "+1 555-0103", orders: 15, totalSpent: "$3,750.00", joined: "2025-07-03" },
  { id: "CUS-004", name: "Alex Turner", email: "alex@example.com", phone: "+1 555-0104", orders: 5, totalSpent: "$890.00", joined: "2025-11-18" },
  { id: "CUS-005", name: "Lisa Park", email: "lisa@example.com", phone: "+1 555-0105", orders: 21, totalSpent: "$5,120.00", joined: "2025-06-01" },
];

const columns = [
  { key: "id", label: "ID", render: (c: typeof customers[0]) => <span className="font-mono text-xs">{c.id}</span> },
  { key: "name", label: "Name", render: (c: typeof customers[0]) => <span className="font-medium">{c.name}</span> },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "orders", label: "Orders", render: (c: typeof customers[0]) => <span className="font-semibold">{c.orders}</span> },
  { key: "totalSpent", label: "Total Spent", render: (c: typeof customers[0]) => <span className="font-semibold">{c.totalSpent}</span> },
  { key: "joined", label: "Joined" },
];

export default function AllCustomers() {
  return (
    <PageShell
      title="All Customers"
      subtitle="Manage your customer database"
      actions={<><div /><Link to="/dashboard/customers/add"><Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Plus className="h-4 w-4" /> Add Customer</Button></Link></>}
    >
      <DataTable columns={columns} data={customers} searchKey="name" searchPlaceholder="Search customers..." />
    </PageShell>
  );
}
