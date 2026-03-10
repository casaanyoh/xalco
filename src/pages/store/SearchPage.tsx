import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products, categories, Product } from "@/store/data";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";
import {
  Search,
  X,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Heart,
  TrendingUp,
  Clock,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const trendingSearches = [
  "Wireless Earbuds",
  "Smart Watch",
  "Hoodie",
  "Backpack",
  "Running Shoes",
  "Candle",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("xalco-recent-searches") || "[]");
    } catch {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("xalco-recent-searches", JSON.stringify(updated));
  };

  const results = useMemo(() => {
    let filtered = products;

    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      filtered = filtered.filter((p) => p.price >= range.min && p.price < range.max);
    }

    if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    else if (sortBy === "name") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  }, [query, selectedCategory, selectedPriceRange, sortBy]);

  const hasActiveFilters = selectedCategory !== "All" || selectedPriceRange !== null;
  const showSuggestions = !query.trim() && !hasActiveFilters;

  return (
    <div className="min-h-[60vh]">
      {/* Search Hero */}
      <div className="bg-gradient-to-br from-card via-card to-accent/5 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Search Products</h1>
            <p className="text-muted-foreground text-sm">
              Find exactly what you're looking for from our {products.length} products
            </p>
          </div>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search by name, category, or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) saveSearch(query.trim());
              }}
              className="pl-12 pr-12 h-13 text-base rounded-xl border-border bg-card shadow-sm focus-visible:ring-accent"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuggestions ? (
          <div className="max-w-3xl mx-auto space-y-10">
            {/* Trending */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-accent" />
                <h2 className="text-sm font-semibold text-foreground">Trending Searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      saveSearch(term);
                    }}
                    className="px-4 py-2 rounded-xl bg-accent/5 border border-accent/20 text-sm text-foreground hover:bg-accent/10 hover:border-accent/40 transition-all"
                  >
                    <Sparkles className="h-3 w-3 inline mr-1.5 text-accent" />
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground">Recent Searches</h2>
                  </div>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem("xalco-recent-searches");
                    }}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        saveSearch(term);
                      }}
                      className="px-4 py-2 rounded-xl bg-muted/30 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                    >
                      <Clock className="h-3 w-3 inline mr-1.5" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Browse by Category */}
            <div>
              <h2 className="text-sm font-semibold text-foreground mb-4">Browse by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.name)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/40 hover:shadow-sm transition-all text-left"
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cat.count} items</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{results.length}</span> result{results.length !== 1 ? "s" : ""}
                  {query && (
                    <>
                      {" "}for "<span className="text-accent font-medium">{query}</span>"
                    </>
                  )}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedPriceRange(null);
                    }}
                    className="text-xs text-destructive hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`border-border text-sm ${showFilters ? "bg-accent/10 border-accent/40 text-accent" : ""}`}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                      {(selectedCategory !== "All" ? 1 : 0) + (selectedPriceRange !== null ? 1 : 0)}
                    </span>
                  )}
                </Button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">A – Z</option>
                </select>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mb-8 p-5 bg-card border border-border rounded-2xl space-y-5 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...categories.map((c) => c.name)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          selectedCategory === cat
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-muted-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range, i) => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                          selectedPriceRange === i
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-muted-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {results.map((product) => (
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
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-sm rounded-lg border flex items-center justify-center transition-all ${
                          isInWishlist(product.id)
                            ? "bg-destructive/10 border-destructive/20 text-destructive"
                            : "bg-card/90 border-border text-muted-foreground hover:text-destructive hover:border-destructive/30"
                        }`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-muted-foreground/30">·</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-[11px] font-medium text-muted-foreground">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-foreground">${product.price}</span>
                          {product.oldPrice && (
                            <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
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
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">No results found</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Try a different search term or adjust your filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                    setSelectedPriceRange(null);
                  }}
                >
                  Clear All
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
