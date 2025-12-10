import { cn } from "@/lib/utils";

interface HealthScoreProps {
  score: number;
  showNumber?: boolean;
  size?: "sm" | "md";
}

export const CampaignHealthScore = ({ 
  score, 
  showNumber = true,
  size = "md" 
}: HealthScoreProps) => {
  const getHealthStatus = (score: number) => {
    if (score >= 75) return { emoji: "🟢", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30" };
    if (score >= 50) return { emoji: "🟡", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" };
    return { emoji: "🔴", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" };
  };

  const { emoji, color, bg } = getHealthStatus(score);

  return (
    <div className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
      bg,
      size === "sm" ? "text-xs" : "text-sm"
    )}>
      <span>{emoji}</span>
      {showNumber && (
        <span className={cn("font-semibold", color)}>
          {score}
        </span>
      )}
    </div>
  );
};
