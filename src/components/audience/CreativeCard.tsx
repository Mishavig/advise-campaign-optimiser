import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, Image, Layers, TrendingUp, TrendingDown, BarChart3
} from "lucide-react";

export interface CreativePerformance {
  adId: string;
  name: string;
  type: 'video' | 'carousel' | 'image';
  age: string;
  ctr: number;
  conversions: number;
  avgWatchTime: number;
  spend: number;
}

interface CreativeCardProps {
  adId: string;
  creatives: CreativePerformance[];
  isMobile?: boolean;
}

export const CreativeCard = ({ adId, creatives, isMobile }: CreativeCardProps) => {
  const adName = creatives[0]?.name;
  const adType = creatives[0]?.type;
  const bestAge = creatives.reduce((best, curr) => curr.ctr > best.ctr ? curr : best, creatives[0]);
  const worstAge = creatives.reduce((worst, curr) => curr.ctr < worst.ctr ? curr : worst, creatives[0]);

  const getTypeIcon = () => {
    switch (adType) {
      case 'video': return Play;
      case 'carousel': return Layers;
      default: return Image;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <Card className="overflow-hidden shadow-card border-primary/20 hover:shadow-elevated transition-all">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TypeIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">{adName}</p>
                <Badge variant="outline" className="text-xs">{adType}</Badge>
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">קהל מנצח</p>
              <p className="font-semibold text-success">גיל {bestAge.age}</p>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="space-y-2">
            {creatives.map((perf, idx) => {
              const isBest = perf.age === bestAge.age;
              const isWorst = perf.age === worstAge.age;
              
              return (
                <div 
                  key={idx} 
                  className={`p-3 rounded-lg flex items-center justify-between transition-colors ${
                    isBest ? 'bg-success/10 border border-success/20' :
                    isWorst ? 'bg-destructive/10 border border-destructive/20' :
                    'bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isBest ? <TrendingUp className="w-4 h-4 text-success" /> :
                     isWorst ? <TrendingDown className="w-4 h-4 text-destructive" /> :
                     <BarChart3 className="w-4 h-4 text-muted-foreground" />}
                    <span className="font-medium text-sm">גיל {perf.age}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CTR: </span>
                      <strong className={isBest ? 'text-success' : isWorst ? 'text-destructive' : ''}>
                        {perf.ctr}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-muted-foreground">המרות: </span>
                      <strong>{perf.conversions}</strong>
                    </div>
                    {adType === 'video' && !isMobile && (
                      <div>
                        <span className="text-muted-foreground">צפייה: </span>
                        <strong>{perf.avgWatchTime}s</strong>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
