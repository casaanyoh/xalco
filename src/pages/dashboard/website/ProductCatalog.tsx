import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import {
  Search, Plus, Filter, Star, ShoppingBag,
  Pencil, Package, TrendingUp, Eye,
} from "lucide-react";
import { useState } from "react";

const products = [
  { id: 1, name: "Wireless Earbuds Pro", category: "Electronics", price: 79.99, stock: 48, rating: 4.8, reviews: 124, visible: true, featured: true, emoji: "🎧" },
  { id: 2, name: "Classic Leather Wallet", category: "Accessories", price: 49.99, stock: 32, rating: 4.9, reviews: 89, visible: true, featured: false, emoji: "👜" },
  { id: 3, name: "Smart Watch Series X", category: "Electronics", price: 199.99, stock: 14, rating: 4.7, reviews: 201, visible: true, featured: true, emoji: "⌚" },
  { id: 4, name: "Running Shoes Elite", category: "Footwear", price: 129.99, stock: 67, rating: 4.6, reviews: 153, visible: false, featured: false, emoji: "👟" },
  { id: 5, name: "Backpack Pro 30L", category: "Bags", price: 89.99, stock: 22, rating: 4.8, reviews: 77, visible: true, featured: true, emoji: "🎒" },
  { id: 6, name: "Ceramic Mug Set", category: "Home", price: 34.99, stock: 5, rating: 4.5, reviews: 42, visible: true, featured: false, emoji: "☕" },
];

const collections = [
  { name: "Summer Essentials", products: 12, active: true, emoji: "🌞" },
  { name: "Tech Picks", products: 8, active: true, emoji: "💻" },
  { name: "New Arrivals", products: 6, active: false, emoji: "✨" },
  { name: "Best Sellers", products: 15, active: true, emoji: "🔥" },
];

const stats = [
  { label: "Total Products", value: "156", icon: Package, color: "hsl(172 66% 40%)" },
  { label: "Visible Online", value: "128", icon: Eye, color: "hsl(210 80% 52%)" },
  { label: "Featured", value: "12", icon: Star, color: "hsl(38 92% 50%)" },
  { label: "Low Stock", value: "4", icon: TrendingUp, color: "hsl(0 72% 51%)" },
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
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Product
          </Button>
        </div>
      }
    >
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 xalco-shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
              <s.icon className="h-4.5 w-4.5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="products">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="products">All Products</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4">
          <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
              </div>
              <Badge variant="secondary" className="text-[10px]">{filtered.length} products</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    {["Product", "Category", "Price", "Stock", "Rating", "Visible", "Featured", ""].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-muted/50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{p.emoji}</div>
                          <span className="text-xs font-semibold text-foreground">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><Badge variant="secondary" className="text-[10px]">{p.category}</Badge></td>
                      <td className="px-4 py-3.5 text-xs font-bold text-foreground">${p.price}</td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-semibold ${p.stock < 10 ? "text-destructive" : p.stock < 20 ? "text-[hsl(38,92%,50%)]" : "text-foreground"}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><Switch checked={p.visible} onCheckedChange={() => toggleVisibility(p.id)} className="scale-75" /></td>
                      <td className="px-4 py-3.5"><Switch checked={p.featured} onCheckedChange={() => toggleFeatured(p.id)} className="scale-75" /></td>
                      <td className="px-4 py-3.5">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></Button>
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
              <div key={col.name} className="bg-card border border-border rounded-2xl p-5 xalco-shadow-sm hover:xalco-shadow transition-all group">
                <span className="text-4xl block mb-3">{col.emoji}</span>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{col.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{col.products} products</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <Badge variant={col.active ? "default" : "secondary"} className="text-[10px]">
                    {col.active ? "Active" : "Draft"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs text-accent h-7 px-2">
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-accent hover:bg-accent/[0.02] transition-all group min-h-[160px]">
              <Plus className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
              <span className="text-xs font-medium text-muted-foreground group-hover:text-accent">New Collection</span>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productList.filter((p) => p.featured).map((p) => (
              <div key={p.id} className="bg-card border border-accent/20 rounded-2xl p-5 xalco-shadow-sm hover:xalco-shadow transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/5 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{p.emoji}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-foreground">${p.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    <span className="text-[10px] text-muted-foreground">{p.rating} ({p.reviews})</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground h-8"
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
