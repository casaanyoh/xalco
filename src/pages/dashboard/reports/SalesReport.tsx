import { PageShell } from "@/components/dashboard/PageShell";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyData = [
  { month: "Sep", revenue: 28400, orders: 312 },
  { month: "Oct", revenue: 32100, orders: 348 },
  { month: "Nov", revenue: 38900, orders: 421 },
  { month: "Dec", revenue: 45200, orders: 498 },
  { month: "Jan", revenue: 41800, orders: 462 },
  { month: "Feb", revenue: 42580, orders: 478 },
];

const dailyData = [
  { day: "Mon", sales: 6200 }, { day: "Tue", sales: 5800 }, { day: "Wed", sales: 7100 },
  { day: "Thu", sales: 6500 }, { day: "Fri", sales: 8400 }, { day: "Sat", sales: 9200 }, { day: "Sun", sales: 4300 },
];

export default function SalesReport() {
  return (
    <PageShell title="Sales Report" subtitle="Comprehensive sales analytics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value="$42,580" change="+12.5% vs last month" trend="up" icon={<DollarSign className="h-5 w-5" />} />
        <KpiCard title="Total Orders" value="478" change="+8.2% vs last month" trend="up" icon={<ShoppingBag className="h-5 w-5" />} />
        <KpiCard title="Avg Order Value" value="$89.08" change="+3.9% vs last month" trend="up" icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard title="Unique Customers" value="312" change="+5.1% vs last month" trend="up" icon={<Users className="h-5 w-5" />} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(172, 66%, 40%)" strokeWidth={2} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">Daily Sales (This Week)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 89%)", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="sales" fill="hsl(220, 24%, 16%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageShell>
  );
}
