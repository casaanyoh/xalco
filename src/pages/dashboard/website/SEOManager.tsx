import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Globe, Search, CheckCircle2, AlertCircle, XCircle,
  TrendingUp, Link2, RefreshCw, Download, ExternalLink,
} from "lucide-react";

const seoChecks = [
  { label: "Meta title set", status: "ok" },
  { label: "Meta description set", status: "ok" },
  { label: "Canonical URLs configured", status: "ok" },
  { label: "Sitemap.xml submitted", status: "warn" },
  { label: "Robots.txt configured", status: "ok" },
  { label: "Open Graph tags", status: "ok" },
  { label: "Schema markup", status: "warn" },
  { label: "Page speed > 90", status: "warn" },
  { label: "Mobile-friendly", status: "ok" },
  { label: "Broken links check", status: "error" },
];

const topKeywords = [
  { keyword: "wireless earbuds", position: 8, volume: 22000, change: "+3" },
  { keyword: "leather wallet", position: 14, volume: 9800, change: "+1" },
  { keyword: "smart watch deals", position: 21, volume: 15400, change: "-2" },
  { keyword: "running shoes", position: 34, volume: 40200, change: "+5" },
  { keyword: "travel backpack", position: 11, volume: 12600, change: "+2" },
];

export default function SEOManager() {
  return (
    <PageShell
      title="SEO Manager"
      subtitle="Optimize your store for search engines"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Run Audit
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => toast({ title: "SEO settings saved" })}>
            Save Settings
          </Button>
        </div>
      }
    >
      {/* SEO Score */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 bg-card border border-border rounded-xl p-5 xalco-shadow-sm flex flex-col items-center justify-center text-center">
          <div className="relative w-24 h-24 mb-3">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(220 14% 92%)" strokeWidth="2" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(172 66% 40%)" strokeWidth="2.5"
                strokeDasharray="70 100" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">70</span>
              <span className="text-[9px] text-muted-foreground">/100</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-foreground">SEO Score</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Good — Needs improvement</p>
        </div>

        {[
          { label: "Indexed Pages", value: "84", icon: Globe, note: "of 91 total" },
          { label: "Organic Traffic", value: "3,240", icon: TrendingUp, note: "+18% this month" },
          { label: "Backlinks", value: "126", icon: Link2, note: "12 new this week" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-[hsl(152_60%_40%)] mt-1">{s.note}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="meta">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="audit">SEO Audit</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        <TabsContent value="meta" className="mt-4">
          <div className="max-w-2xl space-y-5">
            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm space-y-4">
              <h3 className="text-xs font-semibold text-foreground">Homepage Meta Tags</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Page Title</Label>
                  <span className="text-[10px] text-muted-foreground">34/60 chars</span>
                </div>
                <Input defaultValue="XALCO — Modern Commerce Platform" className="h-9 text-sm" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Meta Description</Label>
                  <span className="text-[10px] text-muted-foreground">58/160 chars</span>
                </div>
                <Textarea defaultValue="Shop the latest products at XALCO. Fast shipping, great prices, quality guaranteed." rows={2} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Focus Keywords</Label>
                <Input defaultValue="online store, ecommerce, shop, products" className="h-9 text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Canonical URL</Label>
                <Input defaultValue="https://xalco.lovable.app" className="h-9 text-sm font-mono text-xs" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm space-y-4">
              <h3 className="text-xs font-semibold text-foreground">Open Graph (Social Sharing)</h3>
              <div className="space-y-2">
                <Label className="text-xs">OG Title</Label>
                <Input defaultValue="XALCO Store — Shop Premium Products" className="h-9 text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">OG Description</Label>
                <Textarea defaultValue="Discover curated collections of premium products at XALCO." rows={2} />
              </div>

              {/* Preview */}
              <div className="bg-muted/40 rounded-xl overflow-hidden border border-border">
                <div className="h-20 bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                  <span className="text-primary-foreground/50 text-xs">OG Image Preview</span>
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-muted-foreground uppercase">xalco.lovable.app</p>
                  <p className="text-xs font-semibold text-foreground">XALCO Store — Shop Premium Products</p>
                  <p className="text-[10px] text-muted-foreground">Discover curated collections of premium products at XALCO.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <div className="bg-card border border-border rounded-xl xalco-shadow-sm overflow-hidden max-w-2xl">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-xs font-semibold text-foreground">SEO Audit Checklist</h3>
            </div>
            <div className="divide-y divide-border">
              {seoChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-3 px-5 py-3">
                  {check.status === "ok" && <CheckCircle2 className="h-4 w-4 text-[hsl(152_60%_40%)] flex-shrink-0" />}
                  {check.status === "warn" && <AlertCircle className="h-4 w-4 text-[hsl(38_92%_50%)] flex-shrink-0" />}
                  {check.status === "error" && <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                  <span className={`text-xs ${check.status === "ok" ? "text-foreground" : check.status === "warn" ? "text-foreground" : "text-foreground"}`}>
                    {check.label}
                  </span>
                  {check.status === "warn" && <Button variant="link" size="sm" className="text-[10px] text-accent ml-auto h-auto p-0">Fix</Button>}
                  {check.status === "error" && <Button variant="link" size="sm" className="text-[10px] text-destructive ml-auto h-auto p-0">Fix Now</Button>}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="mt-4">
          <div className="bg-card border border-border rounded-xl xalco-shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-xs font-semibold text-foreground">Keyword Rankings</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Keyword", "Position", "Search Volume", "Change"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-5 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((kw) => (
                  <tr key={kw.keyword} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-5 py-3 text-xs font-medium text-foreground">{kw.keyword}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-bold ${kw.position <= 10 ? "text-[hsl(152_60%_40%)]" : kw.position <= 20 ? "text-[hsl(38_92%_50%)]" : "text-muted-foreground"}`}>
                        #{kw.position}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{kw.volume.toLocaleString()}/mo</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium ${kw.change.startsWith("+") ? "text-[hsl(152_60%_40%)]" : "text-destructive"}`}>
                        {kw.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="sitemap" className="mt-4">
          <div className="max-w-xl space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm space-y-4">
              <h3 className="text-xs font-semibold text-foreground">Sitemap Configuration</h3>
              {[
                { label: "Auto-generate Sitemap", desc: "Automatically update when content changes", checked: true },
                { label: "Include Product Pages", desc: "Add all product URLs to sitemap", checked: true },
                { label: "Include Blog Posts", desc: "Add blog post URLs to sitemap", checked: true },
                { label: "Include Category Pages", desc: "Add category URLs to sitemap", checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
              <div className="pt-2 flex gap-2">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                  onClick={() => toast({ title: "Sitemap regenerated!" })}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Regenerate
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-border">
                  <Download className="h-3.5 w-3.5 mr-1.5" /> Download XML
                </Button>
                <Button variant="outline" size="sm" className="text-xs border-border">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Submit to Google
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
