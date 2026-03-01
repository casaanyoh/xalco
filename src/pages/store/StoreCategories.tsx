import { Link } from "react-router-dom";
import { categories } from "@/store/data";
import { ArrowRight } from "lucide-react";

export default function StoreCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Categories</h1>
        <p className="text-muted-foreground">Browse products by category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/store/categories/${cat.slug}`}
            className="group relative bg-card border border-border rounded-2xl p-8 hover:border-accent/40 hover:xalco-shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`} />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <span className="text-5xl block mb-4">{cat.emoji}</span>
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cat.description}</p>
                <span className="text-xs font-semibold text-accent">{cat.count} products</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted/50 border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
