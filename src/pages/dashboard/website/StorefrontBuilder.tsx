import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Monitor, Smartphone, Tablet, Eye, Save, RotateCcw,
  GripVertical, ChevronUp, ChevronDown, Plus, Trash2, Image,
  Type, Layout, Star, ShoppingBag, MessageSquare, Tag,
} from "lucide-react";
import { useState } from "react";

const themes = [
  { id: "modern", name: "Modern", accent: "hsl(172 66% 40%)", preview: "Clean & minimal storefront" },
  { id: "bold", name: "Bold Dark", accent: "hsl(220 24% 16%)", preview: "Dark dramatic layout" },
  { id: "warm", name: "Warm Market", accent: "hsl(38 92% 50%)", preview: "Warm earthy tones" },
  { id: "fresh", name: "Fresh Green", accent: "hsl(152 60% 40%)", preview: "Nature-inspired design" },
];

const sections = [
  { id: "hero", label: "Hero Banner", icon: Image, enabled: true, desc: "Full-width hero with CTA" },
  { id: "trust", label: "Trust Badges", icon: Star, enabled: true, desc: "Shipping, security, returns" },
  { id: "categories", label: "Category Grid", icon: Layout, enabled: true, desc: "Browse by category" },
  { id: "featured", label: "Featured Products", icon: ShoppingBag, enabled: true, desc: "Handpicked products" },
  { id: "banner", label: "Promo Banner", icon: Tag, enabled: false, desc: "Sale or event banner" },
  { id: "reviews", label: "Customer Reviews", icon: MessageSquare, enabled: true, desc: "Social proof section" },
  { id: "newsletter", label: "Newsletter", icon: Type, enabled: false, desc: "Email capture section" },
];

export default function StorefrontBuilder() {
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [sectionList, setSectionList] = useState(sections);

  const toggleSection = (id: string) => {
    setSectionList((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const newList = [...sectionList];
    const target = idx + dir;
    if (target < 0 || target >= newList.length) return;
    [newList[idx], newList[target]] = [newList[target], newList[idx]];
    setSectionList(newList);
  };

  return (
    <PageShell
      title="Storefront Builder"
      subtitle="Customize how your online store looks and feels"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-muted-foreground border-border">
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
          </Button>
          <Button variant="outline" size="sm" className="text-muted-foreground border-border">
            <Eye className="h-3.5 w-3.5 mr-1.5" /> Preview
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => toast({ title: "Changes saved", description: "Your storefront has been updated." })}>
            <Save className="h-3.5 w-3.5 mr-1.5" /> Save Changes
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="layout">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="layout">Layout & Sections</TabsTrigger>
          <TabsTrigger value="theme">Theme & Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="header">Header & Footer</TabsTrigger>
        </TabsList>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 mt-4 mb-2">
          <span className="text-xs text-muted-foreground mr-2">Preview:</span>
          {([
            { key: "desktop", Icon: Monitor },
            { key: "tablet", Icon: Tablet },
            { key: "mobile", Icon: Smartphone },
          ] as const).map(({ key, Icon }) => (
            <button
              key={key}
              onClick={() => setViewport(key)}
              className={`p-1.5 rounded-md transition-colors ${viewport === key ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <TabsContent value="layout" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section Manager */}
            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Page Sections</h3>
                <Button variant="outline" size="sm" className="text-xs border-accent text-accent">
                  <Plus className="h-3 w-3 mr-1" /> Add Section
                </Button>
              </div>
              <div className="space-y-2">
                {sectionList.map((section, i) => (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${section.enabled ? "border-accent/30 bg-accent/5" : "border-border bg-muted/20"}`}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab flex-shrink-0" />
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{section.label}</p>
                      <p className="text-[10px] text-muted-foreground">{section.desc}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveSection(i, -1)} className="p-0.5 text-muted-foreground hover:text-foreground">
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => moveSection(i, 1)} className="p-0.5 text-muted-foreground hover:text-foreground">
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <Switch
                        checked={section.enabled}
                        onCheckedChange={() => toggleSection(section.id)}
                        className="scale-75"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Preview Mockup */}
            <div className="bg-card border border-border rounded-xl overflow-hidden xalco-shadow-sm">
              <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(152_60%_40%)]/60" />
                <div className="flex-1 mx-3 h-5 bg-muted rounded text-[10px] flex items-center justify-center text-muted-foreground">
                  xalco.lovable.app
                </div>
              </div>
              <div className={`p-3 overflow-hidden ${viewport === "mobile" ? "max-w-[250px] mx-auto" : viewport === "tablet" ? "max-w-[480px] mx-auto" : ""}`}>
                {/* Mini store preview */}
                <div className="space-y-1.5">
                  <div className="h-4 bg-primary/90 rounded-sm flex items-center px-2 justify-between">
                    <div className="w-10 h-1.5 bg-primary-foreground/40 rounded" />
                    <div className="flex gap-1">
                      <div className="w-6 h-1 bg-primary-foreground/30 rounded" />
                      <div className="w-6 h-1 bg-primary-foreground/30 rounded" />
                      <div className="w-6 h-1 bg-primary-foreground/30 rounded" />
                    </div>
                  </div>
                  {sectionList.filter((s) => s.enabled).slice(0, 5).map((s, i) => (
                    <div key={s.id} className={`rounded-sm ${i === 0 ? "h-14 bg-gradient-to-r from-primary to-primary/70" : "h-8 bg-muted"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4">Color Themes</h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${selectedTheme === theme.id ? "border-accent" : "border-border hover:border-accent/40"}`}
                  >
                    <div
                      className="w-full h-8 rounded-md mb-3"
                      style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}88)` }}
                    />
                    <p className="text-xs font-semibold text-foreground">{theme.name}</p>
                    <p className="text-[10px] text-muted-foreground">{theme.preview}</p>
                    {selectedTheme === theme.id && (
                      <span className="inline-block mt-1.5 text-[10px] font-medium text-accent">Active</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Custom Colors</h3>
              {[
                { label: "Primary Color", value: "#1e2a3a" },
                { label: "Accent Color", value: "#2ab39b" },
                { label: "Background", value: "#f4f5f7" },
                { label: "Text Color", value: "#1a1f2e" },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <Label className="text-xs">{c.label}</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-border" style={{ background: c.value }} />
                    <Input defaultValue={c.value} className="h-7 w-24 text-xs font-mono" />
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                onClick={() => toast({ title: "Theme updated" })}>
                Apply Custom Theme
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="mt-4">
          <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm max-w-xl space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Typography Settings</h3>
            {[
              { label: "Heading Font", options: ["Plus Jakarta Sans", "Inter", "Playfair Display", "Poppins"] },
              { label: "Body Font", options: ["Plus Jakarta Sans", "Inter", "Roboto", "Open Sans"] },
            ].map((f) => (
              <div key={f.label} className="space-y-2">
                <Label className="text-xs">{f.label}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {f.options.map((o) => (
                    <button key={o} className="text-xs px-3 py-2 rounded-lg border border-border hover:border-accent text-left transition-colors">
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <Label className="text-xs">Base Font Size</Label>
              <div className="flex items-center gap-3">
                <Input defaultValue="16" type="number" className="h-8 w-20 text-sm" />
                <span className="text-xs text-muted-foreground">px</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="header" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl">
            {[
              {
                title: "Header Settings",
                items: [
                  { label: "Show Announcement Bar", checked: true },
                  { label: "Sticky Navigation", checked: true },
                  { label: "Show Search Bar", checked: true },
                  { label: "Show Wishlist Icon", checked: false },
                  { label: "Show Cart Count Badge", checked: true },
                ],
              },
              {
                title: "Footer Settings",
                items: [
                  { label: "Show Newsletter Signup", checked: true },
                  { label: "Show Social Links", checked: true },
                  { label: "Show Payment Icons", checked: true },
                  { label: "Show Sitemap Links", checked: true },
                  { label: "Show Cookie Notice", checked: false },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-4">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <Label className="text-xs cursor-pointer">{item.label}</Label>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
