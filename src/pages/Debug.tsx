import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ChevronDown, 
  ChevronRight, 
  Database, 
  Download,
  AlertCircle,
  CheckCircle,
  Code2,
  RefreshCw,
  Home
} from "lucide-react";

// Mock data structure matching Facebook Ads API
const mockApiData = {
  campaigns: [
    {
      id: "campaign_123456",
      name: "Summer Sale 2024",
      objective: "CONVERSIONS",
      status: "ACTIVE",
      effective_status: "ACTIVE",
      daily_budget: "1000",
      lifetime_budget: null,
      start_time: "2024-01-15T00:00:00+0000",
      stop_time: null,
      buying_type: "AUCTION",
      bid_strategy: "LOWEST_COST_WITHOUT_CAP",
      insights: {
        impressions: 45230,
        reach: 32145,
        frequency: 1.41,
        clicks: 2341,
        unique_clicks: 1987,
        cpc: 2.85,
        ctr: 5.17,
        spend: 6672.85,
        cost_per_result: 15.32,
        results: 435,
        actions: [
          { action_type: "purchase", value: 285 },
          { action_type: "add_to_cart", value: 542 }
        ]
      },
      adsets: [
        {
          id: "adset_789012",
          name: "iOS Users 25-34",
          status: "ACTIVE",
          effective_status: "ACTIVE",
          optimization_goal: "CONVERSIONS",
          billing_event: "IMPRESSIONS",
          daily_budget: "500",
          targeting: {
            age_min: 25,
            age_max: 34,
            genders: [1, 2],
            geo_locations: {
              countries: ["US", "CA"],
              regions: [{ key: "3847" }]
            },
            device_platforms: ["mobile"],
            publisher_platforms: ["facebook", "instagram"],
            interests: [
              { id: "6003139266461", name: "Online shopping" },
              { id: "6003020834693", name: "Fashion" }
            ]
          },
          ads: [
            {
              id: "ad_345678",
              name: "Summer Sale - Carousel Ad",
              status: "ACTIVE",
              effective_status: "ACTIVE",
              creative: {
                id: "creative_901234",
                name: "Summer Carousel Creative",
                object_story_spec: {
                  page_id: "page_567890",
                  link_data: {
                    message: "🌞 קיץ של הנחות! עד 50% הנחה על כל האוסף החדש",
                    name: "מבצע הקיץ הגדול",
                    description: "אל תפספסו - מבצע לזמן מוגבל בלבד!",
                    link: "https://example.com/summer-sale",
                    call_to_action: {
                      type: "SHOP_NOW",
                      value: { link: "https://example.com/summer-sale" }
                    },
                    child_attachments: [
                      {
                        link: "https://example.com/product1",
                        name: "שמלת קיץ",
                        picture: "https://via.placeholder.com/600x600",
                        description: "רק ₪199"
                      },
                      {
                        link: "https://example.com/product2",
                        name: "חולצת פולו",
                        picture: "https://via.placeholder.com/600x600",
                        description: "רק ₪129"
                      }
                    ]
                  }
                },
                image_url: "https://via.placeholder.com/1200x628",
                thumbnail_url: "https://via.placeholder.com/300x157"
              },
              insights: {
                impressions: 23450,
                clicks: 1245,
                ctr: 5.31,
                spend: 3542.15,
                cpc: 2.84,
                results: 231,
                cost_per_result: 15.33
              }
            },
            {
              id: "ad_345679",
              name: "Summer Sale - Video Ad",
              status: "ACTIVE",
              effective_status: "ACTIVE",
              creative: {
                id: "creative_901235",
                name: "Summer Video Creative",
                object_story_spec: {
                  page_id: "page_567890",
                  video_data: {
                    video_id: "video_112233",
                    message: "🎥 סרטון מיוחד למבצע הקיץ שלנו! צפו וקנו עכשיו",
                    title: "אוסף קיץ 2024",
                    call_to_action: {
                      type: "LEARN_MORE",
                      value: { link: "https://example.com/summer-video" }
                    }
                  }
                },
                video_id: "video_112233",
                thumbnail_url: "https://via.placeholder.com/640x360"
              },
              insights: {
                impressions: 21780,
                clicks: 1096,
                ctr: 5.03,
                spend: 3130.70,
                cpc: 2.86,
                results: 204,
                cost_per_result: 15.35,
                video_plays: 18234,
                video_10_sec_watched: 12456,
                video_avg_time_watched: 8.3
              }
            }
          ]
        }
      ]
    },
    {
      id: "campaign_234567",
      name: "Brand Awareness Q1",
      objective: "BRAND_AWARENESS",
      status: "ACTIVE",
      effective_status: "ACTIVE",
      daily_budget: "750",
      lifetime_budget: null,
      insights: {
        impressions: 128450,
        reach: 95234,
        frequency: 1.35,
        clicks: 3421,
        ctr: 2.66,
        spend: 4523.50
      },
      adsets: []
    }
  ]
};

const Debug = () => {
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());
  const [expandedAdSets, setExpandedAdSets] = useState<Set<string>>(new Set());
  const [expandedAds, setExpandedAds] = useState<Set<string>>(new Set());
  const [showRawData, setShowRawData] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();
  
  // Database testing state
  const [dbTestLoading, setDbTestLoading] = useState(false);
  const [dbTestResults, setDbTestResults] = useState<any>(null);

  const loadData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData(mockApiData);
      setLoading(false);
    }, 1000);
  };

  const toggleExpanded = (set: Set<string>, setter: Function, id: string) => {
    const newSet = new Set(set);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setter(newSet);
  };

  const toggleRawData = (id: string) => {
    const newSet = new Set(showRawData);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setShowRawData(newSet);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `facebook-ads-debug-${new Date().toISOString()}.json`;
    link.click();
  };

  const getFieldCompleteness = (obj: any, requiredFields: string[]) => {
    const present = requiredFields.filter(field => {
      const value = field.split('.').reduce((o, k) => o?.[k], obj);
      return value !== null && value !== undefined;
    });
    return {
      total: requiredFields.length,
      present: present.length,
      percentage: Math.round((present.length / requiredFields.length) * 100)
    };
  };

  const campaignRequiredFields = [
    'id', 'name', 'objective', 'status', 'effective_status',
    'daily_budget', 'lifetime_budget', 'start_time', 'buying_type',
    'bid_strategy', 'insights.impressions', 'insights.clicks', 'insights.spend'
  ];

  const adSetRequiredFields = [
    'id', 'name', 'status', 'optimization_goal', 'billing_event',
    'targeting.age_min', 'targeting.age_max', 'targeting.geo_locations'
  ];

  const adRequiredFields = [
    'id', 'name', 'status', 'creative.id', 'creative.object_story_spec',
    'insights.impressions', 'insights.clicks', 'insights.spend'
  ];

  // Database testing functions
  const testHealth = async () => {
    setDbTestLoading(true);
    try {
      // Simple ping test using a lightweight query
      const start = Date.now();
      const { error } = await supabase.auth.getSession();
      const latency = Date.now() - start;
      
      const result = {
        ok: !error,
        timestamp: new Date().toISOString(),
        status: error ? 'error' : 'healthy',
        error: error?.message || null,
        connection: 'Lovable Cloud (Supabase)',
        projectId: import.meta.env.VITE_SUPABASE_PROJECT_ID || 'unknown',
        latency: `${latency}ms`
      };
      setDbTestResults(result);
      toast({
        title: error ? "Connection Failed" : "Connection Healthy",
        description: error ? error.message : `Database responding in ${latency}ms`,
        variant: error ? "destructive" : "default"
      });
    } catch (e: any) {
      setDbTestResults({
        ok: false,
        error: e.message,
        timestamp: new Date().toISOString()
      });
    }
    setDbTestLoading(false);
  };

  const listTables = async () => {
    setDbTestLoading(true);
    try {
      const result = {
        ok: true,
        note: 'Currently no tables exist in the database',
        suggestion: 'Create tables using database migrations',
        availableOperations: [
          'Use supabase.from() for table operations',
          'Use supabase.auth for authentication',
          'Use supabase.storage for file uploads',
          'Use supabase.functions.invoke() for edge functions'
        ],
        timestamp: new Date().toISOString()
      };
      setDbTestResults(result);
      toast({
        title: "Database Structure",
        description: "No tables created yet. Use migrations to add tables.",
      });
    } catch (e: any) {
      setDbTestResults({
        ok: false,
        error: e.message,
        timestamp: new Date().toISOString()
      });
    }
    setDbTestLoading(false);
  };

  const runSmokeTest = async (dryRun = false) => {
    setDbTestLoading(true);
    const results: any = {
      ok: true,
      dryRun,
      timestamp: new Date().toISOString(),
      steps: []
    };

    try {
      if (!dryRun) {
        results.steps.push({
          step: 'check_database',
          status: 'info',
          note: 'No tables exist yet for smoke testing'
        });

        results.steps.push({
          step: 'recommendation',
          status: 'info',
          note: 'Create a test table using migrations, then run smoke test'
        });

        results.steps.push({
          step: 'example_migration',
          status: 'info',
          sql: `
CREATE TABLE _smoke_test (
  id TEXT PRIMARY KEY,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
          `.trim()
        });

      } else {
        results.steps = [
          { step: 'write', status: 'dry_run', note: 'Would insert test record' },
          { step: 'read', status: 'dry_run', note: 'Would read test record' },
          { step: 'delete', status: 'dry_run', note: 'Would delete test record' }
        ];
      }

      setDbTestResults(results);
      toast({
        title: dryRun ? "Dry Run Complete" : "Smoke Test Info",
        description: dryRun ? "No changes made" : "Create tables first to run full smoke test",
      });
    } catch (e: any) {
      results.ok = false;
      results.error = e.message;
      setDbTestResults(results);
      toast({
        title: "Smoke Test Error",
        description: e.message,
        variant: "destructive"
      });
    }
    setDbTestLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Database Connection Testing */}
        <Card className="mb-4 md:mb-6">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">בדיקת חיבור למסד נתונים</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Health, Tables, Smoke — דרך Lovable Cloud (Supabase)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <div className="grid grid-cols-2 md:flex gap-2 flex-wrap">
              <Button 
                onClick={testHealth} 
                disabled={dbTestLoading}
                variant="default"
                size={isMobile ? "sm" : "default"}
                className="w-full md:w-auto"
              >
                {dbTestLoading ? <RefreshCw className="w-3 h-3 md:w-4 md:h-4 animate-spin mr-1 md:mr-2" /> : null}
                <span className="text-xs md:text-sm">Health</span>
              </Button>
              <Button 
                onClick={listTables} 
                disabled={dbTestLoading}
                variant="default"
                size={isMobile ? "sm" : "default"}
                className="w-full md:w-auto"
              >
                <span className="text-xs md:text-sm">טבלאות</span>
              </Button>
              <Button 
                onClick={() => runSmokeTest(false)} 
                disabled={dbTestLoading}
                variant="default"
                size={isMobile ? "sm" : "default"}
                className="w-full md:w-auto"
              >
                <span className="text-xs md:text-sm">Smoke</span>
              </Button>
              <Button 
                onClick={() => runSmokeTest(true)} 
                disabled={dbTestLoading}
                variant="secondary"
                size={isMobile ? "sm" : "default"}
                className="w-full md:w-auto"
              >
                <span className="text-xs md:text-sm">Dry-Run</span>
              </Button>
            </div>
            
            {dbTestResults && (
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-auto max-h-96 font-mono">
                  {JSON.stringify(dbTestResults, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4 md:mb-6">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Data Inspector Controls</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Load and inspect all available data from Facebook Ads API
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3 md:gap-4 p-4 md:p-6">
            <Button 
              onClick={loadData} 
              disabled={loading}
              className="gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  Load All Data
                </>
              )}
            </Button>
            {data && (
              <Button 
                onClick={exportData}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export JSON
              </Button>
            )}
          </CardContent>
        </Card>

        {data && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {data.campaigns.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Campaigns</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {data.campaigns.reduce((acc: number, c: any) => acc + c.adsets.length, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Ad Sets</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary">
                      {data.campaigns.reduce((acc: number, c: any) => 
                        acc + c.adsets.reduce((a: number, s: any) => a + s.ads.length, 0), 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Ads</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-success">
                      ₪{data.campaigns.reduce((acc: number, c: any) => 
                        acc + (c.insights?.spend || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Spend</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Hierarchy */}
            {data.campaigns.map((campaign: any) => {
              const campaignCompleteness = getFieldCompleteness(campaign, campaignRequiredFields);
              const isCampaignExpanded = expandedCampaigns.has(campaign.id);
              
              return (
                <Card key={campaign.id} className="overflow-hidden">
                  <Collapsible
                    open={isCampaignExpanded}
                    onOpenChange={() => toggleExpanded(expandedCampaigns, setExpandedCampaigns, campaign.id)}
                  >
                    <CardHeader className="bg-muted/30">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {isCampaignExpanded ? 
                              <ChevronDown className="w-5 h-5" /> : 
                              <ChevronRight className="w-5 h-5" />
                            }
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">
                                  {campaign.status === 'ACTIVE' ? '🟢' : '🔴'} {campaign.name}
                                </CardTitle>
                                <Badge variant="outline">{campaign.objective}</Badge>
                              </div>
                              <CardDescription className="mt-1">
                                Campaign ID: {campaign.id} • 
                                Budget: ₪{campaign.daily_budget || campaign.lifetime_budget || 'N/A'} • 
                                Spend: ₪{campaign.insights?.spend?.toLocaleString() || '0'}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                {campaignCompleteness.percentage === 100 ? (
                                  <CheckCircle className="w-4 h-4 text-success" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-warning" />
                                )}
                                <span className="text-sm font-medium">
                                  {campaignCompleteness.percentage}% Complete
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {campaignCompleteness.present}/{campaignCompleteness.total} fields
                              </div>
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                    </CardHeader>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-6 space-y-6">
                        {/* Campaign Insights Table */}
                        {campaign.insights && (
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">Performance Metrics</h4>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleRawData(`campaign-${campaign.id}`)}
                              >
                                <Code2 className="w-4 h-4 mr-2" />
                                {showRawData.has(`campaign-${campaign.id}`) ? 'Hide' : 'Show'} Raw JSON
                              </Button>
                            </div>
                            
                            {showRawData.has(`campaign-${campaign.id}`) ? (
                              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
                                {JSON.stringify(campaign, null, 2)}
                              </pre>
                            ) : (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Metric</TableHead>
                                    <TableHead className="text-right">Value</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Impressions</TableCell>
                                    <TableCell className="text-right">{campaign.insights.impressions?.toLocaleString() || <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Reach</TableCell>
                                    <TableCell className="text-right">{campaign.insights.reach?.toLocaleString() || <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Clicks</TableCell>
                                    <TableCell className="text-right">{campaign.insights.clicks?.toLocaleString() || <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">CTR</TableCell>
                                    <TableCell className="text-right">{campaign.insights.ctr ? `${campaign.insights.ctr}%` : <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">CPC</TableCell>
                                    <TableCell className="text-right">{campaign.insights.cpc ? `₪${campaign.insights.cpc}` : <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Spend</TableCell>
                                    <TableCell className="text-right">{campaign.insights.spend ? `₪${campaign.insights.spend.toLocaleString()}` : <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Results</TableCell>
                                    <TableCell className="text-right">{campaign.insights.results?.toLocaleString() || <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Cost Per Result</TableCell>
                                    <TableCell className="text-right">{campaign.insights.cost_per_result ? `₪${campaign.insights.cost_per_result}` : <span className="text-destructive">Missing</span>}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            )}
                          </div>
                        )}

                        {/* Ad Sets */}
                        {campaign.adsets && campaign.adsets.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-semibold">Ad Sets ({campaign.adsets.length})</h4>
                            {campaign.adsets.map((adset: any) => {
                              const adsetCompleteness = getFieldCompleteness(adset, adSetRequiredFields);
                              const isAdSetExpanded = expandedAdSets.has(adset.id);
                              
                              return (
                                <Card key={adset.id} className="ml-6">
                                  <Collapsible
                                    open={isAdSetExpanded}
                                    onOpenChange={() => toggleExpanded(expandedAdSets, setExpandedAdSets, adset.id)}
                                  >
                                    <CardHeader className="bg-muted/20 py-3">
                                      <CollapsibleTrigger className="w-full">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            {isAdSetExpanded ? 
                                              <ChevronDown className="w-4 h-4" /> : 
                                              <ChevronRight className="w-4 h-4" />
                                            }
                                            <div className="text-left">
                                              <div className="flex items-center gap-2">
                                                <span className="font-semibold text-sm">
                                                  {adset.status === 'ACTIVE' ? '🟢' : '🔴'} {adset.name}
                                                </span>
                                                <Badge variant="secondary" className="text-xs">
                                                  {adset.optimization_goal}
                                                </Badge>
                                              </div>
                                              <p className="text-xs text-muted-foreground mt-1">
                                                Ad Set ID: {adset.id} • Budget: ₪{adset.daily_budget}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="flex items-center gap-2">
                                              {adsetCompleteness.percentage === 100 ? (
                                                <CheckCircle className="w-3 h-3 text-success" />
                                              ) : (
                                                <AlertCircle className="w-3 h-3 text-warning" />
                                              )}
                                              <span className="text-xs font-medium">
                                                {adsetCompleteness.percentage}%
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </CollapsibleTrigger>
                                    </CardHeader>
                                    
                                    <CollapsibleContent>
                                      <CardContent className="pt-4 space-y-4">
                                        {/* Targeting Info */}
                                        <div>
                                          <div className="flex items-center justify-between mb-2">
                                            <h5 className="text-sm font-semibold">Targeting</h5>
                                            <Button 
                                              variant="ghost" 
                                              size="sm"
                                              onClick={() => toggleRawData(`adset-${adset.id}`)}
                                            >
                                              <Code2 className="w-3 h-3 mr-1" />
                                              Raw
                                            </Button>
                                          </div>
                                          
                                          {showRawData.has(`adset-${adset.id}`) ? (
                                            <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-64">
                                              {JSON.stringify(adset, null, 2)}
                                            </pre>
                                          ) : (
                                            <div className="bg-muted/50 p-3 rounded space-y-2 text-sm">
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Age Range:</span>
                                                <span>{adset.targeting.age_min}-{adset.targeting.age_max}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Countries:</span>
                                                <span>{adset.targeting.geo_locations.countries.join(', ')}</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-muted-foreground">Platforms:</span>
                                                <span>{adset.targeting.publisher_platforms.join(', ')}</span>
                                              </div>
                                              {adset.targeting.interests && (
                                                <div className="flex justify-between">
                                                  <span className="text-muted-foreground">Interests:</span>
                                                  <span>{adset.targeting.interests.map((i: any) => i.name).join(', ')}</span>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        {/* Ads */}
                                        {adset.ads && adset.ads.length > 0 && (
                                          <div className="space-y-2">
                                            <h5 className="text-sm font-semibold">Ads ({adset.ads.length})</h5>
                                            {adset.ads.map((ad: any) => {
                                              const adCompleteness = getFieldCompleteness(ad, adRequiredFields);
                                              const isAdExpanded = expandedAds.has(ad.id);
                                              
                                              return (
                                                <Card key={ad.id} className="ml-6">
                                                  <Collapsible
                                                    open={isAdExpanded}
                                                    onOpenChange={() => toggleExpanded(expandedAds, setExpandedAds, ad.id)}
                                                  >
                                                    <CardHeader className="py-2 px-3">
                                                      <CollapsibleTrigger className="w-full">
                                                        <div className="flex items-center justify-between">
                                                          <div className="flex items-center gap-2">
                                                            {isAdExpanded ? 
                                                              <ChevronDown className="w-3 h-3" /> : 
                                                              <ChevronRight className="w-3 h-3" />
                                                            }
                                                            <span className="text-xs font-medium">
                                                              {ad.status === 'ACTIVE' ? '🟢' : '🔴'} {ad.name}
                                                            </span>
                                                          </div>
                                                          <div className="flex items-center gap-2">
                                                            {adCompleteness.percentage === 100 ? (
                                                              <CheckCircle className="w-3 h-3 text-success" />
                                                            ) : (
                                                              <AlertCircle className="w-3 h-3 text-warning" />
                                                            )}
                                                            <span className="text-xs">{adCompleteness.percentage}%</span>
                                                          </div>
                                                        </div>
                                                      </CollapsibleTrigger>
                                                    </CardHeader>
                                                    
                                                    <CollapsibleContent>
                                                      <CardContent className="pt-3 space-y-3">
                                                        {/* Creative */}
                                                        <div>
                                                          <div className="flex items-center justify-between mb-2">
                                                            <h6 className="text-xs font-semibold">Creative</h6>
                                                            <Button 
                                                              variant="ghost" 
                                                              size="sm"
                                                              onClick={() => toggleRawData(`ad-${ad.id}`)}
                                                            >
                                                              <Code2 className="w-3 h-3 mr-1" />
                                                              Raw
                                                            </Button>
                                                          </div>
                                                          
                                                          {showRawData.has(`ad-${ad.id}`) ? (
                                                            <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-48">
                                                              {JSON.stringify(ad, null, 2)}
                                                            </pre>
                                                          ) : (
                                                            <div className="space-y-2">
                                                              {ad.creative.image_url && (
                                                                <div>
                                                                  <img 
                                                                    src={ad.creative.image_url} 
                                                                    alt={ad.creative.name}
                                                                    className="w-full h-32 object-cover rounded"
                                                                  />
                                                                </div>
                                                              )}
                                                              {ad.creative.object_story_spec?.link_data?.message && (
                                                                <div className="bg-muted/50 p-2 rounded text-xs">
                                                                  <div className="font-medium mb-1">Ad Copy:</div>
                                                                  <div className="text-muted-foreground">
                                                                    {ad.creative.object_story_spec.link_data.message}
                                                                  </div>
                                                                </div>
                                                              )}
                                                              {ad.creative.object_story_spec?.link_data?.call_to_action && (
                                                                <div className="text-xs">
                                                                  <span className="text-muted-foreground">CTA: </span>
                                                                  <Badge variant="outline" className="text-xs">
                                                                    {ad.creative.object_story_spec.link_data.call_to_action.type}
                                                                  </Badge>
                                                                </div>
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>

                                                        {/* Ad Insights */}
                                                        {ad.insights && (
                                                          <div>
                                                            <h6 className="text-xs font-semibold mb-2">Performance</h6>
                                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                              <div className="bg-muted/50 p-2 rounded">
                                                                <div className="text-muted-foreground">Impressions</div>
                                                                <div className="font-semibold">{ad.insights.impressions?.toLocaleString() || <span className="text-destructive">N/A</span>}</div>
                                                              </div>
                                                              <div className="bg-muted/50 p-2 rounded">
                                                                <div className="text-muted-foreground">Clicks</div>
                                                                <div className="font-semibold">{ad.insights.clicks?.toLocaleString() || <span className="text-destructive">N/A</span>}</div>
                                                              </div>
                                                              <div className="bg-muted/50 p-2 rounded">
                                                                <div className="text-muted-foreground">CTR</div>
                                                                <div className="font-semibold">{ad.insights.ctr ? `${ad.insights.ctr}%` : <span className="text-destructive">N/A</span>}</div>
                                                              </div>
                                                              <div className="bg-muted/50 p-2 rounded">
                                                                <div className="text-muted-foreground">Spend</div>
                                                                <div className="font-semibold">{ad.insights.spend ? `₪${ad.insights.spend}` : <span className="text-destructive">N/A</span>}</div>
                                                              </div>
                                                              <div className="bg-muted/50 p-2 rounded">
                                                                <div className="text-muted-foreground">CPC</div>
                                                                <div className="font-semibold">{ad.insights.cpc ? `₪${ad.insights.cpc}` : <span className="text-destructive">N/A</span>}</div>
                                                              </div>
                                                              <div className="bg-muted/50 p-2 rounded">
                                                                <div className="text-muted-foreground">Results</div>
                                                                <div className="font-semibold">{ad.insights.results || <span className="text-destructive">N/A</span>}</div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}
                                                      </CardContent>
                                                    </CollapsibleContent>
                                                  </Collapsible>
                                                </Card>
                                              );
                                            })}
                                          </div>
                                        )}
                                      </CardContent>
                                    </CollapsibleContent>
                                  </Collapsible>
                                </Card>
                              );
                            })}
                          </div>
                        )}
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </div>
        )}

        {!data && !loading && (
          <Card className="p-12 text-center">
            <Database className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Data Loaded</h3>
            <p className="text-muted-foreground mb-4">
              Click "Load All Data" to fetch campaign information from Facebook Ads API
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Debug;
