import { useMemo } from "react";

interface TrendSparklineProps {
  data: number[];
  trend: "up" | "down" | "neutral";
  width?: number;
  height?: number;
}

export const TrendSparkline = ({
  data,
  trend,
  width = 64,
  height = 24,
}: TrendSparklineProps) => {
  const { path, gradientId } = useMemo(() => {
    if (!data || data.length === 0) return { path: "", gradientId: "" };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return { x, y };
    });

    // Create smooth curve path
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` Q ${prev.x} ${prev.y} ${cpx} ${(prev.y + curr.y) / 2}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last.x} ${last.y}`;

    return {
      path: d,
      gradientId: `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`,
    };
  }, [data, width, height]);

  const getColors = () => {
    if (trend === "up") {
      return { start: "hsl(142, 76%, 36%)", end: "hsl(142, 76%, 50%)" };
    }
    if (trend === "down") {
      return { start: "hsl(0, 84%, 60%)", end: "hsl(0, 84%, 70%)" };
    }
    return { start: "hsl(215, 15%, 50%)", end: "hsl(215, 15%, 65%)" };
  };

  const colors = getColors();

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.start} />
          <stop offset="100%" stopColor={colors.end} />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
