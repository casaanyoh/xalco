import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Search, Plus, Filter, Eye, EyeOff, Star, ShoppingBag,
  Image, Tag, ArrowUpDown, MoreHorizontal, Pencil,
} from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Wireless Earbuds Pro", category: "Electronics", price: 79.99, stock: 48, rating: 4.8, reviews: 124, visible: true, featured: true, img: "🎧" },
  { id: 2, name: "Classic Leather Wallet", category: "Accessories", price: 49.99, stock: 32, rating: 4.9, reviews: 89, visible: true, featured: false, img: "👜" },
  { id: 3, name: "Smart Watch Series X", category: "Electronics", price: 199.99, stock: 14, rating: 4.7, reviews: 201, visible: true, featured: true, img: "⌚" },
  { id: 4, name: "Running Shoes Elite", category: "Footwear", price: 129.99, stock: 67, rating: 4.6, reviews: 153, visible: false, featured: false, img: "👟" },
  { id: 5, name: "Backpack Pro 30L", category: "Bags", price: 89.99, stock: 22, rating: 4.8, reviews: 77, visible: true, featured: true, img: "🎒" },
  { id: 6, name: "Ceramic Mug Set", category: "Home", price: 34.99, stock: 5, rating: 4.5, reviews: 42, visible: true, featured: false, img: "☕" },
];

const collections = [
  { name: "Summer Essentials", products: 12, active: true, hero: "🌞" },
  { name: "Tech Picks", products: 8, active: true, hero: "💻" },
  { name: "New Arrivals", products: 6, active: false, hero: "✨" },
  { name: "Best Sellers", products: 15, active: true, hero: "🔥" },
];

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState(products);

  const toggleVisibility = (id: number) => {
    setProductList((prev) => prev.map((p) => p.id === id ? { ...p, visible: !p.visible } : p));
    toast({ title: "Visibility updated" });
  };

  const toggleFeatured = (id: number) => {
    setProductList((prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageShell
      title="Product Catalog"
      subtitle="Manage which products appear in your online store"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-border text-muted-foreground">
            <Filter className="h-3.5 w-3.5 mr-1.5" /> Filter
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Product
          </Button>
        </div>
      }
    >
      <Tabs defaultValue="products">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="products">All Products</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4">
          <div className="bg-card border border-border rounded-xl xalco-shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
              </div>
              <span className="text-xs text-muted-foreground">{filtered.length} products</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["Product", "Category", "Price", "Stock", "Rating", "Visible", "Featured", ""].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-2.5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-sm flex-shrink-0">{p.img}</div>
                          <span className="text-xs font-medium text-foreground">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-[10px]">{p.category}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-foreground">${p.price}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${p.stock < 10 ? "text-destructive" : "text-foreground"}`}>{p.stock}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Switch checked={p.visible} onCheckedChange={() => toggleVisibility(p.id)} className="scale-75" />
                      </td>
                      <td className="px-4 py-3">
                        <Switch checked={p.featured} onCheckedChange={() => toggleFeatured(p.id)} className="scale-75" />
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="collections" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {collections.map((col) => (
              <div key={col.name} className="bg-card border border-border rounded-xl p-5 xalco-shadow-sm">
                <div className="text-3xl mb-3">{col.hero}</div>
                <h3 className="text-sm font-semibold text-foreground">{col.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{col.products} products</p>
                <div className="flex items-center justify-between mt-4">
                  <Badge variant={col.active ? "default" : "secondary"} className="text-[10px]">
                    {col.active ? "Active" : "Draft"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs text-accent h-7 px-2">
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:border-accent transition-colors group">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-accent" />
              <span className="text-xs text-muted-foreground group-hover:text-accent">New Collection</span>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productList.filter((p) => p.featured).map((p) => (
              <div key={p.id} className="bg-card border border-accent/30 rounded-xl p-4 xalco-shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg flex-shrink-0">{p.img}</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">${p.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="text-[10px] text-muted-foreground">{p.rating}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 text-xs border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground h-7"
                  onClick={() => toggleFeatured(p.id)}
                >
                  Remove from Featured
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
