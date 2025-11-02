import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, TrendingDown, BarChart3, Target, Zap, AlertCircle } from "lucide-react";
import CampaignHierarchy from "@/components/CampaignHierarchy";
import MetricsOverview from "@/components/MetricsOverview";

// Mock data for demonstration
const mockCampaigns = [
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
          {
            id: "ad2",
            name: "Video Creative B",
            status: "ACTIVE",
            creative: { type: "video", name: "Product Demo" },
            metrics: { impressions: 9800, clicks: 410, ctr: 4.18 },
          },
        ],
      },
      {
        id: "as2",
        name: "Age 35-44",
        status: "ACTIVE",
        targeting: { ageMin: 35, ageMax: 44, gender: ["all"] },
        metrics: { impressions: 23130, clicks: 930, ctr: 4.02, conversions: 42 },
        ads: [
          {
            id: "ad3",
            name: "Image Creative C",
            status: "ACTIVE",
            creative: { type: "image", name: "Special Offer" },
            metrics: { impressions: 23130, clicks: 930, ctr: 4.02 },
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

const mockRecommendations = [
  {
    id: "rec1",
    type: "warning",
    priority: "high",
    title: "Low CTR Detected",
    description: "Campaign 'Summer Sale' has CTR below 3% threshold",
    action: "Review ad creatives and targeting",
    metric: "CTR",
    value: 2.8,
  },
  {
    id: "rec2",
    type: "success",
    priority: "medium",
    title: "High Performing Ad Set",
    description: "Age 25-34 segment shows 15% better conversion rate",
    action: "Consider increasing budget allocation",
    metric: "Conversions",
    value: 45,
  },
  {
    id: "rec3",
    type: "info",
    priority: "low",
    title: "Budget Optimization",
    description: "Campaign approaching daily budget limit",
    action: "Monitor spend velocity",
    metric: "Spend",
    value: 480,
  },
];

const Index = () => {
  const [selectedAccount, setSelectedAccount] = useState("act_123456789");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AD-ViSOR</h1>
                <p className="text-sm text-muted-foreground">Campaign Intelligence Platform</p>
              </div>
            </div>
            <Button>
              <Target className="w-4 h-4 mr-2" />
              Connect Facebook
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Metrics Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Performance Overview
          </h2>
          <MetricsOverview campaigns={mockCampaigns} />
        </section>

        {/* Recommendations */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              AI Recommendations
            </h2>
            <Link to="/insights">
              <Button variant="outline" size="sm">
                View Detailed Insights <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockRecommendations.map((rec) => (
              <Card key={rec.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge
                      variant={
                        rec.type === "warning"
                          ? "destructive"
                          : rec.type === "success"
                          ? "default"
                          : "secondary"
                      }
                      className="mb-2"
                    >
                      {rec.priority}
                    </Badge>
                    {rec.type === "warning" && <AlertCircle className="w-5 h-5 text-destructive" />}
                    {rec.type === "success" && <TrendingUp className="w-5 h-5 text-success" />}
                  </div>
                  <CardTitle className="text-lg">{rec.title}</CardTitle>
                  <CardDescription className="text-sm">{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{rec.metric}</p>
                      <p className="text-2xl font-bold">{rec.value}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Campaigns */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Active Campaigns
            </h2>
            <Button variant="outline" size="sm">
              Refresh All
            </Button>
          </div>
          <CampaignHierarchy campaigns={mockCampaigns} />
        </section>
      </main>
    </div>
  );
};

export default Index;
