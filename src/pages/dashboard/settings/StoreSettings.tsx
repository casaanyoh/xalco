import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function StoreSettings() {
  const handleSave = () => toast({ title: "Settings saved", description: "Store settings updated successfully." });

  return (
    <PageShell title="Store Settings" subtitle="General store configuration">
      <div className="max-w-3xl space-y-6">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Store Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Store Name</Label><Input defaultValue="XALCO Store" /></div>
            <div className="space-y-2"><Label>Store Email</Label><Input type="email" defaultValue="hello@xalco.com" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+1 555-0100" /></div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select defaultValue="usd"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="usd">USD ($)</SelectItem><SelectItem value="eur">EUR (€)</SelectItem><SelectItem value="gbp">GBP (£)</SelectItem></SelectContent></Select>
            </div>
          </div>
          <div className="space-y-2"><Label>Address</Label><Textarea defaultValue="123 Commerce Street, Suite 100, New York, NY 10001" rows={2} /></div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Enable Tax Calculation</p><p className="text-xs text-muted-foreground">Auto-calculate tax on orders</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Low Stock Notifications</p><p className="text-xs text-muted-foreground">Email when stock falls below threshold</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Order Confirmation Emails</p><p className="text-xs text-muted-foreground">Send customers order confirmations</p></div>
            <Switch defaultChecked />
          </div>
        </div>

        <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Settings</Button>
      </div>
    </PageShell>
  );
}
