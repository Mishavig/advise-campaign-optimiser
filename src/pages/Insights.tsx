import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowLeft, BarChart3, Users, Image as ImageIcon, TrendingUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for audience breakdown
const audienceByAge = [
  { age: "18-24", impressions: 12500, clicks: 485, conversions: 18, spend: 850 },
  { age: "25-34", impressions: 34200, clicks: 1420, conversions: 65, spend: 2100 },
  { age: "35-44", impressions: 28900, clicks: 1050, conversions: 48, spend: 1850 },
  { age: "45-54", impressions: 15600, clicks: 580, conversions: 22, spend: 980 },
  { age: "55+", impressions: 8200, clicks: 315, conversions: 12, spend: 620 },
];

const audienceByGender = [
  { gender: "Male", impressions: 52400, clicks: 2180, conversions: 89, spend: 3200 },
  { gender: "Female", impressions: 47000, clicks: 1670, conversions: 76, spend: 2200 },
];

const creativePerformance = [
  { name: "Carousel A", impressions: 28500, clicks: 1250, ctr: 4.39, conversions: 58, cpa: 32.5 },
  { name: "Video B", impressions: 25300, clicks: 1020, ctr: 4.03, conversions: 45, cpa: 38.2 },
  { name: "Image C", impressions: 22100, clicks: 890, ctr: 4.03, conversions: 42, cpa: 35.8 },
  { name: "Carousel D", impressions: 18600, clicks: 650, ctr: 3.49, conversions: 28, cpa: 42.1 },
  { name: "Static E", impressions: 5900, clicks: 240, ctr: 4.07, conversions: 12, cpa: 45.0 },
];

const timeSeriesData = [
  { date: "Jan 1", impressions: 8200, clicks: 325, conversions: 12, spend: 580 },
  { date: "Jan 2", impressions: 9500, clicks: 398, conversions: 15, spend: 640 },
  { date: "Jan 3", impressions: 11200, clicks: 465, conversions: 18, spend: 720 },
  { date: "Jan 4", impressions: 10800, clicks: 442, conversions: 19, spend: 695 },
  { date: "Jan 5", impressions: 12500, clicks: 518, conversions: 22, spend: 780 },
  { date: "Jan 6", impressions: 14200, clicks: 595, conversions: 25, spend: 850 },
  { date: "Jan 7", impressions: 13800, clicks: 567, conversions: 24, spend: 820 },
];

const deviceBreakdown = [
  { device: "Mobile", value: 65, impressions: 64740 },
  { device: "Desktop", value: 28, impressions: 27880 },
  { device: "Tablet", value: 7, impressions: 6980 },
];

const placementData = [
  { placement: "Facebook Feed", impressions: 45600, ctr: 4.2, conversions: 78 },
  { placement: "Instagram Feed", impressions: 28900, ctr: 3.8, conversions: 52 },
  { placement: "Stories", impressions: 15200, ctr: 3.1, conversions: 28 },
  { placement: "Audience Network", impressions: 9700, ctr: 2.5, conversions: 15 },
];

const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "hsl(217, 91%, 60%)",
  },
  clicks: {
    label: "Clicks",
    color: "hsl(142, 76%, 36%)",
  },
  conversions: {
    label: "Conversions",
    color: "hsl(var(--accent))",
  },
  spend: {
    label: "Spend",
    color: "hsl(262, 83%, 58%)",
  },
};

const Insights = () => {
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [dateRange, setDateRange] = useState("7d");
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Filters Bar */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="campaign1">Summer Sale Campaign</SelectItem>
                <SelectItem value="campaign2">Brand Awareness Q2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <Tabs defaultValue="audience" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="audience" className="text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Audience</span>
              <span className="sm:hidden">Aud.</span>
            </TabsTrigger>
            <TabsTrigger value="creative" className="text-xs sm:text-sm">
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Creative</span>
              <span className="sm:hidden">Cre.</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Trends</span>
              <span className="sm:hidden">Trend</span>
            </TabsTrigger>
            <TabsTrigger value="placements" className="text-xs sm:text-sm">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Placements</span>
              <span className="sm:hidden">Place</span>
            </TabsTrigger>
          </TabsList>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              {/* Age Breakdown */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Performance by Age Group</CardTitle>
                  <CardDescription>Impressions, clicks, and conversions breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <BarChart data={audienceByAge}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="impressions" fill="hsl(217, 91%, 60%)" name="Impressions" />
                      <Bar dataKey="clicks" fill="hsl(142, 76%, 36%)" name="Clicks" />
                      <Bar dataKey="conversions" fill="hsl(var(--accent))" name="Conversions" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gender Breakdown */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Performance by Gender</CardTitle>
                  <CardDescription>Gender distribution and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <PieChart>
                      <Pie
                        data={audienceByGender}
                        dataKey="impressions"
                        nameKey="gender"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => `${entry.gender}: ${((entry.impressions / 99400) * 100).toFixed(1)}%`}
                      >
                        <Cell fill="hsl(217, 91%, 60%)" />
                        <Cell fill="hsl(262, 83%, 58%)" />
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Age Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Detailed Age Group Metrics</CardTitle>
                <CardDescription>Comprehensive performance data by age segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Age Group</th>
                        <th className="text-right p-3 font-semibold">Impressions</th>
                        <th className="text-right p-3 font-semibold">Clicks</th>
                        <th className="text-right p-3 font-semibold">CTR</th>
                        <th className="text-right p-3 font-semibold">Conversions</th>
                        <th className="text-right p-3 font-semibold">Spend</th>
                        <th className="text-right p-3 font-semibold">CPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {audienceByAge.map((row) => {
                        const ctr = ((row.clicks / row.impressions) * 100).toFixed(2);
                        const cpa = row.conversions > 0 ? (row.spend / row.conversions).toFixed(2) : "—";
                        return (
                          <tr key={row.age} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="p-3 font-medium">{row.age}</td>
                            <td className="p-3 text-right">{row.impressions.toLocaleString()}</td>
                            <td className="p-3 text-right">{row.clicks.toLocaleString()}</td>
                            <td className="p-3 text-right">{ctr}%</td>
                            <td className="p-3 text-right">{row.conversions}</td>
                            <td className="p-3 text-right">₪{row.spend.toLocaleString()}</td>
                            <td className="p-3 text-right">{cpa !== "—" ? `₪${cpa}` : "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Performance across different devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceBreakdown.map((device, idx) => (
                    <div key={device.device} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{device.device}</span>
                        <span className="text-muted-foreground">
                          {device.value}% • {device.impressions.toLocaleString()} impressions
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${device.value}%`,
                            background:
                              idx === 0 ? "hsl(217, 91%, 60%)" : idx === 1 ? "hsl(142, 76%, 36%)" : "hsl(262, 83%, 58%)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creative Tab */}
          <TabsContent value="creative" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Creative Performance Comparison</CardTitle>
                <CardDescription>Compare metrics across different ad creatives</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <BarChart data={creativePerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="conversions" fill="hsl(var(--accent))" name="Conversions" />
                    <Bar dataKey="clicks" fill="hsl(217, 91%, 60%)" name="Clicks" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Detailed Creative Metrics</CardTitle>
                <CardDescription>Complete performance data for each creative</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Creative</th>
                        <th className="text-right p-3 font-semibold">Impressions</th>
                        <th className="text-right p-3 font-semibold">Clicks</th>
                        <th className="text-right p-3 font-semibold">CTR</th>
                        <th className="text-right p-3 font-semibold">Conversions</th>
                        <th className="text-right p-3 font-semibold">CPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creativePerformance.map((creative) => (
                        <tr key={creative.name} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="p-3 font-medium">{creative.name}</td>
                          <td className="p-3 text-right">{creative.impressions.toLocaleString()}</td>
                          <td className="p-3 text-right">{creative.clicks.toLocaleString()}</td>
                          <td className="p-3 text-right">{creative.ctr.toFixed(2)}%</td>
                          <td className="p-3 text-right">{creative.conversions}</td>
                          <td className="p-3 text-right">₪{creative.cpa.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Daily trends for key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="impressions"
                      stroke="hsl(217, 91%, 60%)"
                      strokeWidth={2}
                      name="Impressions"
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth={2}
                      name="Clicks"
                    />
                    <Line
                      type="monotone"
                      dataKey="conversions"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      name="Conversions"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Spend Trend</CardTitle>
                <CardDescription>Daily spend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="spend" fill="hsl(var(--warning))" name="Daily Spend (₪)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placements Tab */}
          <TabsContent value="placements" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance by Placement</CardTitle>
                <CardDescription>Compare results across Facebook placements</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <BarChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="placement" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="impressions" fill="hsl(217, 91%, 60%)" name="Impressions" />
                    <Bar dataKey="conversions" fill="hsl(var(--accent))" name="Conversions" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Placement Details</CardTitle>
                <CardDescription>Detailed metrics by placement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Placement</th>
                        <th className="text-right p-3 font-semibold">Impressions</th>
                        <th className="text-right p-3 font-semibold">CTR</th>
                        <th className="text-right p-3 font-semibold">Conversions</th>
                        <th className="text-right p-3 font-semibold">Conv. Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placementData.map((placement) => {
                        const clicks = Math.round((placement.impressions * placement.ctr) / 100);
                        const convRate = ((placement.conversions / clicks) * 100).toFixed(2);
                        return (
                          <tr key={placement.placement} className="border-b border-border/50 hover:bg-muted/20">
                            <td className="p-3 font-medium">{placement.placement}</td>
                            <td className="p-3 text-right">{placement.impressions.toLocaleString()}</td>
                            <td className="p-3 text-right">{placement.ctr.toFixed(2)}%</td>
                            <td className="p-3 text-right">{placement.conversions}</td>
                            <td className="p-3 text-right">{convRate}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Insights;
