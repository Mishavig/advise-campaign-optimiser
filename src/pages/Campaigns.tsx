import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AD-ViSOR</h1>
                <p className="text-sm text-muted-foreground">Campaign Intelligence Platform</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <Link to="/insights">
                <Button variant="outline" size="sm">Insights</Button>
              </Link>
              <Link to="/recommendations">
                <Button variant="outline" size="sm">Recommendations</Button>
              </Link>
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                          <Link to="/insights">
                            <Button size="sm" variant="outline">
                              <LineChart className="w-4 h-4 mr-1" />
                              Analyze
                            </Button>
                          </Link>
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
    </div>
  );
};

export default Campaigns;
