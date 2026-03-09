import { useState } from "react";
import { Trophy, Search, Save, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTeamContext } from "@/context/TeamContext";
import { useMarksContext } from "@/context/MarksContext";
import { useToast } from "@/hooks/use-toast";
import { mockRounds } from "@/data/hackathonData";
import type { RoundNumber } from "@/types/hackathon";

// Editable score cell
function ScoreCell({
  teamId,
  round,
}: {
  teamId: string;
  round: RoundNumber;
}) {
  const { marksMap, setMark } = useMarksContext();
  const { toast } = useToast();
  const currentScore = marksMap[teamId]?.[round];
  const [value, setValue] = useState(currentScore !== undefined ? String(currentScore) : "");
  const [dirty, setDirty] = useState(false);

  const handleChange = (v: string) => {
    setValue(v);
    setDirty(true);
  };

  const handleSave = () => {
    if (value === "") {
      setMark(teamId, round, null);
      setDirty(false);
      toast({ title: "Score cleared", description: `Round ${round} score removed.` });
      return;
    }
    const n = Number(value);
    if (isNaN(n) || n < 0 || n > 100) {
      toast({ title: "Invalid score", description: "Enter a value between 0 and 100.", variant: "destructive" });
      return;
    }
    setMark(teamId, round, n);
    setDirty(false);
    toast({ title: "Score saved", description: `Round ${round}: ${n} points.` });
  };

  return (
    <div className="flex items-center gap-1 min-w-[90px]">
      <Input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        placeholder="—"
        className="h-8 w-16 font-mono text-sm text-center px-1"
      />
      {dirty && (
        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary" onClick={handleSave} title="Save">
          <Save className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

export default function Evaluation() {
  const { teams } = useTeamContext();
  const { getTotal, marksMap } = useMarksContext();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = [...teams]
    .filter(
      (t) =>
        t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(t.teamNumber).includes(searchQuery)
    )
    .sort((a, b) => a.teamNumber - b.teamNumber);

  // Compute ranked list for top banner
  const ranked = [...teams]
    .map((t) => ({ ...t, total: getTotal(t.id) }))
    .filter((t) => t.total > 0)
    .sort((a, b) => b.total - a.total);

  const topTeam = ranked[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-warning neon-glow-green" style={{ textShadow: "0 0 8px hsl(45 100% 55% / 0.8)" }}>
          EVALUATION
        </h1>
        <p className="text-muted-foreground font-mono">
          Enter marks for each team per round (0–100). Press Enter or the save icon to record.
        </p>
      </div>

      {/* Top team banner */}
      {topTeam && (
        <Card className="border-warning/40 bg-warning/5">
          <CardContent className="flex items-center gap-4 pt-5 pb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warning/20 text-warning">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="font-pixel text-[9px] text-warning mb-0.5">CURRENT LEADER</p>
              <p className="font-bold text-lg">
                #{topTeam.teamNumber} — {topTeam.teamName}
              </p>
              <p className="font-mono text-sm text-muted-foreground">
                Total: <span className="text-warning font-bold">{topTeam.total}</span> points
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-warning fill-warning" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search team by # or name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>
        </CardContent>
      </Card>

      {/* Marks table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Team Marks
          </CardTitle>
          <CardDescription className="font-mono">
            Enter scores per round. Total is auto-calculated.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-pixel text-[10px]">Team #</TableHead>
                  <TableHead className="font-pixel text-[10px]">Team Name</TableHead>
                  {mockRounds.map((r) => (
                    <TableHead key={r.id} className="font-pixel text-[10px]">
                      R{r.number} — {r.name}
                    </TableHead>
                  ))}
                  <TableHead className="font-pixel text-[10px] text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => {
                  const total = getTotal(team.id);
                  const hasAnyMark = Object.keys(marksMap[team.id] ?? {}).length > 0;
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-pixel text-xs text-secondary">#{team.teamNumber}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold">{team.teamName}</TableCell>
                      {mockRounds.map((r) => (
                        <TableCell key={r.id}>
                          <ScoreCell teamId={team.id} round={r.number as RoundNumber} />
                        </TableCell>
                      ))}
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`font-pixel text-xs ${
                            hasAnyMark
                              ? total >= 300
                                ? "border-secondary text-secondary"
                                : total >= 200
                                ? "border-primary text-primary"
                                : "border-warning text-warning"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {hasAnyMark ? total : "—"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredTeams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6 + mockRounds.length} className="text-center py-8 font-mono text-muted-foreground">
                      No teams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <p className="font-mono text-xs text-muted-foreground text-center">
        💡 Tip: Type a score and press <kbd className="rounded border border-border px-1">Enter</kbd> to save. Leave blank to clear a round score.
      </p>
    </div>
  );
}
