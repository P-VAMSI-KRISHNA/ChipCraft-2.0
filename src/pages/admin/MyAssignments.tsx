import { Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockTeams, mockProblemStatements } from "@/data/hackathonData";

export default function MyAssignments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-secondary neon-glow-cyan">TEAMS</h1>
        <p className="text-muted-foreground font-mono">All registered teams and their assignments</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-secondary">{mockTeams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Avg Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Current Round</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-primary">1</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <Users className="h-5 w-5 text-secondary" />
            Registered Teams
          </CardTitle>
          <CardDescription className="font-mono">All teams with their problem statements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTeams.map((team) => {
              const ps = mockProblemStatements.find((p) => p.teamNumber === team.teamNumber);
              return (
                <div key={team.id} className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary font-pixel text-sm">
                    #{team.teamNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold">{team.teamName}</p>
                    <p className="text-sm text-muted-foreground font-mono truncate">
                      {ps?.title || "No problem assigned"}
                    </p>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    Round {team.currentRound}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
