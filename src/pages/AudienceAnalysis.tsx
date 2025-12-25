import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Crosshair, Scissors, Palette, RefreshCw, Expand, Sparkles, Zap
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AudienceStatsCards } from "@/components/audience/AudienceStatsCards";
import { StrategySelector, Strategy } from "@/components/audience/StrategySelector";
import { SegmentCard, Segment } from "@/components/audience/SegmentCard";
import { PlatformCard, Platform } from "@/components/audience/PlatformCard";
import { SaturationCard, SaturationData } from "@/components/audience/SaturationCard";
import { ExpansionCard, ExpansionOpportunity } from "@/components/audience/ExpansionCard";
import { CreativeCard, CreativePerformance } from "@/components/audience/CreativeCard";

// Mock data
const mockAudienceBreakdowns = [
  { id: 1, adSetId: "as_001", age: "18-24", gender: "female", region: "תל אביב", impressions: 45000, clicks: 2250, spend: 850, conversions: 45, ctr: 5.0, cpa: 18.9, roas: 3.2 },
  { id: 2, adSetId: "as_001", age: "25-34", gender: "female", region: "תל אביב", impressions: 62000, clicks: 3720, spend: 1200, conversions: 96, ctr: 6.0, cpa: 12.5, roas: 4.8 },
  { id: 3, adSetId: "as_001", age: "25-34", gender: "male", region: "תל אביב", impressions: 55000, clicks: 2750, spend: 1100, conversions: 55, ctr: 5.0, cpa: 20.0, roas: 3.0 },
  { id: 4, adSetId: "as_001", age: "35-44", gender: "female", region: "חיפה", impressions: 38000, clicks: 1520, spend: 760, conversions: 38, ctr: 4.0, cpa: 20.0, roas: 2.9 },
  { id: 5, adSetId: "as_001", age: "35-44", gender: "male", region: "ירושלים", impressions: 42000, clicks: 1260, spend: 900, conversions: 18, ctr: 3.0, cpa: 50.0, roas: 1.2 },
  { id: 6, adSetId: "as_001", age: "45-54", gender: "female", region: "תל אביב", impressions: 28000, clicks: 840, spend: 560, conversions: 14, ctr: 3.0, cpa: 40.0, roas: 1.5 },
  { id: 7, adSetId: "as_001", age: "18-24", gender: "male", region: "באר שבע", impressions: 22000, clicks: 440, spend: 440, conversions: 4, ctr: 2.0, cpa: 110.0, roas: 0.5 },
];

const mockPlatformBreakdowns: Platform[] = [
  { platform: "facebook", position: "feed", device: "iOS", spend: 2500, conversions: 125, ctr: 4.5, cpa: 20.0, clicks: 1800 },
  { platform: "facebook", position: "feed", device: "Android", spend: 1800, conversions: 45, ctr: 2.8, cpa: 40.0, clicks: 920 },
  { platform: "facebook", position: "stories", device: "iOS", spend: 800, conversions: 32, ctr: 3.2, cpa: 25.0, clicks: 420 },
  { platform: "instagram", position: "feed", device: "iOS", spend: 1200, conversions: 72, ctr: 5.2, cpa: 16.7, clicks: 1100 },
  { platform: "instagram", position: "reels", device: "iOS", spend: 950, conversions: 57, ctr: 6.1, cpa: 16.7, clicks: 780 },
  { platform: "audience_network", position: "classic", device: "Android", spend: 650, conversions: 0, ctr: 0.3, cpa: Infinity, clicks: 45 },
  { platform: "messenger", position: "inbox", device: "iOS", spend: 300, conversions: 6, ctr: 1.2, cpa: 50.0, clicks: 85 },
];

const mockCreativePerformance: CreativePerformance[] = [
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "18-24", ctr: 7.2, conversions: 45, avgWatchTime: 8.5, spend: 420 },
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "25-34", ctr: 5.8, conversions: 38, avgWatchTime: 6.2, spend: 380 },
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "45-54", ctr: 2.1, conversions: 8, avgWatchTime: 3.1, spend: 290 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "18-24", ctr: 3.2, conversions: 12, avgWatchTime: 0, spend: 310 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "35-44", ctr: 4.8, conversions: 28, avgWatchTime: 0, spend: 340 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "45-54", ctr: 5.5, conversions: 35, avgWatchTime: 0, spend: 360 },
  { adId: "ad_003", name: "טקסט + תמונה", type: "image", age: "35-44", ctr: 4.2, conversions: 22, avgWatchTime: 0, spend: 280 },
  { adId: "ad_003", name: "טקסט + תמונה", type: "image", age: "45-54", ctr: 5.8, conversions: 42, avgWatchTime: 0, spend: 320 },
];

const mockSaturationData: SaturationData[] = [
  { adSetId: "as_001", name: "Lookalike Israel 1%", reach: 42500, potentialReach: 50000, frequency: 4.2, ctrTrend: -15, saturationLevel: 85, spend: 2400 },
  { adSetId: "as_002", name: "Interest - Real Estate", reach: 28000, potentialReach: 120000, frequency: 2.1, ctrTrend: 5, saturationLevel: 23, spend: 1800 },
  { adSetId: "as_003", name: "Retargeting 30 Days", reach: 8500, potentialReach: 9200, frequency: 6.8, ctrTrend: -28, saturationLevel: 92, spend: 950 },
  { adSetId: "as_004", name: "Broad - Tel Aviv", reach: 125000, potentialReach: 450000, frequency: 1.8, ctrTrend: 8, saturationLevel: 28, spend: 3200 },
];

const mockExpansionOpportunities: ExpansionOpportunity[] = [
  { type: "lookalike", source: "רוכשים (Purchase)", currentPerformance: "CPA ₪15", suggestion: "צור Lookalike 1% על בסיס רוכשים", targetAge: "25-44", confidence: 92, potentialReach: 180000 },
  { type: "interest", source: "נדל\"ן", currentPerformance: "ROAS 4.2x", suggestion: "הרחב לתחומי עניין דומים: השקעות, פיננסים", targetAge: "30-50", confidence: 78, potentialReach: 250000 },
  { type: "geo", source: "תל אביב", currentPerformance: "CPA ₪12", suggestion: "הרחב לגוש דן: רמת גן, גבעתיים, הרצליה", targetAge: "25-34", confidence: 85, potentialReach: 320000 },
];

const AudienceAnalysis = () => {
  const isMobile = useIsMobile();
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [activeStrategy, setActiveStrategy] = useState("micro");

  // Calculate micro-segments
  const avgCpa = mockAudienceBreakdowns.reduce((sum, b) => sum + b.cpa, 0) / mockAudienceBreakdowns.length;
  
  const microSegments: Segment[] = mockAudienceBreakdowns.map((b, idx) => {
    const improvement = ((avgCpa - b.cpa) / avgCpa) * 100;
    const action: "scale" | "exclude" | "monitor" = improvement > 30 ? "scale" : improvement < -30 ? "exclude" : "monitor";
    return {
      id: idx,
      segment: `${b.gender === "female" ? "נשים" : "גברים"} ${b.age} - ${b.region}`,
      age: b.age,
      gender: b.gender === "female" ? "נשים" : "גברים",
      region: b.region,
      cpa: b.cpa,
      roas: b.roas,
      avgCpa: avgCpa,
      improvement: improvement,
      conversions: b.conversions,
      spend: b.spend,
      impressions: b.impressions,
      ctr: b.ctr,
      action
    };
  }).sort((a, b) => b.improvement - a.improvement);

  const scaleSegments = microSegments.filter(s => s.action === "scale");
  const excludePlatforms = mockPlatformBreakdowns.filter(p => p.conversions === 0 || p.cpa > 45);
  const saturatedAudiences = mockSaturationData.filter(s => s.saturationLevel > 70);

  const strategies: Strategy[] = [
    { 
      id: "micro", 
      label: "מיקרו-סגמנטציה", 
      shortLabel: "סגמנטציה",
      icon: Crosshair, 
      color: "success",
      count: scaleSegments.length,
      description: "זיהוי תת-קהלים עם ביצועים מעולים"
    },
    { 
      id: "exclusions", 
      label: "החרגות כירורגיות", 
      shortLabel: "החרגות",
      icon: Scissors, 
      color: "destructive",
      count: excludePlatforms.length,
      description: "מניעת בזבוז תקציב"
    },
    { 
      id: "creative", 
      label: "התאמת קריאייטיב", 
      shortLabel: "קריאייטיב",
      icon: Palette, 
      color: "primary",
      count: 3,
      description: "איזה מסר עובד לאיזה קהל"
    },
    { 
      id: "saturation", 
      label: "שחיקת קהל", 
      shortLabel: "שחיקה",
      icon: RefreshCw, 
      color: "warning",
      count: saturatedAudiences.length,
      description: "זיהוי קהלים שנשחקו"
    },
    { 
      id: "expansion", 
      label: "הרחבת קהלים", 
      shortLabel: "הרחבה",
      icon: Expand, 
      color: "accent",
      count: mockExpansionOpportunities.length,
      description: "הזדמנויות צמיחה חדשות"
    },
  ];

  // Group creatives by adId
  const creativeGroups = mockCreativePerformance.reduce((acc, perf) => {
    if (!acc[perf.adId]) acc[perf.adId] = [];
    acc[perf.adId].push(perf);
    return acc;
  }, {} as Record<string, CreativePerformance[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-card">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">ניתוח קהלים מתקדם</h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    5 אסטרטגיות חכמות לאופטימיזציה אוטומטית
                  </p>
                </div>
              </div>
            </div>
            
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full sm:w-[220px] shadow-card">
                <SelectValue placeholder="בחר קמפיין" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הקמפיינים</SelectItem>
                <SelectItem value="summer">Summer Sale 2024</SelectItem>
                <SelectItem value="brand">Brand Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <AudienceStatsCards 
            scaleCount={scaleSegments.length}
            excludeCount={excludePlatforms.length}
            saturatedCount={saturatedAudiences.length}
            potentialSavings={excludePlatforms.reduce((sum, e) => sum + e.spend, 0) * 4}
          />
        </div>

        {/* Strategy Selector */}
        <div className="mb-6">
          <StrategySelector 
            strategies={strategies}
            activeStrategy={activeStrategy}
            onStrategyChange={setActiveStrategy}
            isMobile={isMobile}
          />
        </div>

        {/* Main Content */}
        <Tabs value={activeStrategy} onValueChange={setActiveStrategy} className="space-y-4">
          <TabsList className="hidden">
            {strategies.map((s) => (
              <TabsTrigger key={s.id} value={s.id}>{s.label}</TabsTrigger>
            ))}
          </TabsList>

          {/* Micro-Segmentation */}
          <TabsContent value="micro" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-success/10 border border-success/20">
                      <Crosshair className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">מיקרו-סגמנטציה</CardTitle>
                      <CardDescription>זיהוי תת-קהלים עם CPA נמוך ב-30%+ מהממוצע</CardDescription>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
                    ממוצע CPA: <span className="font-semibold text-foreground">₪{avgCpa.toFixed(0)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {microSegments.map((segment) => (
                  <SegmentCard key={segment.id} segment={segment} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exclusions */}
          <TabsContent value="exclusions" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20">
                      <Scissors className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">החרגות כירורגיות</CardTitle>
                      <CardDescription>מניעת בזבוז כסף במיקומים ופלטפורמות</CardDescription>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-destructive/10 text-sm text-destructive">
                    בזבוז: <span className="font-semibold">₪{excludePlatforms.reduce((s, p) => s + p.spend, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPlatformBreakdowns.map((platform, idx) => (
                  <PlatformCard key={idx} platform={platform} avgCpa={avgCpa} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creative */}
          <TabsContent value="creative" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <Palette className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">התאמת קריאייטיב לדמוגרפיה</CardTitle>
                    <CardDescription>איזה מסר עובד לאיזה קהל</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(creativeGroups).map(([adId, creatives]) => (
                  <CreativeCard key={adId} adId={adId} creatives={creatives} isMobile={isMobile} />
                ))}

                {/* Summary */}
                <Card className="border-primary/30 bg-primary/5 shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-primary mb-1">המלצה להתאמה אישית</p>
                        <p className="text-sm text-muted-foreground">
                          סרטון ה-Reels עובד מצוין לצעירים (18-24, CTR 7.2%), אך נכשל אצל מבוגרים (45-54, CTR 2.1%).
                          הקרוסלה עובדת הפוך - מצוינת למבוגרים. <strong className="text-foreground">פצל ל-2 Ad Sets לפי גיל והצג לכל קהל את הקריאייטיב המנצח שלו.</strong>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saturation */}
          <TabsContent value="saturation" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-warning/10 border border-warning/20">
                    <RefreshCw className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">שחיקת קהל (Audience Fatigue)</CardTitle>
                    <CardDescription>זיהוי קהלים שנשחקו ודורשים רענון</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSaturationData.map((data) => (
                  <SaturationCard key={data.adSetId} data={data} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expansion */}
          <TabsContent value="expansion" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                    <Expand className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">הזדמנויות הרחבה</CardTitle>
                    <CardDescription>בניית קהלים חדשים על בסיס ביצועים מעולים</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockExpansionOpportunities.map((opportunity, idx) => (
                    <ExpansionCard key={idx} data={opportunity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AudienceAnalysis;
