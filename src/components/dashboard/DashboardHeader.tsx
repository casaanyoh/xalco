import { Bell, Search, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      <div>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="h-[18px] w-[18px]" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
        </Button>

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
