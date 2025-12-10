import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowUpDown, Filter, Cpu } from "lucide-react";
import CampaignHierarchy from "@/components/CampaignHierarchy";
import { CommandCenterHeader } from "@/components/campaigns/CommandCenterHeader";
import { CampaignRow } from "@/components/campaigns/CampaignRow";
import { CampaignListSkeleton } from "@/components/campaigns/CampaignListSkeleton";
import { TagType } from "@/components/campaigns/SmartTagPill";

interface SmartTag {
  type: TagType;
  label: string;
  emoji: string;
}

// Helper function to generate smart tags based on campaign metrics
const getSmartTagsForCampaign = (campaign: {
  roas: number;
  cpc: number;
  ctr: number;
  frequency?: number;
  performance: string;
  cpa: number;
  objective?: string;
}): SmartTag[] => {
  const tags: SmartTag[] = [];

  // Scalable - high ROAS and good performance
  if (campaign.roas >= 4 && campaign.performance === "excellent") {
    tags.push({ type: "scalable", label: "Scalable", emoji: "💎" });
  }

  // High ROAS indicator
  if (campaign.roas >= 5) {
    tags.push({ type: "highRoas", label: "High ROAS", emoji: "⭐" });
  }

  // Traffic Mode warning
  if (campaign.objective === "TRAFFIC") {
    tags.push({ type: "traffic", label: "Traffic Mode", emoji: "⚠️" });
  }

  // Creative Fatigue - high frequency
  if (campaign.frequency && campaign.frequency > 3) {
    tags.push({ type: "fatigue", label: "Fatigue", emoji: "😴" });
  }

  // High CPC warning
  if (campaign.cpc > 1.5) {
    tags.push({ type: "highCpc", label: "High CPC", emoji: "💰" });
  }

  // Low CTR warning
  if (campaign.ctr < 1.5) {
    tags.push({ type: "lowCtr", label: "Low CTR", emoji: "👀" });
  }

  // Bleeding - high CPA and low ROAS
  if (campaign.cpa > 15 && campaign.roas < 2.5) {
    tags.push({ type: "bleeding", label: "Bleeding", emoji: "🩸" });
  }

  return tags.slice(0, 3);
};

// Mock data for campaigns
const mockCampaignsTable = [
  {
    id: "1",
    name: "Summer Sale 2024",
    status: "active",
    objective: "CONVERSIONS",
    platform: "facebook" as const,
    budget: 5000,
    spent: 3245.67,
    impressions: 125000,
    clicks: 3450,
    conversions: 234,
    frequency: 1.28,
    ctr: 2.76,
    cpc: 0.94,
    cpa: 13.87,
    roas: 4.2,
    performance: "excellent",
    healthScore: 85,
    potentialSavings: 850,
    sparklineData: [12, 14, 13, 15, 14, 16, 15],
    sparklineTrend: "up" as const,
  },
  {
    id: "2",
    name: "Product Launch Campaign",
    status: "active",
    objective: "TRAFFIC",
    platform: "instagram" as const,
    budget: 8000,
    spent: 6890.23,
    impressions: 245000,
    clicks: 5670,
    conversions: 445,
    frequency: 1.30,
    ctr: 2.31,
    cpc: 1.22,
    cpa: 15.48,
    roas: 3.8,
    performance: "good",
    healthScore: 72,
    potentialSavings: 1200,
    sparklineData: [18, 17, 16, 15, 16, 15, 14],
    sparklineTrend: "down" as const,
  },
  {
    id: "3",
    name: "Brand Awareness Q2",
    status: "paused",
    objective: "BRAND_AWARENESS",
    platform: "meta" as const,
    budget: 3000,
    spent: 1245.89,
    impressions: 89000,
    clicks: 1234,
    conversions: 67,
    frequency: 1.24,
    ctr: 1.39,
    cpc: 1.01,
    cpa: 18.60,
    roas: 2.1,
    performance: "average",
    healthScore: 42,
    potentialSavings: 580,
    sparklineData: [22, 24, 25, 26, 28, 27, 29],
    sparklineTrend: "down" as const,
  },
  {
    id: "4",
    name: "Retargeting Campaign",
    status: "active",
    objective: "CONVERSIONS",
    platform: "facebook" as const,
    budget: 2500,
    spent: 1876.34,
    impressions: 67000,
    clicks: 2340,
    conversions: 189,
    frequency: 1.24,
    ctr: 3.49,
    cpc: 0.80,
    cpa: 9.93,
    roas: 5.6,
    performance: "excellent",
    healthScore: 92,
    potentialSavings: 420,
    sparklineData: [8, 9, 8, 10, 9, 10, 9],
    sparklineTrend: "up" as const,
  },
  {
    id: "5",
    name: "Holiday Promo 2024",
    status: "active",
    objective: "CONVERSIONS",
    platform: "instagram" as const,
    budget: 4500,
    spent: 2890.45,
    impressions: 98000,
    clicks: 2890,
    conversions: 156,
    frequency: 2.1,
    ctr: 2.95,
    cpc: 1.00,
    cpa: 18.52,
    roas: 2.3,
    performance: "average",
    healthScore: 38,
    potentialSavings: 1200,
    sparklineData: [14, 16, 18, 20, 22, 24, 26],
    sparklineTrend: "down" as const,
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
  const [healthFilter, setHealthFilter] = useState("all");
  const [sortBy, setSortBy] = useState("health");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate header stats
  const headerStats = useMemo(() => {
    const opportunityValue = mockCampaignsTable.reduce((sum, c) => sum + c.potentialSavings, 0);
    const criticalCount = mockCampaignsTable.filter((c) => c.healthScore < 50).length;
    const scalableCount = mockCampaignsTable.filter(
      (c) => c.roas >= 4 && c.performance === "excellent"
    ).length;

    return { opportunityValue, criticalCount, scalableCount };
  }, []);

  // Filter and sort campaigns
  const filteredCampaigns = useMemo(() => {
    return mockCampaignsTable
      .filter((campaign) => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
        const matchesHealth =
          healthFilter === "all" ||
          (healthFilter === "critical" && campaign.healthScore < 50) ||
          (healthFilter === "warning" && campaign.healthScore >= 50 && campaign.healthScore < 80) ||
          (healthFilter === "healthy" && campaign.healthScore >= 80);
        return matchesSearch && matchesStatus && matchesHealth;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "spent") return b.spent - a.spent;
        if (sortBy === "health") return b.healthScore - a.healthScore;
        if (sortBy === "roas") return b.roas - a.roas;
        return 0;
      });
  }, [searchQuery, statusFilter, healthFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Page Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">AI Command Center</h1>
            <p className="text-sm text-muted-foreground">Zero-Click Intelligence Dashboard</p>
          </div>
        </div>

        {/* Header Stats Cards */}
        <CommandCenterHeader stats={headerStats} />

        {/* Filters */}
        <Card className="glass-card border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[160px] bg-background/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
              <Select value={healthFilter} onValueChange={setHealthFilter}>
                <SelectTrigger className="w-full md:w-[160px] bg-background/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Health" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Health</SelectItem>
                  <SelectItem value="critical">🔴 Critical (&lt;50)</SelectItem>
                  <SelectItem value="warning">🟡 Warning (50-80)</SelectItem>
                  <SelectItem value="healthy">🟢 Healthy (&gt;80)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[160px] bg-background/50">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health Score</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="spent">Spend</SelectItem>
                  <SelectItem value="roas">ROAS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Views */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="bg-card/50 backdrop-blur">
            <TabsTrigger value="list">Triage List</TabsTrigger>
            <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-3">
            {isLoading ? (
              <CampaignListSkeleton />
            ) : filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => {
                const smartTags = getSmartTagsForCampaign(campaign);
                return (
                  <CampaignRow
                    key={campaign.id}
                    id={campaign.id}
                    name={campaign.name}
                    objective={campaign.objective}
                    platform={campaign.platform}
                    healthScore={campaign.healthScore}
                    smartTags={smartTags}
                    sparklineData={campaign.sparklineData}
                    sparklineTrend={campaign.sparklineTrend}
                  />
                );
              })
            ) : (
              <Card className="glass-card border-border/50">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No campaigns found matching your filters.</p>
                </CardContent>
              </Card>
            )}
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
