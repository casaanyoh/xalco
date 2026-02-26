import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag, ArrowRight, Shield, Truck, CreditCard, Star,
  ChevronRight, Heart, Eye, Sparkles, Zap, Package,
} from "lucide-react";
import xalcoLogoDark from "@/assets/xalco-logo-dark.png";
import xalcoLogoWhite from "@/assets/xalco-logo-white.png";
import { useState } from "react";

const featuredProducts = [
  { id: 1, name: "Wireless Earbuds Pro", price: 79.99, oldPrice: 99.99, category: "Electronics", rating: 4.8, reviews: 124, badge: "Best Seller", emoji: "🎧" },
  { id: 2, name: "Classic Leather Wallet", price: 49.99, oldPrice: null, category: "Accessories", rating: 4.9, reviews: 89, badge: null, emoji: "👜" },
  { id: 3, name: "Smart Watch Series X", price: 199.99, oldPrice: 249.99, category: "Electronics", rating: 4.7, reviews: 201, badge: "New", emoji: "⌚" },
  { id: 4, name: "Running Shoes Elite", price: 129.99, oldPrice: null, category: "Footwear", rating: 4.6, reviews: 153, badge: null, emoji: "👟" },
  { id: 5, name: "Backpack Pro 30L", price: 89.99, oldPrice: 109.99, category: "Bags", rating: 4.8, reviews: 77, badge: "Sale", emoji: "🎒" },
  { id: 6, name: "Ceramic Mug Set", price: 34.99, oldPrice: null, category: "Home", rating: 4.5, reviews: 42, badge: null, emoji: "☕" },
];

const categories = [
  { name: "Electronics", count: 124, emoji: "⚡", gradient: "from-[hsl(210,80%,52%)] to-[hsl(210,80%,40%)]" },
  { name: "Accessories", count: 89, emoji: "💎", gradient: "from-[hsl(280,60%,50%)] to-[hsl(280,60%,38%)]" },
  { name: "Footwear", count: 67, emoji: "👟", gradient: "from-[hsl(152,60%,40%)] to-[hsl(152,60%,30%)]" },
  { name: "Bags", count: 45, emoji: "🎒", gradient: "from-[hsl(38,92%,50%)] to-[hsl(38,92%,38%)]" },
  { name: "Home", count: 56, emoji: "🏠", gradient: "from-[hsl(0,72%,51%)] to-[hsl(0,72%,40%)]" },
];

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
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <div className="bg-accent text-accent-foreground text-center py-2 text-xs font-medium tracking-wide">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          Free shipping on all orders over $50 — Limited time offer!
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      </div>

      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={xalcoLogoDark} alt="XALCO" className="h-12 object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {["Home", "Shop", "Categories", "New Arrivals", "Sale"].map((item, i) => (
                <Link
                  key={item}
                  to="/"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    i === 0 ? "text-accent bg-accent/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item}
                  {item === "Sale" && (
                    <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-destructive text-destructive-foreground">
                      HOT
                    </span>
                  )}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm">
                <ShoppingBag className="h-4 w-4 mr-1.5" />
                Cart
                <span className="ml-1.5 bg-accent-foreground/20 text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 xalco-gradient" />
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, hsl(172 66% 40% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, hsl(210 80% 52% / 0.1) 0%, transparent 40%)",
        }} />
        {/* Decorative elements */}
        <div className="absolute top-20 right-[15%] w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 mb-6">
                <Zap className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent">New Collection 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.08] mb-6">
                Discover
                <span className="block text-accent">Premium Products</span>
                <span className="block">at Fair Prices</span>
              </h1>
              <p className="text-lg text-primary-foreground/60 mb-8 max-w-md leading-relaxed">
                Curated collections of high-quality products. From electronics to everyday essentials — everything you need, in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base xalco-shadow">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/10 h-12">
                  Browse Categories
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 mt-10 pt-8 border-t border-primary-foreground/10">
                <div className="flex -space-x-2">
                  {["SM", "JK", "ER", "ML"].map((initials, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-primary flex items-center justify-center text-[9px] font-bold text-accent">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-[11px] text-primary-foreground/50">Trusted by <span className="text-primary-foreground/80 font-semibold">12,000+</span> happy customers</p>
                </div>
              </div>
            </div>

            {/* Hero Product Showcase */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-accent/10 rounded-3xl border border-accent/20 flex items-center justify-center text-8xl backdrop-blur-sm">
                  ⌚
                </div>
                <div className="absolute -bottom-4 -left-8 bg-card rounded-2xl p-4 xalco-shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-xl">🎧</div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Earbuds Pro</p>
                      <p className="text-sm font-bold text-accent">$79.99</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-3 xalco-shadow-lg border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[hsl(152,60%,40%)]/10 rounded-lg flex items-center justify-center">
                      <Truck className="h-4 w-4 text-[hsl(152,60%,40%)]" />
                    </div>
                    <p className="text-[11px] font-medium text-foreground">Free Delivery</p>
                  </div>
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
                <div className="w-11 h-11 rounded-xl bg-accent/8 border border-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
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
            <button className="text-sm font-medium text-accent hover:underline flex items-center gap-1 transition-colors">
              All categories <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="group relative bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/40 hover:xalco-shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />
                <div className="relative z-10">
                  <span className="text-4xl block mb-3">{cat.emoji}</span>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} products</p>
                </div>
              </button>
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
            <button className="text-sm font-medium text-accent hover:underline flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:xalco-shadow-lg transition-all duration-300 group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                  <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                    {product.emoji}
                  </span>
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      product.badge === "Sale" ? "bg-destructive text-destructive-foreground" :
                      product.badge === "New" ? "bg-accent text-accent-foreground" :
                      "bg-primary text-primary-foreground"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {/* Quick Actions */}
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
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{product.category}</span>
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
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-9 px-4 xalco-shadow-sm">
                      <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
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
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 text-base xalco-shadow">
                  Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/10 h-12">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <img src={xalcoLogoDark} alt="XALCO" className="h-12 object-contain mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
                Your trusted unified commerce platform. Quality products, reliable service, exceptional experience.
              </p>
              <div className="flex items-center gap-3">
                {["𝕏", "f", "in", "📸"].map((s, i) => (
                  <button key={i} className="w-9 h-9 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {[
              { title: "Shop", links: ["All Products", "Categories", "New Arrivals", "Sale", "Gift Cards"] },
              { title: "Support", links: ["Contact Us", "FAQ", "Shipping Info", "Returns", "Track Order"] },
              { title: "Company", links: ["About Us", "Privacy Policy", "Terms of Service", "Careers", "Blog"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2026 XALCO. All rights reserved.</p>
            <div className="flex items-center gap-3">
              {["Visa", "MC", "PayPal", "Apple Pay"].map((method) => (
                <div key={method} className="px-2.5 py-1 rounded-md bg-muted/50 border border-border text-[9px] font-medium text-muted-foreground">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
