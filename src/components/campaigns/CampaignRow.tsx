import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { HealthRing } from "./HealthRing";
import { SmartTagPill, TagType } from "./SmartTagPill";
import { TrendSparkline } from "./TrendSparkline";

interface SmartTag {
  type: TagType;
  label: string;
  emoji: string;
}

interface CampaignRowProps {
  id: string;
  name: string;
  objective: string;
  platform?: "facebook" | "instagram" | "meta";
  healthScore: number;
  smartTags: SmartTag[];
  sparklineData: number[];
  sparklineTrend: "up" | "down" | "neutral";
}

export const CampaignRow = ({
  id,
  name,
  objective,
  platform = "meta",
  healthScore,
  smartTags,
  sparklineData,
  sparklineTrend,
}: CampaignRowProps) => {
  const navigate = useNavigate();

  const getHealthGlowClass = (score: number) => {
    if (score >= 80) return "hover:border-success/50 hover:shadow-glow-green";
    if (score >= 50) return "hover:border-warning/50 hover:shadow-glow-yellow";
    return "hover:border-destructive/50 hover:shadow-glow-red";
  };

  const handleClick = () => {
    navigate(`/audience-analysis?campaign=${id}`);
  };

  const PlatformIcon = platform === "instagram" ? Instagram : Facebook;

  return (
    <div
      onClick={handleClick}
      className={cn(
        "glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 hover-lift",
        "border border-border/50",
        getHealthGlowClass(healthScore)
      )}
    >
      <div className="flex items-center gap-4">
        {/* Health Ring */}
        <div className="flex-shrink-0">
          <HealthRing score={healthScore} size={52} strokeWidth={5} />
        </div>

        {/* Campaign Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs px-2 py-0">
              {objective}
            </Badge>
            <PlatformIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Smart Tags */}
        <div className="hidden md:flex flex-wrap gap-1.5 max-w-[200px]">
          {smartTags.slice(0, 2).map((tag, idx) => (
            <SmartTagPill key={idx} type={tag.type} label={tag.label} emoji={tag.emoji} />
          ))}
        </div>

        {/* Sparkline */}
        <div className="hidden md:flex items-center justify-center w-20">
          <TrendSparkline data={sparklineData} trend={sparklineTrend} />
        </div>

        {/* Action Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 group hover:bg-primary hover:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span className="hidden sm:inline mr-1">View Analysis</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Mobile Tags */}
      <div className="flex md:hidden flex-wrap gap-1.5 mt-3">
        {smartTags.slice(0, 3).map((tag, idx) => (
          <SmartTagPill key={idx} type={tag.type} label={tag.label} emoji={tag.emoji} />
        ))}
      </div>
    </div>
  );
};
