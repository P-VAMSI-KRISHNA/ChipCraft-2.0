import { useState } from "react";
import { Search, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTeamContext } from "@/context/TeamContext";
import { getProblemByNumber } from "@/data/problemStatements";
import type { Team } from "@/types/hackathon";
import type { StaticProblemStatement } from "@/data/problemStatements";

interface SearchResult {
  team: Team;
  problem: StaticProblemStatement | null;
}

const TeamSearch = () => {
  const { teams } = useTeamContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
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
    let matchedTeams: Team[] = [];

    if (!isNaN(teamNum) && String(teamNum) === query) {
      const found = teams.find((t) => t.teamNumber === teamNum);
      if (found) matchedTeams = [found];
    } else {
      const lowerQuery = query.toLowerCase();
      matchedTeams = teams.filter((t) =>
        t.teamName.toLowerCase().includes(lowerQuery)
      );
    }

    if (matchedTeams.length > 0) {
      const searchResults: SearchResult[] = matchedTeams.map((team) => ({
        team,
        problem: team.problemStatementNumber
          ? getProblemByNumber(team.problemStatementNumber) ?? null
          : null,
      }));
      setResults(searchResults);
      setNotFound(false);
    } else {
      setResults([]);
      setNotFound(true);
    }
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section id="search" className="py-12 sm:py-20">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="mb-3 sm:mb-4 font-rye text-2xl sm:text-3xl text-foreground uppercase tracking-widest sm:text-4xl">
              FIND YOUR TEAM
            </h2>
            <p className="text-muted-foreground font-sans text-base sm:text-lg">
              Enter your team number or team name to view your problem statement
            </p>
          </div>

          <Card className="mb-6 sm:mb-8 vintage-border bg-card/60 vintage-shadow">
            <CardContent className="pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Team number or name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-10 sm:pl-11 font-sans text-base sm:text-lg h-11 sm:h-12 bg-transparent"
                  />
                </div>
                <Button onClick={handleSearch} size="lg" className="font-rye text-base sm:text-xl gap-2 tracking-widest border-2 border-foreground bg-primary hover:bg-primary/90 text-primary-foreground transition-all w-full sm:w-auto h-11 sm:h-auto">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
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
            {results.map(({ team, problem }) => (
              <Card key={team.id} className="vintage-border bg-card/60 ink-stamp relative overflow-hidden p-1 sm:p-2">
                <CardHeader className="pb-3 sm:pb-4 border-b-2 border-dashed border-border mb-3 sm:mb-4 px-3 sm:px-6">
                  <div>
                    <span className="font-sans font-bold tracking-widest text-muted-foreground uppercase text-[10px] sm:text-xs">TEAM #{team.teamNumber}</span>
                    <CardTitle className="font-rye text-xl sm:text-3xl text-primary mt-1">{team.teamName}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
                  {problem ? (
                    <>
                      {/* Problem Title */}
                      <div>
                        <p className="font-sans font-bold tracking-widest uppercase border-b border-foreground pb-1 mb-3 text-muted-foreground text-xs inline-block">
                          PROBLEM STATEMENT #{team.problemStatementNumber}
                        </p>
                        <h3 className="text-2xl font-serif font-bold text-foreground mt-2">{problem.title}</h3>
                        <p className="mt-3 text-foreground/90 font-serif text-lg leading-relaxed text-justify">
                          {problem.description}
                        </p>
                      </div>

                      {/* Expected Features */}
                      <div>
                        <p className="font-sans font-bold tracking-widest uppercase border-b border-foreground pb-1 mb-3 text-muted-foreground text-xs inline-block">
                          EXPECTED FEATURES
                        </p>
                        <ul className="space-y-2 mt-2">
                          {problem.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                              <span className="font-serif text-base text-foreground/85">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="font-serif text-lg text-muted-foreground italic">
                        No problem statement has been assigned to this team yet. Please check with the organizers.
                      </p>
                    </div>
                  )}
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
