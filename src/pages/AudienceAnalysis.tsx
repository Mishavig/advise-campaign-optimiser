import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Target, Users, TrendingUp, TrendingDown, AlertTriangle, 
  Zap, Crosshair, Scissors, Palette, RefreshCw, Expand,
  ArrowUpRight, ArrowDownRight, Ban, Plus, Sparkles,
  MapPin, Monitor, Smartphone, BarChart3, Eye, DollarSign,
  CheckCircle2, XCircle, AlertCircle, ChevronRight, Play
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for audience breakdowns
const mockAudienceBreakdowns = [
  { id: 1, adSetId: "as_001", age: "18-24", gender: "female", region: "תל אביב", impressions: 45000, clicks: 2250, spend: 850, conversions: 45, ctr: 5.0, cpa: 18.9, roas: 3.2 },
  { id: 2, adSetId: "as_001", age: "25-34", gender: "female", region: "תל אביב", impressions: 62000, clicks: 3720, spend: 1200, conversions: 96, ctr: 6.0, cpa: 12.5, roas: 4.8 },
  { id: 3, adSetId: "as_001", age: "25-34", gender: "male", region: "תל אביב", impressions: 55000, clicks: 2750, spend: 1100, conversions: 55, ctr: 5.0, cpa: 20.0, roas: 3.0 },
  { id: 4, adSetId: "as_001", age: "35-44", gender: "female", region: "חיפה", impressions: 38000, clicks: 1520, spend: 760, conversions: 38, ctr: 4.0, cpa: 20.0, roas: 2.9 },
  { id: 5, adSetId: "as_001", age: "35-44", gender: "male", region: "ירושלים", impressions: 42000, clicks: 1260, spend: 900, conversions: 18, ctr: 3.0, cpa: 50.0, roas: 1.2 },
  { id: 6, adSetId: "as_001", age: "45-54", gender: "female", region: "תל אביב", impressions: 28000, clicks: 840, spend: 560, conversions: 14, ctr: 3.0, cpa: 40.0, roas: 1.5 },
  { id: 7, adSetId: "as_001", age: "18-24", gender: "male", region: "באר שבע", impressions: 22000, clicks: 440, spend: 440, conversions: 4, ctr: 2.0, cpa: 110.0, roas: 0.5 },
];

const mockPlatformBreakdowns = [
  { platform: "facebook", position: "feed", device: "iOS", spend: 2500, conversions: 125, ctr: 4.5, cpa: 20.0, clicks: 1800 },
  { platform: "facebook", position: "feed", device: "Android", spend: 1800, conversions: 45, ctr: 2.8, cpa: 40.0, clicks: 920 },
  { platform: "facebook", position: "stories", device: "iOS", spend: 800, conversions: 32, ctr: 3.2, cpa: 25.0, clicks: 420 },
  { platform: "instagram", position: "feed", device: "iOS", spend: 1200, conversions: 72, ctr: 5.2, cpa: 16.7, clicks: 1100 },
  { platform: "instagram", position: "reels", device: "iOS", spend: 950, conversions: 57, ctr: 6.1, cpa: 16.7, clicks: 780 },
  { platform: "audience_network", position: "classic", device: "Android", spend: 650, conversions: 0, ctr: 0.3, cpa: Infinity, clicks: 45 },
  { platform: "messenger", position: "inbox", device: "iOS", spend: 300, conversions: 6, ctr: 1.2, cpa: 50.0, clicks: 85 },
];

const mockCreativePerformance = [
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "18-24", ctr: 7.2, conversions: 45, avgWatchTime: 8.5, spend: 420 },
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "25-34", ctr: 5.8, conversions: 38, avgWatchTime: 6.2, spend: 380 },
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "45-54", ctr: 2.1, conversions: 8, avgWatchTime: 3.1, spend: 290 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "18-24", ctr: 3.2, conversions: 12, avgWatchTime: 0, spend: 310 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "35-44", ctr: 4.8, conversions: 28, avgWatchTime: 0, spend: 340 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "45-54", ctr: 5.5, conversions: 35, avgWatchTime: 0, spend: 360 },
  { adId: "ad_003", name: "טקסט + תמונה", type: "image", age: "35-44", ctr: 4.2, conversions: 22, avgWatchTime: 0, spend: 280 },
  { adId: "ad_003", name: "טקסט + תמונה", type: "image", age: "45-54", ctr: 5.8, conversions: 42, avgWatchTime: 0, spend: 320 },
];

const mockSaturationData = [
  { adSetId: "as_001", name: "Lookalike Israel 1%", reach: 42500, potentialReach: 50000, frequency: 4.2, ctrTrend: -15, saturationLevel: 85, spend: 2400 },
  { adSetId: "as_002", name: "Interest - Real Estate", reach: 28000, potentialReach: 120000, frequency: 2.1, ctrTrend: 5, saturationLevel: 23, spend: 1800 },
  { adSetId: "as_003", name: "Retargeting 30 Days", reach: 8500, potentialReach: 9200, frequency: 6.8, ctrTrend: -28, saturationLevel: 92, spend: 950 },
  { adSetId: "as_004", name: "Broad - Tel Aviv", reach: 125000, potentialReach: 450000, frequency: 1.8, ctrTrend: 8, saturationLevel: 28, spend: 3200 },
];

const mockExpansionOpportunities = [
  { type: "lookalike", source: "רוכשים (Purchase)", currentPerformance: "CPA ₪15", suggestion: "צור Lookalike 1% על בסיס רוכשים", targetAge: "25-44", confidence: 92, potentialReach: 180000 },
  { type: "interest", source: "נדל\"ן", currentPerformance: "ROAS 4.2x", suggestion: "הרחב לתחומי עניין דומים: השקעות, פיננסים", targetAge: "30-50", confidence: 78, potentialReach: 250000 },
  { type: "geo", source: "תל אביב", currentPerformance: "CPA ₪12", suggestion: "הרחב לגוש דן: רמת גן, גבעתיים, הרצליה", targetAge: "25-34", confidence: 85, potentialReach: 320000 },
];

interface MicroSegment {
  id: number;
  segment: string;
  age: string;
  gender: string;
  region: string;
  cpa: number;
  roas: number;
  avgCpa: number;
  improvement: number;
  conversions: number;
  spend: number;
  impressions: number;
  ctr: number;
  action: "scale" | "exclude" | "monitor";
}

const AudienceAnalysis = () => {
  const isMobile = useIsMobile();
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [activeStrategy, setActiveStrategy] = useState("micro");

  // Calculate micro-segments
  const avgCpa = mockAudienceBreakdowns.reduce((sum, b) => sum + b.cpa, 0) / mockAudienceBreakdowns.length;
  
  const microSegments: MicroSegment[] = mockAudienceBreakdowns.map((b, idx) => {
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
  const excludeSegments = microSegments.filter(s => s.action === "exclude");
  const excludePlatforms = mockPlatformBreakdowns.filter(p => p.conversions === 0 || p.cpa > 45);
  const saturatedAudiences = mockSaturationData.filter(s => s.saturationLevel > 70);

  const strategies = [
    { 
      id: "micro", 
      label: "מיקרו-סגמנטציה", 
      shortLabel: "סגמנטציה",
      icon: Crosshair, 
      color: "emerald",
      bgClass: "bg-emerald-500/10 border-emerald-500/30",
      textClass: "text-emerald-400",
      count: scaleSegments.length,
      description: "זיהוי תת-קהלים עם ביצועים מעולים"
    },
    { 
      id: "exclusions", 
      label: "החרגות כירורגיות", 
      shortLabel: "החרגות",
      icon: Scissors, 
      color: "red",
      bgClass: "bg-red-500/10 border-red-500/30",
      textClass: "text-red-400",
      count: excludePlatforms.length,
      description: "מניעת בזבוז תקציב"
    },
    { 
      id: "creative", 
      label: "התאמת קריאייטיב", 
      shortLabel: "קריאייטיב",
      icon: Palette, 
      color: "purple",
      bgClass: "bg-purple-500/10 border-purple-500/30",
      textClass: "text-purple-400",
      count: 3,
      description: "איזה מסר עובד לאיזה קהל"
    },
    { 
      id: "saturation", 
      label: "שחיקת קהל", 
      shortLabel: "שחיקה",
      icon: RefreshCw, 
      color: "amber",
      bgClass: "bg-amber-500/10 border-amber-500/30",
      textClass: "text-amber-400",
      count: saturatedAudiences.length,
      description: "זיהוי קהלים שנשחקו"
    },
    { 
      id: "expansion", 
      label: "הרחבת קהלים", 
      shortLabel: "הרחבה",
      icon: Expand, 
      color: "blue",
      bgClass: "bg-blue-500/10 border-blue-500/30",
      textClass: "text-blue-400",
      count: mockExpansionOpportunities.length,
      description: "הזדמנויות צמיחה חדשות"
    },
  ];

  const activeStrategyData = strategies.find(s => s.id === activeStrategy);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scale": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "exclude": return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <AlertCircle className="w-5 h-5 text-amber-400" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes("iOS")) return <Smartphone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">ניתוח קהלים מתקדם</h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    5 אסטרטגיות "Super-Human" לאופטימיזציה אוטומטית
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger className="w-full sm:w-[220px]">
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
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">סגמנטים להרחבה</p>
                  <p className="text-2xl font-bold text-emerald-400">{scaleSegments.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-emerald-400/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">החרגות מומלצות</p>
                  <p className="text-2xl font-bold text-red-400">{excludePlatforms.length}</p>
                </div>
                <Ban className="w-8 h-8 text-red-400/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">קהלים בשחיקה</p>
                  <p className="text-2xl font-bold text-amber-400">{saturatedAudiences.length}</p>
                </div>
                <RefreshCw className="w-8 h-8 text-amber-400/30" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">חיסכון פוטנציאלי</p>
                  <p className="text-2xl font-bold text-blue-400">₪{(excludePlatforms.reduce((sum, e) => sum + e.spend, 0) * 4).toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-400/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Selector Cards */}
        <div className={`grid gap-3 mb-6 ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
          {strategies.map((strategy) => (
            <Card 
              key={strategy.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                activeStrategy === strategy.id 
                  ? `${strategy.bgClass} ring-2 ring-offset-2 ring-offset-background ring-${strategy.color}-500/50` 
                  : "hover:border-muted-foreground/30"
              }`}
              onClick={() => setActiveStrategy(strategy.id)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${activeStrategy === strategy.id ? strategy.bgClass : "bg-muted"}`}>
                      <strategy.icon className={`w-5 h-5 ${activeStrategy === strategy.id ? strategy.textClass : "text-muted-foreground"}`} />
                    </div>
                    <Badge variant={activeStrategy === strategy.id ? "default" : "secondary"} className="text-xs">
                      {strategy.count}
                    </Badge>
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${activeStrategy === strategy.id ? strategy.textClass : ""}`}>
                      {isMobile ? strategy.shortLabel : strategy.label}
                    </p>
                    {!isMobile && (
                      <p className="text-xs text-muted-foreground mt-0.5">{strategy.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Area */}
        <Tabs value={activeStrategy} onValueChange={setActiveStrategy} className="space-y-4">
          <TabsList className="hidden">
            {strategies.map((s) => (
              <TabsTrigger key={s.id} value={s.id}>{s.label}</TabsTrigger>
            ))}
          </TabsList>

          {/* Micro-Segmentation Tab */}
          <TabsContent value="micro" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Crosshair className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">מיקרו-סגמנטציה - גישת ה"צלף"</CardTitle>
                      <CardDescription>זיהוי תת-קהלים עם CPA נמוך ב-30%+ מהממוצע</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                    ממוצע CPA: ₪{avgCpa.toFixed(0)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {microSegments.map((segment) => (
                  <Card 
                    key={segment.id}
                    className={`overflow-hidden ${
                      segment.action === "scale" ? "border-emerald-500/30 bg-emerald-500/5" :
                      segment.action === "exclude" ? "border-red-500/30 bg-red-500/5" :
                      "border-border"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        {/* Top Row - Segment Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(segment.action)}
                            <div>
                              <p className="font-semibold">{segment.segment}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Users className="w-3 h-3" />
                                <span>{segment.impressions.toLocaleString()} חשיפות</span>
                                <span>•</span>
                                <span>{segment.conversions} המרות</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={
                            segment.action === "scale" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                            segment.action === "exclude" ? "bg-red-500/20 text-red-400 border-red-500/30" :
                            ""
                          }>
                            {segment.action === "scale" ? "להרחבה" : segment.action === "exclude" ? "להחרגה" : "למעקב"}
                          </Badge>
                        </div>

                        {/* Metrics Row */}
                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">CPA</p>
                            <p className="font-bold text-lg">₪{segment.cpa.toFixed(0)}</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">ROAS</p>
                            <p className="font-bold text-lg">{segment.roas}x</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">CTR</p>
                            <p className="font-bold text-lg">{segment.ctr}%</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">vs ממוצע</p>
                            <p className={`font-bold text-lg flex items-center justify-center ${segment.improvement > 0 ? "text-emerald-400" : "text-red-400"}`}>
                              {segment.improvement > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                              {Math.abs(segment.improvement).toFixed(0)}%
                            </p>
                          </div>
                        </div>

                        {/* Recommendation */}
                        {segment.action !== "monitor" && (
                          <div className={`p-3 rounded-lg flex items-start gap-3 ${
                            segment.action === "scale" ? "bg-emerald-500/10" : "bg-red-500/10"
                          }`}>
                            <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              segment.action === "scale" ? "text-emerald-400" : "text-red-400"
                            }`} />
                            <div className="text-sm">
                              <strong className={segment.action === "scale" ? "text-emerald-400" : "text-red-400"}>
                                {segment.action === "scale" ? "המלצה להרחבה:" : "המלצה להחרגה:"}
                              </strong>
                              <span className="text-muted-foreground mr-1">
                                {segment.action === "scale" 
                                  ? ` בצע פיצול (Split) והקם Ad Set ייעודי ל${segment.segment} עם תקציב משלו`
                                  : ` שקול להחריג סגמנט זה או להקטין את החשיפה אליו - הוצאה של ₪${segment.spend} עם ביצועים נמוכים`
                                }
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Surgical Exclusions Tab */}
          <TabsContent value="exclusions" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                      <Scissors className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">החרגה כירורגית</CardTitle>
                      <CardDescription>מניעת בזבוז כסף במיקומים ופלטפורמות ללא תוצאות</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-red-400 border-red-500/30">
                    בזבוז: ₪{excludePlatforms.reduce((s, p) => s + p.spend, 0).toLocaleString()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPlatformBreakdowns.map((platform, idx) => {
                  const isWaste = platform.conversions === 0 || platform.cpa > 45;
                  const isWarning = platform.cpa > 30 && platform.cpa <= 45;
                  
                  return (
                    <Card 
                      key={idx}
                      className={`overflow-hidden ${
                        isWaste ? "border-red-500/30 bg-red-500/5" :
                        isWarning ? "border-amber-500/30 bg-amber-500/5" :
                        "border-emerald-500/30 bg-emerald-500/5"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          {/* Platform Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isWaste ? <XCircle className="w-5 h-5 text-red-400" /> : 
                               isWarning ? <AlertCircle className="w-5 h-5 text-amber-400" /> :
                               <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                              <div>
                                <p className="font-semibold capitalize">{platform.platform} - {platform.position}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  {getPlatformIcon(platform.device)}
                                  <span>{platform.device}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={
                              isWaste ? "bg-red-500/20 text-red-400 border-red-500/30" :
                              isWarning ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                              "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            }>
                              {isWaste ? "להחרגה" : isWarning ? "לבדיקה" : "תקין"}
                            </Badge>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">הוצאה</p>
                              <p className="font-bold text-lg">₪{platform.spend}</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">המרות</p>
                              <p className={`font-bold text-lg ${platform.conversions === 0 ? "text-red-400" : ""}`}>
                                {platform.conversions}
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">CTR</p>
                              <p className={`font-bold text-lg ${platform.ctr < 1 ? "text-red-400" : ""}`}>
                                {platform.ctr}%
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">CPA</p>
                              <p className={`font-bold text-lg ${platform.conversions === 0 ? "text-red-400" : platform.cpa > 40 ? "text-amber-400" : "text-emerald-400"}`}>
                                {platform.conversions === 0 ? "∞" : `₪${platform.cpa.toFixed(0)}`}
                              </p>
                            </div>
                          </div>

                          {/* Warning/Action */}
                          {isWaste && (
                            <div className="p-3 rounded-lg bg-red-500/10 flex items-center justify-between gap-3">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">
                                  <strong className="text-red-400">בזבוז תקציב: </strong>
                                  <span className="text-muted-foreground">
                                    {platform.conversions === 0 
                                      ? `₪${platform.spend} הוצאו ללא אף המרה - CTR של ${platform.ctr}% בלבד`
                                      : `CPA של ₪${platform.cpa.toFixed(0)} - גבוה מ-2x מהממוצע`
                                    }
                                  </span>
                                </p>
                              </div>
                              <Button size="sm" variant="destructive" className="flex-shrink-0">
                                <Ban className="w-4 h-4 mr-1" />
                                החרג
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creative-Audience Fit Tab */}
          <TabsContent value="creative" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <Palette className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">התאמת קריאייטיב לדמוגרפיה</CardTitle>
                      <CardDescription>איזה מסר עובד לאיזה קהל - ניתוח ביצועי מודעות</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {["ad_001", "ad_002", "ad_003"].map((adId) => {
                  const adData = mockCreativePerformance.filter(c => c.adId === adId);
                  const adName = adData[0]?.name;
                  const adType = adData[0]?.type;
                  const bestAge = adData.reduce((best, curr) => curr.ctr > best.ctr ? curr : best, adData[0]);
                  const worstAge = adData.reduce((worst, curr) => curr.ctr < worst.ctr ? curr : worst, adData[0]);
                  
                  return (
                    <Card key={adId} className="border-purple-500/20">
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          {/* Ad Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-purple-500/10">
                                {adType === "video" ? <Play className="w-4 h-4 text-purple-400" /> : 
                                 <Eye className="w-4 h-4 text-purple-400" />}
                              </div>
                              <div>
                                <p className="font-semibold">{adName}</p>
                                <Badge variant="outline" className="text-xs mt-1">{adType}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">קהל מנצח</p>
                              <p className="font-semibold text-emerald-400">גיל {bestAge.age}</p>
                            </div>
                          </div>

                          {/* Age Performance Breakdown */}
                          <div className="space-y-2">
                            {adData.map((perf, idx) => {
                              const isBest = perf.age === bestAge.age;
                              const isWorst = perf.age === worstAge.age;
                              
                              return (
                                <div 
                                  key={idx} 
                                  className={`p-3 rounded-lg flex items-center justify-between ${
                                    isBest ? "bg-emerald-500/10 border border-emerald-500/20" :
                                    isWorst ? "bg-red-500/10 border border-red-500/20" :
                                    "bg-muted/50"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    {isBest ? <TrendingUp className="w-4 h-4 text-emerald-400" /> :
                                     isWorst ? <TrendingDown className="w-4 h-4 text-red-400" /> :
                                     <BarChart3 className="w-4 h-4 text-muted-foreground" />}
                                    <span className="font-medium">גיל {perf.age}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">CTR: </span>
                                      <strong className={isBest ? "text-emerald-400" : isWorst ? "text-red-400" : ""}>
                                        {perf.ctr}%
                                      </strong>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">המרות: </span>
                                      <strong>{perf.conversions}</strong>
                                    </div>
                                    {adType === "video" && (
                                      <div>
                                        <span className="text-muted-foreground">צפייה: </span>
                                        <strong>{perf.avgWatchTime}s</strong>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Summary Recommendation */}
                <Card className="border-purple-500/30 bg-purple-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-purple-400 mb-1">המלצה להתאמה אישית</p>
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

          {/* Audience Saturation Tab */}
          <TabsContent value="saturation" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <RefreshCw className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">זיהוי שחיקת קהל</CardTitle>
                      <CardDescription>מתי הקהל "מת"? ניתוח תדירות, reach ומגמות</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockSaturationData.map((data) => {
                  const isCritical = data.saturationLevel >= 80;
                  const isWarning = data.saturationLevel >= 50 && data.saturationLevel < 80;
                  
                  return (
                    <Card 
                      key={data.adSetId}
                      className={`overflow-hidden ${
                        isCritical ? "border-red-500/30 bg-red-500/5" :
                        isWarning ? "border-amber-500/30 bg-amber-500/5" :
                        "border-emerald-500/30 bg-emerald-500/5"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col gap-4">
                          {/* Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isCritical ? <AlertTriangle className="w-5 h-5 text-red-400" /> :
                               isWarning ? <AlertCircle className="w-5 h-5 text-amber-400" /> :
                               <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                              <div>
                                <p className="font-semibold">{data.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Reach: {data.reach.toLocaleString()} / {data.potentialReach.toLocaleString()} ({data.saturationLevel}%)
                                </p>
                              </div>
                            </div>
                            <Badge className={
                              isCritical ? "bg-red-500/20 text-red-400 border-red-500/30" :
                              isWarning ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                              "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            }>
                              {isCritical ? "קריטי" : isWarning ? "אזהרה" : "תקין"}
                            </Badge>
                          </div>

                          {/* Metrics */}
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">מיצוי קהל</p>
                              <p className={`font-bold text-lg ${isCritical ? "text-red-400" : isWarning ? "text-amber-400" : "text-emerald-400"}`}>
                                {data.saturationLevel}%
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">תדירות</p>
                              <p className={`font-bold text-lg ${data.frequency > 4 ? "text-red-400" : data.frequency > 3 ? "text-amber-400" : "text-emerald-400"}`}>
                                {data.frequency}x
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">מגמת CTR</p>
                              <p className={`font-bold text-lg flex items-center justify-center ${data.ctrTrend < 0 ? "text-red-400" : "text-emerald-400"}`}>
                                {data.ctrTrend < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                                {Math.abs(data.ctrTrend)}%
                              </p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                              <p className="text-xs text-muted-foreground">הוצאה</p>
                              <p className="font-bold text-lg">₪{data.spend.toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">מיצוי קהל</span>
                              <span className={isCritical ? "text-red-400" : isWarning ? "text-amber-400" : "text-emerald-400"}>
                                {data.saturationLevel}%
                              </span>
                            </div>
                            <Progress 
                              value={data.saturationLevel} 
                              className={`h-2 ${isCritical ? "[&>div]:bg-red-400" : isWarning ? "[&>div]:bg-amber-400" : "[&>div]:bg-emerald-400"}`}
                            />
                          </div>

                          {/* Critical Warning */}
                          {isCritical && (
                            <div className="p-3 rounded-lg bg-red-500/10 flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <div className="text-sm">
                                <strong className="text-red-400">שחיקת קהל קריטית: </strong>
                                <span className="text-muted-foreground">
                                  הגעת ל-{data.saturationLevel}% מהקהל הפוטנציאלי והתדירות גבוהה ({data.frequency}x).
                                  <strong className="text-foreground"> המלצה: רענן קריאייטיב דחוף או הרחב את הקהל (Lookalike 1%).</strong>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expansion Opportunities Tab */}
          <TabsContent value="expansion" className="space-y-4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <Expand className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">הרחבה מבוססת הקשרים</CardTitle>
                      <CardDescription>בניית קהלים חדשים על בסיס סמני הצלחה</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockExpansionOpportunities.map((opp, idx) => (
                  <Card key={idx} className="border-blue-500/20 bg-blue-500/5">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              {opp.type === "lookalike" ? <Users className="w-4 h-4 text-blue-400" /> :
                               opp.type === "interest" ? <Target className="w-4 h-4 text-blue-400" /> :
                               <MapPin className="w-4 h-4 text-blue-400" />}
                            </div>
                            <div>
                              <p className="font-semibold">{opp.source}</p>
                              <Badge variant="outline" className="text-xs mt-1 text-blue-400 border-blue-500/30">
                                {opp.type === "lookalike" ? "Lookalike" : opp.type === "interest" ? "Interest" : "Geo Expansion"}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">ביטחון</p>
                            <p className="font-bold text-blue-400">{opp.confidence}%</p>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">ביצועים נוכחיים</p>
                            <p className="font-bold text-emerald-400">{opp.currentPerformance}</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">גילאי יעד</p>
                            <p className="font-bold">{opp.targetAge}</p>
                          </div>
                          <div className="text-center p-2 rounded-lg bg-muted/50">
                            <p className="text-xs text-muted-foreground">Reach פוטנציאלי</p>
                            <p className="font-bold">{opp.potentialReach.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Recommendation */}
                        <div className="p-3 rounded-lg bg-blue-500/10 flex items-center justify-between gap-3">
                          <div className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">
                              <strong className="text-blue-400">המלצה: </strong>
                              <span className="text-muted-foreground">{opp.suggestion}</span>
                            </p>
                          </div>
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 flex-shrink-0">
                            <Plus className="w-4 h-4 mr-1" />
                            צור קהל
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AudienceAnalysis;
