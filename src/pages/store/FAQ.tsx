import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, HelpCircle, Package, CreditCard, Truck, RotateCcw, Shield, Headphones } from "lucide-react";

const faqCategories = [
  { icon: Package, label: "Orders", color: "text-info" },
  { icon: Truck, label: "Shipping", color: "text-success" },
  { icon: RotateCcw, label: "Returns", color: "text-warning" },
  { icon: CreditCard, label: "Payments", color: "text-accent" },
  { icon: Shield, label: "Account", color: "text-[hsl(280,60%,50%)]" },
  { icon: Headphones, label: "Support", color: "text-destructive" },
];

const faqs = [
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also track orders from your account dashboard under 'My Orders'.", cat: "Orders" },
  { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and Google Pay. All transactions are secured with 256-bit SSL encryption.", cat: "Payments" },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping delivers in 2-3 business days. Free shipping is available on orders over $50.", cat: "Shipping" },
  { q: "What is your return policy?", a: "We offer a 30-day return policy. Items must be unused and in original packaging. Refunds are processed within 5-7 business days after we receive the return.", cat: "Returns" },
  { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries worldwide. International shipping typically takes 7-14 business days depending on your location.", cat: "Shipping" },
  { q: "How do I create an account?", a: "Click the 'Sign Up' button in the navigation bar. You can register with your email or sign up using Google or Apple for faster access.", cat: "Account" },
  { q: "Can I change or cancel my order?", a: "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed.", cat: "Orders" },
  { q: "Is my personal information secure?", a: "Absolutely. We use industry-standard encryption and never share your personal data with third parties. See our Privacy Policy for details.", cat: "Account" },
  { q: "How do I contact customer support?", a: "You can reach us via email at support@xalco.com, by phone at +1 (800) 555-0199, or through the contact form on our website.", cat: "Support" },
  { q: "Do you offer gift cards?", a: "Yes! Digital gift cards are available in denominations of $25, $50, $100, and $200. They never expire and can be used on any product.", cat: "Payments" },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    const matchSearch = f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCat || f.cat === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent)/0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <HelpCircle className="h-3.5 w-3.5" /> Help Center
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-primary-foreground/70 mb-8">Find quick answers to common questions about orders, shipping, returns, and more.</p>
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="h-12 pl-11 rounded-xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:bg-primary-foreground/15"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          <button
            onClick={() => setActiveCat(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${!activeCat ? "bg-accent text-accent-foreground border-accent" : "bg-card text-muted-foreground border-border hover:border-accent/30"}`}
          >
            All Topics
          </button>
          {faqCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCat(activeCat === cat.label ? null : cat.label)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${activeCat === cat.label ? "bg-accent text-accent-foreground border-accent" : "bg-card text-muted-foreground border-border hover:border-accent/30"}`}
            >
              <cat.icon className={`h-3.5 w-3.5 ${activeCat === cat.label ? "text-accent-foreground" : cat.color}`} />
              {cat.label}
            </button>
          ))}
        </div>

        <Card className="rounded-2xl border-border">
          <CardContent className="p-2 sm:p-6">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No matching questions found. Try a different search term.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-1">
                {filtered.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-none rounded-xl px-4 data-[state=open]:bg-muted/30">
                    <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                      <span className="text-left pr-4">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="mt-16 text-center">
          <Card className="rounded-2xl border-border bg-accent/5">
            <CardContent className="p-10">
              <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mb-5">Can't find the answer you're looking for? Our support team is happy to help.</p>
              <a href="/store/contact">
                <button className="h-11 px-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold text-sm inline-flex items-center gap-2">
                  <Headphones className="h-4 w-4" /> Contact Support
                </button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
