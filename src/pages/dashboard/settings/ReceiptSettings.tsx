import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function ReceiptSettings() {
  const handleSave = () => toast({ title: "Receipt settings saved", description: "Your receipt template has been updated." });

  return (
    <PageShell title="Receipt Settings" subtitle="Customize your POS receipt layout">
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Receipt Header</h3>
          <div className="space-y-2"><Label>Business Name</Label><Input defaultValue="XALCO Store" /></div>
          <div className="space-y-2"><Label>Address Line</Label><Input defaultValue="123 Commerce St, New York, NY" /></div>
          <div className="space-y-2"><Label>Phone Number</Label><Input defaultValue="+1 555-0100" /></div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Receipt Footer</h3>
          <div className="space-y-2"><Label>Footer Message</Label><Textarea defaultValue="Thank you for shopping with XALCO! Visit us again." rows={2} /></div>
          <div className="space-y-2"><Label>Return Policy</Label><Textarea defaultValue="Returns accepted within 30 days with receipt." rows={2} /></div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Display Options</h3>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Show Logo on Receipt</p></div><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Show Tax Breakdown</p></div><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Show Barcode</p></div><Switch /></div>
        </div>

        <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Receipt Settings</Button>
      </div>
    </PageShell>
  );
}
