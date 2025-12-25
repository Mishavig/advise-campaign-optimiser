import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, TrendingDown, RefreshCw, Users, Zap
} from "lucide-react";

export interface SaturationData {
  adSetId: string;
  name: string;
  reach: number;
  potentialReach: number;
  frequency: number;
  ctrTrend: number;
  saturationLevel: number;
  spend: number;
}

interface SaturationCardProps {
  data: SaturationData;
}

export const SaturationCard = ({ data }: SaturationCardProps) => {
  const isCritical = data.saturationLevel > 80;
  const isWarning = data.saturationLevel > 60 && data.saturationLevel <= 80;
  const isHealthy = data.saturationLevel <= 60;

  const getStatusConfig = () => {
    if (isCritical) {
      return {
        cardClass: 'border-destructive/30 bg-destructive/5',
        progressClass: 'bg-destructive',
        badgeClass: 'bg-destructive/15 text-destructive border-destructive/30',
        label: 'שחיקה קריטית',
        icon: AlertTriangle,
        iconClass: 'text-destructive',
      };
    }
    if (isWarning) {
      return {
        cardClass: 'border-warning/30 bg-warning/5',
        progressClass: 'bg-warning',
        badgeClass: 'bg-warning/15 text-warning border-warning/30',
        label: 'שחיקה בינונית',
        icon: RefreshCw,
        iconClass: 'text-warning',
      };
    }
    return {
      cardClass: 'border-success/30 bg-success/5',
      progressClass: 'bg-success',
      badgeClass: 'bg-success/15 text-success border-success/30',
      label: 'קהל בריא',
      icon: Users,
      iconClass: 'text-success',
    };
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <Card className={`overflow-hidden transition-all shadow-card ${config.cardClass}`}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-card shadow-xs">
                <StatusIcon className={`w-5 h-5 ${config.iconClass}`} />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{data.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{data.reach.toLocaleString()} / {data.potentialReach.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={config.badgeClass}>
              {config.label}
            </Badge>
          </div>

          {/* Saturation Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">רמת שחיקה</span>
              <span className="font-semibold">{data.saturationLevel}%</span>
            </div>
            <div className="relative">
              <Progress value={data.saturationLevel} className="h-2" />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all ${config.progressClass}`}
                style={{ width: `${data.saturationLevel}%` }}
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">Frequency</p>
              <p className={`font-bold text-lg ${data.frequency > 4 ? 'text-destructive' : data.frequency > 3 ? 'text-warning' : 'text-foreground'}`}>
                {data.frequency.toFixed(1)}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">מגמת CTR</p>
              <p className={`font-bold text-lg flex items-center justify-center gap-0.5 ${data.ctrTrend < 0 ? 'text-destructive' : 'text-success'}`}>
                <TrendingDown className={`w-4 h-4 ${data.ctrTrend > 0 ? 'rotate-180' : ''}`} />
                {Math.abs(data.ctrTrend)}%
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">הוצאה</p>
              <p className="font-bold text-lg">₪{data.spend.toLocaleString()}</p>
            </div>
          </div>

          {/* Action Recommendation */}
          {(isCritical || isWarning) && (
            <div className={`p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isCritical ? 'bg-destructive/10' : 'bg-warning/10'
            }`}>
              <div className="flex items-start gap-2">
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCritical ? 'text-destructive' : 'text-warning'}`} />
                <p className="text-sm text-muted-foreground">
                  {isCritical 
                    ? 'קהל מוצה - יש לרענן עם Lookalike חדש או להרחיב טווח גילאים'
                    : 'קהל מתחיל להישחק - מומלץ להכין קהל חלופי'
                  }
                </p>
              </div>
              <Button 
                size="sm" 
                className={isCritical 
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                  : 'bg-warning hover:bg-warning/90 text-warning-foreground'
                }
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                רענן
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
