import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/dashboard/KpiCard";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  CreditCard,
  HandCoins,
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
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 48000, expenses: 31000 },
  { month: "Mar", revenue: 55000, expenses: 33000 },
  { month: "Apr", revenue: 51000, expenses: 29000 },
  { month: "May", revenue: 63000, expenses: 35000 },
  { month: "Jun", revenue: 70000, expenses: 38000 },
];

const expenseBreakdown = [
  { name: "Salaries", amount: 15000 },
  { name: "Rent", amount: 5000 },
  { name: "Utilities", amount: 2200 },
  { name: "Marketing", amount: 4500 },
  { name: "Supplies", amount: 3100 },
  { name: "Other", amount: 1800 },
];

export default function AccountingOverview() {
  return (
    <PageShell title="Accounting Overview" subtitle="Financial snapshot of your business">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Revenue" value="$329,000" change="+12.5%" trend="up" icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard title="Total Expenses" value="$194,000" change="+8.2%" trend="up" icon={<TrendingDown className="h-5 w-5" />} />
        <KpiCard title="Net Profit" value="$135,000" change="+18.4%" trend="up" icon={<DollarSign className="h-5 w-5" />} />
        <KpiCard title="Cash & Bank" value="$86,400" change="+3.1%" trend="up" icon={<Wallet className="h-5 w-5" />} />
        <KpiCard title="Payables" value="$24,500" change="-5.3%" trend="down" icon={<CreditCard className="h-5 w-5" />} />
        <KpiCard title="Receivables" value="$31,200" change="+2.7%" trend="up" icon={<HandCoins className="h-5 w-5" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="xalco-shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(172 66% 40%)" fill="hsl(172 66% 40% / 0.15)" strokeWidth={2} />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(0 72% 51%)" fill="hsl(0 72% 51% / 0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="xalco-shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(220 24% 16%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="xalco-shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { desc: "POS Sale #1042", amount: "+$1,250.00", type: "income", date: "Today" },
              { desc: "Supplier Payment — ABC Co.", amount: "-$3,400.00", type: "expense", date: "Today" },
              { desc: "Online Order #2087", amount: "+$890.00", type: "income", date: "Yesterday" },
              { desc: "Rent — Main Store", amount: "-$5,000.00", type: "expense", date: "Feb 15" },
              { desc: "POS Sale #1041", amount: "+$2,100.00", type: "income", date: "Feb 14" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{tx.desc}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}
