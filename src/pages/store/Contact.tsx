import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "support@xalco.com", sub: "We reply within 24 hours" },
  { icon: Phone, label: "Call Us", value: "+1 (800) 555-0199", sub: "Mon–Fri, 9AM–6PM EST" },
  { icon: MapPin, label: "Visit Us", value: "123 Commerce Blvd, Suite 400", sub: "New York, NY 10001" },
  { icon: Clock, label: "Business Hours", value: "Mon – Fri: 9AM – 6PM", sub: "Sat: 10AM – 4PM EST" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.15),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
              <MessageCircle className="h-3.5 w-3.5" /> Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
            <p className="text-lg text-primary-foreground/70 leading-relaxed">
              Have questions or need help? Our team is here to assist you. Reach out and we'll respond as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactInfo.map((item) => (
            <Card key={item.label} className="rounded-2xl border-border hover:border-accent/30 transition-all hover:shadow-lg group">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm font-semibold text-foreground/80">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-5 gap-10">
          <Card className="lg:col-span-3 rounded-2xl border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-sm text-muted-foreground mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {sent ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-7 w-7 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">Thank you for reaching out. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input placeholder="John" required className="h-11 rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input placeholder="Doe" required className="h-11 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input type="email" placeholder="john@example.com" required className="h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                    <Input placeholder="How can we help?" required className="h-11 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <Textarea placeholder="Tell us more about your inquiry..." rows={5} required className="rounded-xl resize-none" />
                  </div>
                  <Button type="submit" className="h-11 px-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold">
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-border bg-muted/30 flex items-center justify-center min-h-[400px]">
            <div className="text-center p-8">
              <div className="w-20 h-20 rounded-full bg-accent/8 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Our Location</h3>
              <p className="text-sm text-muted-foreground">123 Commerce Blvd, Suite 400<br />New York, NY 10001</p>
              <Button variant="outline" className="mt-5 rounded-xl">Get Directions</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
