import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  GripVertical, Plus, Trash2, ChevronRight, ExternalLink,
  Home, ShoppingBag, Tag, Info, Phone, FileText, Save, Menu,
} from "lucide-react";
import { useState } from "react";

const defaultMainNav = [
  { id: 1, label: "Home", url: "/", icon: Home, children: [] },
  { id: 2, label: "Shop", url: "/shop", icon: ShoppingBag, children: [
    { id: 21, label: "All Products", url: "/shop/all" },
    { id: 22, label: "Electronics", url: "/shop/electronics" },
    { id: 23, label: "Accessories", url: "/shop/accessories" },
  ]},
  { id: 3, label: "Categories", url: "/categories", icon: Tag, children: [] },
  { id: 4, label: "Blog", url: "/blog", icon: FileText, children: [] },
  { id: 5, label: "About", url: "/about", icon: Info, children: [] },
  { id: 6, label: "Contact", url: "/contact", icon: Phone, children: [] },
];

export default function NavigationManager() {
  const [navItems, setNavItems] = useState(defaultMainNav);
  const [expanded, setExpanded] = useState<number[]>([2]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const removeItem = (id: number) => {
    setNavItems((prev) => prev.filter((i) => i.id !== id));
    toast({ title: "Menu item removed" });
  };

  return (
    <PageShell
      title="Navigation Manager"
      subtitle="Configure your store's menu structure"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Item
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm"
            onClick={() => toast({ title: "Navigation saved!" })}>
            <Save className="h-3.5 w-3.5 mr-1.5" /> Save Menu
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Nav Editor */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Menu className="h-4 w-4 text-accent" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Main Navigation</h3>
              </div>
              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-lg">{navItems.length} items</span>
            </div>
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-border hover:border-accent/30 transition-all group">
                    <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab" />
                    <div className="w-7 h-7 rounded-lg bg-accent/8 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="flex-1 text-xs font-semibold text-foreground">{item.label}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">{item.url}</span>
                    {item.children.length > 0 && (
                      <button onClick={() => toggleExpand(item.id)} className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded.includes(item.id) ? "rotate-90" : ""}`} />
                      </button>
                    )}
                    <button onClick={() => removeItem(item.id)} className="p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all text-destructive/50 hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {expanded.includes(item.id) && item.children.length > 0 && (
                    <div className="ml-10 mt-1.5 space-y-1.5 pl-4 border-l-2 border-accent/15">
                      {item.children.map((child) => (
                        <div key={child.id} className="flex items-center gap-2 p-2.5 rounded-lg border border-border/50 bg-muted/10 group">
                          <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 cursor-grab" />
                          <span className="flex-1 text-[11px] font-medium text-foreground">{child.label}</span>
                          <span className="text-[10px] text-muted-foreground">{child.url}</span>
                          <button className="p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-destructive/40 hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <button className="flex items-center gap-1.5 text-[10px] text-accent ml-2 hover:underline font-medium">
                        <Plus className="h-3 w-3" /> Add submenu item
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-border hover:border-accent hover:bg-accent/[0.02] text-muted-foreground hover:text-accent transition-all text-xs font-medium">
                <Plus className="h-3.5 w-3.5" /> Add Menu Item
              </button>
            </div>
          </div>

          {/* Footer Nav */}
          <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Footer Navigation</h3>
            </div>
            <div className="p-5 grid grid-cols-3 gap-5">
              {[
                { col: "Shop", links: ["All Products", "Categories", "New Arrivals", "Sale"] },
                { col: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
                { col: "Company", links: ["About", "Privacy", "Terms", "Careers"] },
              ].map((col) => (
                <div key={col.col}>
                  <p className="text-[10px] font-semibold text-foreground uppercase tracking-wider mb-2.5">{col.col}</p>
                  <ul className="space-y-1.5">
                    {col.links.map((link) => (
                      <li key={link} className="text-xs text-muted-foreground hover:text-accent cursor-pointer transition-colors">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Item Panel */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Add New Item</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Label</Label>
                <Input placeholder="e.g. Shop" className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Link URL</Label>
                <Input placeholder="/shop or https://..." className="h-9 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Open in</Label>
                <div className="flex gap-2">
                  {["Same Tab", "New Tab"].map((opt) => (
                    <button key={opt} className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl border transition-all ${
                      opt === "Same Tab" ? "border-accent bg-accent/[0.03] text-accent" : "border-border hover:border-accent/30"
                    }`}>
                      {opt === "New Tab" && <ExternalLink className="h-3 w-3" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-9"
                onClick={() => toast({ title: "Item added to menu" })}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add to Menu
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
            <h3 className="text-xs font-semibold text-foreground mb-4">Menu Preview</h3>
            <div className="xalco-gradient rounded-xl px-5 py-3 flex items-center gap-5 overflow-x-auto">
              {navItems.map((item) => (
                <span key={item.id} className="text-[11px] font-medium text-primary-foreground/70 whitespace-nowrap hover:text-accent cursor-pointer transition-colors">
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
