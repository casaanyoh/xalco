import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { FileText, Receipt, HandCoins, Clock } from "lucide-react";

const invoices = [
  { id: "INV-001", customer: "Acme Corp", date: "2024-02-18", due: "2024-03-18", amount: "$4,500.00", status: "paid" },
  { id: "INV-002", customer: "Global Trade", date: "2024-02-15", due: "2024-03-15", amount: "$2,800.00", status: "pending" },
  { id: "INV-003", customer: "Quick Mart", date: "2024-02-10", due: "2024-03-10", amount: "$1,200.00", status: "overdue" },
  { id: "INV-004", customer: "Fresh Foods", date: "2024-02-08", due: "2024-03-08", amount: "$6,100.00", status: "paid" },
  { id: "INV-005", customer: "Bright Inc.", date: "2024-02-05", due: "2024-03-05", amount: "$3,350.00", status: "pending" },
];

const bills = [
  { id: "BILL-001", vendor: "ABC Supplies", date: "2024-02-18", due: "2024-03-18", amount: "$8,200.00", status: "paid" },
  { id: "BILL-002", vendor: "Office Pro", date: "2024-02-14", due: "2024-03-14", amount: "$1,600.00", status: "pending" },
  { id: "BILL-003", vendor: "Logistics Co.", date: "2024-02-10", due: "2024-03-10", amount: "$3,900.00", status: "overdue" },
  { id: "BILL-004", vendor: "Print Hub", date: "2024-02-06", due: "2024-03-06", amount: "$750.00", status: "paid" },
];

const payments = [
  { id: "PAY-001", ref: "INV-001", date: "2024-02-18", method: "Bank Transfer", amount: "$4,500.00", type: "received" },
  { id: "PAY-002", ref: "BILL-001", date: "2024-02-18", method: "Bank Transfer", amount: "$8,200.00", type: "sent" },
  { id: "PAY-003", ref: "INV-004", date: "2024-02-12", method: "Credit Card", amount: "$6,100.00", type: "received" },
  { id: "PAY-004", ref: "BILL-004", date: "2024-02-10", method: "Cash", amount: "$750.00", type: "sent" },
];

function mapTab(tab: string | null): string {
  if (tab?.includes("bill")) return "bills";
  if (tab?.includes("payment")) return "payments";
  return "invoices";
}

export default function AccountingInvoices() {
  const [searchParams] = useSearchParams();
  const defaultTab = mapTab(searchParams.get("tab"));

  return (
    <PageShell title="Invoices & Bills" subtitle="Manage sales invoices, purchase bills, and payments">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Invoiced" value="$17,950" icon={<FileText className="h-5 w-5" />} change="+14%" trend="up" />
        <KpiCard title="Pending Invoices" value="$6,150" icon={<Clock className="h-5 w-5" />} change="+3%" trend="up" />
        <KpiCard title="Total Bills" value="$14,450" icon={<Receipt className="h-5 w-5" />} change="+8%" trend="up" />
        <KpiCard title="Payments Made" value="$19,550" icon={<HandCoins className="h-5 w-5" />} change="+22%" trend="up" />
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="invoices">Sales Invoices</TabsTrigger>
          <TabsTrigger value="bills">Purchase Bills</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Invoices */}
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-9" />
            </div>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />Create Invoice</Button>
          </div>
          <Card className="xalco-shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Invoice #</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Customer</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Due Date</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((row) => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold">{row.id}</td>
                      <td className="px-4 py-3 font-medium">{row.customer}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.due}</td>
                      <td className="px-4 py-3 text-right font-semibold">{row.amount}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge label={row.status} variant={row.status === "paid" ? "success" : row.status === "overdue" ? "error" : "warning"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bills */}
        <TabsContent value="bills" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bills..." className="pl-9" />
            </div>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />Add Bill</Button>
          </div>
          <Card className="xalco-shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Bill #</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Vendor</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Due Date</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((row) => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold">{row.id}</td>
                      <td className="px-4 py-3 font-medium">{row.vendor}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.due}</td>
                      <td className="px-4 py-3 text-right font-semibold">{row.amount}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge label={row.status} variant={row.status === "paid" ? "success" : row.status === "overdue" ? "error" : "warning"} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-9" />
            </div>
            <Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />Record Payment</Button>
          </div>
          <Card className="xalco-shadow-sm">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Payment #</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Reference</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Method</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Amount</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((row) => (
                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs font-semibold">{row.id}</td>
                      <td className="px-4 py-3 font-medium">{row.ref}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
                      <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{row.method}</Badge></td>
                      <td className={`px-4 py-3 text-right font-semibold ${row.type === "received" ? "text-green-600" : "text-red-500"}`}>
                        {row.type === "sent" ? "-" : "+"}{row.amount}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={row.type === "received" ? "default" : "secondary"} className="text-xs capitalize">
                          {row.type}
                        </Badge>
                      </td>
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
