import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export default function WebsiteSettings() {
  const handleSave = () => toast({ title: "Website settings saved", description: "Your storefront has been updated." });

  return (
    <PageShell title="Website Settings" subtitle="Configure your online storefront">
      <div className="max-w-3xl space-y-6">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">SEO & Metadata</h3>
          <div className="space-y-2"><Label>Page Title</Label><Input defaultValue="XALCO — Modern Commerce Platform" /></div>
          <div className="space-y-2"><Label>Meta Description</Label><Textarea defaultValue="Shop the latest products at XALCO. Fast shipping, great prices." rows={2} /></div>
          <div className="space-y-2"><Label>Keywords</Label><Input defaultValue="ecommerce, store, shop, products" /></div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Store Features</h3>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Enable Online Store</p><p className="text-xs text-muted-foreground">Allow customers to browse and buy online</p></div><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Show Product Reviews</p><p className="text-xs text-muted-foreground">Display customer reviews on product pages</p></div><Switch defaultChecked /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Enable Wishlist</p><p className="text-xs text-muted-foreground">Allow customers to save favorite items</p></div><Switch /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Take your store offline temporarily</p></div><Switch /></div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Social Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Instagram</Label><Input defaultValue="https://instagram.com/xalco" /></div>
            <div className="space-y-2"><Label>Twitter / X</Label><Input defaultValue="https://x.com/xalco" /></div>
            <div className="space-y-2"><Label>Facebook</Label><Input placeholder="https://facebook.com/..." /></div>
            <div className="space-y-2"><Label>TikTok</Label><Input placeholder="https://tiktok.com/..." /></div>
          </div>
        </div>

        <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Website Settings</Button>
      </div>
    </PageShell>
  );
}
