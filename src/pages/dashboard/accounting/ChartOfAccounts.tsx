import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

interface Account {
  code: string;
  name: string;
  balance: string;
  type: string;
}

const accountsData: Record<string, Account[]> = {
  assets: [
    { code: "1001", name: "Cash", balance: "$24,500", type: "Current" },
    { code: "1002", name: "Bank — Main Account", balance: "$61,900", type: "Current" },
    { code: "1010", name: "Inventory", balance: "$45,200", type: "Current" },
    { code: "1020", name: "Accounts Receivable", balance: "$31,200", type: "Current" },
    { code: "1100", name: "Equipment", balance: "$18,000", type: "Fixed" },
  ],
  liabilities: [
    { code: "2001", name: "Accounts Payable", balance: "$24,500", type: "Current" },
    { code: "2010", name: "Short-term Loan", balance: "$15,000", type: "Current" },
    { code: "2100", name: "Long-term Loan", balance: "$50,000", type: "Non-current" },
  ],
  equity: [
    { code: "3001", name: "Owner's Capital", balance: "$100,000", type: "Capital" },
    { code: "3010", name: "Retained Earnings", balance: "$35,000", type: "Earnings" },
  ],
  revenue: [
    { code: "4001", name: "POS Sales", balance: "$180,000", type: "Operating" },
    { code: "4002", name: "Online Sales", balance: "$95,000", type: "Operating" },
    { code: "4003", name: "Offline Sales", balance: "$42,000", type: "Operating" },
    { code: "4100", name: "Other Income", balance: "$12,000", type: "Non-operating" },
  ],
  expenses: [
    { code: "5001", name: "Operating Expenses", balance: "$48,000", type: "Operating" },
    { code: "5010", name: "Salaries", balance: "$90,000", type: "Operating" },
    { code: "5020", name: "Rent", balance: "$30,000", type: "Operating" },
    { code: "5030", name: "Utilities", balance: "$12,000", type: "Operating" },
    { code: "5040", name: "Marketing", balance: "$14,000", type: "Operating" },
  ],
};

export default function ChartOfAccounts() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "assets";

  return (
    <PageShell
      title="Chart of Accounts"
      subtitle="Manage your financial accounts structure"
      actions={<Button size="sm"><PlusCircle className="h-4 w-4 mr-2" />Add Account</Button>}
    >
      <Tabs defaultValue={category} className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
          <TabsTrigger value="equity">Equity</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        {Object.entries(accountsData).map(([key, accounts]) => (
          <TabsContent key={key} value={key}>
            <Card className="xalco-shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-semibold capitalize">{key} Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Code</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Account Name</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                        <th className="text-right px-4 py-3 font-medium text-muted-foreground">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((acc) => (
                        <tr key={acc.code} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{acc.code}</td>
                          <td className="px-4 py-3 font-medium">{acc.name}</td>
                          <td className="px-4 py-3"><Badge variant="secondary" className="text-xs">{acc.type}</Badge></td>
                          <td className="px-4 py-3 text-right font-semibold">{acc.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </PageShell>
  );
}
