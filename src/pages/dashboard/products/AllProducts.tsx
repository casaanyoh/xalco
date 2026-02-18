import { PageShell } from "@/components/dashboard/PageShell";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  { id: "PRD-001", name: "Wireless Earbuds", category: "Electronics", price: "$49.99", stock: 142, status: "Active" },
  { id: "PRD-002", name: "Leather Wallet", category: "Accessories", price: "$29.99", stock: 85, status: "Active" },
  { id: "PRD-003", name: "Smart Watch", category: "Electronics", price: "$199.99", stock: 23, status: "Active" },
  { id: "PRD-004", name: "Running Shoes", category: "Footwear", price: "$89.99", stock: 67, status: "Active" },
  { id: "PRD-005", name: "Backpack Pro", category: "Accessories", price: "$69.99", stock: 0, status: "Out of Stock" },
  { id: "PRD-006", name: "Sunglasses UV", category: "Accessories", price: "$34.99", stock: 210, status: "Active" },
  { id: "PRD-007", name: "Yoga Mat", category: "Fitness", price: "$24.99", stock: 5, status: "Low Stock" },
  { id: "PRD-008", name: "Bluetooth Speaker", category: "Electronics", price: "$79.99", stock: 48, status: "Active" },
];

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Product Name", render: (p: typeof products[0]) => <span className="font-medium">{p.name}</span> },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", render: (p: typeof products[0]) => <span className="font-semibold">{p.price}</span> },
  { key: "stock", label: "Stock" },
  {
    key: "status",
    label: "Status",
    render: (p: typeof products[0]) => (
      <StatusBadge
        label={p.status}
        variant={p.status === "Active" ? "success" : p.status === "Low Stock" ? "warning" : "error"}
      />
    ),
  },
];

export default function AllProducts() {
  return (
    <PageShell
      title="All Products"
      subtitle="Manage your product catalog"
      actions={
        <>
          <div />
          <Link to="/dashboard/products/add">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </Link>
        </>
      }
    >
      <DataTable columns={columns} data={products} searchKey="name" searchPlaceholder="Search products..." />
    </PageShell>
  );
}
