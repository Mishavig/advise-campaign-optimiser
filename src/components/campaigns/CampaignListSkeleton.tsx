import { Skeleton } from "@/components/ui/skeleton";

export const CampaignListSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="glass-card rounded-xl p-4 border border-border/50"
        >
          <div className="flex items-center gap-4">
            {/* Health Ring Skeleton */}
            <Skeleton className="w-[52px] h-[52px] rounded-full flex-shrink-0" />

            {/* Campaign Info Skeleton */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="hidden md:flex gap-1.5">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Sparkline Skeleton */}
            <Skeleton className="hidden md:block h-6 w-16" />

            {/* Button Skeleton */}
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
};
