import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    text: "By accessing or using the XALCO website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of any changes.",
  },
  {
    title: "2. Account Registration",
    text: "To make purchases or access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration.",
  },
  {
    title: "3. Products & Pricing",
    text: "We strive to display accurate product descriptions, images, and pricing. However, errors may occur. We reserve the right to correct any errors, update information, or cancel orders if pricing is incorrect. Prices are listed in USD and are subject to change without notice.",
  },
  {
    title: "4. Orders & Payment",
    text: "By placing an order, you are making an offer to purchase. We may accept or decline any order at our discretion. Payment is processed at the time of order. We accept major credit cards, PayPal, and other payment methods as displayed at checkout.",
  },
  {
    title: "5. Shipping & Delivery",
    text: "Shipping times are estimates and not guaranteed. We are not responsible for delays caused by carriers, customs, or circumstances beyond our control. Risk of loss passes to you upon delivery to the carrier. Please refer to our Shipping Info page for detailed policies.",
  },
  {
    title: "6. Intellectual Property",
    text: "All content on this website — including text, graphics, logos, images, and software — is the property of XALCO or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.",
  },
  {
    title: "7. User Conduct",
    text: "You agree not to use our services for any unlawful purpose, attempt to gain unauthorized access to our systems, interfere with the proper functioning of the website, or engage in any activity that could harm XALCO or its users.",
  },
  {
    title: "8. Limitation of Liability",
    text: "XALCO shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability for any claim shall not exceed the amount you paid for the specific product or service giving rise to the claim.",
  },
  {
    title: "9. Governing Law",
    text: "These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts located in New York County.",
  },
];

export default function TermsOfService() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,hsl(var(--accent)/0.12),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <Scale className="h-3.5 w-3.5" /> Legal
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">Please read these terms carefully before using our services. They outline your rights and responsibilities as a user.</p>
            <p className="text-sm text-primary-foreground/50 mt-4">Last updated: March 1, 2026</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="rounded-2xl border-border">
          <CardContent className="p-8 space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="border-b border-border last:border-0 pb-8 last:pb-0">
                <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground">
            If you have questions about these terms, please <a href="/store/contact" className="text-accent hover:underline font-medium">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
