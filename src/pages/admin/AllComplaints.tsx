import { useState } from "react";
import { Search, Eye, Edit, Plus, Trash2, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { useProblemContext } from "@/context/ProblemContext";
import { useToast } from "@/hooks/use-toast";
import type { ProblemStatement } from "@/types/hackathon";

interface FormState {
  teamNumber: string;
  teamName: string;
  title: string;
  description: string;
}

const emptyForm: FormState = {
  teamNumber: "",
  teamName: "",
  title: "",
  description: "",
};

function psToForm(ps: ProblemStatement): FormState {
  return {
    teamNumber: String(ps.teamNumber),
    teamName: ps.teamName,
    title: ps.title,
    description: ps.description,
  };
}

export default function AllComplaints() {
  const { problemStatements, addProblem, updateProblem, deleteProblem } = useProblemContext();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);

  const filtered = problemStatements.filter((ps) => {
    const q = searchQuery.toLowerCase();
    return (
      ps.teamName.toLowerCase().includes(q) ||
      ps.title.toLowerCase().includes(q) ||
      String(ps.teamNumber).includes(searchQuery)
    );
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setEditDialogOpen(true);
  };

  const openEdit = (ps: ProblemStatement) => {
    setEditingId(ps.id);
    setForm(psToForm(ps));
    setFormError(null);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    const teamNum = parseInt(form.teamNumber, 10);
    if (!form.teamNumber || isNaN(teamNum) || teamNum < 1) {
      setFormError("Team number must be a positive integer.");
      return;
    }
    if (!form.teamName.trim()) { setFormError("Team name is required."); return; }
    if (!form.title.trim()) { setFormError("Problem title is required."); return; }
    if (!form.description.trim()) { setFormError("Description is required."); return; }

    const psData = {
      teamNumber: teamNum,
      teamName: form.teamName.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
    };

    if (editingId) {
      updateProblem(editingId, psData);
      toast({ title: "Problem statement updated", description: `Team #${teamNum} updated.` });
    } else {
      addProblem(psData);
      toast({ title: "Problem statement added", description: `Team #${teamNum} assigned.` });
    }
    setEditDialogOpen(false);
  };

  const handleDelete = (ps: ProblemStatement) => {
    deleteProblem(ps.id);
    toast({
      title: "Problem statement removed",
      description: `Team #${ps.teamNumber} problem removed.`,
      variant: "destructive",
    });
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-pixel text-sm text-primary neon-glow">PROBLEM STATEMENTS</h1>
          <p className="text-muted-foreground font-mono">Manage all team problem statements</p>
        </div>
        <Button onClick={openAdd} className="gap-2 font-mono">
          <Plus className="h-4 w-4" />
          Add Problem Statement
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by team #, name, or problem title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-mono"
            />
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground font-mono">
        Showing {filtered.length} of {problemStatements.length} problem statements
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
                  <TableHead className="text-right font-pixel text-[10px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ps) => (
                  <TableRow key={ps.id}>
                    <TableCell className="font-pixel text-xs text-primary">#{ps.teamNumber}</TableCell>
                    <TableCell className="font-mono text-sm">{ps.teamName}</TableCell>
                    <TableCell className="max-w-[250px]">
                      <p className="truncate text-sm font-mono">{ps.title}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedPS(ps)} title="View">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(ps)} title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(ps)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 font-mono text-muted-foreground">
                      No problem statements match your filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedPS} onOpenChange={() => setSelectedPS(null)}>
        <DialogContent className="max-w-xl">
          {selectedPS && (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono flex items-center gap-2">
                  <span className="font-pixel text-xs text-primary">#{selectedPS.teamNumber}</span>
                  {selectedPS.teamName}
                </DialogTitle>
                <DialogDescription className="font-mono">{selectedPS.title}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <h4 className="font-pixel text-[10px] text-muted-foreground mb-1">DESCRIPTION</h4>
                  <p className="text-sm font-mono leading-relaxed">{selectedPS.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add / Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xs text-primary neon-glow flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              {editingId ? "EDIT PROBLEM STATEMENT" : "ADD PROBLEM STATEMENT"}
            </DialogTitle>
            <DialogDescription className="font-mono">
              {editingId ? "Update the problem statement details." : "Assign a new problem statement to a team."}
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
              <Label className="font-pixel text-[9px] text-muted-foreground">PROBLEM TITLE *</Label>
              <Input
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className="font-mono"
                placeholder="e.g. Smart Home Automation System"
              />
            </div>
            <div className="space-y-1">
              <Label className="font-pixel text-[9px] text-muted-foreground">DESCRIPTION *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className="font-mono text-sm min-h-[100px]"
                placeholder="Describe the problem in detail…"
              />
            </div>
            {formError && (
              <p className="text-sm text-destructive font-mono border border-destructive/30 rounded-md bg-destructive/5 px-3 py-2">
                {formError}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="font-mono">Cancel</Button>
            <Button onClick={handleSave} className="font-mono gap-2">
              <Cpu className="h-4 w-4" />
              {editingId ? "Save Changes" : "Add Problem"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
