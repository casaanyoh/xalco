import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, Globe, Package, Shield, MapPin } from "lucide-react";

const shippingOptions = [
  { icon: Truck, title: "Standard Shipping", time: "5–7 Business Days", cost: "$4.99", note: "Free on orders over $50", color: "bg-info/8 text-info" },
  { icon: Clock, title: "Express Shipping", time: "2–3 Business Days", cost: "$12.99", note: "Guaranteed fast delivery", color: "bg-accent/8 text-accent" },
  { icon: Globe, title: "International Shipping", time: "7–14 Business Days", cost: "From $19.99", note: "Ships to 50+ countries", color: "bg-success/8 text-success" },
];

const features = [
  { icon: Package, title: "Order Tracking", desc: "Track your package in real-time from warehouse to doorstep with our tracking system." },
  { icon: Shield, title: "Secure Packaging", desc: "All items are carefully packed with protective materials to ensure they arrive in perfect condition." },
  { icon: MapPin, title: "Delivery Updates", desc: "Receive SMS and email notifications at every stage of your delivery journey." },
];

export default function ShippingInfo() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,hsl(var(--accent)/0.12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <Truck className="h-3.5 w-3.5" /> Delivery Information
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Shipping Info</h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">Fast, reliable shipping with full transparency. Know exactly when your order will arrive.</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Options */}
        <h2 className="text-2xl font-bold text-foreground mb-8">Shipping Options</h2>
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {shippingOptions.map((opt) => (
            <Card key={opt.title} className="rounded-2xl border-border hover:border-accent/30 transition-all hover:shadow-lg">
              <CardContent className="p-7">
                <div className={`w-12 h-12 rounded-xl ${opt.color} flex items-center justify-center mb-5`}>
                  <opt.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">{opt.title}</h3>
                <p className="text-2xl font-extrabold text-foreground mb-1">{opt.cost}</p>
                <p className="text-sm text-muted-foreground mb-3">{opt.time}</p>
                <span className="inline-block px-2.5 py-1 rounded-full bg-accent/8 text-accent text-[11px] font-semibold">{opt.note}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <h2 className="text-2xl font-bold text-foreground mb-8">What to Expect</h2>
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {features.map((f) => (
            <Card key={f.title} className="rounded-2xl border-border">
              <CardContent className="p-7">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Policies */}
        <Card className="rounded-2xl border-border">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Shipping Policies</h2>
            {[
              { title: "Processing Time", text: "Orders are processed within 1–2 business days. Orders placed after 2PM EST will be processed the next business day." },
              { title: "Free Shipping", text: "All domestic orders over $50 qualify for free standard shipping. This is automatically applied at checkout." },
              { title: "International Duties", text: "International orders may be subject to customs duties and taxes. These fees are the responsibility of the recipient." },
              { title: "P.O. Boxes", text: "We ship to P.O. Boxes via standard shipping only. Express and overnight options require a physical address." },
            ].map((policy) => (
              <div key={policy.title} className="border-b border-border last:border-0 pb-5 last:pb-0">
                <h3 className="text-sm font-bold text-foreground mb-1">{policy.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{policy.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
