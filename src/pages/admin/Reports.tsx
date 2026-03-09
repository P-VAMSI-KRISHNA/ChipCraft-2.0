import { Trophy, Medal, Star, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeamContext } from "@/context/TeamContext";
import { useMarksContext } from "@/context/MarksContext";
import { useProblemContext } from "@/context/ProblemContext";
import { mockRounds } from "@/data/hackathonData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const medalColors = [
  "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",   // 1st
  "text-slate-400 border-slate-400/50 bg-slate-400/10",      // 2nd
  "text-orange-400 border-orange-400/50 bg-orange-400/10",   // 3rd
];

const medalIcons = ["🥇", "🥈", "🥉"];

export default function Reports() {
  const { teams } = useTeamContext();
  const { getTotal, marksMap } = useMarksContext();
  const { problemStatements } = useProblemContext();

  // Compute ranked teams
  const ranked = [...teams]
    .map((t) => ({
      ...t,
      total: getTotal(t.id),
      scores: marksMap[t.id] ?? {},
    }))
    .sort((a, b) => b.total - a.total);

  const topTeam = ranked[0];
  const hasMarks = ranked.some((t) => t.total > 0);

  // Chart data — top 10 teams by score
  const chartData = ranked
    .filter((t) => t.total > 0)
    .slice(0, 10)
    .map((t) => ({ name: `#${t.teamNumber}`, score: t.total, team: t.teamName }));

  // Per-round averages
  const roundAverages = mockRounds.map((r) => {
    const scores = teams
      .map((t) => marksMap[t.id]?.[r.number])
      .filter((s): s is number => s !== undefined);
    const avg = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    return { round: `R${r.number}`, name: r.name, avg, count: scores.length };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-warning">REPORTS</h1>
        <p className="text-muted-foreground font-mono">Evaluation results and hackathon analytics</p>
      </div>

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel">{teams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Problems Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-primary">{problemStatements.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Teams Evaluated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-secondary">
              {ranked.filter((t) => t.total > 0).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Top Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-warning">
              {hasMarks ? topTeam?.total : "—"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highest Marked Team — Featured */}
      {hasMarks && topTeam && (
        <Card className="border-2 border-yellow-400/40 bg-yellow-400/5">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-400/20 text-4xl">
                🏆
              </div>
              <div className="flex-1">
                <p className="font-pixel text-[9px] text-yellow-400 mb-1">HIGHEST MARKED TEAM</p>
                <h2 className="text-2xl font-bold">
                  #{topTeam.teamNumber} — {topTeam.teamName}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mockRounds.map((r) => {
                    const s = topTeam.scores[r.number];
                    return s !== undefined ? (
                      <Badge key={r.id} variant="outline" className="font-mono text-xs">
                        R{r.number}: <span className="font-bold ml-1">{s}</span>
                      </Badge>
                    ) : null;
                  })}
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/40 font-pixel text-xs">
                    Total: {topTeam.total} pts
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!hasMarks && (
        <Card className="border-dashed border-border">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="font-pixel text-xs text-muted-foreground">NO MARKS YET</p>
            <p className="font-mono text-sm text-muted-foreground mt-2">
              Head to the Evaluation page to start entering team scores.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Podium */}
      {hasMarks && ranked.filter((t) => t.total > 0).length >= 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-mono flex items-center gap-2">
              <Medal className="h-5 w-5 text-yellow-400" />
              Top Teams
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ranked
                .filter((t) => t.total > 0)
                .slice(0, 10)
                .map((team, idx) => (
                  <div
                    key={team.id}
                    className={`flex items-center gap-4 rounded-lg border p-3 transition-colors ${
                      idx < 3 ? medalColors[idx] : "border-border"
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center text-lg">
                      {idx < 3 ? medalIcons[idx] : (
                        <span className="font-pixel text-xs text-muted-foreground">#{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">
                        <span className="font-pixel text-[10px] text-muted-foreground mr-1">#{team.teamNumber}</span>
                        {team.teamName}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {mockRounds.map((r) => {
                          const s = team.scores[r.number];
                          return s !== undefined ? (
                            <span key={r.id} className="font-mono text-[10px] text-muted-foreground">
                              R{r.number}:{s}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Badge
                        variant="outline"
                        className={`font-pixel text-sm px-3 py-1 ${idx < 3 ? medalColors[idx] : ""}`}
                      >
                        {team.total} pts
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bar chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono">
              <BarChart3 className="h-5 w-5" />
              Score Distribution (Top 10)
            </CardTitle>
            <CardDescription className="font-mono">Total points per team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(val, _name, props) => [
                      `${val} pts — ${props.payload?.team}`,
                      "Score",
                    ]}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Per-round averages */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Round Averages</CardTitle>
          <CardDescription className="font-mono">Average score per round across all evaluated teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roundAverages.map((r, i) => (
              <div key={i} className="rounded-lg border border-border p-4 text-center">
                <p className="font-pixel text-[10px] text-muted-foreground">{r.round}</p>
                <p className="font-bold mt-1">{r.name}</p>
                <p className="font-pixel text-2xl text-primary mt-2">
                  {r.count > 0 ? r.avg : "—"}
                </p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  {r.count} team{r.count !== 1 ? "s" : ""} scored
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
