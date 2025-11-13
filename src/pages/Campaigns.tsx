import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  ArrowUpDown,
  Filter,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  ChevronLeft,
  BarChart3,
  Target,
  LineChart,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import CampaignHierarchy from "@/components/CampaignHierarchy";

// Mock data for campaigns table view with comprehensive Facebook data
const mockCampaignsTable = [
  {
    id: "1",
    name: "Summer Sale 2024",
    status: "active",
    objective: "CONVERSIONS",
    bidStrategy: "LOWEST_COST_WITHOUT_CAP",
    buyingType: "AUCTION",
    budget: 5000,
    dailyBudget: 500,
    lifetimeBudget: null,
    spent: 3245.67,
    spendCap: 10000,
    impressions: 125000,
    clicks: 3450,
    conversions: 234,
    reach: 98000,
    frequency: 1.28,
    ctr: 2.76,
    cpc: 0.94,
    cpm: 25.97,
    cpp: 33.12,
    cpa: 13.87,
    roas: 4.2,
    actions: { link_clicks: 3200, post_reactions: 450, video_views: 1200 },
    videoPlays: 1200,
    videoAvgPlayTime: 8.5,
    linkClicks: 3200,
    postReactions: 450,
    postComments: 78,
    postShares: 92,
    performance: "excellent",
    startTime: "2024-01-01T00:00:00Z",
    stopTime: null,
    createdTime: "2023-12-15T10:30:00Z",
    updatedTime: "2024-01-10T14:22:00Z",
    specialAdCategories: [],
    issuesInfo: null,
    recommendations: [{ title: "Increase budget", confidence: "HIGH" }],
  },
  {
    id: "2",
    name: "Product Launch Campaign",
    status: "active",
    objective: "TRAFFIC",
    bidStrategy: "COST_CAP",
    buyingType: "AUCTION",
    budget: 8000,
    dailyBudget: 800,
    lifetimeBudget: null,
    spent: 6890.23,
    spendCap: 15000,
    impressions: 245000,
    clicks: 5670,
    conversions: 445,
    reach: 189000,
    frequency: 1.30,
    ctr: 2.31,
    cpc: 1.22,
    cpm: 28.12,
    cpp: 36.46,
    cpa: 15.48,
    roas: 3.8,
    actions: { link_clicks: 5200, post_reactions: 890, video_views: 3400 },
    videoPlays: 3400,
    videoAvgPlayTime: 12.3,
    linkClicks: 5200,
    postReactions: 890,
    postComments: 156,
    postShares: 203,
    performance: "good",
    startTime: "2024-01-05T00:00:00Z",
    stopTime: null,
    createdTime: "2023-12-20T09:15:00Z",
    updatedTime: "2024-01-10T16:45:00Z",
    specialAdCategories: [],
    issuesInfo: null,
    recommendations: [{ title: "Optimize targeting", confidence: "MEDIUM" }],
  },
  {
    id: "3",
    name: "Brand Awareness Q2",
    status: "paused",
    objective: "BRAND_AWARENESS",
    bidStrategy: "LOWEST_COST_WITHOUT_CAP",
    buyingType: "AUCTION",
    budget: 3000,
    dailyBudget: null,
    lifetimeBudget: 3000,
    spent: 1245.89,
    spendCap: null,
    impressions: 89000,
    clicks: 1234,
    conversions: 67,
    reach: 72000,
    frequency: 1.24,
    ctr: 1.39,
    cpc: 1.01,
    cpm: 14.00,
    cpp: 17.30,
    cpa: 18.60,
    roas: 2.1,
    actions: { link_clicks: 1100, post_reactions: 245, video_views: 450 },
    videoPlays: 450,
    videoAvgPlayTime: 5.2,
    linkClicks: 1100,
    postReactions: 245,
    postComments: 34,
    postShares: 28,
    performance: "average",
    startTime: "2024-01-01T00:00:00Z",
    stopTime: "2024-01-08T23:59:59Z",
    createdTime: "2023-12-10T11:00:00Z",
    updatedTime: "2024-01-08T18:30:00Z",
    specialAdCategories: [],
    issuesInfo: { level: "WARNING", message: "Low engagement rate" },
    recommendations: [{ title: "Refresh creative", confidence: "HIGH" }],
  },
  {
    id: "4",
    name: "Retargeting Campaign",
    status: "active",
    objective: "CONVERSIONS",
    bidStrategy: "LOWEST_COST_WITH_BID_CAP",
    buyingType: "AUCTION",
    budget: 2500,
    dailyBudget: 250,
    lifetimeBudget: null,
    spent: 1876.34,
    spendCap: 5000,
    impressions: 67000,
    clicks: 2340,
    conversions: 189,
    reach: 54000,
    frequency: 1.24,
    ctr: 3.49,
    cpc: 0.80,
    cpm: 28.00,
    cpp: 34.75,
    cpa: 9.93,
    roas: 5.6,
    actions: { link_clicks: 2200, post_reactions: 345, video_views: 890 },
    videoPlays: 890,
    videoAvgPlayTime: 9.8,
    linkClicks: 2200,
    postReactions: 345,
    postComments: 67,
    postShares: 45,
    performance: "excellent",
    startTime: "2024-01-03T00:00:00Z",
    stopTime: null,
    createdTime: "2023-12-28T14:20:00Z",
    updatedTime: "2024-01-10T12:10:00Z",
    specialAdCategories: [],
    issuesInfo: null,
    recommendations: [{ title: "Scale budget", confidence: "HIGH" }],
  },
];

// Mock data for hierarchy view
const mockCampaignsHierarchy = [
  {
    id: "1",
    name: "Summer Sale Campaign",
    status: "ACTIVE",
    objective: "CONVERSIONS",
    budget: { daily: 500, currency: "ILS" },
    metrics: {
      impressions: 45230,
      clicks: 1850,
      ctr: 4.09,
      spend: 3200,
      conversions: 87,
      cpa: 36.78,
    },
    adSets: [
      {
        id: "as1",
        name: "Age 25-34",
        status: "ACTIVE",
        targeting: { ageMin: 25, ageMax: 34, gender: ["all"] },
        metrics: { impressions: 22100, clicks: 920, ctr: 4.16, conversions: 45 },
        ads: [
          {
            id: "ad1",
            name: "Carousel Creative A",
            status: "ACTIVE",
            creative: { type: "carousel", name: "Summer Collection" },
            metrics: { impressions: 12300, clicks: 510, ctr: 4.15 },
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Brand Awareness Q2",
    status: "PAUSED",
    objective: "REACH",
    budget: { lifetime: 8000, currency: "ILS" },
    metrics: {
      impressions: 128400,
      clicks: 3210,
      ctr: 2.50,
      spend: 5600,
      conversions: 0,
      cpa: 0,
    },
    adSets: [],
  },
];

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [analysisMode, setAnalysisMode] = useState<"full" | "short">("full");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      paused: "secondary",
      ended: "outline",
    };
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status === "active" && <Play className="w-3 h-3 mr-1" />}
        {status === "paused" && <Pause className="w-3 h-3 mr-1" />}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPerformanceBadge = (performance: string) => {
    const config = {
      excellent: { variant: "default", icon: TrendingUp },
      good: { variant: "secondary", icon: TrendingUp },
      average: { variant: "outline", icon: TrendingDown },
    };
    const { variant, icon: Icon } = config[performance as keyof typeof config];
    return (
      <Badge variant={variant as any} className="gap-1">
        <Icon className="w-3 h-3" />
        {performance.charAt(0).toUpperCase() + performance.slice(1)}
      </Badge>
    );
  };

  const filteredCampaigns = mockCampaignsTable
    .filter((campaign) => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      const matchesPerformance = performanceFilter === "all" || campaign.performance === performanceFilter;
      return matchesSearch && matchesStatus && matchesPerformance;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "spent") return b.spent - a.spent;
      if (sortBy === "roas") return b.roas - a.roas;
      return 0;
    });

  const handleAnalyzeCampaign = async (campaign: any) => {
    setSelectedCampaign(campaign);
    setAnalysisOpen(true);
    setAnalysisLoading(true);
    setAnalysisData(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-campaign', {
        body: { campaign, mode: analysisMode }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Analysis Failed",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setAnalysisData(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your campaign performance",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze campaign. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Page Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold">Campaign Management</h2>
          <p className="text-sm md:text-base text-muted-foreground">Monitor and optimize all your advertising campaigns</p>
        </div>

        {/* Filters */}
        <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[160px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="ended">Ended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                  <SelectTrigger className="w-full md:w-[160px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Performance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Performance</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[160px]">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="spent">Spend</SelectItem>
                    <SelectItem value="roas">ROAS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
        </Card>

        {/* Campaign Views */}
        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {isMobile ? (
                  /* Mobile Card View */
                  <div className="space-y-3">
                    {filteredCampaigns.map((campaign) => (
                      <Card key={campaign.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-base">{campaign.name}</h3>
                            {getStatusBadge(campaign.status)}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground text-xs">Budget</p>
                              <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Spent</p>
                              <p className="font-medium">${campaign.spent.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Clicks</p>
                              <p className="font-medium">{campaign.clicks.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">CTR</p>
                              <p className="font-medium">{campaign.ctr.toFixed(2)}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">ROAS</p>
                              <p className="font-medium">{campaign.roas.toFixed(1)}x</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Performance</p>
                              {getPerformanceBadge(campaign.performance)}
                            </div>
                          </div>

                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full"
                            onClick={() => handleAnalyzeCampaign(campaign)}
                          >
                            <Sparkles className="w-4 h-4 mr-1" />
                            Analyze with AI
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  /* Desktop Table View */
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Budget</TableHead>
                          <TableHead className="text-right">Spent</TableHead>
                          <TableHead className="text-right">Impressions</TableHead>
                          <TableHead className="text-right">Clicks</TableHead>
                          <TableHead className="text-right">CTR</TableHead>
                          <TableHead className="text-right">ROAS</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCampaigns.map((campaign) => (
                          <TableRow key={campaign.id}>
                            <TableCell className="font-medium">{campaign.name}</TableCell>
                            <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                            <TableCell className="text-right">${campaign.budget.toLocaleString()}</TableCell>
                            <TableCell className="text-right">${campaign.spent.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                            <TableCell className="text-right">{campaign.roas.toFixed(1)}x</TableCell>
                            <TableCell>{getPerformanceBadge(campaign.performance)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleAnalyzeCampaign(campaign)}
                              >
                                <Sparkles className="w-4 h-4 mr-1" />
                                Analyze with AI
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hierarchy">
            <CampaignHierarchy campaigns={mockCampaignsHierarchy} />
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Analysis Dialog */}
      <Dialog open={analysisOpen} onOpenChange={setAnalysisOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto sm:max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Campaign Analysis: {selectedCampaign?.name}
            </DialogTitle>
            <DialogDescription>
              Advanced AI insights and optimization recommendations
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Analysis Mode Selector */}
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={analysisMode === "full" ? "default" : "outline"}
                onClick={() => setAnalysisMode("full")}
                disabled={analysisLoading}
                className="flex-1 sm:flex-none"
              >
                Full Analysis
              </Button>
              <Button
                size="sm"
                variant={analysisMode === "short" ? "default" : "outline"}
                onClick={() => setAnalysisMode("short")}
                disabled={analysisLoading}
                className="flex-1 sm:flex-none"
              >
                Quick Summary
              </Button>
              {!analysisLoading && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAnalyzeCampaign(selectedCampaign)}
                  className="w-full sm:w-auto sm:ml-auto"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Re-analyze
                </Button>
              )}
            </div>

            {/* Loading State */}
            {analysisLoading && (
              <Card className="p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-lg font-medium">Analyzing campaign performance...</p>
                  <p className="text-sm text-muted-foreground">AI is processing your campaign data</p>
                </div>
              </Card>
            )}

            {/* Analysis Results */}
            {!analysisLoading && analysisData && (
              <div className="space-y-4">
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Executive Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{analysisData.summary}</p>
                    {analysisData.predicted_roas_improvement && (
                      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                        <p className="text-sm font-medium">
                          Predicted ROAS Improvement: <span className="text-primary text-lg">{analysisData.predicted_roas_improvement}</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Insights */}
                {analysisData.insights && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysisData.insights.strengths?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Strengths
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                            {analysisData.insights.strengths.map((strength: string, idx: number) => (
                              <li key={idx}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysisData.insights.weaknesses?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-orange-600 mb-2 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Areas for Improvement
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                            {analysisData.insights.weaknesses.map((weakness: string, idx: number) => (
                              <li key={idx}>{weakness}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {analysisData.insights.opportunities?.length > 0 && (
                        <div>
                          <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Opportunities
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                            {analysisData.insights.opportunities.map((opportunity: string, idx: number) => (
                              <li key={idx}>{opportunity}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Recommendations */}
                {analysisData.recommendations?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Action Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisData.recommendations.map((rec: any, idx: number) => (
                          <div key={idx} className="p-4 border rounded-lg space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-medium">{rec.action}</h5>
                              <Badge variant={
                                rec.priority === "high" ? "destructive" :
                                rec.priority === "medium" ? "default" :
                                "secondary"
                              }>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground"><strong>Target:</strong> {rec.target}</p>
                            <p className="text-sm text-muted-foreground"><strong>Reason:</strong> {rec.reason}</p>
                            {rec.expected_impact && (
                              <p className="text-sm text-primary"><strong>Expected Impact:</strong> {rec.expected_impact}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaigns;
