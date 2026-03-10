import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/WishlistContext";
import { useCart } from "@/store/CartContext";
import { Heart, ShoppingBag, Trash2, Star, ArrowRight } from "lucide-react";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-[60vh]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-card via-card to-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground">
            {items.length === 0
              ? "Your wishlist is empty. Start adding items you love!"
              : `You have ${items.length} item${items.length > 1 ? "s" : ""} saved for later`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Nothing here yet</h2>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Browse our products and tap the heart icon to save your favorites.
            </p>
            <Link to="/store/shop">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Explore Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                    <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                      {product.emoji}
                    </span>
                    {product.badge && (
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          product.badge === "Sale"
                            ? "bg-destructive text-destructive-foreground"
                            : product.badge === "New"
                            ? "bg-accent text-accent-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-destructive/10 backdrop-blur-sm rounded-lg border border-destructive/20 flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        to={`/store/categories/${product.category.toLowerCase()}`}
                        className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hover:text-accent transition-colors"
                      >
                        {product.category}
                      </Link>
                      <span className="text-muted-foreground/30">·</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-9 px-4"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link to="/store/shop">
                <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
