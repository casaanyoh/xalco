import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, ShoppingBag } from "lucide-react";
import xalcoLogoDark from "@/assets/xalco-logo-dark.png";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      // Pass intended destination so login can redirect back
      navigate("/login", { state: { from: { pathname: "/dashboard" } } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6">
        <img src={xalcoLogoDark} alt="XALCO" className="h-28 object-contain mx-auto mb-6" />
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Unified Commerce Platform — Manage your store, process sales, and sell online from one system.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            onClick={handleDashboardClick}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Store Dashboard
          </Button>
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold">
            <Link to="/store">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Store
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
