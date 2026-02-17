import { Link, useLocation } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  FileText,
  BarChart3,
  Settings,
  Monitor,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Warehouse,
  PlusCircle,
  Tags,
  Eye,
  ArrowUpDown,
  PackagePlus,
  AlertTriangle,
  History,
  UserPlus,
  Globe,
  Store,
  ShieldCheck,
  UserCog,
  Receipt,
  Layout,
  TrendingUp,
  BarChart,
  Layers,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import xalcoLogoWhite from "@/assets/xalco-logo-white.png";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Products",
    icon: Package,
    items: [
      { title: "All Products", icon: Package, path: "/dashboard/products" },
      { title: "Add Product", icon: PlusCircle, path: "/dashboard/products/add" },
      { title: "Categories", icon: Tags, path: "/dashboard/products/categories" },
    ],
  },
  {
    label: "Inventory",
    icon: Warehouse,
    items: [
      { title: "Overview", icon: Eye, path: "/dashboard/inventory" },
      { title: "Stock Adjustment", icon: ArrowUpDown, path: "/dashboard/inventory/adjustment" },
      { title: "Restock", icon: PackagePlus, path: "/dashboard/inventory/restock" },
      { title: "Low Stock Alerts", icon: AlertTriangle, path: "/dashboard/inventory/alerts" },
    ],
  },
  {
    label: "Point of Sale",
    icon: Monitor,
    items: [
      { title: "POS Terminal", icon: Monitor, path: "/dashboard/pos" },
      { title: "POS History", icon: History, path: "/dashboard/pos/history" },
    ],
  },
  {
    label: "Customers",
    icon: Users,
    items: [
      { title: "All Customers", icon: Users, path: "/dashboard/customers" },
      { title: "Add Customer", icon: UserPlus, path: "/dashboard/customers/add" },
    ],
  },
  {
    label: "Orders",
    icon: FileText,
    items: [
      { title: "All Orders", icon: FileText, path: "/dashboard/orders" },
      { title: "Online Orders", icon: Globe, path: "/dashboard/orders/online" },
      { title: "Offline Orders", icon: Store, path: "/dashboard/orders/offline" },
    ],
  },
  {
    label: "Analysis",
    icon: BarChart3,
    items: [
      { title: "Sales Report", icon: TrendingUp, path: "/dashboard/reports/sales" },
      { title: "Product Performance", icon: BarChart, path: "/dashboard/reports/products" },
      { title: "Inventory Report", icon: Warehouse, path: "/dashboard/reports/inventory" },
      { title: "Channel Report", icon: Layers, path: "/dashboard/reports/channels" },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    items: [
      { title: "Store Settings", icon: Store, path: "/dashboard/settings" },
      { title: "User Management", icon: UserCog, path: "/dashboard/settings/users" },
      { title: "Roles & Permissions", icon: ShieldCheck, path: "/dashboard/settings/roles" },
      { title: "Receipt Settings", icon: Receipt, path: "/dashboard/settings/receipts" },
      { title: "Website Settings", icon: Layout, path: "/dashboard/settings/website" },
    ],
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Track which groups are open
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    // Auto-open the group that contains the active route
    const initial: Record<string, boolean> = {};
    navGroups.forEach((group) => {
      if (group.items.some((item) => location.pathname.startsWith(item.path))) {
        initial[group.label] = true;
      }
    });
    return initial;
  });

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 sticky top-0",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center min-w-0">
          <img
            src={xalcoLogoWhite}
            alt="XALCO"
            className={cn("object-contain transition-all", collapsed ? "h-12 w-12" : "h-14")}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navGroups.map((group) => {
          const isOpen = openGroups[group.label] ?? false;
          const hasActiveChild = group.items.some((item) => location.pathname === item.path);

          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className={cn(
                  "flex items-center w-full gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                  hasActiveChild
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={collapsed ? group.label : undefined}
              >
                <group.icon className="h-[18px] w-[18px] flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{group.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </>
                )}
              </button>

              {/* Sub-items */}
              {!collapsed && isOpen && (
                <div className="ml-4 pl-3 border-l border-sidebar-border space-y-0.5 mt-0.5 mb-1">
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-primary"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
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
