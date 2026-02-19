import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

const incomeData = [
  { id: "INC-001", date: "2024-02-18", desc: "POS Sale #1042", category: "POS Sales", amount: "$1,250.00", status: "completed" },
  { id: "INC-002", date: "2024-02-17", desc: "Online Order #2087", category: "Online Sales", amount: "$890.00", status: "completed" },
  { id: "INC-003", date: "2024-02-16", desc: "Wholesale Order", category: "Offline Sales", amount: "$4,200.00", status: "pending" },
  { id: "INC-004", date: "2024-02-15", desc: "POS Sale #1041", category: "POS Sales", amount: "$2,100.00", status: "completed" },
];

const expenseData = [
  { id: "EXP-001", date: "2024-02-18", desc: "Supplier — ABC Co.", category: "Supplies", amount: "$3,400.00", status: "paid" },
  { id: "EXP-002", date: "2024-02-15", desc: "Monthly Rent", category: "Rent", amount: "$5,000.00", status: "paid" },
  { id: "EXP-003", date: "2024-02-14", desc: "Electricity Bill", category: "Utilities", amount: "$850.00", status: "pending" },
  { id: "EXP-004", date: "2024-02-12", desc: "Google Ads Campaign", category: "Marketing", amount: "$1,200.00", status: "paid" },
];

const journalData = [
  { id: "JE-001", date: "2024-02-18", desc: "Inventory Restock", debit: "$8,500.00", credit: "$8,500.00", status: "posted" },
  { id: "JE-002", date: "2024-02-16", desc: "Depreciation — Equipment", debit: "$500.00", credit: "$500.00", status: "posted" },
  { id: "JE-003", date: "2024-02-14", desc: "Salary Accrual", debit: "$15,000.00", credit: "$15,000.00", status: "draft" },
];

function mapTab(tab: string | null): string {
  if (tab?.includes("expense")) return "expenses";
  if (tab?.includes("journal")) return "journal";
  return "income";
}

export default function AccountingTransactions() {
  const [searchParams] = useSearchParams();
  const defaultTab = mapTab(searchParams.get("tab"));

  return (
    <PageShell title="Transactions" subtitle="Manage income, expenses, and journal entries">
      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
        </TabsList>

        {/* Income Tab */}
        <TabsContent value="income" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search income..." className="pl-9" />
            </div>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />Add Income</Button>
          </div>
          <Card className="xalco-shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeData.map((row) => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3 font-medium">{row.desc}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{row.category}</Badge></td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">{row.amount}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge label={row.status} variant={row.status === "completed" ? "success" : "warning"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search expenses..." className="pl-9" />
            </div>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />Add Expense</Button>
          </div>
          <Card className="xalco-shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseData.map((row) => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3 font-medium">{row.desc}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{row.category}</Badge></td>
                      <td className="px-4 py-3 text-right font-semibold text-red-500">{row.amount}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge label={row.status} variant={row.status === "paid" ? "success" : "warning"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journal Entries Tab */}
        <TabsContent value="journal" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search journal entries..." className="pl-9" />
            </div>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />New Entry</Button>
          </div>
          <Card className="xalco-shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Debit</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Credit</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {journalData.map((row) => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3 font-medium">{row.desc}</td>
                      <td className="px-4 py-3 text-right font-semibold">{row.debit}</td>
                      <td className="px-4 py-3 text-right font-semibold">{row.credit}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge label={row.status} variant={row.status === "posted" ? "success" : "info"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
