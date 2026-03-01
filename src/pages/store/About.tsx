import { Shield, Truck, Users, Award, Heart, Globe } from "lucide-react";
import xalcoLogoDark from "@/assets/xalco-logo-dark.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const values = [
  { icon: Shield, title: "Quality First", desc: "Every product is carefully curated and quality-tested before it reaches your hands." },
  { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders over $50 with reliable tracking and delivery updates." },
  { icon: Heart, title: "Customer Love", desc: "Our team is passionate about providing exceptional customer experiences." },
  { icon: Globe, title: "Sustainable", desc: "We're committed to eco-friendly packaging and sustainable sourcing practices." },
  { icon: Users, title: "Community", desc: "Join 12,000+ happy customers who trust XALCO for their shopping needs." },
  { icon: Award, title: "Best Prices", desc: "We negotiate the best deals so you get premium products at fair prices." },
];

const stats = [
  { value: "12K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 xalco-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10 text-center">
          <img src={xalcoLogoDark} alt="XALCO" className="h-16 object-contain mx-auto mb-8 brightness-0 invert" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">
            Built for Better Shopping
          </h1>
          <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
            XALCO is a unified commerce platform dedicated to bringing you quality products at fair prices, with an exceptional shopping experience from start to finish.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-accent mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe everyone deserves access to quality products without overpaying. XALCO bridges the gap between premium quality and affordability, empowering shoppers with a curated selection of products across electronics, fashion, home, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v) => (
            <div key={v.title} className="bg-card border border-border rounded-2xl p-6 hover:xalco-shadow-lg hover:border-accent/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                <v.icon className="h-5 w-5 text-accent group-hover:text-accent-foreground" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 xalco-gradient" />
          <div className="relative z-10 p-12 md:p-20 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to Start Shopping?</h2>
            <p className="text-primary-foreground/50 mb-8 max-w-md mx-auto">
              Join thousands of satisfied customers and discover quality products at unbeatable prices.
            </p>
            <Link to="/store/shop">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 h-12 xalco-shadow">
                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
