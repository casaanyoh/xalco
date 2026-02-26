import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, Megaphone, Bell, Tag, X, Zap, MousePointer } from "lucide-react";

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
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Create New
        </Button>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Banners", value: banners.filter(b => b.active).length, icon: Megaphone, color: "hsl(172 66% 40%)" },
          { label: "Total Impressions", value: "2,130", icon: Eye, color: "hsl(210 80% 52%)" },
          { label: "Avg. Conversion", value: "6.7%", icon: MousePointer, color: "hsl(152 60% 40%)" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 xalco-shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
              <s.icon className="h-4.5 w-4.5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="banners">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="popups">Popups</TabsTrigger>
          <TabsTrigger value="create">Create Banner</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="mt-4 space-y-3">
          {banners.map((b) => (
            <div key={b.id} className="bg-card border border-border rounded-2xl p-5 xalco-shadow-sm hover:xalco-shadow transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: b.type === "announcement" ? "hsl(172 66% 40% / 0.1)" : "hsl(38 92% 50% / 0.1)" }}>
                  {b.type === "announcement" ? <Megaphone className="h-4.5 w-4.5 text-accent" /> : <Tag className="h-4.5 w-4.5 text-[hsl(38,92%,50%)]" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-semibold text-foreground">{b.name}</p>
                    <Badge variant="secondary" className="text-[10px] capitalize">{b.type}</Badge>
                    {b.active && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[hsl(152,60%,40%)] bg-[hsl(152,60%,40%)]/8 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(152,60%,40%)] animate-pulse" /> Live
                      </span>
                    )}
                  </div>
                  <div className="bg-muted/30 rounded-xl px-4 py-2.5 mb-2.5 border border-border/50">
                    <p className="text-xs text-foreground">{b.text}</p>
                  </div>
                  {b.clicks > 0 && (
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                      <Eye className="h-3 w-3" /> {b.clicks.toLocaleString()} impressions
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={b.active} onCheckedChange={() => toast({ title: b.active ? "Banner paused" : "Banner activated" })} className="scale-75" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-3.5 w-3.5 text-destructive/60" /></Button>
                </div>
              </div>
            </div>
          ))}

          {/* Preview */}
          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
            <h3 className="text-xs font-semibold text-foreground mb-4">Live Preview — Announcement Bar</h3>
            <div className="bg-accent text-accent-foreground text-center py-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 xalco-shadow-sm">
              🚚 Free shipping on orders over $50!
              <button className="ml-2 opacity-60 hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="popups" className="mt-4 space-y-3">
          {popups.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-2xl p-5 xalco-shadow-sm hover:xalco-shadow transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4.5 w-4.5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <Badge variant="secondary" className="text-[10px] capitalize">{p.type}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Trigger: {p.trigger}</p>
                  {p.conversions > 0 && (
                    <p className="text-[10px] text-[hsl(152,60%,40%)] font-medium mt-0.5">{p.conversions}% conversion rate</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={p.active} onCheckedChange={() => toast({ title: p.active ? "Popup disabled" : "Popup enabled" })} className="scale-75" />
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                </div>
              </div>
            </div>
          ))}

          {/* Popup Preview */}
          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
            <h3 className="text-xs font-semibold text-foreground mb-4">Live Preview — Welcome Popup</h3>
            <div className="max-w-xs mx-auto border border-border rounded-2xl overflow-hidden xalco-shadow-lg">
              <div className="xalco-gradient px-6 py-5 text-center relative">
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-primary-foreground/20 transition-colors">
                  <X className="h-3 w-3 text-primary-foreground/60" />
                </div>
                <Zap className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-primary-foreground font-bold text-base">Welcome! 🎉</p>
                <p className="text-primary-foreground/60 text-xs mt-1">Get 10% off your first order</p>
              </div>
              <div className="p-5 space-y-3 bg-card">
                <Input placeholder="Enter your email" className="h-9 text-xs" />
                <Button size="sm" className="w-full bg-accent text-accent-foreground text-xs h-9 xalco-shadow-sm">
                  Claim My Discount
                </Button>
                <p className="text-[10px] text-center text-muted-foreground cursor-pointer hover:text-foreground transition-colors">No thanks, I'll pay full price</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="create" className="mt-4">
          <div className="max-w-2xl bg-card border border-border rounded-2xl p-7 xalco-shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Create New Banner</h3>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Banner Name</Label>
              <Input placeholder="e.g. Summer Sale Banner" className="h-10 text-sm" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Banner Text</Label>
              <Textarea placeholder="Enter your banner message..." rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Background Color</Label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-border" style={{ background: "#2ab39b" }} />
                  <Input defaultValue="#2ab39b" className="h-9 text-sm font-mono" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Text Color</Label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-border" style={{ background: "#ffffff" }} />
                  <Input defaultValue="#ffffff" className="h-9 text-sm font-mono" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
              <div>
                <p className="text-xs font-medium text-foreground">Show Close Button</p>
                <p className="text-[10px] text-muted-foreground">Allow visitors to dismiss the banner</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border">
              <div>
                <p className="text-xs font-medium text-foreground">Enable on Mobile</p>
                <p className="text-[10px] text-muted-foreground">Display on mobile devices</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full h-10 xalco-shadow-sm"
              onClick={() => toast({ title: "Banner created!", description: "Your banner has been saved as draft." })}>
              Create Banner
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
