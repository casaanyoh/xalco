import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const plData = [
  { month: "Jan", revenue: 42000, cogs: 18000, opex: 12000 },
  { month: "Feb", revenue: 48000, cogs: 20000, opex: 13000 },
  { month: "Mar", revenue: 55000, cogs: 22000, opex: 14000 },
  { month: "Apr", revenue: 51000, cogs: 19000, opex: 12500 },
  { month: "May", revenue: 63000, cogs: 25000, opex: 15000 },
  { month: "Jun", revenue: 70000, cogs: 28000, opex: 16000 },
];

const balanceSheetData = [
  { name: "Cash & Bank", amount: 86400 },
  { name: "Receivables", amount: 31200 },
  { name: "Inventory", amount: 45200 },
  { name: "Equipment", amount: 18000 },
  { name: "Payables", amount: -24500 },
  { name: "Loans", amount: -65000 },
];

const cashFlowData = [
  { month: "Jan", inflow: 44000, outflow: 32000 },
  { month: "Feb", inflow: 50000, outflow: 36000 },
  { month: "Mar", inflow: 58000, outflow: 40000 },
  { month: "Apr", inflow: 52000, outflow: 34000 },
  { month: "May", inflow: 66000, outflow: 42000 },
  { month: "Jun", inflow: 73000, outflow: 45000 },
];

const expensePie = [
  { name: "Salaries", value: 90000 },
  { name: "Rent", value: 30000 },
  { name: "Utilities", value: 12000 },
  { name: "Marketing", value: 14000 },
  { name: "Supplies", value: 18000 },
  { name: "Other", value: 10000 },
];
const PIE_COLORS = ["hsl(220,24%,16%)", "hsl(172,66%,40%)", "hsl(38,92%,50%)", "hsl(152,60%,40%)", "hsl(0,72%,51%)", "hsl(220,14%,60%)"];

function mapTab(tab: string | null): string {
  if (tab === "balance-sheet") return "balance";
  if (tab === "cash-flow") return "cashflow";
  if (tab === "general-ledger") return "ledger";
  if (tab === "expense-report") return "expense";
  if (tab === "tax-report") return "tax";
  return "pnl";
}

export default function AccountingReports() {
  const [searchParams] = useSearchParams();
  const defaultTab = mapTab(searchParams.get("tab"));

  return (
    <PageShell title="Accounting Reports" subtitle="Financial reports and analytics">
      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="bg-muted flex-wrap">
          <TabsTrigger value="pnl">Profit & Loss</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          <TabsTrigger value="expense">Expense Report</TabsTrigger>
          <TabsTrigger value="tax">Tax Report</TabsTrigger>
        </TabsList>

        {/* Profit & Loss */}
        <TabsContent value="pnl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-2xl font-bold mt-1">$329,000</p></CardContent></Card>
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Total COGS</p><p className="text-2xl font-bold mt-1">$132,000</p></CardContent></Card>
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Net Profit</p><p className="text-2xl font-bold mt-1 text-green-600">$114,500</p></CardContent></Card>
          </div>
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">Revenue, COGS & Operating Expenses</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={plData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(172,66%,40%)" radius={[4,4,0,0]} />
                    <Bar dataKey="cogs" fill="hsl(220,24%,16%)" radius={[4,4,0,0]} />
                    <Bar dataKey="opex" fill="hsl(38,92%,50%)" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Balance Sheet */}
        <TabsContent value="balance">
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">Balance Sheet Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50 border-b"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Account</th><th className="text-right px-4 py-3 font-medium text-muted-foreground">Balance</th></tr></thead>
                  <tbody>
                    {balanceSheetData.map((row) => (
                      <tr key={row.name} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{row.name}</td>
                        <td className={`px-4 py-3 text-right font-semibold ${row.amount < 0 ? "text-red-500" : ""}`}>
                          {row.amount < 0 ? "-" : ""}${Math.abs(row.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/30 font-bold">
                      <td className="px-4 py-3">Net Assets</td>
                      <td className="px-4 py-3 text-right">${balanceSheetData.reduce((s, r) => s + r.amount, 0).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow */}
        <TabsContent value="cashflow">
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">Cash Inflow vs Outflow</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="inflow" stroke="hsl(152,60%,40%)" fill="hsl(152,60%,40%/0.15)" strokeWidth={2} />
                    <Area type="monotone" dataKey="outflow" stroke="hsl(0,72%,51%)" fill="hsl(0,72%,51%/0.1)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Ledger */}
        <TabsContent value="ledger">
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">General Ledger</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Account</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Debit</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Credit</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Balance</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { date: "Feb 18", account: "Cash", desc: "POS Sale #1042", debit: "$1,250", credit: "—", balance: "$25,750" },
                      { date: "Feb 18", account: "Revenue", desc: "POS Sale #1042", debit: "—", credit: "$1,250", balance: "$181,250" },
                      { date: "Feb 18", account: "A/P", desc: "ABC Supplies Payment", debit: "$8,200", credit: "—", balance: "$16,300" },
                      { date: "Feb 18", account: "Bank", desc: "ABC Supplies Payment", debit: "—", credit: "$8,200", balance: "$53,700" },
                      { date: "Feb 17", account: "Cash", desc: "Online Order #2087", debit: "$890", credit: "—", balance: "$24,500" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 text-muted-foreground text-xs">{row.date}</td>
                        <td className="px-4 py-3 font-medium">{row.account}</td>
                        <td className="px-4 py-3">{row.desc}</td>
                        <td className="px-4 py-3 text-right font-mono text-xs">{row.debit}</td>
                        <td className="px-4 py-3 text-right font-mono text-xs">{row.credit}</td>
                        <td className="px-4 py-3 text-right font-semibold">{row.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Report */}
        <TabsContent value="expense">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="xalco-shadow-sm">
              <CardHeader><CardTitle className="text-sm">Expense Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={expensePie} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {expensePie.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="xalco-shadow-sm">
              <CardHeader><CardTitle className="text-sm">Expense Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expensePie.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 font-bold">
                    <span>Total</span>
                    <span>${expensePie.reduce((s, i) => s + i.value, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tax Report */}
        <TabsContent value="tax">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Tax Collected (VAT)</p><p className="text-2xl font-bold mt-1">$49,350</p></CardContent></Card>
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Input Tax (Paid)</p><p className="text-2xl font-bold mt-1">$26,100</p></CardContent></Card>
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Net Tax Liability</p><p className="text-2xl font-bold mt-1 text-red-500">$23,250</p></CardContent></Card>
          </div>
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">Quarterly Tax Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Quarter</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Revenue</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Tax Collected</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Input Tax</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Net Liability</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { q: "Q1 2024", rev: "$145,000", collected: "$21,750", input: "$11,600", net: "$10,150" },
                      { q: "Q2 2024", rev: "$184,000", collected: "$27,600", input: "$14,500", net: "$13,100" },
                    ].map((row) => (
                      <tr key={row.q} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{row.q}</td>
                        <td className="px-4 py-3 text-right">{row.rev}</td>
                        <td className="px-4 py-3 text-right">{row.collected}</td>
                        <td className="px-4 py-3 text-right">{row.input}</td>
                        <td className="px-4 py-3 text-right font-semibold text-red-500">{row.net}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
