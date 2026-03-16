import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/store/CartContext";
import {
  ChevronRight, Lock, ShoppingBag, CreditCard, Smartphone,
  Check, ArrowLeft, Truck, Shield, MapPin, User, Mail, Phone,
} from "lucide-react";

type PaymentMethod = "visa" | "mastercard" | "paypal" | "applepay" | "evc";

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  bg: string;
  label: string;
  textClass: string;
  icon?: string;
}

const paymentOptions: PaymentOption[] = [
  { id: "visa", name: "Visa", bg: "from-[hsl(220,80%,50%)] to-[hsl(220,80%,38%)]", label: "VISA", textClass: "text-white font-bold italic text-sm" },
  { id: "mastercard", name: "MasterCard", bg: "from-[hsl(15,90%,55%)] to-[hsl(40,95%,50%)]", label: "MC", textClass: "text-white font-bold text-sm" },
  { id: "paypal", name: "PayPal", bg: "from-[hsl(210,70%,45%)] to-[hsl(200,80%,55%)]", label: "PayPal", textClass: "text-white font-semibold text-xs" },
  { id: "applepay", name: "Apple Pay", bg: "from-[hsl(0,0%,10%)] to-[hsl(0,0%,20%)]", label: " Pay", textClass: "text-white font-semibold text-sm", icon: "🍎" },
  { id: "evc", name: "EVC Plus", bg: "from-[hsl(145,65%,40%)] to-[hsl(145,65%,30%)]", label: "EVC+", textClass: "text-white font-bold text-xs" },
];

function CardPaymentForm({ method }: { method: "visa" | "mastercard" }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cardName" className="text-xs font-semibold text-foreground">Name on Card</Label>
        <Input id="cardName" placeholder="John Doe" className="mt-1.5 h-11" required />
      </div>
      <div>
        <Label htmlFor="cardNumber" className="text-xs font-semibold text-foreground">Card Number</Label>
        <div className="relative mt-1.5">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="cardNumber" placeholder={method === "visa" ? "4242 4242 4242 4242" : "5555 5555 5555 4444"} className="pl-10 h-11 tracking-wider" maxLength={19} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="expiry" className="text-xs font-semibold text-foreground">Expiry Date</Label>
          <Input id="expiry" placeholder="MM/YY" className="mt-1.5 h-11" maxLength={5} required />
        </div>
        <div>
          <Label htmlFor="cvv" className="text-xs font-semibold text-foreground">CVV</Label>
          <Input id="cvv" placeholder="•••" type="password" className="mt-1.5 h-11" maxLength={4} required />
        </div>
      </div>
    </div>
  );
}

function PayPalForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="ppEmail" className="text-xs font-semibold text-foreground">PayPal Email</Label>
        <div className="relative mt-1.5">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="ppEmail" type="email" placeholder="you@example.com" className="pl-10 h-11" required />
        </div>
      </div>
      <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
        <p className="text-sm text-muted-foreground">You'll be redirected to PayPal to complete your payment securely.</p>
      </div>
    </div>
  );
}

function ApplePayForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="appleId" className="text-xs font-semibold text-foreground">Apple ID</Label>
        <div className="relative mt-1.5">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="appleId" type="email" placeholder="yourname@icloud.com" className="pl-10 h-11" required />
        </div>
      </div>
      <div className="p-4 rounded-xl bg-muted/40 border border-border text-center">
        <p className="text-sm text-muted-foreground">Confirm payment using Face ID, Touch ID, or your Apple device passcode.</p>
      </div>
    </div>
  );
}

function EVCForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="evcPhone" className="text-xs font-semibold text-foreground">EVC Plus Phone Number</Label>
        <div className="relative mt-1.5">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="evcPhone" placeholder="+252 XX XXX XXXX" className="pl-10 h-11" required />
        </div>
      </div>
      <div>
        <Label htmlFor="evcPin" className="text-xs font-semibold text-foreground">EVC PIN</Label>
        <Input id="evcPin" type="password" placeholder="••••" className="mt-1.5 h-11" maxLength={4} required />
      </div>
      <div className="p-4 rounded-xl bg-[hsl(145,65%,40%)]/5 border border-[hsl(145,65%,40%)]/20 text-center">
        <p className="text-sm text-muted-foreground">You will receive a confirmation SMS to verify your EVC Plus payment.</p>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 4.99;
  const total = totalPrice + shipping;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products before checking out.</p>
        <Link to="/store/shop">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Browse Products</Button>
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center animate-fade-in">
          <Check className="h-10 w-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-2">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="text-sm text-muted-foreground mb-8">
          Order #XLC-{Math.random().toString(36).substring(2, 8).toUpperCase()} · A confirmation email has been sent.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/store/shop">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Continue Shopping</Button>
          </Link>
          <Link to="/store">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
        <Link to="/store" className="hover:text-accent transition-colors">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/store/shop" className="hover:text-accent transition-colors">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[
          { n: 1, label: "Shipping" },
          { n: 2, label: "Payment" },
          { n: 3, label: "Review" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <button
              onClick={() => { if (s.n < step) setStep(s.n as 1 | 2 | 3); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                step === s.n
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : step > s.n
                  ? "bg-accent/10 text-accent cursor-pointer"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s.n ? <Check className="h-3.5 w-3.5" /> : <span className="w-5 h-5 rounded-full bg-current/10 flex items-center justify-center text-xs">{s.n}</span>}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < 2 && <div className={`w-8 h-0.5 rounded-full ${step > s.n ? "bg-accent" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder}>
            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Shipping Information</h2>
                    <p className="text-xs text-muted-foreground">Where should we deliver your order?</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-xs font-semibold text-foreground">First Name</Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="firstName" placeholder="John" className="pl-10 h-11" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-xs font-semibold text-foreground">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1.5 h-11" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs font-semibold text-foreground">Email Address</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="john@example.com" className="pl-10 h-11" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs font-semibold text-foreground">Phone Number</Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" placeholder="+1 (555) 123-4567" className="pl-10 h-11" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-xs font-semibold text-foreground">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street, Apt 4B" className="mt-1.5 h-11" required />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-xs font-semibold text-foreground">City</Label>
                      <Input id="city" placeholder="New York" className="mt-1.5 h-11" required />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-xs font-semibold text-foreground">State</Label>
                      <Input id="state" placeholder="NY" className="mt-1.5 h-11" required />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="zip" className="text-xs font-semibold text-foreground">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" className="mt-1.5 h-11" required />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <Link to="/store/shop" className="text-sm text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
                  </Link>
                  <Button type="button" onClick={() => setStep(2)} className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 font-semibold">
                    Continue to Payment <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
                    <p className="text-xs text-muted-foreground">Select your preferred payment method</p>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                  {paymentOptions.map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedPayment(pm.id)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedPayment === pm.id
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border hover:border-accent/30 bg-card"
                      }`}
                    >
                      {selectedPayment === pm.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                          <Check className="h-3 w-3 text-accent-foreground" />
                        </div>
                      )}
                      <div className={`h-9 px-3 rounded-lg bg-gradient-to-r ${pm.bg} flex items-center justify-center gap-1 shadow-sm`}>
                        {pm.icon && <span className="text-xs">{pm.icon}</span>}
                        <span className={pm.textClass}>{pm.label}</span>
                      </div>
                      <span className="text-[11px] font-medium text-muted-foreground">{pm.name}</span>
                    </button>
                  ))}
                </div>

                {/* Payment Details */}
                {selectedPayment && (
                  <div className="animate-fade-in">
                    <Separator className="mb-6" />
                    <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-accent" />
                      {paymentOptions.find((p) => p.id === selectedPayment)?.name} Details
                    </h3>
                    {(selectedPayment === "visa" || selectedPayment === "mastercard") && (
                      <CardPaymentForm method={selectedPayment} />
                    )}
                    {selectedPayment === "paypal" && <PayPalForm />}
                    {selectedPayment === "applepay" && <ApplePayForm />}
                    {selectedPayment === "evc" && <EVCForm />}
                  </div>
                )}

                <div className="mt-8 flex justify-between items-center">
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <Button
                    type="button"
                    disabled={!selectedPayment}
                    onClick={() => setStep(3)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 font-semibold disabled:opacity-50"
                  >
                    Review Order <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Review Your Order</h2>
                    <p className="text-xs text-muted-foreground">Confirm everything looks correct</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 border border-border">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {item.product.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Payment badge */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border mb-6">
                  <CreditCard className="h-4 w-4 text-accent" />
                  <span className="text-sm text-foreground font-medium">
                    Paying with <span className="font-bold">{paymentOptions.find((p) => p.id === selectedPayment)?.name}</span>
                  </span>
                  <button type="button" onClick={() => setStep(2)} className="ml-auto text-xs text-accent hover:underline">Change</button>
                </div>

                {/* Totals */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-success">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold pt-1">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button type="button" onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-10 font-bold text-base xalco-shadow">
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ${total.toFixed(2)}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{item.product.name}</p>
                    <p className="text-[10px] text-muted-foreground">×{item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-success">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-base pt-1">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-6 space-y-2.5">
              {[
                { icon: Lock, text: "Secure SSL Payment" },
                { icon: Truck, text: "Free Shipping on $50+" },
                { icon: Shield, text: "Buyer Protection" },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <t.icon className="h-3.5 w-3.5 text-accent" />
                  {t.text}
                </div>
              ))}
            </div>

            {/* Accepted Methods */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">Accepted Methods</p>
              <div className="flex flex-wrap gap-1.5">
                {paymentOptions.map((pm) => (
                  <div key={pm.id} className={`h-6 px-2 rounded bg-gradient-to-r ${pm.bg} flex items-center gap-1`} title={pm.name}>
                    {pm.icon && <span className="text-[9px]">{pm.icon}</span>}
                    <span className={`${pm.textClass} !text-[9px]`}>{pm.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
