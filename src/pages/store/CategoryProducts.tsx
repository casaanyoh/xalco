import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, categories } from "@/store/data";
import { ProductCard } from "./Shop";
import { ChevronRight } from "lucide-react";

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const prods = getProductsByCategory(slug || "");

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-muted-foreground">Category not found.</p>
        <Link to="/store/categories" className="text-accent hover:underline text-sm mt-2 inline-block">Back to categories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link to="/store" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/store/categories" className="hover:text-foreground transition-colors">Categories</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{category.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{category.name}</h1>
          <p className="text-muted-foreground">{category.description} — {prods.length} products</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {prods.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
