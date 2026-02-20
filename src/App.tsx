import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import StoreHome from "./pages/store/StoreHome";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Products
const AllProducts = lazy(() => import("./pages/dashboard/products/AllProducts"));
const AddProduct = lazy(() => import("./pages/dashboard/products/AddProduct"));
const Categories = lazy(() => import("./pages/dashboard/products/Categories"));

// Inventory
const InventoryOverview = lazy(() => import("./pages/dashboard/inventory/InventoryOverview"));
const StockAdjustment = lazy(() => import("./pages/dashboard/inventory/StockAdjustment"));
const Restock = lazy(() => import("./pages/dashboard/inventory/Restock"));
const LowStockAlerts = lazy(() => import("./pages/dashboard/inventory/LowStockAlerts"));

// POS
const POSTerminal = lazy(() => import("./pages/dashboard/pos/POSTerminal"));
const POSHistory = lazy(() => import("./pages/dashboard/pos/POSHistory"));

// Customers
const AllCustomers = lazy(() => import("./pages/dashboard/customers/AllCustomers"));
const AddCustomer = lazy(() => import("./pages/dashboard/customers/AddCustomer"));

// Orders
const AllOrdersModule = lazy(() => import("./pages/dashboard/orders/AllOrders"));
const OnlineOrdersLoader = lazy(() => import("./pages/dashboard/orders/AllOrders").then((m) => ({ default: m.OnlineOrders })));
const OfflineOrdersLoader = lazy(() => import("./pages/dashboard/orders/AllOrders").then((m) => ({ default: m.OfflineOrders })));

// Reports
const SalesReport = lazy(() => import("./pages/dashboard/reports/SalesReport"));
const ProductPerformance = lazy(() => import("./pages/dashboard/reports/ProductPerformance"));
const InventoryReport = lazy(() => import("./pages/dashboard/reports/InventoryReport"));
const ChannelReport = lazy(() => import("./pages/dashboard/reports/ChannelReport"));

// Accounting
const AccountingOverview = lazy(() => import("./pages/dashboard/accounting/AccountingOverview"));
const ChartOfAccounts = lazy(() => import("./pages/dashboard/accounting/ChartOfAccounts"));
const AccountingTransactions = lazy(() => import("./pages/dashboard/accounting/AccountingTransactions"));
const AccountingInvoices = lazy(() => import("./pages/dashboard/accounting/AccountingInvoices"));
const AccountingReports = lazy(() => import("./pages/dashboard/accounting/AccountingReports"));
const AccountingTaxSettings = lazy(() => import("./pages/dashboard/accounting/AccountingTaxSettings"));

// Settings
const StoreSettings = lazy(() => import("./pages/dashboard/settings/StoreSettings"));
const UserManagement = lazy(() => import("./pages/dashboard/settings/UserManagement"));
const RolesPermissions = lazy(() => import("./pages/dashboard/settings/RolesPermissions"));
const ReceiptSettings = lazy(() => import("./pages/dashboard/settings/ReceiptSettings"));
const WebsiteSettings = lazy(() => import("./pages/dashboard/settings/WebsiteSettings"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/store" element={<StoreHome />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              {/* Products */}
              <Route path="products" element={<Suspense fallback={<PageLoader />}><AllProducts /></Suspense>} />
              <Route path="products/add" element={<Suspense fallback={<PageLoader />}><AddProduct /></Suspense>} />
              <Route path="products/categories" element={<Suspense fallback={<PageLoader />}><Categories /></Suspense>} />
              {/* Inventory */}
              <Route path="inventory" element={<Suspense fallback={<PageLoader />}><InventoryOverview /></Suspense>} />
              <Route path="inventory/adjustment" element={<Suspense fallback={<PageLoader />}><StockAdjustment /></Suspense>} />
              <Route path="inventory/restock" element={<Suspense fallback={<PageLoader />}><Restock /></Suspense>} />
              <Route path="inventory/alerts" element={<Suspense fallback={<PageLoader />}><LowStockAlerts /></Suspense>} />
              {/* POS */}
              <Route path="pos" element={<Suspense fallback={<PageLoader />}><POSTerminal /></Suspense>} />
              <Route path="pos/history" element={<Suspense fallback={<PageLoader />}><POSHistory /></Suspense>} />
              {/* Customers */}
              <Route path="customers" element={<Suspense fallback={<PageLoader />}><AllCustomers /></Suspense>} />
              <Route path="customers/add" element={<Suspense fallback={<PageLoader />}><AddCustomer /></Suspense>} />
              {/* Orders */}
              <Route path="orders" element={<Suspense fallback={<PageLoader />}><AllOrdersModule /></Suspense>} />
              <Route path="orders/online" element={<Suspense fallback={<PageLoader />}><OnlineOrdersLoader /></Suspense>} />
              <Route path="orders/offline" element={<Suspense fallback={<PageLoader />}><OfflineOrdersLoader /></Suspense>} />
              {/* Reports */}
              <Route path="reports/sales" element={<Suspense fallback={<PageLoader />}><SalesReport /></Suspense>} />
              <Route path="reports/products" element={<Suspense fallback={<PageLoader />}><ProductPerformance /></Suspense>} />
              <Route path="reports/inventory" element={<Suspense fallback={<PageLoader />}><InventoryReport /></Suspense>} />
              <Route path="reports/channels" element={<Suspense fallback={<PageLoader />}><ChannelReport /></Suspense>} />
              {/* Accounting */}
              <Route path="accounting" element={<Suspense fallback={<PageLoader />}><AccountingOverview /></Suspense>} />
              <Route path="accounting/chart-of-accounts" element={<Suspense fallback={<PageLoader />}><ChartOfAccounts /></Suspense>} />
              <Route path="accounting/transactions" element={<Suspense fallback={<PageLoader />}><AccountingTransactions /></Suspense>} />
              <Route path="accounting/invoices" element={<Suspense fallback={<PageLoader />}><AccountingInvoices /></Suspense>} />
              <Route path="accounting/reports" element={<Suspense fallback={<PageLoader />}><AccountingReports /></Suspense>} />
              <Route path="accounting/tax" element={<Suspense fallback={<PageLoader />}><AccountingTaxSettings /></Suspense>} />
              {/* Settings */}
              <Route path="settings" element={<Suspense fallback={<PageLoader />}><StoreSettings /></Suspense>} />
              <Route path="settings/users" element={<Suspense fallback={<PageLoader />}><UserManagement /></Suspense>} />
              <Route path="settings/roles" element={<Suspense fallback={<PageLoader />}><RolesPermissions /></Suspense>} />
              <Route path="settings/receipts" element={<Suspense fallback={<PageLoader />}><ReceiptSettings /></Suspense>} />
              <Route path="settings/website" element={<Suspense fallback={<PageLoader />}><WebsiteSettings /></Suspense>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

