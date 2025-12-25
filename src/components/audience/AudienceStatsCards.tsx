import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Ban, RefreshCw, DollarSign } from "lucide-react";

interface StatsCardsProps {
  scaleCount: number;
  excludeCount: number;
  saturatedCount: number;
  potentialSavings: number;
}

export const AudienceStatsCards = ({ 
  scaleCount, 
  excludeCount, 
  saturatedCount, 
  potentialSavings 
}: StatsCardsProps) => {
  const stats = [
    {
      label: "סגמנטים להרחבה",
      value: scaleCount,
      icon: TrendingUp,
      color: "success" as const,
    },
    {
      label: "החרגות מומלצות",
      value: excludeCount,
      icon: Ban,
      color: "destructive" as const,
    },
    {
      label: "קהלים בשחיקה",
      value: saturatedCount,
      icon: RefreshCw,
      color: "warning" as const,
    },
    {
      label: "חיסכון פוטנציאלי",
      value: `₪${potentialSavings.toLocaleString()}`,
      icon: DollarSign,
      color: "primary" as const,
    },
  ];

  const getColorClasses = (color: typeof stats[0]['color']) => {
    switch (color) {
      case 'success':
        return {
          card: 'border-success/20 bg-success/5',
          icon: 'text-success/40',
          value: 'text-success',
        };
      case 'destructive':
        return {
          card: 'border-destructive/20 bg-destructive/5',
          icon: 'text-destructive/40',
          value: 'text-destructive',
        };
      case 'warning':
        return {
          card: 'border-warning/20 bg-warning/5',
          icon: 'text-warning/40',
          value: 'text-warning',
        };
      case 'primary':
        return {
          card: 'border-primary/20 bg-primary/5',
          icon: 'text-primary/40',
          value: 'text-primary',
        };
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const colors = getColorClasses(stat.color);
        const Icon = stat.icon;
        
        return (
          <Card key={stat.label} className={`${colors.card} shadow-card`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${colors.value}`}>{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${colors.icon}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
