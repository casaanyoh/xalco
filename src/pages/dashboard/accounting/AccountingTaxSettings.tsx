import { PageShell } from "@/components/dashboard/PageShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function mapTab(tab: string | null): string {
  if (tab === "vat") return "vat";
  if (tab === "rates") return "rates";
  if (tab === "summary") return "summary";
  return "config";
}

const taxRates = [
  { name: "Standard VAT", rate: "15%", applies: "All Products", status: "active" },
  { name: "Reduced Rate", rate: "5%", applies: "Food & Essentials", status: "active" },
  { name: "Zero Rate", rate: "0%", applies: "Exports", status: "active" },
  { name: "Luxury Tax", rate: "20%", applies: "Premium Items", status: "inactive" },
];

export default function AccountingTaxSettings() {
  const [searchParams] = useSearchParams();
  const defaultTab = mapTab(searchParams.get("tab"));

  return (
    <PageShell title="Tax Settings" subtitle="Configure tax rates, VAT, and compliance settings">
      <Tabs defaultValue={defaultTab} className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="vat">VAT Setup</TabsTrigger>
          <TabsTrigger value="rates">Tax Rates</TabsTrigger>
          <TabsTrigger value="summary">Tax Summary</TabsTrigger>
        </TabsList>

        {/* Configuration */}
        <TabsContent value="config">
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">General Tax Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Tax ID / Registration Number</Label>
                  <Input defaultValue="TAX-2024-00142" />
                </div>
                <div className="space-y-2">
                  <Label>Tax Region</Label>
                  <Select defaultValue="us"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="bg-popover"><SelectItem value="us">United States</SelectItem><SelectItem value="eu">European Union</SelectItem><SelectItem value="uk">United Kingdom</SelectItem><SelectItem value="sa">Saudi Arabia</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Fiscal Year Start</Label>
                  <Select defaultValue="jan"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="bg-popover"><SelectItem value="jan">January</SelectItem><SelectItem value="apr">April</SelectItem><SelectItem value="jul">July</SelectItem><SelectItem value="oct">October</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Default Tax Rate</Label>
                  <Input defaultValue="15" type="number" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Enable Tax Calculation</p><p className="text-xs text-muted-foreground">Auto-calculate tax on invoices and POS</p></div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Tax-Inclusive Pricing</p><p className="text-xs text-muted-foreground">Product prices include tax</p></div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">Show Tax Breakdown on Receipt</p><p className="text-xs text-muted-foreground">Display tax details on POS receipts</p></div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VAT Setup */}
        <TabsContent value="vat">
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">VAT Registration & Setup</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>VAT Registration Number</Label>
                  <Input defaultValue="VAT-SA-2024-0042" />
                </div>
                <div className="space-y-2">
                  <Label>VAT Percentage</Label>
                  <Input defaultValue="15" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Filing Frequency</Label>
                  <Select defaultValue="quarterly"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="bg-popover"><SelectItem value="monthly">Monthly</SelectItem><SelectItem value="quarterly">Quarterly</SelectItem><SelectItem value="annually">Annually</SelectItem></SelectContent></Select>
                </div>
                <div className="space-y-2">
                  <Label>Next Filing Due</Label>
                  <Input defaultValue="2024-03-31" type="date" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-medium">VAT Registered</p><p className="text-xs text-muted-foreground">Enable VAT collection and reporting</p></div>
                <Switch defaultChecked />
              </div>
              <Button>Update VAT Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Rates */}
        <TabsContent value="rates">
          <Card className="xalco-shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Tax Rates</CardTitle>
              <Button size="sm">Add Rate</Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rate</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Applies To</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr></thead>
                  <tbody>
                    {taxRates.map((rate) => (
                      <tr key={rate.name} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{rate.name}</td>
                        <td className="px-4 py-3 font-semibold">{rate.rate}</td>
                        <td className="px-4 py-3 text-muted-foreground">{rate.applies}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant={rate.status === "active" ? "default" : "secondary"} className="text-xs capitalize">{rate.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Summary */}
        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Total Tax Collected (YTD)</p><p className="text-2xl font-bold mt-1">$49,350</p></CardContent></Card>
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Total Input Tax (YTD)</p><p className="text-2xl font-bold mt-1">$26,100</p></CardContent></Card>
            <Card className="xalco-shadow-sm"><CardContent className="pt-6"><p className="text-xs text-muted-foreground">Net Payable</p><p className="text-2xl font-bold mt-1 text-red-500">$23,250</p></CardContent></Card>
          </div>
          <Card className="xalco-shadow-sm">
            <CardHeader><CardTitle className="text-sm">Monthly Tax Collection</CardTitle></CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Month</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Sales Tax</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Input Tax</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Net</th>
                    <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { month: "January", sales: "$6,300", input: "$3,200", net: "$3,100", status: "Filed" },
                      { month: "February", sales: "$7,200", input: "$3,800", net: "$3,400", status: "Filed" },
                      { month: "March", sales: "$8,250", input: "$4,600", net: "$3,650", status: "Filed" },
                      { month: "April", sales: "$7,650", input: "$3,500", net: "$4,150", status: "Pending" },
                      { month: "May", sales: "$9,450", input: "$5,200", net: "$4,250", status: "Pending" },
                      { month: "June", sales: "$10,500", input: "$5,800", net: "$4,700", status: "Due" },
                    ].map((row) => (
                      <tr key={row.month} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{row.month}</td>
                        <td className="px-4 py-3 text-right">{row.sales}</td>
                        <td className="px-4 py-3 text-right">{row.input}</td>
                        <td className="px-4 py-3 text-right font-semibold">{row.net}</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant={row.status === "Filed" ? "default" : row.status === "Due" ? "destructive" : "secondary"} className="text-xs">{row.status}</Badge>
                        </td>
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
