import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, Users, MapPin, Target, Sparkles, ChevronRight
} from "lucide-react";

export interface ExpansionOpportunity {
  type: 'lookalike' | 'interest' | 'geo';
  source: string;
  currentPerformance: string;
  suggestion: string;
  targetAge: string;
  confidence: number;
  potentialReach: number;
}

interface ExpansionCardProps {
  data: ExpansionOpportunity;
}

export const ExpansionCard = ({ data }: ExpansionCardProps) => {
  const getTypeConfig = () => {
    switch (data.type) {
      case 'lookalike':
        return {
          icon: Users,
          label: 'Lookalike',
          color: 'primary',
          cardClass: 'border-primary/30 bg-primary/5',
          badgeClass: 'bg-primary/15 text-primary border-primary/30',
          iconClass: 'text-primary',
        };
      case 'interest':
        return {
          icon: Target,
          label: 'תחומי עניין',
          color: 'accent',
          cardClass: 'border-accent/30 bg-accent/5',
          badgeClass: 'bg-accent/15 text-accent border-accent/30',
          iconClass: 'text-accent',
        };
      case 'geo':
        return {
          icon: MapPin,
          label: 'גאוגרפי',
          color: 'success',
          cardClass: 'border-success/30 bg-success/5',
          badgeClass: 'bg-success/15 text-success border-success/30',
          iconClass: 'text-success',
        };
    }
  };

  const config = getTypeConfig();
  const TypeIcon = config.icon;

  const getConfidenceColor = () => {
    if (data.confidence >= 85) return 'bg-success';
    if (data.confidence >= 70) return 'bg-primary';
    return 'bg-warning';
  };

  return (
    <Card className={`overflow-hidden transition-all shadow-card hover:shadow-elevated ${config.cardClass}`}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-card shadow-xs">
                <TypeIcon className={`w-5 h-5 ${config.iconClass}`} />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{data.source}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{data.currentPerformance}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className={config.badgeClass}>
              {config.label}
            </Badge>
          </div>

          {/* Suggestion */}
          <div className="p-3 rounded-lg bg-card shadow-xs">
            <p className="text-sm text-foreground">{data.suggestion}</p>
          </div>

          {/* Confidence & Reach */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">ביטחון</span>
                <span className="font-semibold">{data.confidence}%</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full transition-all ${getConfidenceColor()}`}
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
            </div>
            <div className="text-center p-2 rounded-lg bg-card shadow-xs">
              <p className="text-xs text-muted-foreground">Reach פוטנציאלי</p>
              <p className="font-bold text-sm">{(data.potentialReach / 1000).toFixed(0)}K</p>
            </div>
          </div>

          {/* Target Age */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">קהל יעד מומלץ</span>
            <Badge variant="secondary">גיל {data.targetAge}</Badge>
          </div>

          {/* Action Button */}
          <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
            <Plus className="w-4 h-4 mr-1.5" />
            צור קהל חדש
            <ChevronRight className="w-4 h-4 mr-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
