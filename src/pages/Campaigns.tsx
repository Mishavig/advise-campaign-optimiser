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

// Mock data for campaigns table view
const mockCampaignsTable = [
  {
    id: "1",
    name: "Summer Sale 2024",
    status: "active",
    budget: 5000,
    spent: 3245.67,
    impressions: 125000,
    clicks: 3450,
    conversions: 234,
    ctr: 2.76,
    cpc: 0.94,
    roas: 4.2,
    performance: "excellent",
  },
  {
    id: "2",
    name: "Product Launch Campaign",
    status: "active",
    budget: 8000,
    spent: 6890.23,
    impressions: 245000,
    clicks: 5670,
    conversions: 445,
    ctr: 2.31,
    cpc: 1.22,
    roas: 3.8,
    performance: "good",
  },
  {
    id: "3",
    name: "Brand Awareness Q2",
    status: "paused",
    budget: 3000,
    spent: 1245.89,
    impressions: 89000,
    clicks: 1234,
    conversions: 67,
    ctr: 1.39,
    cpc: 1.01,
    roas: 2.1,
    performance: "average",
  },
  {
    id: "4",
    name: "Retargeting Campaign",
    status: "active",
    budget: 2500,
    spent: 1876.34,
    impressions: 67000,
    clicks: 2340,
    conversions: 189,
    ctr: 3.49,
    cpc: 0.80,
    roas: 5.6,
    performance: "excellent",
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

      <div className="container mx-auto p-6 space-y-6">
        {/* Page Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">Campaign Management</h2>
          <p className="text-muted-foreground">Monitor and optimize all your advertising campaigns</p>
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
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
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
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={analysisMode === "full" ? "default" : "outline"}
                onClick={() => setAnalysisMode("full")}
                disabled={analysisLoading}
              >
                Full Analysis
              </Button>
              <Button
                size="sm"
                variant={analysisMode === "short" ? "default" : "outline"}
                onClick={() => setAnalysisMode("short")}
                disabled={analysisLoading}
              >
                Quick Summary
              </Button>
              {!analysisLoading && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAnalyzeCampaign(selectedCampaign)}
                  className="ml-auto"
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
