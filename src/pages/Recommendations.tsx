import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Clock, Sparkles, Brain } from "lucide-react";
import { RecommendationStats } from "@/components/recommendations/RecommendationStats";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";
import { RecommendationFilters } from "@/components/recommendations/RecommendationFilters";
import { EmptyState } from "@/components/recommendations/EmptyState";
import { toast } from "sonner";

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

// Mock data - replace with API call
const initialRecommendations: Recommendation[] = [
  {
    id: "1",
    campaign: "Summer Sale 2024",
    campaignId: "camp_001",
    priority: "now",
    action: "Increase budget by 30%",
    metric: "CTR",
    reason: "CTR is 4.2%, significantly above industry average. Scale while performance is strong.",
    impact: "high",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    campaign: "Summer Sale 2024",
    campaignId: "camp_001",
    priority: "now",
    action: "Pause 3 low-performing ads",
    metric: "Conversions",
    reason: "Three ads have 0 conversions after 7+ days with 500+ impressions each.",
    impact: "high",
    status: "pending",
    createdAt: "2024-01-15T09:15:00Z"
  },
  {
    id: "3",
    campaign: "Product Launch Q1",
    campaignId: "camp_002",
    priority: "now",
    action: "Add 5 new ad variations",
    metric: "Frequency",
    reason: "Average frequency is 4.8. Audience fatigue detected - add creative variety.",
    impact: "medium",
    status: "pending",
    createdAt: "2024-01-14T16:45:00Z"
  },
  {
    id: "4",
    campaign: "Product Launch Q1",
    campaignId: "camp_002",
    priority: "later",
    action: "Test mobile-first creatives",
    metric: "CTR",
    reason: "Mobile traffic is 68% but CTR is 0.4% below desktop. Optimize for mobile.",
    impact: "medium",
    status: "pending",
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "5",
    campaign: "Brand Awareness",
    campaignId: "camp_003",
    priority: "later",
    action: "Expand to 25-34 age group",
    metric: "Audience",
    reason: "18-24 segment showing strong engagement. Adjacent demographic likely to respond well.",
    impact: "low",
    status: "pending",
    createdAt: "2024-01-13T11:00:00Z"
  },
  {
    id: "6",
    campaign: "Summer Sale 2024",
    campaignId: "camp_001",
    priority: "now",
    action: "Budget increased",
    metric: "CTR",
    reason: "Successfully scaled budget by 25% based on strong CTR performance.",
    impact: "high",
    status: "implemented",
    createdAt: "2024-01-12T15:30:00Z"
  }
];

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [filter, setFilter] = useState<"all" | "now" | "later">("all");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const campaigns = Array.from(new Set(recommendations.map(r => r.campaign)));

  const filteredRecommendations = recommendations.filter(rec => {
    const priorityMatch = filter === "all" || rec.priority === filter;
    const statusMatch = statusFilter === "all" || rec.status === statusFilter;
    const campaignMatch = campaignFilter === "all" || rec.campaign === campaignFilter;
    return priorityMatch && statusMatch && campaignMatch;
  });

  const priorityNow = recommendations.filter(r => r.priority === "now" && r.status === "pending");
  const priorityLater = recommendations.filter(r => r.priority === "later" && r.status === "pending");
  const implemented = recommendations.filter(r => r.status === "implemented");

  const handleImplement = (id: string) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: "implemented" as const } : r))
    );
    toast.success("Recommendation marked as implemented!");
  };

  const handleDismiss = (id: string) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: "dismissed" as const } : r))
    );
    toast.info("Recommendation dismissed");
  };

  const filteredNow = filteredRecommendations.filter(r => r.priority === "now" && r.status === "pending");
  const filteredLater = filteredRecommendations.filter(r => r.priority === "later" && r.status === "pending");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 rounded-3xl blur-3xl" />
          <div className="relative glass-card rounded-3xl p-6 md:p-8 border border-border/50">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/20">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    AI Recommendations
                  </h1>
                </div>
                <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                  Smart insights powered by AI to optimize your campaign performance. 
                  Review and implement recommendations to maximize your ROI.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <RecommendationStats
          urgentCount={priorityNow.length}
          plannedCount={priorityLater.length}
          completedCount={implemented.length}
          campaignCount={campaigns.length}
        />

        {/* Filters */}
        <RecommendationFilters
          priorityFilter={filter}
          statusFilter={statusFilter}
          campaignFilter={campaignFilter}
          campaigns={campaigns}
          onPriorityChange={setFilter}
          onStatusChange={setStatusFilter}
          onCampaignChange={setCampaignFilter}
        />

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="glass-card h-auto p-1.5 bg-muted/30 border border-border/50 w-full sm:w-auto">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2.5"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-medium">All</span>
                <span className="px-1.5 py-0.5 rounded-md bg-muted text-xs font-medium">
                  {filteredRecommendations.length}
                </span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="now"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2.5"
            >
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Urgent</span>
                <span className="px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-600 text-xs font-medium">
                  {filteredNow.length}
                </span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="later"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg px-4 py-2.5"
            >
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Planned</span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 text-xs font-medium">
                  {filteredLater.length}
                </span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredRecommendations.length === 0 ? (
              <EmptyState type="no-results" />
            ) : (
              <div className="grid gap-4">
                {filteredRecommendations.map(rec => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    onImplement={handleImplement}
                    onDismiss={handleDismiss}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="now" className="mt-6">
            {filteredNow.length === 0 ? (
              <EmptyState type="all-done" />
            ) : (
              <div className="grid gap-4">
                {filteredNow.map(rec => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    onImplement={handleImplement}
                    onDismiss={handleDismiss}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="later" className="mt-6">
            {filteredLater.length === 0 ? (
              <EmptyState type="no-planned" />
            ) : (
              <div className="grid gap-4">
                {filteredLater.map(rec => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    onImplement={handleImplement}
                    onDismiss={handleDismiss}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Recommendations;
