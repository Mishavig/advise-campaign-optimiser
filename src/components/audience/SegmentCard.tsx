import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, XCircle, AlertCircle, Users, 
  ArrowDownRight, ArrowUpRight, Zap, Rocket, Ban
} from "lucide-react";

export interface Segment {
  id: number;
  segment: string;
  age: string;
  gender: string;
  region: string;
  cpa: number;
  roas: number;
  avgCpa: number;
  improvement: number;
  conversions: number;
  spend: number;
  impressions: number;
  ctr: number;
  action: "scale" | "exclude" | "monitor";
}

interface SegmentCardProps {
  segment: Segment;
}

export const SegmentCard = ({ segment }: SegmentCardProps) => {
  const getStatusConfig = (action: Segment['action']) => {
    switch (action) {
      case 'scale':
        return {
          icon: CheckCircle2,
          iconClass: 'text-success',
          cardClass: 'border-success/30 bg-success/5 hover:bg-success/10',
          badgeClass: 'bg-success/15 text-success border-success/30',
          label: 'להרחבה',
          actionIcon: Rocket,
          actionLabel: 'הרחב קהל',
          actionClass: 'bg-success hover:bg-success/90 text-success-foreground',
        };
      case 'exclude':
        return {
          icon: XCircle,
          iconClass: 'text-destructive',
          cardClass: 'border-destructive/30 bg-destructive/5 hover:bg-destructive/10',
          badgeClass: 'bg-destructive/15 text-destructive border-destructive/30',
          label: 'להחרגה',
          actionIcon: Ban,
          actionLabel: 'החרג',
          actionClass: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
        };
      default:
        return {
          icon: AlertCircle,
          iconClass: 'text-warning',
          cardClass: 'border-border hover:bg-muted/50',
          badgeClass: 'bg-muted text-muted-foreground',
          label: 'למעקב',
          actionIcon: null,
          actionLabel: '',
          actionClass: '',
        };
    }
  };

  const config = getStatusConfig(segment.action);
  const StatusIcon = config.icon;

  return (
    <Card className={`overflow-hidden transition-all duration-200 shadow-card ${config.cardClass}`}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-card shadow-xs`}>
                <StatusIcon className={`w-5 h-5 ${config.iconClass}`} />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{segment.segment}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{segment.impressions.toLocaleString()} חשיפות</span>
                  <span className="text-border">•</span>
                  <span className="font-medium">{segment.conversions} המרות</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={config.badgeClass}>
              {config.label}
            </Badge>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'CPA', value: `₪${segment.cpa.toFixed(0)}`, highlight: segment.action === 'scale' },
              { label: 'ROAS', value: `${segment.roas}x`, highlight: segment.roas > 3 },
              { label: 'CTR', value: `${segment.ctr}%`, highlight: segment.ctr > 4 },
              { 
                label: 'vs ממוצע', 
                value: `${Math.abs(segment.improvement).toFixed(0)}%`,
                isImprovement: true,
                positive: segment.improvement > 0
              },
            ].map((metric, idx) => (
              <div 
                key={idx} 
                className="text-center p-3 rounded-lg bg-card shadow-xs"
              >
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <p className={`font-bold text-lg flex items-center justify-center gap-0.5 ${
                  metric.isImprovement 
                    ? metric.positive ? 'text-success' : 'text-destructive'
                    : metric.highlight ? 'text-foreground' : 'text-foreground'
                }`}>
                  {metric.isImprovement && (
                    metric.positive 
                      ? <ArrowDownRight className="w-4 h-4" /> 
                      : <ArrowUpRight className="w-4 h-4" />
                  )}
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action Recommendation */}
          {segment.action !== 'monitor' && (
            <div className={`p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              segment.action === 'scale' ? 'bg-success/10' : 'bg-destructive/10'
            }`}>
              <div className="flex items-start gap-2">
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  segment.action === 'scale' ? 'text-success' : 'text-destructive'
                }`} />
                <p className="text-sm text-muted-foreground">
                  {segment.action === 'scale' 
                    ? `פצל ל-Ad Set ייעודי עם תקציב משלו - פוטנציאל גבוה`
                    : `בזבוז של ₪${segment.spend} - שקול להחריג סגמנט זה`
                  }
                </p>
              </div>
              {config.actionIcon && (
                <Button size="sm" className={`flex-shrink-0 ${config.actionClass}`}>
                  <config.actionIcon className="w-4 h-4 mr-1.5" />
                  {config.actionLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
