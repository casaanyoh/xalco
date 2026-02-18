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
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import xalcoLogoWhite from "@/assets/xalco-logo-white.png";
import xalcoIcon from "@/assets/xalco-icon.png";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface NavSection {
  groupLabel: string;
  groups: {
    label: string;
    icon: React.ElementType;
    collapsible: boolean;
    items: NavItem[];
  }[];
}

const navSections: NavSection[] = [
  {
    groupLabel: "",
    groups: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        collapsible: false,
        items: [{ title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
      },
    ],
  },
  {
    groupLabel: "PRODUCTS & INVENTORY",
    groups: [
      {
        label: "Products",
        icon: Package,
        collapsible: true,
        items: [
          { title: "All Products", icon: Package, path: "/dashboard/products" },
          { title: "Add Product", icon: PlusCircle, path: "/dashboard/products/add" },
          { title: "Categories", icon: Tags, path: "/dashboard/products/categories" },
        ],
      },
      {
        label: "Inventory",
        icon: Warehouse,
        collapsible: true,
        items: [
          { title: "Overview", icon: Eye, path: "/dashboard/inventory" },
          { title: "Stock Adjustment", icon: ArrowUpDown, path: "/dashboard/inventory/adjustment" },
          { title: "Restock", icon: PackagePlus, path: "/dashboard/inventory/restock" },
          { title: "Low Stock Alerts", icon: AlertTriangle, path: "/dashboard/inventory/alerts" },
        ],
      },
    ],
  },
  {
    groupLabel: "POINT OF SALE",
    groups: [
      {
        label: "Point of Sale",
        icon: Monitor,
        collapsible: false,
        items: [
          { title: "POS Terminal", icon: Monitor, path: "/dashboard/pos" },
          { title: "POS History", icon: History, path: "/dashboard/pos/history" },
        ],
      },
    ],
  },
  {
    groupLabel: "CUSTOMERS",
    groups: [
      {
        label: "Customers",
        icon: Users,
        collapsible: false,
        items: [
          { title: "All Customers", icon: Users, path: "/dashboard/customers" },
          { title: "Add Customer", icon: UserPlus, path: "/dashboard/customers/add" },
        ],
      },
    ],
  },
  {
    groupLabel: "ORDERS",
    groups: [
      {
        label: "Orders",
        icon: FileText,
        collapsible: false,
        items: [
          { title: "All Orders", icon: FileText, path: "/dashboard/orders" },
          { title: "Online Orders", icon: Globe, path: "/dashboard/orders/online" },
          { title: "Offline Orders", icon: Store, path: "/dashboard/orders/offline" },
        ],
      },
    ],
  },
  {
    groupLabel: "REPORTS",
    groups: [
      {
        label: "Reports",
        icon: BarChart3,
        collapsible: false,
        items: [
          { title: "Sales Report", icon: TrendingUp, path: "/dashboard/reports/sales" },
          { title: "Product Performance", icon: BarChart, path: "/dashboard/reports/products" },
          { title: "Inventory Report", icon: Warehouse, path: "/dashboard/reports/inventory" },
          { title: "Channel Report", icon: Layers, path: "/dashboard/reports/channels" },
        ],
      },
    ],
  },
  {
    groupLabel: "SETTINGS",
    groups: [
      {
        label: "Settings",
        icon: Settings,
        collapsible: false,
        items: [
          { title: "Store Settings", icon: Store, path: "/dashboard/settings" },
          { title: "User Management", icon: UserCog, path: "/dashboard/settings/users" },
          { title: "Roles & Permissions", icon: ShieldCheck, path: "/dashboard/settings/roles" },
          { title: "Receipt Settings", icon: Receipt, path: "/dashboard/settings/receipts" },
          { title: "Website Settings", icon: Layout, path: "/dashboard/settings/website" },
        ],
      },
    ],
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navSections.forEach((section) => {
      section.groups.forEach((group) => {
        if (group.collapsible && group.items.some((item) => location.pathname === item.path)) {
          initial[group.label] = true;
        }
      });
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
        collapsed ? "w-[68px]" : "w-[250px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center min-w-0">
          <img
            src={collapsed ? xalcoIcon : xalcoLogoWhite}
            alt="XALCO"
            className={cn("object-contain transition-all", collapsed ? "h-10 w-10" : "h-14")}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2.5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={cn(sIdx > 0 && "mt-4")}>
            {/* Section group label */}
            {!collapsed && section.groupLabel && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-muted mb-1.5 px-2.5">
                {section.groupLabel}
              </p>
            )}

            {section.groups.map((group) => {
              const isOpen = openGroups[group.label] ?? false;

              // Non-collapsible: render items directly (no parent button)
              if (!group.collapsible) {
                // Single-item shortcut (Dashboard)
                if (group.items.length === 1 && group.label === "Dashboard") {
                  const item = group.items[0];
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors mb-0.5",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-[17px] w-[17px] flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  );
                }

                // Multi-item flat list
                return (
                  <div key={group.label} className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-primary"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                          title={collapsed ? item.title : undefined}
                        >
                          <item.icon className="h-[17px] w-[17px] flex-shrink-0" />
                          {!collapsed && <span>{item.title}</span>}
                        </Link>
                      );
                    })}
                  </div>
                );
              }

              // Collapsible group (Products, Inventory)
              return (
                <div key={group.label} className="mb-0.5">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={cn(
                      "flex items-center w-full gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                      group.items.some((i) => location.pathname === i.path)
                        ? "text-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                    title={collapsed ? group.label : undefined}
                  >
                    <group.icon className="h-[17px] w-[17px] flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{group.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </>
                    )}
                  </button>

                  {!collapsed && isOpen && (
                    <div className="mt-0.5 space-y-0.5 pl-[30px]">
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
                            <item.icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2.5 space-y-0.5">
        {!collapsed && (
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <ShoppingCart className="h-[17px] w-[17px]" />
            <span>View Store</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
        >
          {collapsed ? (
            <ChevronRight className="h-[17px] w-[17px]" />
          ) : (
            <>
              <ChevronLeft className="h-[17px] w-[17px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
