import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { name: "Jan", revenue: 4200, orders: 120 },
  { name: "Feb", revenue: 5100, orders: 145 },
  { name: "Mar", revenue: 4800, orders: 132 },
  { name: "Apr", revenue: 6300, orders: 178 },
  { name: "May", revenue: 5900, orders: 165 },
  { name: "Jun", revenue: 7200, orders: 201 },
  { name: "Jul", revenue: 6800, orders: 190 },
];

const topProducts = [
  { name: "Wireless Earbuds", sold: 342, revenue: "$12,450" },
  { name: "Leather Wallet", sold: 285, revenue: "$8,550" },
  { name: "Smart Watch", sold: 198, revenue: "$29,700" },
  { name: "Running Shoes", sold: 176, revenue: "$15,840" },
  { name: "Backpack Pro", sold: 154, revenue: "$10,780" },
];

const recentOrders = [
  { id: "#XL-1247", customer: "Sarah Chen", total: "$249.00", status: "Completed", channel: "Online" },
  { id: "#XL-1246", customer: "James Wilson", total: "$89.50", status: "Processing", channel: "POS" },
  { id: "#XL-1245", customer: "Maria Garcia", total: "$432.00", status: "Completed", channel: "Online" },
  { id: "#XL-1244", customer: "Alex Turner", total: "$67.00", status: "Shipped", channel: "Online" },
  { id: "#XL-1243", customer: "Walk-in", total: "$124.50", status: "Completed", channel: "POS" },
];

const channelData = [
  { name: "Online", value: 62 },
  { name: "POS", value: 38 },
];

export default function DashboardHome() {
  return (
    <>
      <DashboardHeader title="Dashboard" subtitle="Welcome back. Here's your store overview." />
      <div className="p-6 space-y-6 overflow-y-auto">
        {/* KPI Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Total Revenue"
            value="$42,580"
            change="+12.5% from last month"
            trend="up"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <KpiCard
            title="Orders"
            value="1,131"
            change="+8.2% from last month"
            trend="up"
            icon={<ShoppingBag className="h-5 w-5" />}
          />
          <KpiCard
            title="Customers"
            value="847"
            change="+3.1% from last month"
            trend="up"
            icon={<Users className="h-5 w-5" />}
          />
          <KpiCard
            title="Low Stock Items"
            value="12"
            change="3 critical"
            trend="down"
            icon={<Package className="h-5 w-5" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Revenue Overview</h3>
                <p className="text-xs text-muted-foreground">Monthly revenue trend</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-success">
                <TrendingUp className="h-3.5 w-3.5" />
                +12.5%
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(172, 66%, 40%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 89%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 89%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(172, 66%, 40%)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Split */}
          <div className="bg-card rounded-lg border border-border p-5 xalco-shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-1">Sales by Channel</h3>
            <p className="text-xs text-muted-foreground mb-4">Online vs In-store</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={channelData} layout="vertical" barSize={28}>
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" width={50} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 89%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Share"]}
                />
                <Bar dataKey="value" fill="hsl(172, 66%, 40%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Online</span>
                <span className="font-medium text-foreground">62%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">In-store (POS)</span>
                <span className="font-medium text-foreground">38%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Orders */}
          <div className="bg-card rounded-lg border border-border xalco-shadow-sm">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent Orders</h3>
              <button className="text-xs font-medium text-accent hover:underline flex items-center gap-0.5">
                View all <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      order.status === "Completed" ? "bg-success/10 text-success" :
                      order.status === "Processing" ? "bg-warning/10 text-warning" :
                      "bg-info/10 text-info"
                    }`}>
                      {order.status}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      order.channel === "POS" ? "bg-secondary text-secondary-foreground" : "bg-accent/10 text-accent"
                    }`}>
                      {order.channel}
                    </span>
                    <span className="text-sm font-semibold text-foreground w-20 text-right">{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-card rounded-lg border border-border xalco-shadow-sm">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Top Products</h3>
              <button className="text-xs font-medium text-accent hover:underline flex items-center gap-0.5">
                View all <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-border">
              {topProducts.map((product, i) => (
                <div key={product.name} className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sold} units sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{product.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
