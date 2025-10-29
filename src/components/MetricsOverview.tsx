import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Eye, MousePointerClick, DollarSign, Target } from "lucide-react";

interface Campaign {
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
    conversions: number;
    cpa: number;
  };
}

interface MetricsOverviewProps {
  campaigns: Campaign[];
}

const MetricsOverview = ({ campaigns }: MetricsOverviewProps) => {
  const totalMetrics = campaigns.reduce(
    (acc, campaign) => ({
      impressions: acc.impressions + campaign.metrics.impressions,
      clicks: acc.clicks + campaign.metrics.clicks,
      spend: acc.spend + campaign.metrics.spend,
      conversions: acc.conversions + campaign.metrics.conversions,
    }),
    { impressions: 0, clicks: 0, spend: 0, conversions: 0 }
  );

  const avgCTR = campaigns.length
    ? campaigns.reduce((acc, c) => acc + c.metrics.ctr, 0) / campaigns.length
    : 0;

  const avgCPA = totalMetrics.conversions
    ? totalMetrics.spend / totalMetrics.conversions
    : 0;

  const metrics = [
    {
      label: "Total Impressions",
      value: totalMetrics.impressions.toLocaleString(),
      icon: Eye,
      trend: "+12.5%",
      positive: true,
    },
    {
      label: "Total Clicks",
      value: totalMetrics.clicks.toLocaleString(),
      icon: MousePointerClick,
      trend: "+8.3%",
      positive: true,
    },
    {
      label: "Average CTR",
      value: `${avgCTR.toFixed(2)}%`,
      icon: Target,
      trend: avgCTR >= 3 ? "+0.4%" : "-0.2%",
      positive: avgCTR >= 3,
    },
    {
      label: "Total Spend",
      value: `₪${totalMetrics.spend.toLocaleString()}`,
      icon: DollarSign,
      trend: "+5.1%",
      positive: false,
    },
    {
      label: "Total Conversions",
      value: totalMetrics.conversions.toLocaleString(),
      icon: TrendingUp,
      trend: "+18.2%",
      positive: true,
    },
    {
      label: "Average CPA",
      value: `₪${avgCPA.toFixed(2)}`,
      icon: Target,
      trend: "-3.8%",
      positive: true,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-3">
              <metric.icon className="w-5 h-5 text-primary" />
              <div className={`flex items-center gap-1 text-xs font-medium ${metric.positive ? 'text-success' : 'text-muted-foreground'}`}>
                {metric.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.trend}
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{metric.value}</p>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;
