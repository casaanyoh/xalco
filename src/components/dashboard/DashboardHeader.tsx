import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
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
        <div className="ml-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
