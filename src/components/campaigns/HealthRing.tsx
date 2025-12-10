import { cn } from "@/lib/utils";

interface HealthRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export const HealthRing = ({ score, size = 48, strokeWidth = 4 }: HealthRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return { stroke: "hsl(var(--success))", glow: "shadow-glow-green" };
    if (score >= 50) return { stroke: "hsl(var(--warning))", glow: "shadow-glow-yellow" };
    return { stroke: "hsl(var(--destructive))", glow: "shadow-glow-red" };
  };

  const { stroke, glow } = getColor(score);

  return (
    <div className={cn("relative inline-flex items-center justify-center rounded-full", glow)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <span 
        className={cn(
          "absolute text-xs font-bold",
          score >= 80 && "text-success",
          score >= 50 && score < 80 && "text-warning",
          score < 50 && "text-destructive"
        )}
      >
        {score}
      </span>
    </div>
  );
};
