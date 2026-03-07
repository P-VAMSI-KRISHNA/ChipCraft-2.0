import { useState } from "react";
import { Search, Eye, Edit, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mockProblemStatements } from "@/data/hackathonData";
import type { ProblemStatement } from "@/types/hackathon";

const difficultyColors: Record<string, string> = {
  Easy: "bg-accent/10 text-accent border-accent/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  Hard: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function AllComplaints() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [roundFilter, setRoundFilter] = useState<string>("all");
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

  const filtered = mockProblemStatements.filter((ps) => {
    const matchesSearch =
      ps.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(ps.teamNumber).includes(searchQuery);
    const matchesDifficulty = difficultyFilter === "all" || ps.difficulty === difficultyFilter;
    const matchesRound = roundFilter === "all" || String(ps.roundNumber) === roundFilter;
    return matchesSearch && matchesDifficulty && matchesRound;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-primary neon-glow">PROBLEM STATEMENTS</h1>
        <p className="text-muted-foreground font-mono">Manage all team problem statements</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by team #, name, or problem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-mono"
              />
            </div>
            <div className="flex gap-2">
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-[130px] font-mono">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roundFilter} onValueChange={setRoundFilter}>
                <SelectTrigger className="w-[120px] font-mono">
                  <SelectValue placeholder="Round" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rounds</SelectItem>
                  <SelectItem value="1">Round 1</SelectItem>
                  <SelectItem value="2">Round 2</SelectItem>
                  <SelectItem value="3">Round 3</SelectItem>
                  <SelectItem value="4">Round 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground font-mono">
        Showing {filtered.length} of {mockProblemStatements.length} problem statements
      </p>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-pixel text-[10px]">Team #</TableHead>
                  <TableHead className="font-pixel text-[10px]">Team Name</TableHead>
                  <TableHead className="font-pixel text-[10px]">Problem Title</TableHead>
                  <TableHead className="font-pixel text-[10px]">Difficulty</TableHead>
                  <TableHead className="font-pixel text-[10px]">Round</TableHead>
                  <TableHead className="text-right font-pixel text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ps) => (
                  <TableRow key={ps.id}>
                    <TableCell className="font-pixel text-xs text-primary">#{ps.teamNumber}</TableCell>
                    <TableCell className="font-mono text-sm">{ps.teamName}</TableCell>
                    <TableCell className="max-w-[200px]">
                      <p className="truncate text-sm font-mono">{ps.title}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={difficultyColors[ps.difficulty]}>
                        {ps.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">R{ps.roundNumber}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedPS(ps)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedPS} onOpenChange={() => setSelectedPS(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPS && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-pixel text-xs">
                    #{selectedPS.teamNumber}
                  </div>
                  <div>
                    <DialogTitle className="flex items-center gap-2 font-mono">
                      {selectedPS.teamName}
                      <Badge className={difficultyColors[selectedPS.difficulty]} variant="outline">
                        {selectedPS.difficulty}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="font-mono">Round {selectedPS.roundNumber}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="font-pixel text-[10px] text-muted-foreground mb-1">PROBLEM TITLE</h4>
                  <p className="text-lg font-bold text-primary">{selectedPS.title}</p>
                </div>
                <div>
                  <h4 className="font-pixel text-[10px] text-muted-foreground mb-1">DESCRIPTION</h4>
                  <p className="text-sm font-mono">{selectedPS.description}</p>
                </div>
                <div>
                  <h4 className="font-pixel text-[10px] text-muted-foreground mb-1">COMPONENTS</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPS.components.map((c) => (
                      <Badge key={c} variant="outline" className="font-mono text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-pixel text-[10px] text-muted-foreground mb-1">HINTS</h4>
                  <div className="space-y-2">
                    {selectedPS.hints.map((h, i) => (
                      <div key={i} className="rounded-md bg-warning/5 border border-warning/20 p-3 text-sm font-mono">
                        <span className="font-pixel text-[10px] text-warning mr-2">#{i + 1}</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
