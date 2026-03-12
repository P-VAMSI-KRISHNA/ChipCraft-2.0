import { useState } from "react";
import { Users, Plus, Edit, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTeamContext } from "@/context/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { problemStatements, getProblemByNumber } from "@/data/problemStatements";
import type { Team } from "@/types/hackathon";

interface FormState {
  teamNumber: string;
  teamName: string;
  problemStatementNumber: string;
}

const emptyForm: FormState = { teamNumber: "", teamName: "", problemStatementNumber: "" };

function teamToForm(t: Team): FormState {
  return {
    teamNumber: String(t.teamNumber),
    teamName: t.teamName,
    problemStatementNumber: t.problemStatementNumber ? String(t.problemStatementNumber) : "",
  };
}

export default function MyAssignments() {
  const { teams, addTeam, updateTeam, deleteTeam } = useTeamContext();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredTeams = teams.filter(
    (t) =>
      t.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(t.teamNumber).includes(searchQuery)
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setDialogOpen(true);
  };

  const openEdit = (team: Team) => {
    setEditingId(team.id);
    setForm(teamToForm(team));
    setFormError(null);
    setDialogOpen(true);
  };

  const handleSave = () => {
    const num = parseInt(form.teamNumber, 10);
    if (!form.teamNumber || isNaN(num) || num < 1) {
      setFormError("Team number must be a positive integer.");
      return;
    }
    if (!form.teamName.trim()) {
      setFormError("Team name is required.");
      return;
    }

    // Check duplicate team number (except self)
    const duplicate = teams.find(
      (t) => t.teamNumber === num && t.id !== editingId
    );
    if (duplicate) {
      setFormError(`Team #${num} already exists.`);
      return;
    }

    // Validate problem statement number
    const psNum = form.problemStatementNumber ? parseInt(form.problemStatementNumber, 10) : undefined;
    if (psNum !== undefined && (isNaN(psNum) || psNum < 1 || psNum > 40)) {
      setFormError("Problem statement number must be between 1 and 40.");
      return;
    }

    if (editingId) {
      updateTeam(editingId, {
        teamNumber: num,
        teamName: form.teamName.trim(),
        problemStatementNumber: psNum ?? undefined,
      });
      toast({ title: "Team updated", description: `Team #${num} — ${form.teamName.trim()}` });
    } else {
      addTeam({
        teamNumber: num,
        teamName: form.teamName.trim(),
        members: [],
        problemStatementNumber: psNum ?? undefined,
      });
      toast({ title: "Team added", description: `Team #${num} — ${form.teamName.trim()} registered.` });
    }
    setDialogOpen(false);
  };

  const confirmDelete = (id: string) => setDeleteConfirmId(id);

  const handleDelete = () => {
    if (!deleteConfirmId) return;
    const team = teams.find((t) => t.id === deleteConfirmId);
    deleteTeam(deleteConfirmId);
    toast({
      title: "Team removed",
      description: `${team?.teamName ?? "Team"} has been removed.`,
      variant: "destructive",
    });
    setDeleteConfirmId(null);
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  // Sorted teams by team number
  const sortedFiltered = [...filteredTeams].sort((a, b) => a.teamNumber - b.teamNumber);

  const teamsWithProblems = teams.filter((t) => t.problemStatementNumber).length;
  const teamsWithoutProblems = teams.length - teamsWithProblems;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-pixel text-sm text-secondary neon-glow-cyan">TEAMS</h1>
          <p className="text-muted-foreground font-mono">Manage registered teams &amp; assign problem statements</p>
        </div>
        <Button onClick={openAdd} className="gap-2 font-mono">
          <Plus className="h-4 w-4" />
          Add Team
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-secondary">{teams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">With Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-primary">{teamsWithProblems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">No Problem Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-warning">{teamsWithoutProblems}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by team # or name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>
        </CardContent>
      </Card>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <Users className="h-5 w-5 text-secondary" />
            Registered Teams
          </CardTitle>
          <CardDescription className="font-mono">
            Showing {sortedFiltered.length} of {teams.length} teams
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-pixel text-[10px]">Team #</TableHead>
                  <TableHead className="font-pixel text-[10px]">Team Name</TableHead>
                  <TableHead className="font-pixel text-[10px]">Problem Statement</TableHead>
                  <TableHead className="text-right font-pixel text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedFiltered.map((team) => {
                  const ps = team.problemStatementNumber
                    ? getProblemByNumber(team.problemStatementNumber)
                    : null;
                  return (
                    <TableRow key={team.id}>
                      <TableCell className="font-pixel text-xs text-secondary">#{team.teamNumber}</TableCell>
                      <TableCell className="font-mono text-sm font-semibold">{team.teamName}</TableCell>
                      <TableCell>
                        {ps ? (
                          <span className="font-mono text-sm text-foreground/80 truncate max-w-[250px] block">
                            <Badge variant="outline" className="font-pixel text-[9px] mr-1 text-primary border-primary/40">
                              PS#{team.problemStatementNumber}
                            </Badge>
                            {ps.title}
                          </span>
                        ) : (
                          <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground border-muted-foreground/30">
                            Not assigned
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(team)} title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => confirmDelete(team.id)}
                            title="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {sortedFiltered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 font-mono text-muted-foreground">
                      No teams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xs text-secondary neon-glow-cyan flex items-center gap-2">
              <Users className="h-4 w-4" />
              {editingId ? "EDIT TEAM" : "ADD TEAM"}
            </DialogTitle>
            <DialogDescription className="font-mono">
              {editingId ? "Update team details." : "Register a new team for the hackathon."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="font-pixel text-[9px] text-muted-foreground">TEAM NUMBER *</Label>
                <Input
                  type="number"
                  min={1}
                  value={form.teamNumber}
                  onChange={(e) => setField("teamNumber", e.target.value)}
                  className="font-mono"
                  placeholder="e.g. 9"
                />
              </div>
              <div className="space-y-1">
                <Label className="font-pixel text-[9px] text-muted-foreground">TEAM NAME *</Label>
                <Input
                  value={form.teamName}
                  onChange={(e) => setField("teamName", e.target.value)}
                  className="font-mono"
                  placeholder="e.g. Silicon Sorcerers"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="font-pixel text-[9px] text-muted-foreground">PROBLEM STATEMENT (1–40)</Label>
              <Select
                value={form.problemStatementNumber}
                onValueChange={(val) => setField("problemStatementNumber", val)}
              >
                <SelectTrigger className="font-mono text-sm">
                  <SelectValue placeholder="Select a problem statement…" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {problemStatements.map((ps) => (
                    <SelectItem key={ps.number} value={String(ps.number)} className="font-mono text-xs">
                      #{ps.number} — {ps.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formError && (
              <p className="text-sm text-destructive font-mono border border-destructive/30 rounded-md bg-destructive/5 px-3 py-2">
                {formError}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="font-mono">Cancel</Button>
            <Button onClick={handleSave} className="font-mono gap-2">
              <Users className="h-4 w-4" />
              {editingId ? "Save Changes" : "Add Team"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-destructive">Remove Team?</DialogTitle>
            <DialogDescription className="font-mono">
              {(() => {
                const t = teams.find((t) => t.id === deleteConfirmId);
                return `Are you sure you want to remove Team #${t?.teamNumber} — ${t?.teamName}? This cannot be undone.`;
              })()}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)} className="font-mono">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} className="font-mono gap-2">
              <Trash2 className="h-4 w-4" />
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
