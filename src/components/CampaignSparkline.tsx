import { useMemo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  trend?: "up" | "down" | "neutral";
}

export const CampaignSparkline = ({ 
  data, 
  width = 60, 
  height = 20,
  trend = "neutral"
}: SparklineProps) => {
  const points = useMemo(() => {
    if (!data || data.length === 0) return "";
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const stepX = width / (data.length - 1);
    
    return data.map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    }).join(" ");
  }, [data, width, height]);

  const strokeColor = trend === "up" 
    ? "hsl(var(--chart-2))" 
    : trend === "down" 
    ? "hsl(var(--destructive))" 
    : "hsl(var(--muted-foreground))";

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
