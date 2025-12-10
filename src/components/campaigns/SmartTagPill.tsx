import { cn } from "@/lib/utils";

export type TagType = "scalable" | "fatigue" | "highCpc" | "lowCtr" | "highRoas" | "bleeding" | "traffic";

interface SmartTagPillProps {
  type: TagType;
  label: string;
  emoji: string;
}

export const SmartTagPill = ({ type, label, emoji }: SmartTagPillProps) => {
  const getStyles = () => {
    switch (type) {
      case "scalable":
        return "border-purple-400/50 bg-purple-500/10 text-gradient-scalable font-semibold";
      case "highRoas":
        return "bg-success/10 text-success border-success/30";
      case "bleeding":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "traffic":
      case "fatigue":
        return "bg-warning/10 text-warning border-warning/30";
      case "highCpc":
      case "lowCtr":
        return "bg-muted text-muted-foreground border-muted-foreground/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStyles()
      )}
    >
      <span>{emoji}</span>
      <span className={type === "scalable" ? "text-gradient-scalable" : ""}>{label}</span>
    </span>
  );
};
