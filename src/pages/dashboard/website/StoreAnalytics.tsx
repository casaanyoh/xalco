import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Download, Calendar, TrendingUp, TrendingDown, Users, ShoppingCart, Eye, MousePointer } from "lucide-react";

const dailyData = [
  { day: "Mon", visitors: 1240, pageviews: 3820, orders: 34, revenue: 2180 },
  { day: "Tue", visitors: 1850, pageviews: 5540, orders: 52, revenue: 3740 },
  { day: "Wed", visitors: 1420, pageviews: 4260, orders: 41, revenue: 2890 },
  { day: "Thu", visitors: 2100, pageviews: 6300, orders: 67, revenue: 4920 },
  { day: "Fri", visitors: 2680, pageviews: 8040, orders: 89, revenue: 6540 },
  { day: "Sat", visitors: 3200, pageviews: 9600, orders: 112, revenue: 8320 },
  { day: "Sun", visitors: 2750, pageviews: 8250, orders: 95, revenue: 7140 },
];

const trafficSources = [
  { name: "Organic Search", value: 38, color: "hsl(172 66% 40%)" },
  { name: "Direct", value: 24, color: "hsl(220 24% 16%)" },
  { name: "Social Media", value: 18, color: "hsl(210 80% 52%)" },
  { name: "Referral", value: 12, color: "hsl(38 92% 50%)" },
  { name: "Email", value: 8, color: "hsl(152 60% 40%)" },
];

const topPages = [
  { page: "/", title: "Homepage", views: 8240, bounce: "32%", time: "2:14" },
  { page: "/shop", title: "Shop", views: 5120, bounce: "28%", time: "3:42" },
  { page: "/shop/electronics", title: "Electronics", views: 3180, bounce: "35%", time: "2:58" },
  { page: "/blog/top-gadgets-2026", title: "Top 10 Gadgets", views: 2640, bounce: "45%", time: "4:12" },
  { page: "/about", title: "About Us", views: 1420, bounce: "52%", time: "1:34" },
];

const kpis = [
  { label: "Total Visitors", value: "15,240", change: "+18.4%", up: true, icon: Users },
  { label: "Page Views", value: "45,810", change: "+22.1%", up: true, icon: Eye },
  { label: "Conversion Rate", value: "3.21%", change: "+0.41%", up: true, icon: MousePointer },
  { label: "Avg. Session", value: "2m 34s", change: "-8s", up: false, icon: ShoppingCart },
];

export default function StoreAnalytics() {
  return (
    <PageShell
      title="Store Analytics"
      subtitle="Track your online store's traffic, engagement, and conversions"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1.5" /> Last 7 Days
          </Button>
          <Button variant="outline" size="sm" className="border-border text-muted-foreground">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export
          </Button>
        </div>
      }
    >
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-xl p-4 xalco-shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground">{k.label}</span>
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <k.icon className="h-4 w-4 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{k.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {k.up ? (
                <TrendingUp className="h-3 w-3 text-[hsl(152_60%_40%)]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${k.up ? "text-[hsl(152_60%_40%)]" : "text-destructive"}`}>
                {k.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="traffic">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4">Visitors & Page Views</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="gVis" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(172 66% 40%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(172 66% 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gPV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(210 80% 52%)" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="hsl(210 80% 52%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 13% 89%)", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="visitors" stroke="hsl(172 66% 40%)" strokeWidth={2} fill="url(#gVis)" name="Visitors" />
                  <Area type="monotone" dataKey="pageviews" stroke="hsl(210 80% 52%)" strokeWidth={2} fill="url(#gPV)" name="Page Views" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4">Revenue This Week</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyData}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(220 13% 89%)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="revenue" fill="hsl(172 66% 40%)" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Sources</h3>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2}>
                    {trafficSources.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-4">Breakdown</h3>
              <div className="space-y-3">
                {trafficSources.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-foreground">{s.name}</span>
                      <span className="text-xs font-semibold text-foreground">{s.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="mt-4">
          <div className="bg-card border border-border rounded-xl xalco-shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border">
              <h3 className="text-xs font-semibold text-foreground">Top Performing Pages</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  {["Page", "Views", "Bounce Rate", "Avg. Time"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-5 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.page} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-5 py-3">
                      <p className="text-xs font-medium text-foreground">{p.title}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{p.page}</p>
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold text-foreground">{p.views.toLocaleString()}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{p.bounce}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="mt-4">
          <div className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm max-w-2xl">
            <h3 className="text-sm font-semibold text-foreground mb-4">Conversion Funnel</h3>
            <div className="space-y-2">
              {[
                { label: "Store Visitors", count: 15240, pct: 100, color: "hsl(172 66% 40%)" },
                { label: "Product Page Views", count: 9144, pct: 60, color: "hsl(210 80% 52%)" },
                { label: "Add to Cart", count: 3658, pct: 24, color: "hsl(38 92% 50%)" },
                { label: "Checkout Started", count: 1524, pct: 10, color: "hsl(152 60% 40%)" },
                { label: "Orders Completed", count: 490, pct: 3.2, color: "hsl(172 66% 40%)" },
              ].map((step, i) => (
                <div key={step.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-muted-foreground w-4">{i + 1}</span>
                      <span className="text-xs text-foreground">{step.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-foreground">{step.count.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground w-10 text-right">{step.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-5 bg-muted rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md transition-all duration-700"
                      style={{ width: `${step.pct}%`, background: step.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
