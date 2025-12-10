import { Sparkles, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderStats {
  opportunityValue: number;
  criticalCount: number;
  scalableCount: number;
}

interface CommandCenterHeaderProps {
  stats: HeaderStats;
}

export const CommandCenterHeader = ({ stats }: CommandCenterHeaderProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* AI Opportunity Value */}
      <div className="glass-card rounded-2xl p-6 shadow-elevated hover-lift">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">AI Opportunity Value</p>
            <p className="text-3xl font-bold text-gradient-purple">
              ₪{stats.opportunityValue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Potential Monthly Savings</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Critical Attention */}
      <div className="glass-card-danger rounded-2xl p-6 shadow-elevated hover-lift">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Critical Attention</p>
            <p className="text-3xl font-bold text-destructive">
              {stats.criticalCount}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Campaigns Need Review</p>
          </div>
          <div className="p-3 rounded-xl bg-destructive/20">
            <AlertTriangle className="w-6 h-6 text-destructive animate-pulse-soft" />
          </div>
        </div>
      </div>

      {/* Active Scalers */}
      <div className="glass-card-success rounded-2xl p-6 shadow-elevated hover-lift">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-1">Active Scalers</p>
            <p className="text-3xl font-bold text-success">
              {stats.scalableCount}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Ready to Scale Up</p>
          </div>
          <div className="p-3 rounded-xl bg-success/20">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
        </div>
      </div>
    </div>
  );
};
