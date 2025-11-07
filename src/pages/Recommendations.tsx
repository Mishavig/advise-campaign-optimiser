import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, TrendingUp, Target, Zap, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
const mockRecommendations: Recommendation[] = [
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
  const [filter, setFilter] = useState<"all" | "now" | "later">("all");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");

  const campaigns = Array.from(new Set(mockRecommendations.map(r => r.campaign)));

  const filteredRecommendations = mockRecommendations.filter(rec => {
    const priorityMatch = filter === "all" || rec.priority === filter;
    const statusMatch = statusFilter === "all" || rec.status === statusFilter;
    const campaignMatch = campaignFilter === "all" || rec.campaign === campaignFilter;
    return priorityMatch && statusMatch && campaignMatch;
  });

  const priorityNow = filteredRecommendations.filter(r => r.priority === "now" && r.status === "pending");
  const priorityLater = filteredRecommendations.filter(r => r.priority === "later" && r.status === "pending");

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented": return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "dismissed": return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const RecommendationCard = ({ rec }: { rec: Recommendation }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={rec.priority === "now" ? "destructive" : "secondary"}>
                {rec.priority === "now" ? <Zap className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                {rec.priority === "now" ? "Act Now" : "Plan Ahead"}
              </Badge>
              <Badge variant="outline" className={getImpactColor(rec.impact)}>
                {rec.impact} impact
              </Badge>
              {getStatusIcon(rec.status)}
            </div>
            <CardTitle className="text-lg">{rec.action}</CardTitle>
            <CardDescription className="text-sm mt-1">
              Campaign: {rec.campaign} • Metric: {rec.metric}
            </CardDescription>
          </div>
          <Target className="h-5 w-5 text-primary flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/80">{rec.reason}</p>
          </div>
          
          <div className="flex gap-2 pt-2">
            {rec.status === "pending" && (
              <>
                <Button size="sm" className="flex-1">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Implement
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Dismiss
                </Button>
              </>
            )}
            {rec.status === "implemented" && (
              <Button size="sm" variant="outline" className="w-full" asChild>
                <Link to={`/campaign/${rec.campaignId}`}>View Campaign</Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Recommendations</h2>
          <p className="text-muted-foreground">
            Data-driven insights to optimize your campaign performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">{priorityNow.length}</div>
              <p className="text-sm text-muted-foreground">Action Needed Now</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">{priorityLater.length}</div>
              <p className="text-sm text-muted-foreground">Plan Ahead</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-success">
                {mockRecommendations.filter(r => r.status === "implemented").length}
              </div>
              <p className="text-sm text-muted-foreground">Implemented</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {campaigns.length}
              </div>
              <p className="text-sm text-muted-foreground">Campaigns Analyzed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="now">Act Now</SelectItem>
                    <SelectItem value="later">Plan Ahead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="implemented">Implemented</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-sm font-medium mb-2 block">Campaign</label>
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger>
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
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All ({filteredRecommendations.length})</TabsTrigger>
            <TabsTrigger value="now">
              <Zap className="h-4 w-4 mr-2" />
              Now ({priorityNow.length})
            </TabsTrigger>
            <TabsTrigger value="later">
              <Clock className="h-4 w-4 mr-2" />
              Later ({priorityLater.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredRecommendations.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No recommendations found with the current filters.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredRecommendations.map(rec => (
                  <RecommendationCard key={rec.id} rec={rec} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="now" className="mt-6">
            {priorityNow.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No urgent actions needed right now. Great job!
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {priorityNow.map(rec => (
                  <RecommendationCard key={rec.id} rec={rec} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="later" className="mt-6">
            {priorityLater.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No future recommendations at this time.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {priorityLater.map(rec => (
                  <RecommendationCard key={rec.id} rec={rec} />
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
