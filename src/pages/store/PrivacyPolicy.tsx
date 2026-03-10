import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, UserCheck, Bell } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Personal information you provide (name, email, phone, shipping address) when creating an account or placing an order.",
      "Payment information processed securely through our third-party payment providers. We never store your full credit card details.",
      "Usage data including pages visited, products viewed, and interactions with our website collected through cookies and analytics tools.",
      "Device information such as browser type, operating system, and IP address for security and optimization purposes.",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "Process and fulfill your orders, including shipping and delivery notifications.",
      "Communicate with you about your account, orders, and customer support inquiries.",
      "Personalize your shopping experience with relevant product recommendations.",
      "Send promotional emails and offers (only with your consent — you can unsubscribe anytime).",
      "Improve our website, products, and services through analytics and feedback.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We use industry-standard 256-bit SSL encryption to protect all data transmissions.",
      "Payment processing is handled by PCI-DSS compliant providers.",
      "Access to personal data is restricted to authorized employees who need it to perform their duties.",
      "We conduct regular security audits and vulnerability assessments.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "Access, correct, or delete your personal data at any time through your account settings.",
      "Opt out of marketing communications through the unsubscribe link in any email.",
      "Request a copy of all personal data we hold about you.",
      "Lodge a complaint with a data protection authority if you believe your rights have been violated.",
    ],
  },
  {
    icon: Bell,
    title: "Cookies & Tracking",
    content: [
      "We use essential cookies for cart functionality and user authentication.",
      "Analytics cookies help us understand how visitors use our site (Google Analytics).",
      "You can manage cookie preferences through your browser settings.",
      "Third-party cookies may be placed by payment processors and social media integrations.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,hsl(var(--accent)/0.12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <Shield className="h-3.5 w-3.5" /> Your Privacy Matters
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">We're committed to protecting your personal information and being transparent about what we collect and how we use it.</p>
            <p className="text-sm text-primary-foreground/50 mt-4">Last updated: March 1, 2026</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {sections.map((section) => (
          <Card key={section.title} className="rounded-2xl border-border">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-accent/8 flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        <Card className="rounded-2xl border-border bg-accent/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">Questions About Privacy?</h3>
            <p className="text-sm text-muted-foreground mb-4">If you have questions or concerns about our privacy practices, please reach out.</p>
            <a href="/store/contact">
              <button className="h-10 px-6 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold text-sm">Contact Us</button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
