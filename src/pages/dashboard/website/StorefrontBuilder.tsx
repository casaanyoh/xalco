import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Monitor, Smartphone, Tablet, Eye, Save, RotateCcw,
  GripVertical, ChevronUp, ChevronDown, Plus, Image,
  Type, Layout, Star, ShoppingBag, MessageSquare, Tag,
  Paintbrush, Check,
} from "lucide-react";
import { useState } from "react";

const themes = [
  { id: "modern", name: "Modern Teal", accent: "hsl(172 66% 40%)", preview: "Clean & minimal storefront" },
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
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm"
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
        <div className="flex items-center gap-1 mt-4 mb-2 bg-muted/30 rounded-lg p-1 w-fit">
          {([
            { key: "desktop", Icon: Monitor, label: "Desktop" },
            { key: "tablet", Icon: Tablet, label: "Tablet" },
            { key: "mobile", Icon: Smartphone, label: "Mobile" },
          ] as const).map(({ key, Icon, label }) => (
            <button
              key={key}
              onClick={() => setViewport(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewport === key ? "bg-accent text-accent-foreground xalco-shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        <TabsContent value="layout" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section Manager */}
            <div className="bg-card border border-border rounded-2xl p-5 xalco-shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Page Sections</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{sectionList.filter(s => s.enabled).length} of {sectionList.length} active</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs border-accent text-accent">
                  <Plus className="h-3 w-3 mr-1" /> Add Section
                </Button>
              </div>
              <div className="space-y-2">
                {sectionList.map((section, i) => (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                      section.enabled
                        ? "border-accent/20 bg-accent/[0.03] hover:border-accent/40"
                        : "border-border bg-muted/10 opacity-60"
                    }`}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab flex-shrink-0" />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      section.enabled ? "bg-accent/10" : "bg-muted"
                    }`}>
                      <section.icon className={`h-3.5 w-3.5 ${section.enabled ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground">{section.label}</p>
                      <p className="text-[10px] text-muted-foreground">{section.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => moveSection(i, -1)} className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => moveSection(i, 1)} className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <Switch checked={section.enabled} onCheckedChange={() => toggleSection(section.id)} className="scale-75" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Preview Mockup */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden xalco-shadow-sm">
              <div className="bg-muted/30 border-b border-border px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-warning/50" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(152,60%,40%)]/50" />
                </div>
                <div className="flex-1 mx-4 h-6 bg-muted rounded-lg text-[10px] flex items-center justify-center text-muted-foreground border border-border">
                  🔒 xalco.lovable.app
                </div>
              </div>
              <div className={`p-4 overflow-hidden transition-all duration-300 ${
                viewport === "mobile" ? "max-w-[260px] mx-auto" : viewport === "tablet" ? "max-w-[480px] mx-auto" : ""
              }`}>
                <div className="space-y-2">
                  {/* Mock nav */}
                  <div className="h-5 bg-primary rounded flex items-center px-3 justify-between">
                    <div className="w-12 h-2 bg-primary-foreground/30 rounded" />
                    <div className="flex gap-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-1.5 bg-primary-foreground/20 rounded" />)}
                    </div>
                  </div>
                  {sectionList.filter((s) => s.enabled).map((s, i) => (
                    <div
                      key={s.id}
                      className={`rounded transition-all ${
                        i === 0
                          ? "h-16 bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center"
                          : i === 1
                            ? "h-5 bg-accent/10 border border-accent/20"
                            : "h-10 bg-muted/50 border border-border"
                      }`}
                    >
                      {i === 0 && <div className="w-20 h-3 bg-primary-foreground/20 rounded" />}
                    </div>
                  ))}
                  {/* Mock footer */}
                  <div className="h-8 bg-muted/80 rounded border border-border" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Paintbrush className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold text-foreground">Color Themes</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTheme === theme.id ? "border-accent bg-accent/[0.03]" : "border-border hover:border-accent/30"
                    }`}
                  >
                    {selectedTheme === theme.id && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-accent-foreground" />
                      </div>
                    )}
                    <div
                      className="w-full h-10 rounded-lg mb-3"
                      style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}88)` }}
                    />
                    <p className="text-xs font-semibold text-foreground">{theme.name}</p>
                    <p className="text-[10px] text-muted-foreground">{theme.preview}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-5">
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
                    <div className="w-7 h-7 rounded-lg border border-border xalco-shadow-sm" style={{ background: c.value }} />
                    <Input defaultValue={c.value} className="h-8 w-24 text-xs font-mono" />
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                onClick={() => toast({ title: "Theme updated" })}>
                Apply Custom Theme
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="mt-4">
          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm max-w-xl space-y-6">
            <h3 className="text-sm font-semibold text-foreground">Typography Settings</h3>
            {[
              { label: "Heading Font", options: ["Plus Jakarta Sans", "Inter", "Playfair Display", "Poppins"] },
              { label: "Body Font", options: ["Plus Jakarta Sans", "Inter", "Roboto", "Open Sans"] },
            ].map((f) => (
              <div key={f.label} className="space-y-2.5">
                <Label className="text-xs font-medium">{f.label}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {f.options.map((o, i) => (
                    <button key={o} className={`text-xs px-4 py-2.5 rounded-xl border text-left transition-all ${
                      i === 0 ? "border-accent bg-accent/[0.03] text-accent font-medium" : "border-border hover:border-accent/40"
                    }`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <Label className="text-xs">Base Font Size</Label>
              <div className="flex items-center gap-3">
                <Input defaultValue="16" type="number" className="h-9 w-20 text-sm" />
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
              <div key={section.title} className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
                <h3 className="text-sm font-semibold text-foreground mb-5">{section.title}</h3>
                <div className="space-y-4">
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
