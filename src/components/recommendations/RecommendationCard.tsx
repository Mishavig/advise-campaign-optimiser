import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

interface Recommendation {
  id: string;
  campaign: string;
  campaignId: string;
  priority: "now" | "later";
  action: string;
  metric: string;
  reason: string;
  impact: "high" | "medium" | "low";
  status: "pending" | "implemented" | "dismissed";
  createdAt: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onImplement?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const RecommendationCard = ({
  recommendation,
  onImplement,
  onDismiss,
}: RecommendationCardProps) => {
  const isUrgent = recommendation.priority === "now";
  const isPending = recommendation.status === "pending";
  
  const getImpactConfig = (impact: string) => {
    switch (impact) {
      case "high":
        return {
          label: "High Impact",
          className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
          icon: TrendingUp,
        };
      case "medium":
        return {
          label: "Medium Impact",
          className: "bg-amber-500/10 text-amber-600 border-amber-500/30",
          icon: Lightbulb,
        };
      case "low":
        return {
          label: "Low Impact",
          className: "bg-muted text-muted-foreground border-border",
          icon: Lightbulb,
        };
      default:
        return {
          label: "Impact",
          className: "bg-muted text-muted-foreground border-border",
          icon: Lightbulb,
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "implemented":
        return {
          icon: CheckCircle2,
          className: "text-emerald-500",
          label: "Implemented",
        };
      case "dismissed":
        return {
          icon: XCircle,
          className: "text-muted-foreground",
          label: "Dismissed",
        };
      default:
        return {
          icon: Clock,
          className: "text-amber-500",
          label: "Pending",
        };
    }
  };

  const impactConfig = getImpactConfig(recommendation.impact);
  const statusConfig = getStatusConfig(recommendation.status);
  const ImpactIcon = impactConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`group relative glass-card rounded-2xl p-5 md:p-6 border transition-all duration-300 hover-lift ${
        isUrgent && isPending
          ? "border-red-500/30 bg-red-500/5"
          : "border-border/50"
      }`}
    >
      {/* Priority indicator line */}
      <div
        className={`absolute left-0 top-4 bottom-4 w-1 rounded-full ${
          isUrgent ? "bg-gradient-to-b from-red-500 to-orange-500" : "bg-gradient-to-b from-amber-500 to-yellow-500"
        }`}
      />

      <div className="pl-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 space-y-2">
            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={`font-semibold ${
                  isUrgent
                    ? "bg-red-500/10 text-red-600 border-red-500/30"
                    : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                }`}
              >
                {isUrgent ? (
                  <Zap className="h-3 w-3 mr-1" />
                ) : (
                  <Clock className="h-3 w-3 mr-1" />
                )}
                {isUrgent ? "Act Now" : "Plan Ahead"}
              </Badge>
              
              <Badge variant="outline" className={impactConfig.className}>
                <ImpactIcon className="h-3 w-3 mr-1" />
                {impactConfig.label}
              </Badge>

              {!isPending && (
                <Badge variant="outline" className="bg-muted/50">
                  <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.className}`} />
                  {statusConfig.label}
                </Badge>
              )}
            </div>

            {/* Action title */}
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              {recommendation.action}
            </h3>
          </div>

          {/* Metric badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-medium text-primary">
              {recommendation.metric}
            </span>
          </div>
        </div>

        {/* Campaign & Reason */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-0.5 rounded-md bg-muted/50 font-medium">
              {recommendation.campaign}
            </span>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/30 border border-border/50">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              {recommendation.reason}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          {isPending ? (
            <>
              <Button
                size="sm"
                onClick={() => onImplement?.(recommendation.id)}
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-primary-foreground shadow-lg shadow-primary/20"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Implement
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDismiss?.(recommendation.id)}
                className="flex-1 hover:bg-muted/50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Dismiss
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              asChild
              className="flex-1 group/btn hover:bg-primary/5 hover:border-primary/30"
            >
              <Link to={`/campaigns`}>
                View Campaign
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
