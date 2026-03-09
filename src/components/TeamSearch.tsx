import { useState } from "react";
import { Search, Cpu, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProblemContext } from "@/context/ProblemContext";
import type { ProblemStatement } from "@/types/hackathon";

const TeamSearch = () => {
  const { problemStatements } = useProblemContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<ProblemStatement[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) {
      setNotFound(false);
      setResults([]);
      setSearched(false);
      return;
    }

    const teamNum = parseInt(query, 10);
    if (!isNaN(teamNum) && String(teamNum) === query) {
      const found = problemStatements.find((ps) => ps.teamNumber === teamNum);
      if (found) { setResults([found]); setNotFound(false); }
      else { setResults([]); setNotFound(true); }
    } else {
      const lowerQuery = query.toLowerCase();
      const matches = problemStatements.filter(
        (ps) => ps.teamName.toLowerCase().includes(lowerQuery)
      );
      if (matches.length > 0) { setResults(matches); setNotFound(false); }
      else { setResults([]); setNotFound(true); }
    }
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section id="search" className="py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-rye text-3xl text-foreground uppercase tracking-widest sm:text-4xl">
              FIND YOUR TEAM
            </h2>
            <p className="text-muted-foreground font-sans text-lg">
              Enter your team number or team name to view your problem statement
            </p>
          </div>

          {/* Search Box */}
          <Card className="mb-8 vintage-border bg-card/60 vintage-shadow">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Enter team number or name (e.g., 1, Byte Busters…)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-11 font-sans text-lg h-12 bg-transparent"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="font-rye text-xl gap-2 tracking-widest border-2 border-foreground bg-primary hover:bg-primary/90 text-primary-foreground transition-all">
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Not Found */}
          {notFound && (
            <Alert className="border-destructive/30 bg-destructive/5 mb-6 vintage-border scale-[0.98] transform">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertTitle className="font-rye text-xl text-destructive tracking-wide">TEAM NOT FOUND</AlertTitle>
              <AlertDescription className="font-sans text-base mt-2">
                No team found matching "{searchQuery}". Please check with the organizers.
              </AlertDescription>
            </Alert>
          )}

          {/* Multiple results hint */}
          {results.length > 1 && (
            <p className="mb-4 font-sans text-lg text-muted-foreground">
              Found <span className="text-foreground font-bold">{results.length}</span> teams
              matching "{searchQuery}".
            </p>
          )}

          {/* Problem Statement Display */}
          <div className="space-y-6">
            {results.map((result) => (
              <Card key={result.id} className="vintage-border bg-card/60 ink-stamp relative overflow-hidden p-2">
                <CardHeader className="pb-4 border-b-2 border-dashed border-border mb-4">
                  <div>
                    <span className="font-sans font-bold tracking-widest text-muted-foreground uppercase text-xs">TEAM #{result.teamNumber}</span>
                    <CardTitle className="font-rye text-3xl text-primary mt-1">{result.teamName}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Problem Title */}
                  <div>
                    <p className="font-sans font-bold tracking-widest uppercase border-b border-foreground pb-1 mb-3 text-muted-foreground text-xs inline-block">PROBLEM STATEMENT</p>
                    <h3 className="text-2xl font-serif font-bold text-foreground mt-2">{result.title}</h3>
                    <p className="mt-3 text-foreground/90 font-serif text-lg leading-relaxed text-justify">
                      {result.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSearch;
