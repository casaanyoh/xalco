import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Shield, Truck, CreditCard, Star,
  ChevronRight, Heart, Eye, Sparkles, Zap, Package, ShoppingBag,
} from "lucide-react";
import { useCart } from "@/store/CartContext";
import { getFeaturedProducts, categories } from "@/store/data";
import { useState } from "react";

const trustBadges = [
  { icon: Shield, title: "Secure Checkout", desc: "SSL encrypted payments" },
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: CreditCard, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Package, title: "Quality Guaranteed", desc: "Premium products only" },
];

const testimonials = [
  { name: "Sarah M.", text: "Amazing quality and super fast shipping! Will definitely order again.", rating: 5, avatar: "SM" },
  { name: "James K.", text: "Best online shopping experience. The product exceeded my expectations.", rating: 5, avatar: "JK" },
  { name: "Emily R.", text: "Great customer service and the prices are unbeatable. Highly recommended!", rating: 5, avatar: "ER" },
];

export default function StoreHome() {
  const { addToCart } = useCart();
  const featured = getFeaturedProducts();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section — Redesigned */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 xalco-gradient" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(ellipse 60% 50% at 70% 50%, hsl(172 66% 40% / 0.12) 0%, transparent 100%), radial-gradient(ellipse 40% 60% at 20% 80%, hsl(210 80% 52% / 0.08) 0%, transparent 100%)",
        }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/[0.03] rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 mb-6 animate-fade-in">
                <Zap className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent tracking-wide">New Collection 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-primary-foreground leading-[1.1] mb-6">
                Elevate Your
                <span className="block bg-gradient-to-r from-accent to-[hsl(190,60%,55%)] bg-clip-text text-transparent">
                  Shopping Experience
                </span>
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/55 mb-8 leading-relaxed">
                Curated collections of premium products — from cutting-edge electronics to everyday essentials. Quality you can trust, prices you'll love.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/store/shop">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base xalco-shadow w-full sm:w-auto">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/store/categories">
                  <Button size="lg" variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 h-12 w-full sm:w-auto">
                    Browse Categories
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 pt-8 border-t border-primary-foreground/10">
                <div className="flex -space-x-2.5">
                  {["SM", "JK", "ER", "ML"].map((initials, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-accent/20 border-2 border-primary flex items-center justify-center text-[9px] font-bold text-accent">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-[11px] text-primary-foreground/45">Trusted by <span className="text-primary-foreground/75 font-semibold">12,000+</span> customers</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Main showcase */}
                <div className="w-[380px] h-[380px] mx-auto bg-gradient-to-br from-accent/10 to-accent/5 rounded-[2rem] border border-accent/15 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <span className="text-[100px] block mb-2">⌚</span>
                    <p className="text-sm font-semibold text-primary-foreground/80">Smart Watch Series X</p>
                    <p className="text-lg font-bold text-accent">$199.99</p>
                  </div>
                </div>
                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 xalco-shadow-lg border border-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center text-2xl">🎧</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Earbuds Pro</p>
                      <p className="text-sm font-bold text-accent">$79.99</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-3.5 xalco-shadow-lg border border-border animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-success/10 rounded-lg flex items-center justify-center">
                      <Truck className="h-4 w-4 text-success" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-foreground">Free Delivery</p>
                      <p className="text-[10px] text-muted-foreground">On orders $50+</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 -right-8 bg-card rounded-xl p-3 xalco-shadow-lg border border-border animate-fade-in" style={{ animationDelay: "0.7s" }}>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">4.8 avg rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-accent/[0.08] border border-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                  <badge.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{badge.title}</p>
                  <p className="text-xs text-muted-foreground">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="secondary" className="mb-3 text-[10px] font-semibold uppercase tracking-widest">Browse</Badge>
              <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
              <p className="text-sm text-muted-foreground mt-2">Discover our curated product collections</p>
            </div>
            <Link to="/store/categories" className="text-sm font-medium text-accent hover:underline flex items-center gap-1 transition-colors">
              All categories <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/store/categories/${cat.slug}`}
                className="group relative bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/40 hover:xalco-shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
                <div className="relative z-10">
                  <span className="text-4xl block mb-3">{cat.emoji}</span>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="secondary" className="mb-3 text-[10px] font-semibold uppercase tracking-widest">Trending</Badge>
              <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
              <p className="text-sm text-muted-foreground mt-2">Handpicked just for you</p>
            </div>
            <Link to="/store/shop" className="text-sm font-medium text-accent hover:underline flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((product) => (
              <Link
                key={product.id}
                to={`/store/product/${product.id}`}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:xalco-shadow-lg transition-all duration-300 group block"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                  <span className="text-6xl transition-transform duration-300 group-hover:scale-110">{product.emoji}</span>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      product.badge === "Sale" ? "bg-destructive text-destructive-foreground" :
                      product.badge === "New" ? "bg-accent text-accent-foreground" :
                      "bg-primary text-primary-foreground"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className={`absolute top-3 right-3 flex flex-col gap-1.5 transition-all duration-200 ${
                    hoveredProduct === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                  }`}>
                    <button className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                      <Heart className="h-3.5 w-3.5" />
                    </button>
                    <button className="w-8 h-8 bg-card/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Link to={`/store/categories/${product.category.toLowerCase()}`} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hover:text-accent transition-colors">
                      {product.category}
                    </Link>
                    <span className="text-muted-foreground/30">·</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-[11px] font-medium text-muted-foreground">{product.rating}</span>
                      <span className="text-[10px] text-muted-foreground/60">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-3">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
                      )}
                    </div>
                    <Button size="sm" onClick={() => addToCart(product)} className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-9 px-4 xalco-shadow-sm">
                      <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-3 text-[10px] font-semibold uppercase tracking-widest">Reviews</Badge>
            <h2 className="text-3xl font-bold text-foreground">What Our Customers Say</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">Join thousands of satisfied shoppers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm hover:xalco-shadow transition-all">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 xalco-gradient" />
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 30% 50%, hsl(172 66% 40% / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(210 80% 52% / 0.08) 0%, transparent 40%)",
            }} />
            <div className="relative z-10 p-12 md:p-20 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent">Join the community</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Shopping?
              </h2>
              <p className="text-primary-foreground/50 mb-8 max-w-md mx-auto leading-relaxed">
                Join thousands of satisfied customers and discover quality products at unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/store/shop">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base xalco-shadow">
                    Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/store/about">
                  <Button size="lg" variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 h-12">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
