import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Target, 
  Zap, 
  TrendingUp, 
  Shield, 
  Brain, 
  Gauge,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LineChart,
  Users,
  Clock
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background" />
        <div className="container mx-auto px-4 py-12 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="mx-auto" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Campaign Intelligence
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Ad Performance with{" "}
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Driven Insights
              </span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AD-ViSOR analyzes your campaigns in real-time, identifies optimization opportunities, 
              and provides actionable recommendations to maximize your ROAS.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <Target className="w-5 h-5" />
                  Start Analyzing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/insights">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
            <div className="flex gap-8 justify-center pt-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Real-time monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>AI recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <Badge className="mb-4" variant="secondary">Features</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Everything you need to optimize campaigns</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools and insights to help you make data-driven decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI-Powered Analysis</CardTitle>
                <CardDescription>
                  Machine learning algorithms analyze your campaigns 24/7 to identify patterns and opportunities
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-4">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Real-Time Monitoring</CardTitle>
                <CardDescription>
                  Track performance metrics in real-time and receive instant alerts for critical changes
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  Get actionable insights and optimization suggestions tailored to your campaigns
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Comprehensive dashboards with detailed metrics, trends, and comparative analysis
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Campaign Hierarchy</CardTitle>
                <CardDescription>
                  Visualize and manage your entire campaign structure from campaigns to ads
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Budget Protection</CardTitle>
                <CardDescription>
                  Automated budget monitoring and alerts to prevent overspending
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                4.2x
              </div>
              <p className="text-lg font-semibold mb-1">Average ROAS Increase</p>
              <p className="text-muted-foreground">With AI optimization</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                67%
              </div>
              <p className="text-lg font-semibold mb-1">Time Saved</p>
              <p className="text-muted-foreground">On campaign management</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-lg font-semibold mb-1">Monitoring</p>
              <p className="text-muted-foreground">Real-time performance tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <Badge className="mb-4" variant="secondary">How It Works</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Get started in minutes</h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect your ad accounts and let AI do the heavy lifting
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Accounts</h3>
              <p className="text-muted-foreground">
                Link your Facebook, Google, or TikTok ad accounts in seconds
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your campaigns and identifies opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimize & Scale</h3>
              <p className="text-muted-foreground">
                Implement recommendations and watch your ROAS improve
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/10" />
            <CardContent className="relative p-6 md:p-12 text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to optimize your campaigns?</h2>
              <p className="text-base md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of marketers who trust AD-ViSOR to maximize their advertising ROI
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/dashboard">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Target className="w-5 h-5" />
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    View Campaigns
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">AD-ViSOR</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered campaign intelligence platform for modern marketers
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/campaigns" className="hover:text-primary transition-colors">Campaigns</Link></li>
                <li><Link to="/insights" className="hover:text-primary transition-colors">Insights</Link></li>
                <li><Link to="/recommendations" className="hover:text-primary transition-colors">Recommendations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AD-ViSOR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
