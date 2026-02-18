import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <>
      <DashboardHeader title={title} subtitle={subtitle} />
      <div className="p-6 space-y-6 overflow-y-auto flex-1">
        {actions && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {actions}
          </div>
        )}
        {children}
      </div>
    </>
  );
}
