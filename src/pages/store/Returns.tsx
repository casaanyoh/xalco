import { Card, CardContent } from "@/components/ui/card";
import { RotateCcw, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

const steps = [
  { step: "01", title: "Start a Return", desc: "Log into your account, go to 'My Orders', and click 'Return Item' on the order you'd like to send back." },
  { step: "02", title: "Pack & Ship", desc: "Pack the item securely in its original packaging. Use the prepaid return label we email you." },
  { step: "03", title: "Get Your Refund", desc: "Once we receive and inspect your return, your refund is processed within 5–7 business days." },
];

export default function Returns() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <RotateCcw className="h-3.5 w-3.5" /> Returns & Refunds
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Returns Policy</h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">We want you to love your purchase. If it's not right, returning it is simple and hassle-free.</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {[
            { icon: Clock, title: "30-Day Window", desc: "Return any unused item within 30 days of delivery for a full refund.", color: "bg-accent/8 text-accent" },
            { icon: CheckCircle, title: "Free Returns", desc: "We provide prepaid return labels for all domestic orders — no cost to you.", color: "bg-success/8 text-success" },
            { icon: AlertTriangle, title: "Condition Required", desc: "Items must be unused, unworn, and in original packaging with all tags attached.", color: "bg-warning/8 text-warning" },
          ].map((h) => (
            <Card key={h.title} className="rounded-2xl border-border hover:border-accent/30 transition-all hover:shadow-lg">
              <CardContent className="p-7">
                <div className={`w-12 h-12 rounded-xl ${h.color} flex items-center justify-center mb-4`}>
                  <h.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Steps */}
        <h2 className="text-2xl font-bold text-foreground mb-8">How Returns Work</h2>
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {steps.map((s, i) => (
            <Card key={s.step} className="rounded-2xl border-border relative overflow-hidden">
              <CardContent className="p-7">
                <span className="text-5xl font-extrabold text-accent/10 absolute top-4 right-4">{s.step}</span>
                <div className="relative">
                  <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  {i < steps.length - 1 && <ArrowRight className="hidden sm:block h-5 w-5 text-accent/30 absolute -right-10 top-1/2 -translate-y-1/2" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Non-returnable */}
        <Card className="rounded-2xl border-border">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Non-Returnable Items</h2>
            <p className="text-sm text-muted-foreground">The following items cannot be returned or exchanged:</p>
            <ul className="space-y-3">
              {[
                "Gift cards and digital products",
                "Personalized or custom-made items",
                "Intimate or sanitary goods",
                "Items marked as 'Final Sale'",
                "Products with broken seals (health/hygiene items)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-bold text-foreground mb-2">Exchanges</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We currently don't offer direct exchanges. To get a different item, please return the original and place a new order. Your refund will be processed promptly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
