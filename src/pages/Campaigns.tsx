import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Search,
  ArrowUpDown,
  Filter,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  ChevronRight,
} from "lucide-react";
import CampaignHierarchy from "@/components/CampaignHierarchy";
import { CampaignHealthScore } from "@/components/CampaignHealthScore";
import { CampaignSmartTags, getSmartTagsForCampaign } from "@/components/CampaignSmartTags";
import { CampaignSparkline } from "@/components/CampaignSparkline";

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
    // New fields for redesign
    healthScore: 85,
    sparklineData: [12, 14, 13, 15, 14, 16, 15],
    sparklineTrend: "up" as const,
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
    healthScore: 72,
    sparklineData: [18, 17, 16, 15, 16, 15, 14],
    sparklineTrend: "down" as const,
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
    healthScore: 42,
    sparklineData: [22, 24, 25, 26, 28, 27, 29],
    sparklineTrend: "down" as const,
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
    healthScore: 92,
    sparklineData: [8, 9, 8, 10, 9, 10, 9],
    sparklineTrend: "up" as const,
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
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/audience-analysis?campaign=${campaignId}`);
    toast({
      title: "ניווט לניתוח קהלים",
      description: "טוען את נתוני הקמפיין...",
    });
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
                    {filteredCampaigns.map((campaign) => {
                      const smartTags = getSmartTagsForCampaign(campaign);
                      return (
                        <Card 
                          key={campaign.id} 
                          className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleCampaignClick(campaign.id)}
                        >
                          <div className="space-y-3">
                            {/* Header with name, health score, and status */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-base truncate">{campaign.name}</h3>
                                  <CampaignHealthScore score={campaign.healthScore} size="sm" />
                                </div>
                                <CampaignSmartTags tags={smartTags} />
                              </div>
                              {getStatusBadge(campaign.status)}
                            </div>
                            
                            {/* Sparkline */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>מגמת 7 ימים:</span>
                              <CampaignSparkline 
                                data={campaign.sparklineData} 
                                trend={campaign.sparklineTrend}
                                width={50}
                                height={16}
                              />
                            </div>
                            
                            {/* Metrics grid */}
                            <div className="grid grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground text-xs">Spent</p>
                                <p className="font-medium">${campaign.spent.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">CTR</p>
                                <p className="font-medium">{campaign.ctr.toFixed(2)}%</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-xs">ROAS</p>
                                <p className="font-medium">{campaign.roas.toFixed(1)}x</p>
                              </div>
                            </div>

                            {/* View details button */}
                            <div className="flex items-center justify-end text-sm text-primary">
                              <span>צפה בניתוח קהלים</span>
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  /* Desktop Table View */
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campaign</TableHead>
                          <TableHead className="text-center">Health</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Spent</TableHead>
                          <TableHead className="text-right">ROAS</TableHead>
                          <TableHead className="text-right">CTR</TableHead>
                          <TableHead className="text-center">7-Day Trend</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCampaigns.map((campaign) => {
                          const smartTags = getSmartTagsForCampaign(campaign);
                          return (
                            <TableRow 
                              key={campaign.id}
                              className="cursor-pointer hover:bg-muted/50 transition-colors"
                              onClick={() => handleCampaignClick(campaign.id)}
                            >
                              <TableCell>
                                <div className="space-y-1">
                                  <span className="font-medium">{campaign.name}</span>
                                  <CampaignSmartTags tags={smartTags} />
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <CampaignHealthScore score={campaign.healthScore} />
                              </TableCell>
                              <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                              <TableCell className="text-right">${campaign.spent.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-medium">{campaign.roas.toFixed(1)}x</TableCell>
                              <TableCell className="text-right">{campaign.ctr.toFixed(2)}%</TableCell>
                              <TableCell className="text-center">
                                <CampaignSparkline 
                                  data={campaign.sparklineData} 
                                  trend={campaign.sparklineTrend}
                                />
                              </TableCell>
                              <TableCell>
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </TableCell>
                            </TableRow>
                          );
                        })}
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
    </div>
  );
};

export default Campaigns;
