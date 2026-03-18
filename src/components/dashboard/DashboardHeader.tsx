import { Bell, Search, User, LogOut, Settings, ChevronDown, X, Package, ShoppingCart, Users, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const notifications = [
  { id: 1, icon: ShoppingCart, color: "text-accent", bg: "bg-accent/10", title: "New order received", desc: "Order #1042 — $129.99", time: "2 min ago", unread: true },
  { id: 2, icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", title: "Low stock alert", desc: "Wireless Earbuds Pro — 3 left", time: "15 min ago", unread: true },
  { id: 3, icon: Users, color: "text-info", bg: "bg-info/10", title: "New customer registered", desc: "sarah.m@example.com", time: "1 hour ago", unread: true },
  { id: 4, icon: CheckCircle, color: "text-success", bg: "bg-success/10", title: "Payment confirmed", desc: "Order #1039 — PayPal", time: "3 hours ago", unread: false },
  { id: 5, icon: Info, color: "text-muted-foreground", bg: "bg-muted", title: "System update", desc: "Dashboard v2.1 deployed", time: "1 day ago", unread: false },
];

const searchSuggestions = [
  { label: "Products", icon: Package, path: "/dashboard/products" },
  { label: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
  { label: "Customers", icon: Users, path: "/dashboard/customers" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [readNotifs, setReadNotifs] = useState<number[]>([]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const unreadCount = notifications.filter(n => n.unread && !readNotifs.includes(n.id)).length;

  const markAllRead = () => setReadNotifs(notifications.map(n => n.id));

  const filteredSuggestions = searchQuery.trim()
    ? searchSuggestions.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchSuggestions;

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Search */}
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-[18px] w-[18px]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 rounded-xl xalco-shadow-lg">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dashboard..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-8 h-10 rounded-lg bg-secondary/50 border-border"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
            <div className="p-2">
              <p className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {searchQuery ? "Results" : "Quick Navigation"}
              </p>
              {filteredSuggestions.length > 0 ? filteredSuggestions.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setSearchOpen(false); setSearchQuery(""); }}
                  className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              )) : (
                <p className="px-2 py-4 text-sm text-muted-foreground text-center">No results found</p>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
              <Bell className="h-[18px] w-[18px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-96 p-0 rounded-xl xalco-shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs font-medium text-accent hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => {
                const isUnread = n.unread && !readNotifs.includes(n.id);
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer border-b border-border/50 last:border-0 ${isUnread ? "bg-accent/[0.03]" : ""}`}
                    onClick={() => !readNotifs.includes(n.id) && setReadNotifs(prev => [...prev, n.id])}
                  >
                    <div className={`w-9 h-9 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <n.icon className={`h-4 w-4 ${n.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm ${isUnread ? "font-semibold text-foreground" : "font-medium text-foreground/80"} truncate`}>{n.title}</p>
                        {isUnread && <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-3 border-t border-border">
              <button className="w-full text-xs font-medium text-accent hover:underline text-center py-1">
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-2 flex items-center gap-2 rounded-full hover:bg-secondary/80 transition-colors p-1 pr-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center ring-2 ring-accent/20">
                <User className="h-4 w-4 text-accent" />
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs font-semibold text-foreground leading-tight">Admin User</span>
                <span className="text-[10px] text-muted-foreground leading-tight">admin@xalco.com</span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl xalco-shadow-lg p-1.5">
            <div className="px-3 py-2.5 sm:hidden">
              <p className="text-sm font-semibold text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@xalco.com</p>
            </div>
            <DropdownMenuSeparator className="sm:hidden" />
            <DropdownMenuItem
              onClick={() => navigate("/dashboard/profile")}
              className="gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer text-sm"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/dashboard/settings")}
              className="gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer text-sm"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="gap-2.5 rounded-lg px-3 py-2.5 cursor-pointer text-sm text-destructive focus:text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
