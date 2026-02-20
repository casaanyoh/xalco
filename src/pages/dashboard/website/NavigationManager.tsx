import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  GripVertical, Plus, Trash2, ChevronRight, ExternalLink,
  Home, ShoppingBag, Tag, Info, Phone, FileText, Save,
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
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => toast({ title: "Navigation saved!" })}>
            <Save className="h-3.5 w-3.5 mr-1.5" /> Save Menu
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Nav Editor */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-card border border-border rounded-xl xalco-shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Main Navigation</h3>
              <span className="text-[10px] text-muted-foreground">{navItems.length} items</span>
            </div>
            <div className="p-3 space-y-1.5">
              {navItems.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg border border-border hover:border-accent/30 transition-colors group">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-3 w-3 text-accent" />
                    </div>
                    <span className="flex-1 text-xs font-medium text-foreground">{item.label}</span>
                    <span className="text-[10px] text-muted-foreground">{item.url}</span>
                    {item.children.length > 0 && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="p-0.5 text-muted-foreground hover:text-foreground"
                      >
                        <ChevronRight className={`h-3.5 w-3.5 transition-transform ${expanded.includes(item.id) ? "rotate-90" : ""}`} />
                      </button>
                    )}
                    <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-3.5 w-3.5 text-destructive/60 hover:text-destructive" />
                    </button>
                  </div>

                  {expanded.includes(item.id) && item.children.length > 0 && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <div key={child.id} className="flex items-center gap-2 p-2 rounded-lg border border-border/60 bg-muted/20">
                          <GripVertical className="h-3.5 w-3.5 text-muted-foreground cursor-grab" />
                          <span className="flex-1 text-[11px] font-medium text-foreground">{child.label}</span>
                          <span className="text-[10px] text-muted-foreground">{child.url}</span>
                          <Trash2 className="h-3 w-3 text-destructive/40 hover:text-destructive cursor-pointer" />
                        </div>
                      ))}
                      <button className="flex items-center gap-1.5 text-[10px] text-accent ml-2 hover:underline">
                        <Plus className="h-3 w-3" /> Add submenu item
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-dashed border-border hover:border-accent text-muted-foreground hover:text-accent transition-colors text-xs">
                <Plus className="h-3.5 w-3.5" /> Add Menu Item
              </button>
            </div>
          </div>

          {/* Footer Nav */}
          <div className="bg-card border border-border rounded-xl xalco-shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Footer Navigation</h3>
            </div>
            <div className="p-4 grid grid-cols-3 gap-4">
              {[
                { col: "Shop", links: ["All Products", "Categories", "New Arrivals", "Sale"] },
                { col: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
                { col: "Company", links: ["About", "Privacy", "Terms", "Careers"] },
              ].map((col) => (
                <div key={col.col}>
                  <p className="text-[10px] font-semibold text-foreground uppercase mb-2">{col.col}</p>
                  <ul className="space-y-1">
                    {col.links.map((link) => (
                      <li key={link} className="text-[10px] text-muted-foreground hover:text-accent cursor-pointer transition-colors">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Item Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm space-y-4">
            <h3 className="text-xs font-semibold text-foreground">Add New Item</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Label</Label>
                <Input placeholder="e.g. Shop" className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Link URL</Label>
                <Input placeholder="/shop or https://..." className="h-8 text-sm" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Open in</Label>
                <div className="flex gap-2">
                  {["Same Tab", "New Tab"].map((opt) => (
                    <button key={opt} className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded-lg border border-border hover:border-accent transition-colors">
                      {opt === "New Tab" && <ExternalLink className="h-3 w-3" />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                onClick={() => toast({ title: "Item added to menu" })}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add to Menu
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
            <h3 className="text-xs font-semibold text-foreground mb-3">Menu Preview</h3>
            <div className="bg-primary/95 rounded-lg px-4 py-2.5 flex items-center gap-4 overflow-x-auto">
              {navItems.map((item) => (
                <span key={item.id} className="text-[10px] font-medium text-primary-foreground/80 whitespace-nowrap hover:text-accent cursor-pointer transition-colors">
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
