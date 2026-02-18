import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Smartphone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const catalog = [
  { id: 1, name: "Wireless Earbuds", price: 49.99, image: "🎧" },
  { id: 2, name: "Leather Wallet", price: 29.99, image: "👛" },
  { id: 3, name: "Smart Watch", price: 199.99, image: "⌚" },
  { id: 4, name: "Running Shoes", price: 89.99, image: "👟" },
  { id: 5, name: "Sunglasses UV", price: 34.99, image: "🕶️" },
  { id: 6, name: "Bluetooth Speaker", price: 79.99, image: "🔊" },
  { id: 7, name: "Yoga Mat", price: 24.99, image: "🧘" },
  { id: 8, name: "Backpack Pro", price: 69.99, image: "🎒" },
  { id: 9, name: "Phone Case", price: 14.99, image: "📱" },
  { id: 10, name: "Water Bottle", price: 19.99, image: "🍶" },
  { id: 11, name: "Desk Lamp", price: 44.99, image: "💡" },
  { id: 12, name: "Notebook Set", price: 12.99, image: "📓" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export default function POSTerminal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  const filtered = catalog.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (product: typeof catalog[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0));
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = (method: string) => {
    toast({ title: "Sale completed!", description: `$${total.toFixed(2)} paid via ${method}. ${cart.length} items sold.` });
    setCart([]);
  };

  return (
    <PageShell title="POS Terminal" subtitle="Process in-store sales">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[calc(100vh-200px)]">
        {/* Product Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent hover:shadow-md transition-all xalco-shadow-sm"
              >
                <span className="text-3xl block mb-2">{product.image}</span>
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <p className="text-sm font-semibold text-accent mt-1">${product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="bg-card border border-border rounded-lg xalco-shadow-sm flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Current Sale</h3>
            <p className="text-xs text-muted-foreground">{cart.length} item(s)</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No items in cart</p>
            )}
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-muted/30 rounded-md p-2.5">
                <span className="text-xl">{item.image}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:bg-muted">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:bg-muted">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg pt-1 border-t border-border mt-1"><span>Total</span><span className="text-accent">${total.toFixed(2)}</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={() => handleCheckout("Cash")} disabled={cart.length === 0} variant="outline" className="gap-1 text-xs"><Banknote className="h-4 w-4" />Cash</Button>
              <Button onClick={() => handleCheckout("Card")} disabled={cart.length === 0} variant="outline" className="gap-1 text-xs"><CreditCard className="h-4 w-4" />Card</Button>
              <Button onClick={() => handleCheckout("Mobile")} disabled={cart.length === 0} variant="outline" className="gap-1 text-xs"><Smartphone className="h-4 w-4" />Mobile</Button>
            </div>
            <Button onClick={() => handleCheckout("Card")} disabled={cart.length === 0} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Charge ${total.toFixed(2)}
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
