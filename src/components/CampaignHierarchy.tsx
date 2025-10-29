import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Play, Pause, TrendingUp, Users, Image, Video, Layout } from "lucide-react";

interface Ad {
  id: string;
  name: string;
  status: string;
  creative: { type: string; name: string };
  metrics: { impressions: number; clicks: number; ctr: number };
}

interface AdSet {
  id: string;
  name: string;
  status: string;
  targeting: { ageMin: number; ageMax: number; gender: string[] };
  metrics: { impressions: number; clicks: number; ctr: number; conversions: number };
  ads: Ad[];
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  objective: string;
  budget: { daily?: number; lifetime?: number; currency: string };
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
    conversions: number;
    cpa: number;
  };
  adSets: AdSet[];
}

interface CampaignHierarchyProps {
  campaigns: Campaign[];
}

const CampaignHierarchy = ({ campaigns }: CampaignHierarchyProps) => {
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());
  const [expandedAdSets, setExpandedAdSets] = useState<Set<string>>(new Set());

  const toggleCampaign = (id: string) => {
    const newExpanded = new Set(expandedCampaigns);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCampaigns(newExpanded);
  };

  const toggleAdSet = (id: string) => {
    const newExpanded = new Set(expandedAdSets);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedAdSets(newExpanded);
  };

  const getCreativeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-3 h-3" />;
      case "carousel":
        return <Layout className="w-3 h-3" />;
      default:
        return <Image className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-3">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
          <CardContent className="p-0">
            {/* Campaign Row */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCampaign(campaign.id)}
                  disabled={campaign.adSets.length === 0}
                  className="p-1 h-auto"
                >
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedCampaigns.has(campaign.id) ? "rotate-90" : ""
                    } ${campaign.adSets.length === 0 ? "opacity-30" : ""}`}
                  />
                </Button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base">{campaign.name}</h3>
                    <Badge
                      variant={campaign.status === "ACTIVE" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>ID: {campaign.id}</span>
                    <span>•</span>
                    <span>{campaign.objective}</span>
                    <span>•</span>
                    <span>
                      Budget:{" "}
                      {campaign.budget.daily
                        ? `₪${campaign.budget.daily}/day`
                        : `₪${campaign.budget.lifetime} lifetime`}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">CTR:</span>
                      <span className={`font-semibold ${campaign.metrics.ctr >= 3 ? "text-success" : "text-warning"}`}>
                        {campaign.metrics.ctr.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Conversions:</span>
                      <span className="font-semibold">{campaign.metrics.conversions}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Spend:</span>
                      <span className="font-semibold">₪{campaign.metrics.spend.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
                {campaign.status === "ACTIVE" ? (
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-success hover:text-success">
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                )}
              </div>
            </div>

            {/* Ad Sets */}
            {expandedCampaigns.has(campaign.id) && campaign.adSets.length > 0 && (
              <div className="border-t border-border bg-muted/30">
                {campaign.adSets.map((adSet) => (
                  <div key={adSet.id} className="ml-8 border-l-2 border-primary/20">
                    {/* Ad Set Row */}
                    <div className="p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAdSet(adSet.id)}
                          disabled={adSet.ads.length === 0}
                          className="p-1 h-auto"
                        >
                          <ChevronRight
                            className={`w-3 h-3 transition-transform duration-200 ${
                              expandedAdSets.has(adSet.id) ? "rotate-90" : ""
                            } ${adSet.ads.length === 0 ? "opacity-30" : ""}`}
                          />
                        </Button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="w-3 h-3 text-primary" />
                            <h4 className="font-medium text-sm">{adSet.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {adSet.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>ID: {adSet.id}</span>
                            <span>•</span>
                            <span>Age: {adSet.targeting.ageMin}-{adSet.targeting.ageMax}</span>
                            <span>•</span>
                            <span>CTR: {adSet.metrics.ctr.toFixed(2)}%</span>
                            <span>•</span>
                            <span>Conversions: {adSet.metrics.conversions}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {adSet.status === "ACTIVE" ? (
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Pause className="w-3 h-3 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-success">
                            <Play className="w-3 h-3 mr-1" />
                            Resume
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Ads */}
                    {expandedAdSets.has(adSet.id) && adSet.ads.length > 0 && (
                      <div className="ml-8 bg-background/50">
                        {adSet.ads.map((ad) => (
                          <div
                            key={ad.id}
                            className="p-2 flex items-center justify-between hover:bg-muted/30 transition-colors border-t border-border"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                {getCreativeIcon(ad.creative.type)}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{ad.name}</p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>ID: {ad.id}</span>
                                  <span>•</span>
                                  <span>{ad.creative.name}</span>
                                  <span>•</span>
                                  <span>CTR: {ad.metrics.ctr.toFixed(2)}%</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {ad.status}
                              </Badge>
                              {ad.status === "ACTIVE" ? (
                                <Button variant="ghost" size="sm" className="text-destructive h-7">
                                  <Pause className="w-3 h-3" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" className="text-success h-7">
                                  <Play className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignHierarchy;
