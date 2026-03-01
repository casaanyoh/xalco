import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus, Check } from "lucide-react";
import xalcoLogoDark from "@/assets/xalco-logo-dark.png";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const perks = [
    "Free shipping on your first order",
    "Exclusive member-only deals",
    "Early access to new arrivals",
    "Save items to your wishlist",
    "Track orders & manage returns",
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] xalco-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="absolute top-16 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-10 w-36 h-36 bg-accent/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-sm">
          <img src={xalcoLogoDark} alt="XALCO" className="h-14 object-contain mb-10 brightness-0 invert" />
          <h2 className="text-2xl font-bold text-primary-foreground mb-3">Join the XALCO community</h2>
          <p className="text-primary-foreground/50 text-sm leading-relaxed mb-8">
            Create your free account and unlock a world of premium shopping perks.
          </p>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-accent" />
                </div>
                <span className="text-sm text-primary-foreground/70">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden mb-8 text-center">
            <img src={xalcoLogoDark} alt="XALCO" className="h-12 object-contain mx-auto mb-4" />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Already have an account?{" "}
              <Link to="/store/signin" className="text-accent hover:text-accent/80 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <Card className="border-border/50 xalco-shadow">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Full name</Label>
                  <Input id="name" type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} className="h-11 pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {form.password.length > 0 && (
                    <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                          form.password.length >= i * 3 ? (form.password.length >= 10 ? "bg-success" : "bg-warning") : "bg-border"
                        }`} />
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                  {isLoading ? (
                    <div className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  ) : (
                    <><UserPlus className="mr-2 h-4 w-4" /> Create Account</>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  By creating an account, you agree to our{" "}
                  <button type="button" className="text-accent hover:underline">Terms of Service</button>{" "}
                  and{" "}
                  <button type="button" className="text-accent hover:underline">Privacy Policy</button>.
                </p>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or sign up with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" className="h-11">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                  </Button>
                  <Button type="button" variant="outline" className="h-11">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.04-.56-.04-.95 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.32.06.65.06 1.02h.224zm4.565 17.71c-.12.36-.78 1.64-1.54 2.76-.7 1.06-1.43 2.08-2.59 2.12-1.07.04-1.44-.67-2.97-.67-1.53 0-1.93.65-2.97.7-1.08.04-1.91-1.16-2.63-2.22-1.47-2.18-2.6-6.15-1.08-8.82.75-1.33 2.08-2.18 3.5-2.18 1.09 0 2.1.72 2.74.72.64 0 1.84-.9 3.09-.77.53.02 2.01.22 2.95 1.6-.08.04-1.76 1.06-1.73 3.14.03 2.5 2.13 3.35 2.23 3.38z" /></svg>
                    Apple
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
