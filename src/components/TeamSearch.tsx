import { useState } from "react";
import { Search, Cpu, Wrench, Lightbulb, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockProblemStatements } from "@/data/hackathonData";
import type { ProblemStatement } from "@/types/hackathon";

const difficultyColors: Record<string, string> = {
  Easy: "bg-accent/10 text-accent border-accent/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  Hard: "bg-destructive/10 text-destructive border-destructive/30",
};

const TeamSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<ProblemStatement | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const teamNum = parseInt(searchQuery.trim());
    if (isNaN(teamNum)) {
      setNotFound(true);
      setResult(null);
      return;
    }
    const found = mockProblemStatements.find((ps) => ps.teamNumber === teamNum);
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section id="search" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-pixel text-xl text-secondary neon-glow-cyan sm:text-2xl">
              FIND YOUR TEAM
            </h2>
            <p className="text-muted-foreground font-mono">
              Enter your team number to view your problem statement
            </p>
          </div>

          {/* Search Box */}
          <Card className="mb-8 neon-border-cyan border-secondary/30">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Enter team number (e.g., 1, 2, 3...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-11 font-mono text-lg h-12"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="font-mono gap-2">
                  <Cpu className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Not Found */}
          {notFound && (
            <Alert className="border-destructive/30 bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertTitle className="font-pixel text-xs text-destructive">TEAM NOT FOUND</AlertTitle>
              <AlertDescription className="font-mono text-sm">
                No team found with that number. Please check with the organizers.
              </AlertDescription>
            </Alert>
          )}

          {/* Problem Statement Display */}
          {result && (
            <Card className="border-secondary/30 neon-border-cyan scanlines relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-pixel text-xs text-secondary">
                      TEAM #{result.teamNumber}
                    </span>
                    <CardTitle className="text-xl text-foreground">{result.teamName}</CardTitle>
                  </div>
                  <Badge className={difficultyColors[result.difficulty]} variant="outline">
                    {result.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Problem Title */}
                <div>
                  <p className="font-pixel text-[10px] text-muted-foreground mb-2">PROBLEM STATEMENT</p>
                  <h3 className="text-lg font-bold text-primary">{result.title}</h3>
                  <p className="mt-2 text-foreground/80 font-mono text-sm leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Components */}
                <div>
                  <p className="font-pixel text-[10px] text-muted-foreground mb-2 flex items-center gap-2">
                    <Wrench className="h-3 w-3" />
                    COMPONENTS PROVIDED
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.components.map((comp) => (
                      <Badge key={comp} variant="outline" className="font-mono text-xs border-muted-foreground/30">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Hints */}
                <div>
                  <p className="font-pixel text-[10px] text-muted-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="h-3 w-3 text-warning" />
                    HINTS
                  </p>
                  <div className="space-y-2">
                    {result.hints.map((hint, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-md bg-warning/5 border border-warning/20 p-3 text-sm">
                        <span className="font-pixel text-[10px] text-warning mt-0.5">#{i + 1}</span>
                        <span className="font-mono text-foreground/80">{hint}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Round Info */}
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                  <p className="font-pixel text-[10px] text-muted-foreground">ASSIGNED FOR</p>
                  <p className="font-pixel text-sm text-primary mt-1">ROUND {result.roundNumber}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamSearch;
