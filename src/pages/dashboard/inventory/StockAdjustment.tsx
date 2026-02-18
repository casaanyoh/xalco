import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function StockAdjustment() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Stock adjusted", description: "Inventory has been updated successfully." });
  };

  return (
    <PageShell title="Stock Adjustment" subtitle="Manually adjust stock quantities">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Adjustment Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-001">Wireless Earbuds (WEB-001)</SelectItem>
                  <SelectItem value="lw-002">Leather Wallet (LW-002)</SelectItem>
                  <SelectItem value="sw-003">Smart Watch (SW-003)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Adjustment Type</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock</SelectItem>
                  <SelectItem value="remove">Remove Stock</SelectItem>
                  <SelectItem value="set">Set Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input type="number" placeholder="Enter quantity" />
          </div>
          <div className="space-y-2">
            <Label>Reason</Label>
            <Textarea placeholder="Reason for adjustment..." rows={3} />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Apply Adjustment</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </form>
    </PageShell>
  );
}
