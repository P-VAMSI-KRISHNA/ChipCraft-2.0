import { 
  Users, 
  List, 
  Clock, 
  Cpu,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockRounds } from "@/data/hackathonData";
import { useProblemContext } from "@/context/ProblemContext";
import { useTeamContext } from "@/context/TeamContext";
import { Link } from "react-router-dom";

export default function DashboardOverview() {
  const { problemStatements } = useProblemContext();
  const { teams } = useTeamContext();

  const activeRound = mockRounds.find((r) => r.status === "active") ?? null;

  const stats = [
    { title: "Total Teams", value: teams.length, icon: Users, color: "text-secondary" },
    { title: "Problem Statements", value: problemStatements.length, icon: List, color: "text-primary" },
    { title: "Active Round", value: activeRound?.number ?? "—", icon: Clock, color: "text-accent" },
    { title: "Total Rounds", value: mockRounds.length, icon: Cpu, color: "text-warning" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-pixel text-sm text-primary neon-glow">DASHBOARD</h1>
        <p className="text-muted-foreground font-mono">Manage ChipCraft hackathon</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground font-mono">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-pixel">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Problem Statements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-mono">Recent Problem Statements</CardTitle>
            <CardDescription className="font-mono">Latest assigned problems</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/problems">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {problemStatements.slice(0, 5).map((ps) => (
              <div key={ps.id} className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-pixel text-xs">
                  #{ps.teamNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-mono text-xs text-muted-foreground">{ps.teamName}</span>
                  <p className="font-medium truncate">{ps.title}</p>
                </div>
              </div>
            ))}
            {problemStatements.length === 0 && (
              <p className="text-sm text-muted-foreground font-mono text-center py-4">No problem statements yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rounds Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Rounds Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockRounds.map((round) => (
              <div key={round.id} className="rounded-lg border border-border p-4 text-center">
                <p className="font-pixel text-xs text-muted-foreground">ROUND {round.number}</p>
                <p className="mt-1 font-bold">{round.name}</p>
                <Badge variant="outline" className="mt-2 font-mono text-xs capitalize">
                  {round.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
