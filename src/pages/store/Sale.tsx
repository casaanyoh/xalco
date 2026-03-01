import { getSaleProducts } from "@/store/data";
import { ProductCard } from "./Shop";
import { Badge } from "@/components/ui/badge";
import { Flame, Clock } from "lucide-react";

export default function Sale() {
  const saleProducts = getSaleProducts();

  return (
    <div>
      {/* Sale banner */}
      <div className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive-foreground/10 border border-destructive-foreground/20 mb-4">
            <Flame className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Limited Time</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Up to 50% Off</h1>
          <p className="text-destructive-foreground/70 max-w-md mx-auto">
            Don't miss our biggest sale of the season. Grab your favorites before they're gone!
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            {[
              { label: "Days", value: "03" },
              { label: "Hours", value: "14" },
              { label: "Min", value: "27" },
              { label: "Sec", value: "52" },
            ].map((t) => (
              <div key={t.label} className="text-center">
                <div className="w-14 h-14 rounded-xl bg-destructive-foreground/10 border border-destructive-foreground/20 flex items-center justify-center mb-1">
                  <span className="text-xl font-bold">{t.value}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-destructive-foreground/60">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-muted-foreground mb-6">{saleProducts.length} products on sale</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {saleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
