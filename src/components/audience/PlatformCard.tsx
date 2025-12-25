import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, XCircle, AlertCircle, AlertTriangle,
  Smartphone, Monitor, Ban
} from "lucide-react";

export interface Platform {
  platform: string;
  position: string;
  device: string;
  spend: number;
  conversions: number;
  ctr: number;
  cpa: number;
  clicks: number;
}

interface PlatformCardProps {
  platform: Platform;
  avgCpa?: number;
}

export const PlatformCard = ({ platform, avgCpa = 25 }: PlatformCardProps) => {
  const isWaste = platform.conversions === 0 || platform.cpa > 45;
  const isWarning = platform.cpa > 30 && platform.cpa <= 45;
  const isGood = !isWaste && !isWarning;

  const getConfig = () => {
    if (isWaste) {
      return {
        icon: XCircle,
        iconClass: 'text-destructive',
        cardClass: 'border-destructive/30 bg-destructive/5',
        badgeClass: 'bg-destructive/15 text-destructive border-destructive/30',
        label: 'להחרגה',
      };
    }
    if (isWarning) {
      return {
        icon: AlertCircle,
        iconClass: 'text-warning',
        cardClass: 'border-warning/30 bg-warning/5',
        badgeClass: 'bg-warning/15 text-warning border-warning/30',
        label: 'לבדיקה',
      };
    }
    return {
      icon: CheckCircle2,
      iconClass: 'text-success',
      cardClass: 'border-success/30 bg-success/5',
      badgeClass: 'bg-success/15 text-success border-success/30',
      label: 'תקין',
    };
  };

  const config = getConfig();
  const StatusIcon = config.icon;
  const DeviceIcon = platform.device.includes('iOS') ? Smartphone : Monitor;

  const platformDisplayName = platform.platform.replace('_', ' ');

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
                <p className="font-semibold text-foreground capitalize">
                  {platformDisplayName} - {platform.position}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <DeviceIcon className="w-3.5 h-3.5" />
                  <span>{platform.device}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={config.badgeClass}>
              {config.label}
            </Badge>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">הוצאה</p>
              <p className="font-bold text-lg">₪{platform.spend}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">המרות</p>
              <p className={`font-bold text-lg ${platform.conversions === 0 ? 'text-destructive' : ''}`}>
                {platform.conversions}
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">CTR</p>
              <p className={`font-bold text-lg ${platform.ctr < 1 ? 'text-destructive' : platform.ctr > 4 ? 'text-success' : ''}`}>
                {platform.ctr}%
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground mb-1">CPA</p>
              <p className={`font-bold text-lg ${
                platform.conversions === 0 ? 'text-destructive' : 
                platform.cpa > 40 ? 'text-warning' : 
                'text-success'
              }`}>
                {platform.conversions === 0 ? '∞' : `₪${platform.cpa.toFixed(0)}`}
              </p>
            </div>
          </div>

          {/* Warning Alert */}
          {isWaste && (
            <div className="p-4 rounded-lg bg-destructive/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  {platform.conversions === 0 
                    ? `₪${platform.spend} הוצאו ללא אף המרה`
                    : `CPA של ₪${platform.cpa.toFixed(0)} - גבוה פי ${(platform.cpa / avgCpa).toFixed(1)} מהממוצע`
                  }
                </p>
              </div>
              <Button size="sm" variant="destructive" className="flex-shrink-0">
                <Ban className="w-4 h-4 mr-1.5" />
                החרג
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
