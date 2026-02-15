import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Star,
  ChevronRight,
} from "lucide-react";
import xalcoLogoDark from "@/assets/xalco-logo-dark.png";
import xalcoLogoWhite from "@/assets/xalco-logo-white.png";

const featuredProducts = [
  { id: 1, name: "Wireless Earbuds Pro", price: "$79.99", category: "Electronics", rating: 4.8 },
  { id: 2, name: "Classic Leather Wallet", price: "$49.99", category: "Accessories", rating: 4.9 },
  { id: 3, name: "Smart Watch Series X", price: "$199.99", category: "Electronics", rating: 4.7 },
  { id: 4, name: "Running Shoes Elite", price: "$129.99", category: "Footwear", rating: 4.6 },
  { id: 5, name: "Backpack Pro 30L", price: "$89.99", category: "Bags", rating: 4.8 },
  { id: 6, name: "Ceramic Mug Set", price: "$34.99", category: "Home", rating: 4.5 },
];

const categories = [
  { name: "Electronics", count: 124 },
  { name: "Accessories", count: 89 },
  { name: "Footwear", count: 67 },
  { name: "Bags", count: 45 },
  { name: "Home", count: 56 },
];

const trustBadges = [
  { icon: Shield, title: "Secure Checkout", desc: "SSL encrypted payments" },
  { icon: Truck, title: "Fast Shipping", desc: "Free on orders over $50" },
  { icon: CreditCard, title: "Easy Returns", desc: "30-day return policy" },
];

export default function StoreHome() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={xalcoLogoDark} alt="XALCO" className="h-8 object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">Home</Link>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">Shop</Link>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">Categories</Link>
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors">About</Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Sign In
              </Button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <ShoppingBag className="h-4 w-4 mr-1.5" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="xalco-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, hsl(172, 66%, 40%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(172, 66%, 40%) 0%, transparent 40%)",
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent mb-5">
              New Collection Available
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1] mb-5">
              Premium Products,<br />Fair Prices
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg leading-relaxed">
              Discover curated collections of high-quality products. From electronics to everyday essentials, find what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
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
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
              <p className="text-sm text-muted-foreground mt-1">Browse our curated collections</p>
            </div>
            <button className="text-sm font-medium text-accent hover:underline flex items-center gap-0.5">
              All categories <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="bg-card border border-border rounded-lg p-5 text-center hover:border-accent hover:xalco-shadow transition-all group"
              >
                <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.count} products</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
              <p className="text-sm text-muted-foreground mt-1">Handpicked for you</p>
            </div>
            <button className="text-sm font-medium text-accent hover:underline flex items-center gap-0.5">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:xalco-shadow-lg transition-all group"
              >
                <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{product.category}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      <span className="text-[10px] font-medium text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-foreground">{product.price}</span>
                    <Button size="sm" variant="outline" className="text-xs border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      Add to Cart
                    </Button>
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
          <div className="xalco-gradient rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, hsl(172, 66%, 40%), transparent 60%)",
            }} />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                Ready to get started?
              </h2>
              <p className="text-primary-foreground/60 mb-6 max-w-md mx-auto">
                Join thousands of satisfied customers shopping with confidence.
              </p>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8">
                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-3">
                <img src={xalcoLogoDark} alt="XALCO" className="h-7 object-contain" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your trusted unified commerce platform. Quality products, reliable service.
              </p>
            </div>
            {[
              { title: "Shop", links: ["All Products", "Categories", "New Arrivals", "Sale"] },
              { title: "Support", links: ["Contact", "FAQ", "Shipping", "Returns"] },
              { title: "Company", links: ["About", "Privacy", "Terms", "Careers"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs text-muted-foreground hover:text-accent transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">© 2026 XALCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
