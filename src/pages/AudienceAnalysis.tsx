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
  ChevronRight, ArrowUpRight, ArrowDownRight, Ban, Plus
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for audience breakdowns
const mockAudienceBreakdowns = [
  { id: 1, adSetId: "as_001", age: "18-24", gender: "female", region: "תל אביב", impressions: 45000, clicks: 2250, spend: 850, conversions: 45, ctr: 5.0, cpa: 18.9 },
  { id: 2, adSetId: "as_001", age: "25-34", gender: "female", region: "תל אביב", impressions: 62000, clicks: 3720, spend: 1200, conversions: 96, ctr: 6.0, cpa: 12.5 },
  { id: 3, adSetId: "as_001", age: "25-34", gender: "male", region: "תל אביב", impressions: 55000, clicks: 2750, spend: 1100, conversions: 55, ctr: 5.0, cpa: 20.0 },
  { id: 4, adSetId: "as_001", age: "35-44", gender: "female", region: "חיפה", impressions: 38000, clicks: 1520, spend: 760, conversions: 38, ctr: 4.0, cpa: 20.0 },
  { id: 5, adSetId: "as_001", age: "35-44", gender: "male", region: "ירושלים", impressions: 42000, clicks: 1260, spend: 900, conversions: 18, ctr: 3.0, cpa: 50.0 },
  { id: 6, adSetId: "as_001", age: "45-54", gender: "female", region: "תל אביב", impressions: 28000, clicks: 840, spend: 560, conversions: 14, ctr: 3.0, cpa: 40.0 },
  { id: 7, adSetId: "as_001", age: "18-24", gender: "male", region: "באר שבע", impressions: 22000, clicks: 440, spend: 440, conversions: 4, ctr: 2.0, cpa: 110.0 },
];

const mockPlatformBreakdowns = [
  { platform: "facebook", position: "feed", device: "mobile_ios", spend: 2500, conversions: 125, ctr: 4.5, cpa: 20.0 },
  { platform: "facebook", position: "feed", device: "mobile_android", spend: 1800, conversions: 45, ctr: 2.8, cpa: 40.0 },
  { platform: "facebook", position: "stories", device: "mobile_ios", spend: 800, conversions: 32, ctr: 3.2, cpa: 25.0 },
  { platform: "instagram", position: "feed", device: "mobile_ios", spend: 1200, conversions: 72, ctr: 5.2, cpa: 16.7 },
  { platform: "instagram", position: "reels", device: "mobile_ios", spend: 950, conversions: 57, ctr: 6.1, cpa: 16.7 },
  { platform: "audience_network", position: "classic", device: "mobile_android", spend: 650, conversions: 0, ctr: 0.3, cpa: Infinity },
  { platform: "messenger", position: "inbox", device: "mobile_ios", spend: 300, conversions: 6, ctr: 1.2, cpa: 50.0 },
];

const mockCreativePerformance = [
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "18-24", ctr: 7.2, conversions: 45, avgWatchTime: 8.5 },
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "25-34", ctr: 5.8, conversions: 38, avgWatchTime: 6.2 },
  { adId: "ad_001", name: "וידאו Reels - מהיר", type: "video", age: "45-54", ctr: 2.1, conversions: 8, avgWatchTime: 3.1 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "18-24", ctr: 3.2, conversions: 12, avgWatchTime: 0 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "35-44", ctr: 4.8, conversions: 28, avgWatchTime: 0 },
  { adId: "ad_002", name: "קרוסלה - מוצרים", type: "carousel", age: "45-54", ctr: 5.5, conversions: 35, avgWatchTime: 0 },
  { adId: "ad_003", name: "טקסט + תמונה", type: "image", age: "35-44", ctr: 4.2, conversions: 22, avgWatchTime: 0 },
  { adId: "ad_003", name: "טקסט + תמונה", type: "image", age: "45-54", ctr: 5.8, conversions: 42, avgWatchTime: 0 },
];

const mockSaturationData = [
  { adSetId: "as_001", name: "Lookalike Israel 1%", reach: 42500, potentialReach: 50000, frequency: 4.2, ctrTrend: -15, saturationLevel: 85 },
  { adSetId: "as_002", name: "Interest - Real Estate", reach: 28000, potentialReach: 120000, frequency: 2.1, ctrTrend: 5, saturationLevel: 23 },
  { adSetId: "as_003", name: "Retargeting 30 Days", reach: 8500, potentialReach: 9200, frequency: 6.8, ctrTrend: -28, saturationLevel: 92 },
  { adSetId: "as_004", name: "Broad - Tel Aviv", reach: 125000, potentialReach: 450000, frequency: 1.8, ctrTrend: 8, saturationLevel: 28 },
];

const mockExpansionOpportunities = [
  { type: "lookalike", source: "רוכשים (Purchase)", currentPerformance: "CPA ₪15", suggestion: "צור Lookalike 1% על בסיס רוכשים", targetAge: "25-44", confidence: 92 },
  { type: "interest", source: "נדל\"ן", currentPerformance: "ROAS 4.2x", suggestion: "הרחב לתחומי עניין דומים: השקעות, פיננסים", targetAge: "30-50", confidence: 78 },
  { type: "geo", source: "תל אביב", currentPerformance: "CPA ₪12", suggestion: "הרחב לגוש דן: רמת גן, גבעתיים, הרצליה", targetAge: "25-34", confidence: 85 },
];

// Strategy types
interface MicroSegment {
  id: number;
  segment: string;
  cpa: number;
  avgCpa: number;
  improvement: number;
  conversions: number;
  spend: number;
  action: "scale" | "exclude" | "monitor";
}

interface ExclusionRecommendation {
  id: number;
  target: string;
  type: "platform" | "device" | "position";
  spend: number;
  conversions: number;
  reason: string;
  savings: string;
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
      cpa: b.cpa,
      avgCpa: avgCpa,
      improvement: improvement,
      conversions: b.conversions,
      spend: b.spend,
      action
    };
  }).sort((a, b) => b.improvement - a.improvement);

  // Calculate exclusion recommendations
  const exclusionRecommendations: ExclusionRecommendation[] = mockPlatformBreakdowns
    .filter(p => p.conversions === 0 || p.cpa > 45)
    .map((p, idx) => ({
      id: idx,
      target: `${p.platform} - ${p.position}`,
      type: "platform" as const,
      spend: p.spend,
      conversions: p.conversions,
      reason: p.conversions === 0 ? "אפס המרות" : `CPA גבוה: ₪${p.cpa.toFixed(0)}`,
      savings: `₪${p.spend.toFixed(0)}/שבוע`
    }));

  const getActionBadge = (action: string) => {
    switch (action) {
      case "scale":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><TrendingUp className="w-3 h-3 mr-1" />Scale</Badge>;
      case "exclude":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><Ban className="w-3 h-3 mr-1" />Exclude</Badge>;
      default:
        return <Badge variant="outline"><Target className="w-3 h-3 mr-1" />Monitor</Badge>;
    }
  };

  const getSaturationColor = (level: number) => {
    if (level >= 80) return "text-red-400";
    if (level >= 50) return "text-yellow-400";
    return "text-green-400";
  };

  const strategies = [
    { id: "micro", label: "מיקרו-סגמנטציה", icon: Crosshair, count: microSegments.filter(s => s.action === "scale").length },
    { id: "exclusions", label: "החרגות", icon: Scissors, count: exclusionRecommendations.length },
    { id: "creative", label: "התאמת קריאייטיב", icon: Palette, count: 3 },
    { id: "saturation", label: "שחיקת קהל", icon: RefreshCw, count: mockSaturationData.filter(s => s.saturationLevel > 70).length },
    { id: "expansion", label: "הרחבת קהלים", icon: Expand, count: mockExpansionOpportunities.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Zap className="w-7 h-7 text-primary" />
                ניתוח קהלים מתקדם
              </h1>
              <p className="text-muted-foreground mt-1">
                אסטרטגיות "Super-Human" לאופטימיזציה אוטומטית
              </p>
            </div>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-full md:w-[250px]">
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

        {/* Strategy Stats */}
        <div className={`grid gap-3 mb-6 ${isMobile ? "grid-cols-2" : "grid-cols-5"}`}>
          {strategies.map((strategy) => (
            <Card 
              key={strategy.id}
              className={`cursor-pointer transition-all hover:border-primary/50 ${activeStrategy === strategy.id ? "border-primary bg-primary/5" : ""}`}
              onClick={() => setActiveStrategy(strategy.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activeStrategy === strategy.id ? "bg-primary/20" : "bg-muted"}`}>
                    <strategy.icon className={`w-5 h-5 ${activeStrategy === strategy.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{strategy.label}</p>
                    <p className="text-xl font-bold">{strategy.count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeStrategy} onValueChange={setActiveStrategy}>
          <TabsList className={`mb-4 ${isMobile ? "w-full flex-wrap h-auto" : ""}`}>
            {strategies.map((s) => (
              <TabsTrigger key={s.id} value={s.id} className={isMobile ? "flex-1 text-xs" : ""}>
                <s.icon className="w-4 h-4 mr-1" />
                {!isMobile && s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Micro-Segmentation */}
          <TabsContent value="micro">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-primary" />
                  מיקרו-סגמנטציה - גישת ה"צלף"
                </CardTitle>
                <CardDescription>
                  זיהוי תת-קהלים שהם "יהלומים" בתוך הקהל הרחב - סגמנטים עם CPA נמוך משמעותית מהממוצע
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {microSegments.map((segment) => (
                    <div 
                      key={segment.id}
                      className={`p-4 rounded-lg border ${
                        segment.action === "scale" ? "border-green-500/30 bg-green-500/5" :
                        segment.action === "exclude" ? "border-red-500/30 bg-red-500/5" :
                        "border-border"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{segment.segment}</p>
                            <p className="text-sm text-muted-foreground">
                              {segment.conversions} המרות | הוצאה: ₪{segment.spend}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">CPA</p>
                            <p className="font-bold">₪{segment.cpa.toFixed(1)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">vs ממוצע</p>
                            <p className={`font-bold flex items-center ${segment.improvement > 0 ? "text-green-400" : "text-red-400"}`}>
                              {segment.improvement > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                              {Math.abs(segment.improvement).toFixed(0)}%
                            </p>
                          </div>
                          {getActionBadge(segment.action)}
                        </div>
                      </div>
                      {segment.action === "scale" && (
                        <div className="mt-3 p-3 bg-green-500/10 rounded-lg">
                          <p className="text-sm text-green-400 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            <strong>המלצה:</strong> בצע פיצול (Split) והקם Ad Set ייעודי עבור סגמנט זה עם תקציב משלו
                          </p>
                        </div>
                      )}
                      {segment.action === "exclude" && (
                        <div className="mt-3 p-3 bg-red-500/10 rounded-lg">
                          <p className="text-sm text-red-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            <strong>המלצה:</strong> שקול להחריג סגמנט זה או להקטין את החשיפה אליו
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Surgical Exclusions */}
          <TabsContent value="exclusions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-red-400" />
                  החרגה כירורגית
                </CardTitle>
                <CardDescription>
                  מניעת בזבוז כסף במיקומים ופלטפורמות שלא מביאים תוצאות
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Platform Analysis */}
                  <div className="grid gap-3">
                    {mockPlatformBreakdowns.map((platform, idx) => (
                      <div 
                        key={idx}
                        className={`p-4 rounded-lg border ${
                          platform.conversions === 0 ? "border-red-500/50 bg-red-500/10" :
                          platform.cpa > 40 ? "border-yellow-500/30 bg-yellow-500/5" :
                          "border-green-500/30 bg-green-500/5"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <p className="font-medium capitalize">{platform.platform} - {platform.position}</p>
                            <p className="text-sm text-muted-foreground">{platform.device}</p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">הוצאה</p>
                              <p className="font-bold">₪{platform.spend}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">המרות</p>
                              <p className="font-bold">{platform.conversions}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">CTR</p>
                              <p className="font-bold">{platform.ctr}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground">CPA</p>
                              <p className={`font-bold ${platform.conversions === 0 ? "text-red-400" : platform.cpa > 40 ? "text-yellow-400" : "text-green-400"}`}>
                                {platform.conversions === 0 ? "∞" : `₪${platform.cpa.toFixed(0)}`}
                              </p>
                            </div>
                          </div>
                        </div>
                        {(platform.conversions === 0 || platform.cpa > 45) && (
                          <div className="mt-3 p-3 bg-red-500/10 rounded-lg flex items-center justify-between">
                            <p className="text-sm text-red-400 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" />
                              <strong>בזבוז תקציב:</strong> {platform.conversions === 0 ? "אפס המרות" : "CPA גבוה מאוד"}
                            </p>
                            <Button size="sm" variant="destructive">
                              <Ban className="w-4 h-4 mr-1" />
                              החרג
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creative-Audience Fit */}
          <TabsContent value="creative">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  התאמת קריאייטיב לדמוגרפיה
                </CardTitle>
                <CardDescription>
                  איזה מסר עובד לאיזה קהל - ניתוח ביצועי מודעות לפי גילאים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Group by Ad */}
                  {["ad_001", "ad_002", "ad_003"].map((adId) => {
                    const adData = mockCreativePerformance.filter(c => c.adId === adId);
                    const adName = adData[0]?.name;
                    const adType = adData[0]?.type;
                    
                    return (
                      <div key={adId} className="p-4 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="outline">{adType}</Badge>
                          <h4 className="font-medium">{adName}</h4>
                        </div>
                        <div className="grid gap-2">
                          {adData.map((perf, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm">גיל {perf.age}</span>
                              <div className="flex items-center gap-4">
                                <span className="text-sm">CTR: <strong className={perf.ctr > 5 ? "text-green-400" : perf.ctr < 3 ? "text-red-400" : ""}>{perf.ctr}%</strong></span>
                                <span className="text-sm">המרות: <strong>{perf.conversions}</strong></span>
                                {adType === "video" && (
                                  <span className="text-sm">צפייה: <strong>{perf.avgWatchTime}s</strong></span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Recommendation */}
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-sm flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-400 mt-0.5" />
                      <span>
                        <strong className="text-purple-400">המלצה להתאמה אישית:</strong> סרטון ה-Reels עובד מצוין לצעירים (18-24, CTR 7.2%), אך נכשל אצל מבוגרים.
                        הקרוסלה עובדת הפוך. <strong>פצל ל-2 Ad Sets לפי גיל והצג לכל אחד רק את הקריאייטיב המנצח.</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience Saturation */}
          <TabsContent value="saturation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-yellow-400" />
                  זיהוי שחיקת קהל
                </CardTitle>
                <CardDescription>
                  מתי הקהל "מת"? ניתוח תדירות, reach ומגמות ביצועים
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSaturationData.map((data) => (
                    <div 
                      key={data.adSetId}
                      className={`p-4 rounded-lg border ${
                        data.saturationLevel >= 80 ? "border-red-500/50 bg-red-500/5" :
                        data.saturationLevel >= 50 ? "border-yellow-500/30 bg-yellow-500/5" :
                        "border-green-500/30 bg-green-500/5"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Reach: {data.reach.toLocaleString()} / {data.potentialReach.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">תדירות</p>
                            <p className={`font-bold ${data.frequency > 4 ? "text-red-400" : data.frequency > 3 ? "text-yellow-400" : "text-green-400"}`}>
                              {data.frequency}x
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">מגמת CTR</p>
                            <p className={`font-bold flex items-center ${data.ctrTrend < 0 ? "text-red-400" : "text-green-400"}`}>
                              {data.ctrTrend < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                              {Math.abs(data.ctrTrend)}%
                            </p>
                          </div>
                          <div className="w-32">
                            <p className="text-xs text-muted-foreground mb-1">מיצוי קהל</p>
                            <Progress value={data.saturationLevel} className="h-2" />
                            <p className={`text-xs mt-1 ${getSaturationColor(data.saturationLevel)}`}>
                              {data.saturationLevel}%
                            </p>
                          </div>
                        </div>
                      </div>
                      {data.saturationLevel >= 80 && (
                        <div className="mt-3 p-3 bg-red-500/10 rounded-lg">
                          <p className="text-sm text-red-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            <strong>שחיקת קהל:</strong> הגעת ל-{data.saturationLevel}% מהקהל הפוטנציאלי והתדירות גבוהה ({data.frequency}x).
                            <strong>המלצה: רענן קריאייטיב דחוף או הרחב את הקהל.</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Expansion Opportunities */}
          <TabsContent value="expansion">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Expand className="w-5 h-5 text-blue-400" />
                  הרחבה מבוססת הקשרים
                </CardTitle>
                <CardDescription>
                  בניית קהלים חדשים על בסיס סמני הצלחה - Lookalike & Interest Expansion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockExpansionOpportunities.map((opp, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                              {opp.type === "lookalike" ? "Lookalike" : opp.type === "interest" ? "Interest" : "Geo"}
                            </Badge>
                            <span className="font-medium">{opp.source}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ביצועים נוכחיים: <strong className="text-green-400">{opp.currentPerformance}</strong>
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">גילאי יעד</p>
                            <p className="font-bold">{opp.targetAge}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">ביטחון</p>
                            <p className="font-bold text-blue-400">{opp.confidence}%</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-blue-500/10 rounded-lg flex items-center justify-between">
                        <p className="text-sm text-blue-400 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <strong>המלצה:</strong> {opp.suggestion}
                        </p>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <Plus className="w-4 h-4 mr-1" />
                          צור קהל
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Summary Stats */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-400">{microSegments.filter(s => s.action === "scale").length}</p>
                <p className="text-sm text-muted-foreground">סגמנטים להרחבה</p>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <Ban className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-400">{exclusionRecommendations.length}</p>
                <p className="text-sm text-muted-foreground">החרגות מומלצות</p>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                <RefreshCw className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-400">{mockSaturationData.filter(s => s.saturationLevel > 70).length}</p>
                <p className="text-sm text-muted-foreground">קהלים בשחיקה</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <Expand className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-400">₪{(exclusionRecommendations.reduce((sum, e) => sum + e.spend, 0) * 4).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">חיסכון פוטנציאלי/חודש</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AudienceAnalysis;
