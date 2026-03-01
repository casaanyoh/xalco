import { getNewArrivals } from "@/store/data";
import { ProductCard } from "./Shop";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function NewArrivals() {
  const arrivals = getNewArrivals();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3 text-[10px] font-semibold uppercase tracking-widest">
          <Sparkles className="h-3 w-3 mr-1" /> Just In
        </Badge>
        <h1 className="text-3xl font-bold text-foreground mb-2">New Arrivals</h1>
        <p className="text-muted-foreground">The latest additions to our collection — {arrivals.length} new products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {arrivals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
