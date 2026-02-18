import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, ShieldCheck } from "lucide-react";

const roles = [
  {
    name: "Admin",
    description: "Full access to all features",
    users: 1,
    permissions: { dashboard: true, products: true, inventory: true, orders: true, customers: true, reports: true, settings: true, pos: true },
  },
  {
    name: "Manager",
    description: "Manage products, orders, and reports",
    users: 1,
    permissions: { dashboard: true, products: true, inventory: true, orders: true, customers: true, reports: true, settings: false, pos: true },
  },
  {
    name: "Cashier",
    description: "POS terminal and basic order access",
    users: 2,
    permissions: { dashboard: true, products: false, inventory: false, orders: true, customers: false, reports: false, settings: false, pos: true },
  },
];

const permissionLabels: Record<string, string> = {
  dashboard: "Dashboard", products: "Products", inventory: "Inventory", orders: "Orders",
  customers: "Customers", reports: "Reports", settings: "Settings", pos: "POS Terminal",
};

export default function RolesPermissions() {
  return (
    <PageShell
      title="Roles & Permissions"
      subtitle="Configure role-based access control"
      actions={<><div /><Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Plus className="h-4 w-4" /> Create Role</Button></>}
    >
      <div className="space-y-4">
        {roles.map((role) => (
          <div key={role.name} className="bg-card rounded-lg border border-border p-6 xalco-shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{role.name}</h3>
                  <p className="text-xs text-muted-foreground">{role.description} · {role.users} user(s)</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(role.permissions).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between bg-muted/30 rounded-md px-3 py-2">
                  <span className="text-xs font-medium text-foreground">{permissionLabels[key]}</span>
                  <Switch checked={enabled} disabled className="scale-75" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
