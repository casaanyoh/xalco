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
  Calculator,
  BookOpen,
  CreditCard,
  FileSpreadsheet,
  Wallet,
  DollarSign,
  PiggyBank,
  BadgeDollarSign,
  HandCoins,
  ArrowDownUp,
  FileCheck,
  FilePlus,
  ClipboardList,
  Repeat,
  Landmark,
  Scale,
  Activity,
  List,
  CircleDollarSign,
  Building2,
  Percent,
} from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import xalcoLogoWhite from "@/assets/xalco-logo-white.png";
import xalcoIcon from "@/assets/xalco-icon.png";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: NavItem[];
}

interface NavGroup {
  label: string;
  icon: React.ElementType;
  collapsible: boolean;
  items: NavItem[];
}

interface NavSection {
  groupLabel: string;
  groups: NavGroup[];
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
    groupLabel: "ACCOUNTING",
    groups: [
      {
        label: "Accounting",
        icon: Calculator,
        collapsible: true,
        items: [
          { title: "Overview", icon: LayoutDashboard, path: "/dashboard/accounting" },
          {
            title: "Chart of Accounts",
            icon: BookOpen,
            children: [
              { title: "Assets", icon: Building2, path: "/dashboard/accounting/chart-of-accounts?category=assets" },
              { title: "Liabilities", icon: CreditCard, path: "/dashboard/accounting/chart-of-accounts?category=liabilities" },
              { title: "Equity", icon: Scale, path: "/dashboard/accounting/chart-of-accounts?category=equity" },
              { title: "Revenue", icon: TrendingUp, path: "/dashboard/accounting/chart-of-accounts?category=revenue" },
              { title: "Expenses", icon: Wallet, path: "/dashboard/accounting/chart-of-accounts?category=expenses" },
            ],
          },
          {
            title: "Transactions",
            icon: ArrowDownUp,
            children: [
              {
                title: "Income",
                icon: DollarSign,
                children: [
                  { title: "Add Income", icon: FilePlus, path: "/dashboard/accounting/transactions?tab=add-income" },
                  { title: "Income Categories", icon: Tags, path: "/dashboard/accounting/transactions?tab=income-categories" },
                  { title: "Recurring Income", icon: Repeat, path: "/dashboard/accounting/transactions?tab=recurring-income" },
                ],
              },
              {
                title: "Expenses",
                icon: BadgeDollarSign,
                children: [
                  { title: "Add Expense", icon: FilePlus, path: "/dashboard/accounting/transactions?tab=add-expense" },
                  { title: "Expense Categories", icon: Tags, path: "/dashboard/accounting/transactions?tab=expense-categories" },
                  { title: "Recurring Expenses", icon: Repeat, path: "/dashboard/accounting/transactions?tab=recurring-expenses" },
                ],
              },
              {
                title: "Journal Entries",
                icon: FileSpreadsheet,
                children: [
                  { title: "New Entry", icon: FilePlus, path: "/dashboard/accounting/transactions?tab=new-journal" },
                  { title: "Journal History", icon: History, path: "/dashboard/accounting/transactions?tab=journal-history" },
                ],
              },
            ],
          },
          {
            title: "Invoices & Bills",
            icon: FileCheck,
            children: [
              {
                title: "Sales Invoices",
                icon: FileText,
                children: [
                  { title: "Create Invoice", icon: FilePlus, path: "/dashboard/accounting/invoices?tab=create" },
                  { title: "Invoice List", icon: List, path: "/dashboard/accounting/invoices?tab=list" },
                  { title: "Pending Invoices", icon: ClipboardList, path: "/dashboard/accounting/invoices?tab=pending" },
                  { title: "Paid Invoices", icon: FileCheck, path: "/dashboard/accounting/invoices?tab=paid" },
                ],
              },
              {
                title: "Purchase Bills",
                icon: Receipt,
                children: [
                  { title: "Add Bill", icon: FilePlus, path: "/dashboard/accounting/invoices?tab=add-bill" },
                  { title: "Bill List", icon: List, path: "/dashboard/accounting/invoices?tab=bill-list" },
                  { title: "Pending Bills", icon: ClipboardList, path: "/dashboard/accounting/invoices?tab=pending-bills" },
                  { title: "Paid Bills", icon: FileCheck, path: "/dashboard/accounting/invoices?tab=paid-bills" },
                ],
              },
              {
                title: "Payments",
                icon: HandCoins,
                children: [
                  { title: "Record Payment", icon: CircleDollarSign, path: "/dashboard/accounting/invoices?tab=record-payment" },
                  { title: "Payment History", icon: History, path: "/dashboard/accounting/invoices?tab=payment-history" },
                ],
              },
            ],
          },
          {
            title: "Reports",
            icon: BarChart3,
            children: [
              { title: "Profit & Loss", icon: TrendingUp, path: "/dashboard/accounting/reports?tab=profit-loss" },
              { title: "Balance Sheet", icon: Scale, path: "/dashboard/accounting/reports?tab=balance-sheet" },
              { title: "Cash Flow Statement", icon: Activity, path: "/dashboard/accounting/reports?tab=cash-flow" },
              { title: "General Ledger", icon: BookOpen, path: "/dashboard/accounting/reports?tab=general-ledger" },
              { title: "Expense Report", icon: Wallet, path: "/dashboard/accounting/reports?tab=expense-report" },
              { title: "Tax Report", icon: Percent, path: "/dashboard/accounting/reports?tab=tax-report" },
            ],
          },
          {
            title: "Tax Settings",
            icon: Percent,
            children: [
              { title: "Tax Configuration", icon: Settings, path: "/dashboard/accounting/tax?tab=config" },
              { title: "VAT Setup", icon: Percent, path: "/dashboard/accounting/tax?tab=vat" },
              { title: "Tax Rates", icon: Percent, path: "/dashboard/accounting/tax?tab=rates" },
              { title: "Tax Summary", icon: FileSpreadsheet, path: "/dashboard/accounting/tax?tab=summary" },
            ],
          },
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

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.path) {
    const itemPathname = item.path.split("?")[0];
    return pathname === itemPathname;
  }
  if (item.children) {
    return item.children.some((child) => isItemActive(child, pathname));
  }
  return false;
}

function isDescendantActive(items: NavItem[], pathname: string): boolean {
  return items.some((item) => isItemActive(item, pathname));
}

interface RecursiveNavProps {
  items: NavItem[];
  collapsed: boolean;
  pathname: string;
  search: string;
  openKeys: Record<string, boolean>;
  toggleKey: (key: string) => void;
  depth?: number;
}

function RecursiveNav({ items, collapsed, pathname, search, openKeys, toggleKey, depth = 0 }: RecursiveNavProps) {
  return (
    <div className={cn("space-y-0.5", depth > 0 && "mt-0.5")}>
      {items.map((item) => {
        if (item.children) {
          const key = item.title;
          const isOpen = openKeys[key] ?? false;
          const hasActive = isDescendantActive(item.children, pathname);

          if (collapsed) {
            return null; // hide nested items when collapsed
          }

          return (
            <div key={key}>
              <button
                onClick={() => toggleKey(key)}
                className={cn(
                  "flex items-center w-full gap-2.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                  hasActive
                    ? "text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 opacity-50 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <div className="pl-4 border-l border-sidebar-border ml-[18px]">
                  <RecursiveNav
                    items={item.children}
                    collapsed={collapsed}
                    pathname={pathname}
                    search={search}
                    openKeys={openKeys}
                    toggleKey={toggleKey}
                    depth={depth + 1}
                  />
                </div>
              )}
            </div>
          );
        }

        // Leaf item (has path)
        const itemPathname = item.path?.split("?")[0] || "";
        const itemSearch = item.path?.includes("?") ? "?" + item.path.split("?")[1] : "";
        const isActive = pathname === itemPathname && (itemSearch === "" || search === itemSearch);

        return (
          <Link
            key={item.path}
            to={item.path || "#"}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            title={collapsed ? item.title : undefined}
          >
            <item.icon className="h-4 w-4 flex-shrink-0 opacity-70" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        );
      })}
    </div>
  );
}

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navSections.forEach((section) => {
      section.groups.forEach((group) => {
        if (group.collapsible && isDescendantActive(group.items, location.pathname)) {
          initial[group.label] = true;
        }
        // Also open nested groups on initial load
        const openNested = (items: NavItem[]) => {
          items.forEach((item) => {
            if (item.children) {
              if (isDescendantActive(item.children, location.pathname)) {
                initial[item.title] = true;
              }
              openNested(item.children);
            }
          });
        };
        openNested(group.items);
      });
    });
    return initial;
  });

  const toggleGroup = useCallback((label: string) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }, []);

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
            src={collapsed ? xalcoIcon : xalcoLogoWhite}
            alt="XALCO"
            className={cn("object-contain transition-all", collapsed ? "h-10 w-10" : "h-14")}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2.5 scrollbar-thin">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={cn(sIdx > 0 && "mt-4")}>
            {!collapsed && section.groupLabel && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-muted mb-1.5 px-2.5">
                {section.groupLabel}
              </p>
            )}

            {section.groups.map((group) => {
              const isOpen = openGroups[group.label] ?? false;

              if (!group.collapsible) {
                if (group.items.length === 1 && group.label === "Dashboard") {
                  const item = group.items[0];
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path!}
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

                return (
                  <div key={group.label} className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path!}
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

              // Collapsible group
              return (
                <div key={group.label} className="mb-0.5">
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className={cn(
                      "flex items-center w-full gap-3 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors",
                      isDescendantActive(group.items, location.pathname)
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
                    <div className="mt-0.5 pl-[30px]">
                      <RecursiveNav
                        items={group.items}
                        collapsed={collapsed}
                        pathname={location.pathname}
                        search={location.search}
                        openKeys={openGroups}
                        toggleKey={toggleGroup}
                      />
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
