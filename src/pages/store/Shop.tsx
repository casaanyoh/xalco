import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { products, categories, Product } from "@/store/data";
import { useCart } from "@/store/CartContext";
import { ShoppingBag, Star, Heart, Eye, SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/store/WishlistContext";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden hover:xalco-shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">{product.emoji}</span>
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
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}>
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-8 h-8 backdrop-blur-sm rounded-lg border flex items-center justify-center transition-all ${
              isInWishlist(product.id)
                ? "bg-destructive/10 border-destructive/20 text-destructive"
                : "bg-card/90 border-border hover:text-destructive hover:border-destructive/30"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
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
          </div>
        </div>
        <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
            )}
          </div>
          <Button size="sm" onClick={() => addToCart(product)} className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs h-9 px-4 xalco-shadow-sm">
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };

export default function Shop() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  let filtered = selectedCat === "All" ? products : products.filter((p) => p.category === selectedCat);
  if (search) filtered = filtered.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Shop All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of {products.length} products</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                selectedCat === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">{filtered.length} products found</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setSelectedCat("All"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
