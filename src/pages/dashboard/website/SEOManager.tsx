import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Globe, CheckCircle2, AlertCircle, XCircle,
  TrendingUp, Link2, RefreshCw, Download, ExternalLink, Search,
} from "lucide-react";

const seoChecks = [
  { label: "Meta title set", status: "ok", detail: "XALCO — Modern Commerce Platform" },
  { label: "Meta description set", status: "ok", detail: "58/160 characters" },
  { label: "Canonical URLs configured", status: "ok", detail: "All pages have canonical tags" },
  { label: "Sitemap.xml submitted", status: "warn", detail: "Last submitted 14 days ago" },
  { label: "Robots.txt configured", status: "ok", detail: "Properly configured" },
  { label: "Open Graph tags", status: "ok", detail: "All pages covered" },
  { label: "Schema markup", status: "warn", detail: "Missing on product pages" },
  { label: "Page speed > 90", status: "warn", detail: "Current score: 82" },
  { label: "Mobile-friendly", status: "ok", detail: "All pages pass" },
  { label: "Broken links check", status: "error", detail: "3 broken links found" },
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
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm"
            onClick={() => toast({ title: "SEO settings saved" })}>
            Save Settings
          </Button>
        </div>
      }
    >
      {/* SEO Score + KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm flex flex-col items-center justify-center text-center">
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
          { label: "Indexed Pages", value: "84", icon: Globe, note: "of 91 total", color: "hsl(172 66% 40%)" },
          { label: "Organic Traffic", value: "3,240", icon: TrendingUp, note: "+18% this month", color: "hsl(152 60% 40%)" },
          { label: "Backlinks", value: "126", icon: Link2, note: "12 new this week", color: "hsl(210 80% 52%)" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5 xalco-shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <s.icon className="h-4 w-4" style={{ color: s.color }} />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-[hsl(152,60%,40%)] mt-1 font-medium">{s.note}</p>
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
            <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-5">
              <h3 className="text-sm font-semibold text-foreground">Homepage Meta Tags</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Page Title</Label>
                  <Badge variant="secondary" className="text-[10px]">34/60 chars</Badge>
                </div>
                <Input defaultValue="XALCO — Modern Commerce Platform" className="h-10 text-sm" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Meta Description</Label>
                  <Badge variant="secondary" className="text-[10px]">58/160 chars</Badge>
                </div>
                <Textarea defaultValue="Shop the latest products at XALCO. Fast shipping, great prices, quality guaranteed." rows={2} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Focus Keywords</Label>
                <Input defaultValue="online store, ecommerce, shop, products" className="h-10 text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Canonical URL</Label>
                <Input defaultValue="https://xalco.lovable.app" className="h-10 text-sm font-mono text-xs" />
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-5">
              <h3 className="text-sm font-semibold text-foreground">Open Graph (Social Sharing)</h3>
              <div className="space-y-2">
                <Label className="text-xs font-medium">OG Title</Label>
                <Input defaultValue="XALCO Store — Shop Premium Products" className="h-10 text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">OG Description</Label>
                <Textarea defaultValue="Discover curated collections of premium products at XALCO." rows={2} />
              </div>
              <div className="bg-muted/20 rounded-2xl overflow-hidden border border-border">
                <div className="h-24 bg-gradient-to-r from-primary to-primary/50 flex items-center justify-center">
                  <span className="text-primary-foreground/40 text-xs">OG Image Preview</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">xalco.lovable.app</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">XALCO Store — Shop Premium Products</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Discover curated collections of premium products at XALCO.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden max-w-2xl">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">SEO Audit Checklist</h3>
              <Badge variant="secondary" className="text-[10px]">
                {seoChecks.filter(c => c.status === "ok").length}/{seoChecks.length} passed
              </Badge>
            </div>
            <div className="divide-y divide-border">
              {seoChecks.map((check) => (
                <div key={check.label} className="flex items-center gap-3 px-6 py-3.5 hover:bg-muted/10 transition-colors">
                  {check.status === "ok" && <CheckCircle2 className="h-4.5 w-4.5 text-[hsl(152,60%,40%)] flex-shrink-0" />}
                  {check.status === "warn" && <AlertCircle className="h-4.5 w-4.5 text-[hsl(38,92%,50%)] flex-shrink-0" />}
                  {check.status === "error" && <XCircle className="h-4.5 w-4.5 text-destructive flex-shrink-0" />}
                  <div className="flex-1">
                    <span className="text-xs font-medium text-foreground">{check.label}</span>
                    <p className="text-[10px] text-muted-foreground">{check.detail}</p>
                  </div>
                  {check.status === "warn" && <Button variant="link" size="sm" className="text-[10px] text-accent h-auto p-0">Fix</Button>}
                  {check.status === "error" && <Button variant="link" size="sm" className="text-[10px] text-destructive h-auto p-0">Fix Now</Button>}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="mt-4">
          <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Keyword Rankings</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Keyword", "Position", "Search Volume", "Change"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topKeywords.map((kw) => (
                  <tr key={kw.keyword} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <Search className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-medium text-foreground">{kw.keyword}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant={kw.position <= 10 ? "default" : "secondary"} className="text-[10px]">
                        #{kw.position}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-muted-foreground">{kw.volume.toLocaleString()}/mo</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-semibold ${kw.change.startsWith("+") ? "text-[hsl(152,60%,40%)]" : "text-destructive"}`}>
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
          <div className="max-w-xl space-y-5">
            <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-5">
              <h3 className="text-sm font-semibold text-foreground">Sitemap Configuration</h3>
              {[
                { label: "Auto-generate Sitemap", desc: "Automatically update when content changes", checked: true },
                { label: "Include Product Pages", desc: "Add all product URLs to sitemap", checked: true },
                { label: "Include Blog Posts", desc: "Add blog post URLs to sitemap", checked: true },
                { label: "Include Category Pages", desc: "Add category URLs to sitemap", checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-muted/10 rounded-xl">
                  <div>
                    <p className="text-xs font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.checked} />
                </div>
              ))}
              <div className="pt-2 flex gap-2">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs xalco-shadow-sm"
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
