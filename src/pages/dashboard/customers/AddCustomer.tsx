import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function AddCustomer() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", address: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Customer added", description: `${form.firstName} ${form.lastName} has been added.` });
  };

  return (
    <PageShell title="Add Customer" subtitle="Register a new customer">
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-card rounded-lg border border-border p-6 space-y-4 xalco-shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">Customer Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>First Name</Label><Input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
            <div className="space-y-2"><Label>Last Name</Label><Input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="email@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input placeholder="+1 555-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Address</Label><Input placeholder="Street address, city, state" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
          <div className="space-y-2"><Label>Notes</Label><Textarea placeholder="Additional notes..." rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Save Customer</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </form>
    </PageShell>
  );
}
