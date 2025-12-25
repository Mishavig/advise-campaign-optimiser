import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Zap, Clock, CheckCircle2 } from "lucide-react";

interface RecommendationFiltersProps {
  priorityFilter: "all" | "now" | "later";
  statusFilter: string;
  campaignFilter: string;
  campaigns: string[];
  onPriorityChange: (value: "all" | "now" | "later") => void;
  onStatusChange: (value: string) => void;
  onCampaignChange: (value: string) => void;
}

export const RecommendationFilters = ({
  priorityFilter,
  statusFilter,
  campaignFilter,
  campaigns,
  onPriorityChange,
  onStatusChange,
  onCampaignChange,
}: RecommendationFiltersProps) => {
  return (
    <div className="glass-card rounded-2xl p-4 md:p-5 border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Filters</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Priority
          </label>
          <Select value={priorityFilter} onValueChange={(v: "all" | "now" | "later") => onPriorityChange(v)}>
            <SelectTrigger className="bg-background/50 border-border/50 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className="flex items-center gap-2">All Priorities</span>
              </SelectItem>
              <SelectItem value="now">
                <span className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-red-500" />
                  Act Now
                </span>
              </SelectItem>
              <SelectItem value="later">
                <span className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-amber-500" />
                  Plan Ahead
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Status
          </label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-background/50 border-border/50 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">
                <span className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-amber-500" />
                  Pending
                </span>
              </SelectItem>
              <SelectItem value="implemented">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  Implemented
                </span>
              </SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Campaign
          </label>
          <Select value={campaignFilter} onValueChange={onCampaignChange}>
            <SelectTrigger className="bg-background/50 border-border/50 h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              {campaigns.map(camp => (
                <SelectItem key={camp} value={camp}>{camp}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
