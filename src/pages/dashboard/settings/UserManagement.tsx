import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const users = [
  { name: "Admin User", email: "admin@xalco.com", role: "Admin", lastActive: "2026-02-18", status: "Active" },
  { name: "Jane Smith", email: "jane@xalco.com", role: "Manager", lastActive: "2026-02-18", status: "Active" },
  { name: "John Doe", email: "john@xalco.com", role: "Cashier", lastActive: "2026-02-17", status: "Active" },
  { name: "Sarah Lee", email: "sarah@xalco.com", role: "Cashier", lastActive: "2026-02-10", status: "Inactive" },
];

const columns = [
  { key: "name", label: "Name", render: (u: typeof users[0]) => <span className="font-medium">{u.name}</span> },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", render: (u: typeof users[0]) => <StatusBadge label={u.role} variant={u.role === "Admin" ? "info" : u.role === "Manager" ? "warning" : "default"} /> },
  { key: "lastActive", label: "Last Active" },
  { key: "status", label: "Status", render: (u: typeof users[0]) => <StatusBadge label={u.status} variant={u.status === "Active" ? "success" : "default"} /> },
];

export default function UserManagement() {
  return (
    <PageShell
      title="User Management"
      subtitle="Manage team members and access"
      actions={<><div /><Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Plus className="h-4 w-4" /> Invite User</Button></>}
    >
      <DataTable columns={columns} data={users} searchKey="name" searchPlaceholder="Search users..." />
    </PageShell>
  );
}
