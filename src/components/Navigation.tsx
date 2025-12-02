import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarChart3, Target, Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/campaigns", label: "Campaigns" },
    { to: "/insights", label: "Insights" },
    { to: "/recommendations", label: "Recommendations" },
    { to: "/audience-analysis", label: "Audience" },
    { to: "/debug", label: "Debug" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = ({ mobile = false, onClose }: { mobile?: boolean; onClose?: () => void }) => (
    <>
      {navLinks.map((link) => (
        <Link key={link.to} to={link.to} onClick={onClose}>
          <Button
            variant={isActive(link.to) ? "default" : "ghost"}
            size={mobile ? "default" : "sm"}
            className={cn(mobile && "w-full justify-start")}
          >
            {link.label}
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold">AD-ViSOR</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Campaign Intelligence Platform</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              <NavLinks />
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
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-0">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold">AD-ViSOR</span>
                      </div>
                    </div>
                    
                    {/* Navigation Links */}
                    <nav className="flex-1 p-4 space-y-2">
                      <NavLinks mobile onClose={() => setIsOpen(false)} />
                    </nav>
                    
                    {/* Footer Action */}
                    <div className="p-4 border-t border-border">
                      <Button className="w-full" onClick={() => setIsOpen(false)}>
                        <Target className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
