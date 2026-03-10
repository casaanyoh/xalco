import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Menu, X, Search, Sparkles, User } from "lucide-react";
import xalcoLogoDark from "@/assets/xalco-logo-dark.png";
import { useCart } from "./CartContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Minus, Plus, Trash2 } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/store" },
  { label: "Shop", path: "/store/shop" },
  { label: "Categories", path: "/store/categories" },
  { label: "New Arrivals", path: "/store/new-arrivals" },
  { label: "Sale", path: "/store/sale", hot: true },
];

function CartSheet() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm relative">
          <ShoppingBag className="h-4 w-4 mr-1.5" />
          Cart
          {totalItems > 0 && (
            <span className="ml-1.5 bg-accent-foreground/20 text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold">Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
            <SheetTrigger asChild>
              <Link to="/store/shop">
                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Start Shopping
                </Button>
              </Link>
            </SheetTrigger>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-muted/30 rounded-xl border border-border">
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">{item.product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-success">{totalPrice >= 50 ? "Free" : "$4.99"}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-border pt-3">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice >= 50 ? 0 : 4.99)).toFixed(2)}</span>
              </div>
              <Button className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Checkout — ${(totalPrice + (totalPrice >= 50 ? 0 : 4.99)).toFixed(2)}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default function StoreLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Announcement */}
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
            <div className="flex items-center gap-8">
              <Link to="/store" className="flex items-center">
                <img src={xalcoLogoDark} alt="XALCO" className="h-12 object-contain" />
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      location.pathname === item.path
                        ? "text-accent bg-accent/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                    {item.hot && (
                      <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-destructive text-destructive-foreground">
                        HOT
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Heart className="h-4 w-4" />
              </Button>
              <Link to="/store/signin">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                  <User className="h-4 w-4 mr-1.5" />
                  Sign In
                </Button>
              </Link>
              <CartSheet />
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden border-t border-border py-3 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "text-accent bg-accent/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/store/signin" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

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
              { title: "Shop", links: [{ label: "All Products", to: "/store/shop" }, { label: "Categories", to: "/store/categories" }, { label: "New Arrivals", to: "/store/new-arrivals" }, { label: "Sale", to: "/store/sale" }] },
              { title: "Support", links: [{ label: "Contact Us", to: "/store/contact" }, { label: "FAQ", to: "/store/faq" }, { label: "Shipping Info", to: "/store/shipping" }, { label: "Returns", to: "/store/returns" }] },
              { title: "Company", links: [{ label: "About Us", to: "/store/about" }, { label: "Privacy Policy", to: "/store/privacy" }, { label: "Terms of Service", to: "/store/terms" }, { label: "Blog", to: "/store/blog" }] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-muted-foreground hover:text-accent transition-colors">{link.label}</Link>
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
