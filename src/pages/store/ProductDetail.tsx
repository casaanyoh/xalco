import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/store/data";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";
import {
  Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Package,
  ChevronRight, Minus, Plus, Share2, Check,
} from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const paymentMethods = [
  { name: "Visa", bg: "from-[hsl(220,80%,50%)] to-[hsl(220,80%,38%)]", label: "VISA", textClass: "text-white font-bold italic text-sm" },
  { name: "MasterCard", bg: "from-[hsl(15,90%,55%)] to-[hsl(40,95%,50%)]", label: "MC", textClass: "text-white font-bold text-sm" },
  { name: "PayPal", bg: "from-[hsl(210,70%,45%)] to-[hsl(200,80%,55%)]", label: "PayPal", textClass: "text-white font-semibold text-[11px]" },
  { name: "Apple Pay", bg: "from-[hsl(0,0%,10%)] to-[hsl(0,0%,20%)]", label: "Pay", textClass: "text-white font-semibold text-sm" },
  { name: "EVC Plus", bg: "from-[hsl(145,65%,40%)] to-[hsl(145,65%,30%)]", label: "EVC+", textClass: "text-white font-bold text-[11px]" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/store/shop">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
        <Link to="/store" className="hover:text-accent transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/store/shop" className="hover:text-accent transition-colors">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/store/categories/${product.category.toLowerCase()}`} className="hover:text-accent transition-colors">{product.category}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-3xl flex items-center justify-center relative overflow-hidden border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent" />
            <span className="text-[140px] relative z-10 drop-shadow-lg transition-transform hover:scale-105 duration-300">{product.emoji}</span>
            {product.badge && (
              <span className={`absolute top-5 left-5 px-3 py-1.5 rounded-xl text-xs font-bold ${
                product.badge === "Sale" ? "bg-destructive text-destructive-foreground" :
                product.badge === "New" ? "bg-accent text-accent-foreground" :
                "bg-primary text-primary-foreground"
              }`}>
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-5 right-5 px-3 py-1.5 rounded-xl text-xs font-bold bg-destructive text-destructive-foreground">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-1">
            <Link to={`/store/categories/${product.category.toLowerCase()}`} className="text-xs font-semibold text-accent uppercase tracking-widest hover:underline">
              {product.category}
            </Link>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-foreground">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.oldPrice}</span>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">Save ${(product.oldPrice - product.price).toFixed(2)}</Badge>
              </>
            )}
          </div>

          <Separator className="mb-6" />

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          {/* Quantity & Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              onClick={handleAddToCart}
              className={`flex-1 h-11 font-semibold text-sm xalco-shadow-sm transition-all ${
                addedToCart
                  ? "bg-success text-success-foreground hover:bg-success/90"
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
              }`}
            >
              {addedToCart ? (
                <><Check className="h-4 w-4 mr-2" /> Added to Cart</>
              ) : (
                <><ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart — ${(product.price * qty).toFixed(2)}</>
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleWishlist(product)}
              className={`h-11 w-11 rounded-xl border transition-all ${
                isInWishlist(product.id) ? "border-destructive/30 text-destructive bg-destructive/5" : "border-border"
              }`}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: Truck, label: "Free Shipping", desc: "Orders over $50" },
              { icon: RotateCcw, label: "Easy Returns", desc: "30-day policy" },
              { icon: Shield, label: "Secure Payment", desc: "SSL encrypted" },
              { icon: Package, label: "Quality", desc: "Guaranteed" },
            ].map((g) => (
              <div key={g.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/40 border border-border">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <g.icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{g.label}</p>
                  <p className="text-[10px] text-muted-foreground">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="p-4 rounded-2xl bg-muted/30 border border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Accepted Payment Methods</p>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((pm) => (
                <div
                  key={pm.name}
                  className={`relative h-10 px-4 rounded-lg bg-gradient-to-r ${pm.bg} flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default`}
                  title={pm.name}
                >
                  {pm.name === "Apple Pay" && (
                    <span className="text-white text-xs">🍎</span>
                  )}
                  <span className={pm.textClass}>{pm.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16 pt-12 border-t border-border">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge variant="secondary" className="mb-2 text-[10px] font-semibold uppercase tracking-widest">You May Also Like</Badge>
              <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
            </div>
            <Link to={`/store/categories/${product.category.toLowerCase()}`} className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/store/product/${p.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:xalco-shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                  <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{p.emoji}</span>
                  {p.badge && (
                    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      p.badge === "Sale" ? "bg-destructive text-destructive-foreground" :
                      p.badge === "New" ? "bg-accent text-accent-foreground" :
                      "bg-primary text-primary-foreground"
                    }`}>{p.badge}</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{p.category}</p>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-2 truncate">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">${p.price}</span>
                    {p.oldPrice && <span className="text-xs text-muted-foreground line-through">${p.oldPrice}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
