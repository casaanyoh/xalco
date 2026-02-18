import { PageShell } from "@/components/dashboard/PageShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Globe, Monitor, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const channelComparison = [
  { month: "Sep", online: 18200, pos: 10200 },
  { month: "Oct", online: 20100, pos: 12000 },
  { month: "Nov", online: 24800, pos: 14100 },
  { month: "Dec", online: 28900, pos: 16300 },
  { month: "Jan", online: 26400, pos: 15400 },
  { month: "Feb", online: 26400, pos: 16180 },
];

const pieData = [
  { name: "Online", value: 62, color: "hsl(172, 66%, 40%)" },
  { name: "POS", value: 38, color: "hsl(220, 24%, 16%)" },
];

export default function ChannelReport() {
  return (
    <PageShell title="Channel Report" subtitle="Compare online and in-store performance">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Online Revenue" value="$26,400" change="+9.8% vs last month" trend="up" icon={<Globe className="h-5 w-5" />} />
        <KpiCard title="POS Revenue" value="$16,180" change="+5.1% vs last month" trend="up" icon={<Monitor className="h-5 w-5" />} />
        <KpiCard title="Online Growth" value="+12.3%" change="Year-over-year" trend="up" icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard title="Channel Mix" value="62/38" change="Online / POS split" trend="up" icon={<BarChart3 className="h-5 w-5" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue by Channel</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={channelComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="online" name="Online" fill="hsl(172, 66%, 40%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pos" name="POS" fill="hsl(220, 24%, 16%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">Channel Split</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
