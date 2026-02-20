import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, Megaphone, Bell, Tag, X } from "lucide-react";

const banners = [
  { id: 1, name: "Free Shipping Banner", text: "🚚 Free shipping on orders over $50!", active: true, type: "announcement", clicks: 1240 },
  { id: 2, name: "Summer Sale Hero", text: "Summer Sale — Up to 40% Off!", active: true, type: "hero", clicks: 890 },
  { id: 3, name: "New Arrivals Strip", text: "✨ New Collection Now Available", active: false, type: "announcement", clicks: 0 },
];

const popups = [
  { id: 1, name: "Welcome Discount", trigger: "On page load (3s)", type: "discount", active: true, conversions: 8.4 },
  { id: 2, name: "Newsletter Signup", trigger: "Exit intent", type: "newsletter", active: true, conversions: 5.1 },
  { id: 3, name: "Abandoned Cart", trigger: "Cart inactivity (5m)", type: "cart", active: false, conversions: 0 },
];

export default function BannersPopups() {
  return (
    <PageShell
      title="Banners & Popups"
      subtitle="Manage promotional banners and customer engagement popups"
      actions={
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Create New
        </Button>
      }
    >
      <Tabs defaultValue="banners">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="popups">Popups</TabsTrigger>
          <TabsTrigger value="create">Create Banner</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="mt-4 space-y-3">
          {banners.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-xl p-4 xalco-shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {b.type === "announcement" ? <Megaphone className="h-4 w-4 text-accent" /> : <Tag className="h-4 w-4 text-accent" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-foreground">{b.name}</p>
                    <Badge variant="secondary" className="text-[10px] capitalize">{b.type}</Badge>
                    {b.active && <Badge className="text-[10px] bg-[hsl(152_60%_40%)]/10 text-[hsl(152_60%_40%)] border-[hsl(152_60%_40%)]/20">Live</Badge>}
                  </div>
                  <div className="bg-muted/50 rounded-lg px-3 py-2 mb-2">
                    <p className="text-xs text-foreground">{b.text}</p>
                  </div>
                  {b.clicks > 0 && (
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Eye className="h-2.5 w-2.5" /> {b.clicks.toLocaleString()} impressions
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={b.active} onCheckedChange={() => toast({ title: b.active ? "Banner paused" : "Banner activated" })} className="scale-75" />
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Trash2 className="h-3.5 w-3.5 text-destructive/60" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Announcement Bar Preview */}
          <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
            <h3 className="text-xs font-semibold text-foreground mb-3">Live Preview — Announcement Bar</h3>
            <div className="bg-accent text-accent-foreground text-center py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2">
              🚚 Free shipping on orders over $50!
              <button className="ml-2 opacity-60 hover:opacity-100"><X className="h-3 w-3" /></button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="popups" className="mt-4 space-y-3">
          {popups.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-xl p-4 xalco-shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-semibold text-foreground">{p.name}</p>
                    <Badge variant="secondary" className="text-[10px] capitalize">{p.type}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Trigger: {p.trigger}</p>
                  {p.conversions > 0 && (
                    <p className="text-[10px] text-[hsl(152_60%_40%)] mt-0.5">{p.conversions}% conversion rate</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={p.active} onCheckedChange={() => toast({ title: p.active ? "Popup disabled" : "Popup enabled" })} className="scale-75" />
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Popup Preview */}
          <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
            <h3 className="text-xs font-semibold text-foreground mb-3">Live Preview — Welcome Popup</h3>
            <div className="max-w-xs mx-auto border border-border rounded-xl overflow-hidden xalco-shadow">
              <div className="xalco-gradient px-5 py-4 text-center">
                <p className="text-primary-foreground font-bold text-sm">Welcome! 🎉</p>
                <p className="text-primary-foreground/70 text-[11px] mt-1">Get 10% off your first order</p>
              </div>
              <div className="p-4 space-y-3 bg-card">
                <Input placeholder="Enter your email" className="h-8 text-xs" />
                <Button size="sm" className="w-full bg-accent text-accent-foreground text-xs h-8">
                  Claim My Discount
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">No thanks, I'll pay full price</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-4">
          <div className="max-w-2xl bg-card border border-border rounded-xl p-6 xalco-shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Create New Banner</h3>
            <div className="space-y-2">
              <Label className="text-xs">Banner Name</Label>
              <Input placeholder="e.g. Summer Sale Banner" className="h-9 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Banner Text</Label>
              <Textarea placeholder="Enter your banner message..." rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Background Color</Label>
                <Input defaultValue="#2ab39b" className="h-9 text-sm font-mono" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Text Color</Label>
                <Input defaultValue="#ffffff" className="h-9 text-sm font-mono" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-xs font-medium text-foreground">Show Close Button</p>
                <p className="text-[10px] text-muted-foreground">Allow visitors to dismiss the banner</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-xs font-medium text-foreground">Enable on Mobile</p>
                <p className="text-[10px] text-muted-foreground">Display on mobile devices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full"
              onClick={() => toast({ title: "Banner created!", description: "Your banner has been saved as draft." })}>
              Create Banner
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
