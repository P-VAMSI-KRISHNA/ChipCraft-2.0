import { ArrowRight, Zap, Users, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const stats = [
    { icon: Users, label: "40 Teams", color: "text-secondary" },
    { icon: Zap, label: "4 Rounds", color: "text-primary" },
    { icon: Timer, label: "24 Hours", color: "text-accent" },
  ];

  const scrollToSearch = () => {
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 pixel-grid">
      {/* Neon background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse-neon" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/20 blur-3xl animate-pulse-neon" />
        <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="mb-6 font-pixel text-3xl leading-relaxed tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-primary neon-glow">CHIP</span>
            <span className="text-secondary neon-glow-cyan">CRAFT</span>
          </h1>

          <p className="mb-2 font-pixel text-xs text-muted-foreground sm:text-sm">
            ELECTRONICS HACKATHON 2026
          </p>

          <p className="mb-8 text-lg text-muted-foreground sm:text-xl font-mono">
            Design. Build. Demo. Win.
            <br />
            <span className="text-foreground">24 hours, 4 rounds, and neon-fueled fun breaks.</span>
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" onClick={scrollToSearch} className="w-full gap-2 sm:w-auto font-mono">
              Find Your Problem Statement
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-mono border-secondary text-secondary hover:bg-secondary/10" asChild>
              <a href="#rounds">View Rounds</a>
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 font-mono text-sm">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
