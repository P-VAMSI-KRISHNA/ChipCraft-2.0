import { Menu, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFunZone } from "@/context/FunZoneContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { funZoneEnabled } = useFunZone();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src="/KARE IEEE EDS - About.png"
            alt="KARE IEEE EDS"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-foreground/30 bg-white object-contain p-0.5 shadow-sm"
          />
          <div className="flex flex-col items-center">
            <span className="font-rye text-base sm:text-xl leading-none text-primary tracking-wide">ChipCraft 2.0</span>
            <span className="hidden xs:block text-[10px] sm:text-xs text-muted-foreground font-typewriter uppercase tracking-widest mt-0.5">24hrs VLSI Hackathon</span>
          </div>
          <img
            src="/SSCS.png"
            alt="SSCS"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-foreground/30 bg-white object-contain p-0.5 shadow-sm"
          />
        </Link>


        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/#rounds" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Rounds
          </Link>
          <Link to="/#schedule" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Schedule
          </Link>
          <Link to="/#rubrics" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Rubrics
          </Link>
          <Link to="/#guidelines" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Guidelines
          </Link>
          <Link to="/#search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Find Your Team
          </Link>
          <Button
            size="sm"
            variant="outline"
            asChild
            className={`gap-1.5 transition-all ${
              funZoneEnabled
                ? "border-secondary/40 text-secondary hover:bg-secondary/10"
                : "border-border text-muted-foreground hover:bg-muted/40 opacity-60"
            }`}
            title={funZoneEnabled ? "Fun Zone is open!" : "Fun Zone is not active yet"}
          >
            <Link to="/games">
              <Gamepad2 className="h-3.5 w-3.5" />
              Fun Zone
              {funZoneEnabled && (
                <span className="ml-1 inline-flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              )}
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/admin">Admin Panel</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link to="/#rounds" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
              Rounds
            </Link>
            <Link to="/#schedule" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
              Schedule
            </Link>
            <Link to="/#rubrics" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
              Rubrics
            </Link>
            <Link to="/#guidelines" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
              Guidelines
            </Link>
            <Link to="/#search" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
              Find Your Team
            </Link>
            <Button
              size="sm"
              variant="outline"
              className={`w-full gap-2 ${
                funZoneEnabled
                  ? "border-secondary/40 text-secondary"
                  : "border-border text-muted-foreground opacity-60"
              }`}
              asChild
            >
              <Link to="/games" onClick={() => setMobileMenuOpen(false)}>
                <Gamepad2 className="h-4 w-4" />
                Fun Zone
                {funZoneEnabled && (
                  <span className="ml-auto inline-flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                )}
              </Link>
            </Button>
            <Button size="sm" className="w-full" asChild>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
