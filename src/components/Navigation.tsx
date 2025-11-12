import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Target, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/campaigns", label: "Campaigns" },
    { to: "/insights", label: "Insights" },
    { to: "/recommendations", label: "Recommendations" },
    { to: "/debug", label: "Debug" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AD-ViSOR</h1>
              <p className="text-sm text-muted-foreground">Campaign Intelligence Platform</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button
                  variant={isActive(link.to) ? "default" : "ghost"}
                  size="sm"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button size="sm" className="ml-2">
              <Target className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
