import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  BarChart3,
  Settings,
  Monitor,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import xalcoLogoWhite from "@/assets/xalco-logo-white.png";

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { title: "Products", icon: Package, path: "/dashboard/products" },
      { title: "POS", icon: Monitor, path: "/dashboard/pos" },
      { title: "Orders", icon: FileText, path: "/dashboard/orders" },
      { title: "Customers", icon: Users, path: "/dashboard/customers" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { title: "Reports", icon: BarChart3, path: "/dashboard/reports" },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", icon: Settings, path: "/dashboard/settings" },
    ],
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 sticky top-0",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center min-w-0">
          <img
            src={xalcoLogoWhite}
            alt="XALCO"
            className={cn("object-contain transition-all", collapsed ? "h-10 w-10" : "h-10")}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-muted mb-2 px-2">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        {!collapsed && (
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span>View Store</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
        >
          {collapsed ? (
            <ChevronRight className="h-[18px] w-[18px]" />
          ) : (
            <>
              <ChevronLeft className="h-[18px] w-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
