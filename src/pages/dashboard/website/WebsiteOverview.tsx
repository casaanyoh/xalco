import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Globe, ShoppingBag, Eye, TrendingUp, TrendingDown, Users, Star,
  ExternalLink, ArrowRight, Zap, CheckCircle2, AlertCircle,
  Palette, FileText, Image, BarChart3, ShoppingCart, Sparkles,
  Activity, Clock, MousePointer,
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const trafficData = [
  { day: "Mon", visits: 1240, orders: 34 },
  { day: "Tue", visits: 1850, orders: 52 },
  { day: "Wed", visits: 1420, orders: 41 },
  { day: "Thu", visits: 2100, orders: 67 },
  { day: "Fri", visits: 2680, orders: 89 },
  { day: "Sat", visits: 3200, orders: 112 },
  { day: "Sun", visits: 2750, orders: 95 },
];

const kpis = [
  { label: "Total Visitors", value: "15,240", change: "+18.4%", up: true, icon: Eye, color: "hsl(172 66% 40%)" },
  { label: "Online Orders", value: "490", change: "+12.1%", up: true, icon: ShoppingCart, color: "hsl(210 80% 52%)" },
  { label: "Conversion Rate", value: "3.21%", change: "+0.4%", up: true, icon: MousePointer, color: "hsl(152 60% 40%)" },
  { label: "Avg. Session", value: "2m 34s", change: "-0.12%", up: false, icon: Clock, color: "hsl(38 92% 50%)" },
];

const quickLinks = [
  { label: "Edit Storefront", desc: "Customize layout", icon: Palette, path: "/dashboard/website/theme", color: "hsl(172 66% 40%)" },
  { label: "Manage Products", desc: "Catalog & stock", icon: ShoppingBag, path: "/dashboard/website/catalog", color: "hsl(210 80% 52%)" },
  { label: "Blog Posts", desc: "Create content", icon: FileText, path: "/dashboard/website/blog", color: "hsl(38 92% 50%)" },
  { label: "Media Library", desc: "Files & images", icon: Image, path: "/dashboard/website/media", color: "hsl(152 60% 40%)" },
  { label: "SEO Settings", desc: "Search ranking", icon: Globe, path: "/dashboard/website/seo", color: "hsl(280 60% 50%)" },
  { label: "Analytics", desc: "Traffic data", icon: BarChart3, path: "/dashboard/website/analytics", color: "hsl(0 72% 51%)" },
];

const statusChecks = [
  { label: "SSL Certificate", status: "ok" },
  { label: "Store Online", status: "ok" },
  { label: "Google Analytics", status: "ok" },
  { label: "Sitemap Submitted", status: "warn" },
  { label: "Facebook Pixel", status: "warn" },
  { label: "Live Chat Widget", status: "off" },
];

const recentActivity = [
  { action: "New order #1042 received", time: "2 min ago", type: "order", icon: ShoppingCart },
  { action: "Product 'Wireless Earbuds Pro' updated", time: "14 min ago", type: "product", icon: ShoppingBag },
  { action: "Blog post 'Summer Collection' published", time: "1 hour ago", type: "blog", icon: FileText },
  { action: "Theme color updated", time: "3 hours ago", type: "theme", icon: Palette },
  { action: "New customer registered", time: "5 hours ago", type: "customer", icon: Users },
];

export default function WebsiteOverview() {
  return (
    <PageShell
      title="Website Overview"
      subtitle="Monitor your online store performance at a glance"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground" asChild>
            <a href="/store" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              View Live Store
            </a>
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm">
            <Zap className="h-3.5 w-3.5 mr-1.5" />
            Quick Publish
          </Button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-2xl p-5 xalco-shadow-sm hover:xalco-shadow transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground font-medium">{k.label}</span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${k.color}15` }}
              >
                <k.icon className="h-4.5 w-4.5" style={{ color: k.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{k.value}</p>
            <div className="flex items-center gap-1.5">
              {k.up ? (
                <TrendingUp className="h-3 w-3 text-[hsl(152,60%,40%)]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${k.up ? "text-[hsl(152,60%,40%)]" : "text-destructive"}`}>
                {k.change}
              </span>
              <span className="text-[10px] text-muted-foreground">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Weekly Traffic & Orders</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Visitors and conversions this week</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="text-[10px] text-muted-foreground">Visits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(38,92%,50%)]" />
                <span className="text-[10px] text-muted-foreground">Orders</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(172 66% 40%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(172 66% 40%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38 92% 50%)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(38 92% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 13% 89%)", borderRadius: 12, fontSize: 12, boxShadow: "0 4px 12px hsl(220 20% 12% / 0.08)" }} />
              <Area type="monotone" dataKey="visits" stroke="hsl(172 66% 40%)" strokeWidth={2} fill="url(#gVisits)" name="Visits" />
              <Area type="monotone" dataKey="orders" stroke="hsl(38 92% 50%)" strokeWidth={2} fill="url(#gOrders)" name="Orders" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Store Health */}
        <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-foreground">Store Health</h3>
            <Badge variant="secondary" className="text-[10px]">
              <Activity className="h-3 w-3 mr-1" /> Live
            </Badge>
          </div>
          <div className="space-y-3">
            {statusChecks.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-1">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                {s.status === "ok" && <CheckCircle2 className="h-4 w-4 text-[hsl(152,60%,40%)]" />}
                {s.status === "warn" && <AlertCircle className="h-4 w-4 text-[hsl(38,92%,50%)]" />}
                {s.status === "off" && <div className="w-2.5 h-2.5 rounded-full bg-border" />}
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Overall Score</span>
              <span className="text-sm font-bold text-accent">72/100</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent to-[hsl(152,60%,40%)] rounded-full transition-all" style={{ width: "72%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">Quick Access</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((q) => (
            <Link
              key={q.label}
              to={q.path}
              className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-3 hover:border-accent/40 hover:xalco-shadow transition-all duration-200 group text-center"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${q.color}12` }}
              >
                <q.icon className="h-5 w-5" style={{ color: q.color }} />
              </div>
              <div>
                <span className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors block">{q.label}</span>
                <span className="text-[10px] text-muted-foreground">{q.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Recent Store Activity</h3>
          <Button variant="ghost" size="sm" className="text-xs text-accent">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/20 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-accent/8 flex items-center justify-center flex-shrink-0">
                <a.icon className="h-3.5 w-3.5 text-accent" />
              </div>
              <span className="text-xs text-foreground flex-1">{a.action}</span>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
