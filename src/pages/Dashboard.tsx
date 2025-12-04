import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  DollarSign,
  MousePointerClick,
  Eye,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock data
const mockAdAccounts = [
  { id: "1", name: "Main Account", businessName: "Acme Corp" },
  { id: "2", name: "Secondary Account", businessName: "Tech Startup" },
  { id: "3", name: "Client Account", businessName: "Fashion Brand" },
];

const mockCampaigns = [
  {
    id: "1",
    name: "Summer Sale Campaign",
    status: "ACTIVE",
    objective: "CONVERSIONS",
    budget: { daily: 500, currency: "ILS" },
    metrics: {
      impressions: 45230,
      reach: 35000,
      frequency: 1.29,
      clicks: 1850,
      linkClicks: 1720,
      ctr: 4.09,
      spend: 3200,
      cpc: 1.73,
      cpm: 70.75,
      cpp: 91.43,
      conversions: 87,
      cpa: 36.78,
      roas: 4.2,
      videoViews: 2400,
      videoAvgPlayTime: 12.5,
      postReactions: 456,
      postComments: 89,
      postShares: 67,
    },
  },
  {
    id: "2",
    name: "Brand Awareness Q2",
    status: "PAUSED",
    objective: "REACH",
    budget: { lifetime: 8000, currency: "ILS" },
    metrics: {
      impressions: 128400,
      reach: 98000,
      frequency: 1.31,
      clicks: 3210,
      linkClicks: 2980,
      ctr: 2.50,
      spend: 5600,
      cpc: 1.74,
      cpm: 43.61,
      cpp: 57.14,
      conversions: 0,
      cpa: 0,
      roas: 0,
      videoViews: 8900,
      videoAvgPlayTime: 8.2,
      postReactions: 1230,
      postComments: 234,
      postShares: 178,
    },
  },
  {
    id: "3",
    name: "Product Launch",
    status: "ACTIVE",
    objective: "TRAFFIC",
    budget: { daily: 300, currency: "ILS" },
    metrics: {
      impressions: 32100,
      reach: 26000,
      frequency: 1.23,
      clicks: 1200,
      linkClicks: 1100,
      ctr: 3.74,
      spend: 2100,
      cpc: 1.75,
      cpm: 65.42,
      cpp: 80.77,
      conversions: 45,
      cpa: 46.67,
      roas: 3.1,
      videoViews: 1800,
      videoAvgPlayTime: 9.8,
      postReactions: 345,
      postComments: 67,
      postShares: 45,
    },
  },
];

const mockRecommendations = [
  {
    id: "rec1",
    type: "warning",
    priority: "high",
    title: "Low CTR Detected",
    campaign: "Brand Awareness Q2",
    impact: "High",
  },
  {
    id: "rec2",
    type: "success",
    priority: "medium",
    title: "High Performing Ad Set",
    campaign: "Summer Sale Campaign",
    impact: "Medium",
  },
  {
    id: "rec3",
    type: "info",
    priority: "low",
    title: "Budget Optimization",
    campaign: "Product Launch",
    impact: "Low",
  },
];

const performanceData = [
  { date: "Mon", impressions: 12000, clicks: 480, conversions: 24, spend: 850 },
  { date: "Tue", impressions: 15000, clicks: 620, conversions: 31, spend: 1050 },
  { date: "Wed", impressions: 18000, clicks: 720, conversions: 36, spend: 1200 },
  { date: "Thu", impressions: 16500, clicks: 680, conversions: 34, spend: 1100 },
  { date: "Fri", impressions: 21000, clicks: 840, conversions: 42, spend: 1400 },
  { date: "Sat", impressions: 19000, clicks: 760, conversions: 38, spend: 1300 },
  { date: "Sun", impressions: 14000, clicks: 560, conversions: 28, spend: 950 },
];

const campaignDistribution = [
  { name: "Summer Sale", value: 3200, percentage: 38 },
  { name: "Brand Awareness", value: 5600, percentage: 52 },
  { name: "Product Launch", value: 2100, percentage: 10 },
];

const chartConfig = {
  impressions: { label: "Impressions", color: "hsl(var(--primary))" },
  clicks: { label: "Clicks", color: "hsl(var(--accent))" },
  conversions: { label: "Conversions", color: "hsl(var(--success))" },
  spend: { label: "Spend", color: "hsl(var(--destructive))" },
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedAccount, setSelectedAccount] = useState("1");
  const isMobile = useIsMobile();

  // Calculate totals
  const totalMetrics = mockCampaigns.reduce(
    (acc, campaign) => ({
      impressions: acc.impressions + campaign.metrics.impressions,
      clicks: acc.clicks + campaign.metrics.clicks,
      spend: acc.spend + campaign.metrics.spend,
      conversions: acc.conversions + campaign.metrics.conversions,
    }),
    { impressions: 0, clicks: 0, spend: 0, conversions: 0 }
  );

  const avgCTR = ((totalMetrics.clicks / totalMetrics.impressions) * 100).toFixed(2);
  const avgCPA = totalMetrics.conversions > 0 ? (totalMetrics.spend / totalMetrics.conversions).toFixed(2) : "0";

  const kpiCards = [
    {
      title: "Total Impressions",
      value: totalMetrics.impressions.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-primary",
    },
    {
      title: "Total Clicks",
      value: totalMetrics.clicks.toLocaleString(),
      change: "+8.3%",
      trend: "up",
      icon: MousePointerClick,
      color: "text-accent",
    },
    {
      title: "Total Spend",
      value: `₪${totalMetrics.spend.toLocaleString()}`,
      change: "+5.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-destructive",
    },
    {
      title: "Conversions",
      value: totalMetrics.conversions.toLocaleString(),
      change: "+15.7%",
      trend: "up",
      icon: Target,
      color: "text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Time Range Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Performance Dashboard</h2>
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="24h" className="text-xs sm:text-sm">24h</TabsTrigger>
              <TabsTrigger value="7d" className="text-xs sm:text-sm">7d</TabsTrigger>
              <TabsTrigger value="30d" className="text-xs sm:text-sm">30d</TabsTrigger>
              <TabsTrigger value="90d" className="text-xs sm:text-sm">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8">
          {kpiCards.map((kpi) => (
            <Card key={kpi.title} className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 md:p-6">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className={`w-4 h-4 md:w-5 md:h-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <div className="text-xl md:text-3xl font-bold mb-1">{kpi.value}</div>
                <div className="flex items-center text-xs md:text-sm">
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-success mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-destructive mr-1" />
                  )}
                  <span className={kpi.trend === "up" ? "text-success" : "text-destructive"}>{kpi.change}</span>
                  <span className="text-muted-foreground ml-1 hidden sm:inline">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Charts Grid */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2 mb-6 md:mb-8">
          {/* Performance Trends */}
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Performance Trends</CardTitle>
              <CardDescription className="text-xs md:text-sm">Daily metrics over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0">
              <ChartContainer config={chartConfig} className="h-[200px] md:h-[300px] w-full">
                <LineChart data={performanceData} margin={{ top: 5, right: 5, left: isMobile ? -20 : 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 30 : 60} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {!isMobile && <Legend />}
                  <Line type="monotone" dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} dot={!isMobile} />
                  <Line type="monotone" dataKey="clicks" stroke="hsl(var(--accent))" strokeWidth={2} dot={!isMobile} />
                  <Line type="monotone" dataKey="conversions" stroke="hsl(var(--success))" strokeWidth={2} dot={!isMobile} />
                </LineChart>
              </ChartContainer>
              {isMobile && (
                <div className="flex justify-center gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" />Impressions</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" />Clicks</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" />Conversions</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Spend Distribution */}
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-base md:text-lg">Campaign Spend Distribution</CardTitle>
              <CardDescription className="text-xs md:text-sm">Budget allocation across campaigns</CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-6 pt-0">
              <ChartContainer config={chartConfig} className="h-[200px] md:h-[300px] w-full">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={campaignDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={isMobile ? ({ percentage }) => `${percentage}%` : ({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={isMobile ? 60 : 100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {campaignDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? "hsl(var(--primary))"
                            : index === 1
                            ? "hsl(var(--accent))"
                            : "hsl(var(--success))"
                        }
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              {isMobile && (
                <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs">
                  {campaignDistribution.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-accent' : 'bg-success'}`} />
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Campaigns & Recommendations Grid */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3 mb-6 md:mb-8">
          {/* Top Campaigns */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Active campaigns overview</CardDescription>
                </div>
                <Link to="/">
                  <Button variant="outline" size="sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge variant={campaign.status === "ACTIVE" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
                        <div>
                          <p className="text-muted-foreground">Impressions</p>
                          <p className="font-medium">{campaign.metrics.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Clicks</p>
                          <p className="font-medium">{campaign.metrics.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">CTR</p>
                          <p className="font-medium">{campaign.metrics.ctr}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Spend</p>
                          <p className="font-medium">₪{campaign.metrics.spend.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>Top recommendations</CardDescription>
                </div>
                <Link to="/recommendations">
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        variant={
                          rec.type === "warning"
                            ? "destructive"
                            : rec.type === "success"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                      {rec.type === "warning" && <AlertCircle className="w-4 h-4 text-destructive" />}
                      {rec.type === "success" && <TrendingUp className="w-4 h-4 text-success" />}
                    </div>
                    <h4 className="font-medium text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.campaign}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Average CTR</CardTitle>
              <CardDescription>Click-through rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgCTR}%</div>
              <div className="flex items-center text-sm mt-2">
                <TrendingUp className="w-4 h-4 text-success mr-1" />
                <span className="text-success">+2.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Average CPA</CardTitle>
              <CardDescription>Cost per acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₪{avgCPA}</div>
              <div className="flex items-center text-sm mt-2">
                <TrendingDown className="w-4 h-4 text-success mr-1" />
                <span className="text-success">-4.1%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Currently running</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockCampaigns.filter((c) => c.status === "ACTIVE").length}
              </div>
              <div className="flex items-center text-sm mt-2">
                <Users className="w-4 h-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">of {mockCampaigns.length} total</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
