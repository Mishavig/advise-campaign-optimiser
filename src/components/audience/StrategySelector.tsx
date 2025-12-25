import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

export interface Strategy {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  count: number;
  description: string;
  color: 'success' | 'destructive' | 'warning' | 'primary' | 'accent';
}

interface StrategySelectorProps {
  strategies: Strategy[];
  activeStrategy: string;
  onStrategyChange: (id: string) => void;
  isMobile: boolean;
}

const getColorClasses = (color: Strategy['color'], isActive: boolean) => {
  const colorMap = {
    success: {
      bg: isActive ? 'bg-success/10 border-success/30 ring-success/30' : 'bg-card hover:bg-success/5',
      iconBg: isActive ? 'bg-success/15' : 'bg-muted',
      text: isActive ? 'text-success' : 'text-muted-foreground',
      badge: isActive ? 'bg-success text-success-foreground' : '',
    },
    destructive: {
      bg: isActive ? 'bg-destructive/10 border-destructive/30 ring-destructive/30' : 'bg-card hover:bg-destructive/5',
      iconBg: isActive ? 'bg-destructive/15' : 'bg-muted',
      text: isActive ? 'text-destructive' : 'text-muted-foreground',
      badge: isActive ? 'bg-destructive text-destructive-foreground' : '',
    },
    warning: {
      bg: isActive ? 'bg-warning/10 border-warning/30 ring-warning/30' : 'bg-card hover:bg-warning/5',
      iconBg: isActive ? 'bg-warning/15' : 'bg-muted',
      text: isActive ? 'text-warning' : 'text-muted-foreground',
      badge: isActive ? 'bg-warning text-warning-foreground' : '',
    },
    primary: {
      bg: isActive ? 'bg-primary/10 border-primary/30 ring-primary/30' : 'bg-card hover:bg-primary/5',
      iconBg: isActive ? 'bg-primary/15' : 'bg-muted',
      text: isActive ? 'text-primary' : 'text-muted-foreground',
      badge: isActive ? 'bg-primary text-primary-foreground' : '',
    },
    accent: {
      bg: isActive ? 'bg-accent/10 border-accent/30 ring-accent/30' : 'bg-card hover:bg-accent/5',
      iconBg: isActive ? 'bg-accent/15' : 'bg-muted',
      text: isActive ? 'text-accent' : 'text-muted-foreground',
      badge: isActive ? 'bg-accent text-accent-foreground' : '',
    },
  };
  return colorMap[color];
};

export const StrategySelector = ({ 
  strategies, 
  activeStrategy, 
  onStrategyChange, 
  isMobile 
}: StrategySelectorProps) => {
  return (
    <div className={`grid gap-3 ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
      {strategies.map((strategy) => {
        const isActive = activeStrategy === strategy.id;
        const colors = getColorClasses(strategy.color, isActive);
        const Icon = strategy.icon;
        
        return (
          <Card 
            key={strategy.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-elevated ${colors.bg} ${
              isActive ? 'ring-2 ring-offset-2 ring-offset-background shadow-elevated' : 'shadow-card hover:translate-y-[-1px]'
            }`}
            onClick={() => onStrategyChange(strategy.id)}
          >
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${colors.iconBg}`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <Badge 
                    variant={isActive ? "default" : "secondary"} 
                    className={`text-xs font-semibold ${colors.badge}`}
                  >
                    {strategy.count}
                  </Badge>
                </div>
                <div>
                  <p className={`font-semibold text-sm ${isActive ? colors.text : 'text-foreground'}`}>
                    {isMobile ? strategy.shortLabel : strategy.label}
                  </p>
                  {!isMobile && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {strategy.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
