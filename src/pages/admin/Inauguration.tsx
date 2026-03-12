import { useState } from "react";
import { Sparkles, Rocket, Lock, Unlock, PartyPopper, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useProblemRelease } from "@/context/ProblemReleaseContext";
import { problemStatements } from "@/data/problemStatements";
import { useTeamContext } from "@/context/TeamContext";
import { useToast } from "@/hooks/use-toast";

export default function Inauguration() {
  const { problemsReleased, setProblemsReleased } = useProblemRelease();
  const { teams } = useTeamContext();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);

  const teamsWithProblems = teams.filter((t) => t.problemStatementNumber).length;

  const handleRelease = () => {
    setProblemsReleased(true);
    setConfirmOpen(false);
    toast({
      title: "🎉 Problem Statements Released!",
      description: "All teams can now view their assigned problem statements.",
    });
  };

  const handleRevoke = () => {
    setProblemsReleased(false);
    setRevokeOpen(false);
    toast({
      title: "Problem Statements Hidden",
      description: "Teams can no longer view their problem statements.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-primary neon-glow">INAUGURATION</h1>
        <p className="text-muted-foreground font-mono">Release problem statements to all participating teams</p>
      </div>

      {/* Status Banner */}
      <Card className={`border-2 ${problemsReleased ? "border-green-500/50 bg-green-500/5" : "border-amber-500/50 bg-amber-500/5"}`}>
        <CardContent className="flex items-center gap-4 py-6">
          {problemsReleased ? (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20">
                <Unlock className="h-7 w-7 text-green-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold font-mono text-green-500">RELEASED</h2>
                <p className="text-muted-foreground font-mono text-sm">
                  Problem statements are live. Teams can view their assigned problems on the homepage.
                </p>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-500 font-pixel text-[10px] px-3 py-1">
                LIVE
              </Badge>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20">
                <Lock className="h-7 w-7 text-amber-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold font-mono text-amber-500">NOT RELEASED</h2>
                <p className="text-muted-foreground font-mono text-sm">
                  Problem statements are hidden. Teams cannot see their assignments yet.
                </p>
              </div>
              <Badge variant="outline" className="border-amber-500/50 text-amber-500 font-pixel text-[10px] px-3 py-1">
                HIDDEN
              </Badge>
            </>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-primary">{problemStatements.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Teams Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-secondary">{teamsWithProblems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-foreground">{teams.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {problemsReleased ? "Problem Statements Are Live" : "Ready to Release?"}
          </CardTitle>
          <CardDescription className="font-mono">
            {problemsReleased
              ? "All teams can now view their assigned problem statements on the homepage."
              : "Once released, all teams with assigned problem statements will be able to view them on the homepage."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!problemsReleased ? (
            <Button
              size="lg"
              className="w-full gap-3 font-pixel text-xs py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground transition-all duration-300"
              onClick={() => setConfirmOpen(true)}
            >
              <Rocket className="h-5 w-5" />
              RELEASE PROBLEM STATEMENTS
              <PartyPopper className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-3 font-mono text-sm py-6 border-destructive/30 text-destructive hover:bg-destructive/10 transition-all"
              onClick={() => setRevokeOpen(true)}
            >
              <Lock className="h-4 w-4" />
              Revoke Access (Hide Problem Statements)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Release Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xs text-primary neon-glow flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              RELEASE PROBLEM STATEMENTS
            </DialogTitle>
            <DialogDescription className="font-mono space-y-3 pt-2">
              <span className="block">
                This will make all assigned problem statements visible to teams on the homepage.
              </span>
              <span className="block text-foreground font-semibold">
                {teamsWithProblems} of {teams.length} teams have problems assigned.
              </span>
              {teamsWithProblems < teams.length && (
                <span className="flex items-center gap-2 text-amber-500">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {teams.length - teamsWithProblems} team(s) don't have a problem assigned yet.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} className="font-mono">Cancel</Button>
            <Button
              onClick={handleRelease}
              className="font-pixel text-[10px] gap-2 bg-gradient-to-r from-primary to-secondary"
            >
              <PartyPopper className="h-4 w-4" />
              RELEASE NOW
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Confirm Dialog */}
      <Dialog open={revokeOpen} onOpenChange={setRevokeOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-destructive">Hide Problem Statements?</DialogTitle>
            <DialogDescription className="font-mono">
              Teams will no longer be able to view their problem statements on the homepage. You can release them again at any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeOpen(false)} className="font-mono">Cancel</Button>
            <Button variant="destructive" onClick={handleRevoke} className="font-mono gap-2">
              <Lock className="h-4 w-4" />
              Hide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
