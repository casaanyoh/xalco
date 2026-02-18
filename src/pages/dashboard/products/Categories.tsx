import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen } from "lucide-react";

const categories = [
  { name: "Electronics", products: 24, description: "Gadgets, devices, and tech accessories" },
  { name: "Accessories", products: 18, description: "Bags, wallets, and personal items" },
  { name: "Footwear", products: 12, description: "Shoes, sneakers, and sandals" },
  { name: "Fitness", products: 9, description: "Gym equipment and workout gear" },
  { name: "Apparel", products: 31, description: "Clothing and fashion items" },
];

const columns = [
  {
    key: "name",
    label: "Category",
    render: (c: typeof categories[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
          <FolderOpen className="h-4 w-4 text-accent" />
        </div>
        <span className="font-medium">{c.name}</span>
      </div>
    ),
  },
  { key: "products", label: "Products", render: (c: typeof categories[0]) => <span className="font-semibold">{c.products}</span> },
  { key: "description", label: "Description", render: (c: typeof categories[0]) => <span className="text-muted-foreground">{c.description}</span> },
];

export default function Categories() {
  return (
    <PageShell
      title="Categories"
      subtitle="Organize your product catalog"
      actions={<><div /><Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"><Plus className="h-4 w-4" /> Add Category</Button></>}
    >
      <DataTable columns={columns} data={categories} searchKey="name" searchPlaceholder="Search categories..." />
    </PageShell>
  );
}
