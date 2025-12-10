import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SmartTag {
  type: "scalable" | "fatigue" | "highCpc" | "lowCtr" | "highRoas" | "bleeding";
  label: string;
  emoji: string;
}

interface SmartTagsProps {
  tags: SmartTag[];
  className?: string;
}

export const getSmartTagsForCampaign = (campaign: {
  roas: number;
  cpc: number;
  ctr: number;
  frequency?: number;
  performance: string;
  cpa: number;
}): SmartTag[] => {
  const tags: SmartTag[] = [];
  
  // Scalable - high ROAS and good performance
  if (campaign.roas >= 4 && campaign.performance === "excellent") {
    tags.push({ type: "scalable", label: "Scalable", emoji: "🚀" });
  }
  
  // High ROAS indicator
  if (campaign.roas >= 5) {
    tags.push({ type: "highRoas", label: "High ROAS", emoji: "⭐" });
  }
  
  // Creative Fatigue - high frequency
  if (campaign.frequency && campaign.frequency > 3) {
    tags.push({ type: "fatigue", label: "Fatigue", emoji: "😴" });
  }
  
  // High CPC warning
  if (campaign.cpc > 1.5) {
    tags.push({ type: "highCpc", label: "High CPC", emoji: "💰" });
  }
  
  // Low CTR warning
  if (campaign.ctr < 1.5) {
    tags.push({ type: "lowCtr", label: "Low CTR", emoji: "👀" });
  }
  
  // Bleeding - high CPA and low ROAS
  if (campaign.cpa > 15 && campaign.roas < 2.5) {
    tags.push({ type: "bleeding", label: "Bleeding", emoji: "🩸" });
  }
  
  return tags.slice(0, 3); // Max 3 tags
};

export const CampaignSmartTags = ({ tags, className }: SmartTagsProps) => {
  if (!tags || tags.length === 0) return null;

  const getTagVariant = (type: SmartTag["type"]) => {
    switch (type) {
      case "scalable":
      case "highRoas":
        return "default";
      case "fatigue":
      case "highCpc":
      case "lowCtr":
        return "secondary";
      case "bleeding":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {tags.map((tag, idx) => (
        <Badge 
          key={idx} 
          variant={getTagVariant(tag.type)}
          className="text-[10px] px-1.5 py-0"
        >
          <span className="mr-0.5">{tag.emoji}</span>
          {tag.label}
        </Badge>
      ))}
    </div>
  );
};
