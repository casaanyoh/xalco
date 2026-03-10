import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1, title: "10 Must-Have Accessories for 2026", excerpt: "Discover the trending accessories that are defining style this year — from minimalist watches to statement bags.", category: "Style Guide", date: "Mar 5, 2026", readTime: "5 min", emoji: "💎", featured: true,
  },
  {
    id: 2, title: "How to Build a Sustainable Wardrobe", excerpt: "Tips for shopping smarter, investing in quality pieces, and reducing fashion waste without sacrificing style.", category: "Sustainability", date: "Mar 2, 2026", readTime: "7 min", emoji: "🌿", featured: true,
  },
  {
    id: 3, title: "The Ultimate Home Office Setup Guide", excerpt: "Everything you need to create a productive, comfortable, and stylish workspace at home.", category: "Lifestyle", date: "Feb 28, 2026", readTime: "6 min", emoji: "🏠", featured: false,
  },
  {
    id: 4, title: "Tech Gadgets That Actually Improve Your Day", excerpt: "We tested the latest tech accessories so you don't have to. Here are the ones worth your money.", category: "Tech", date: "Feb 24, 2026", readTime: "8 min", emoji: "⚡", featured: false,
  },
  {
    id: 5, title: "Spring Footwear Trends You'll Love", excerpt: "From chunky sneakers to minimalist sandals — the complete guide to what's hot in spring footwear.", category: "Style Guide", date: "Feb 20, 2026", readTime: "4 min", emoji: "👟", featured: false,
  },
  {
    id: 6, title: "Gift Ideas for Every Occasion", excerpt: "Stuck on what to gift? Our curated guide covers birthdays, anniversaries, holidays, and everything in between.", category: "Shopping", date: "Feb 15, 2026", readTime: "5 min", emoji: "🎁", featured: false,
  },
];

const categories = ["All", "Style Guide", "Sustainability", "Lifestyle", "Tech", "Shopping"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === "All" || p.category === activeCat;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_70%,hsl(var(--accent)/0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <BookOpen className="h-3.5 w-3.5" /> XALCO Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Stories & Inspiration</h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed mb-8">Style tips, product guides, and stories from the XALCO community.</p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="h-12 pl-11 rounded-xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activeCat === cat ? "bg-accent text-accent-foreground border-accent" : "bg-card text-muted-foreground border-border hover:border-accent/30"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featured.map((post) => (
              <Card key={post.id} className="rounded-2xl border-border overflow-hidden hover:border-accent/30 transition-all hover:shadow-lg group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">{post.emoji}</span>
                </div>
                <CardContent className="p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-semibold">
                      <Tag className="h-3 w-3" /> {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {post.readTime} read
                    </span>
                    <span className="text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Card key={post.id} className="rounded-2xl border-border hover:border-accent/30 transition-all hover:shadow-lg group cursor-pointer">
                <div className="h-36 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-110 transition-transform">{post.emoji}</span>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-accent/8 text-accent text-[10px] font-semibold">{post.category}</span>
                    <span className="text-[11px] text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                    <span className="text-xs font-semibold text-accent inline-flex items-center gap-1">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No articles found. Try a different search or category.</p>
          </div>
        )}

        {/* Newsletter */}
        <Card className="rounded-2xl border-border bg-accent/5 mt-16">
          <CardContent className="p-10 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">Stay in the Loop</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">Subscribe to our newsletter for the latest articles, product drops, and exclusive offers.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="h-11 rounded-xl flex-1" />
              <Button className="h-11 px-6 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
