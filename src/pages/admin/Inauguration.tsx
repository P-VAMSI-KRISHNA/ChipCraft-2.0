import { useState, useEffect } from "react";
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
  const [curtainOpen, setCurtainOpen] = useState(problemsReleased);
  const [showConfetti, setShowConfetti] = useState(false);

  const teamsWithProblems = teams.filter((t) => t.problemStatementNumber).length;

  // Sync curtain state with release state
  useEffect(() => {
    setCurtainOpen(problemsReleased);
  }, [problemsReleased]);

  const handleRelease = () => {
    setConfirmOpen(false);
    // Animate curtain first, then set released
    setCurtainOpen(true);
    setShowConfetti(true);
    setTimeout(() => {
      setProblemsReleased(true);
      toast({
        title: "🎉 Problem Statements Released!",
        description: "All teams can now view their assigned problem statements.",
      });
    }, 800);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleRevoke = () => {
    setCurtainOpen(false);
    setTimeout(() => {
      setProblemsReleased(false);
      toast({
        title: "Problem Statements Hidden",
        description: "Teams can no longer view their problem statements.",
        variant: "destructive",
      });
    }, 800);
    setRevokeOpen(false);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] overflow-hidden">
      {/* ========= CSS ========= */}
      <style>{`
        /* ---------- CURTAIN ---------- */
        .curtain-wrapper {
          position: absolute;
          inset: 0;
          z-index: 30;
          pointer-events: none;
          overflow: hidden;
        }
        .curtain-wrapper.interactive { pointer-events: auto; }

        .curtain-left, .curtain-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 52%;
          transition: transform 1.4s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .curtain-left  { left: 0;  transform: translateX(0); }
        .curtain-right { right: 0; transform: translateX(0); }
        .curtain-open .curtain-left  { transform: translateX(-105%); }
        .curtain-open .curtain-right { transform: translateX(105%); }

        /* Curtain fabric */
        .curtain-fabric {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }
        .curtain-left .curtain-fabric {
          background: linear-gradient(135deg,
            #8B1A1A 0%, #A52A2A 15%, #7B1818 25%,
            #A52A2A 40%, #8B1A1A 55%, #6B1414 70%,
            #A52A2A 85%, #8B1A1A 100%
          );
        }
        .curtain-right .curtain-fabric {
          background: linear-gradient(225deg,
            #8B1A1A 0%, #A52A2A 15%, #7B1818 25%,
            #A52A2A 40%, #8B1A1A 55%, #6B1414 70%,
            #A52A2A 85%, #8B1A1A 100%
          );
        }

        /* Curtain vertical folds */
        .curtain-fabric::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            rgba(0,0,0,0.12) 8px,
            transparent 16px,
            rgba(255,255,255,0.06) 24px,
            transparent 32px
          );
        }
        .curtain-fabric::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.3) 0%,
            transparent 8%,
            transparent 85%,
            rgba(0,0,0,0.25) 100%
          );
        }

        /* Gold trim at top */
        .curtain-valance {
          position: absolute;
          top: 0;
          left: -5%;
          right: -5%;
          height: 40px;
          background: linear-gradient(180deg,
            #DAA520 0%, #FFD700 30%, #DAA520 50%, #B8860B 100%
          );
          z-index: 35;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .curtain-valance::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          height: 12px;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 20px,
            #DAA520 20px,
            #FFD700 30px,
            #DAA520 40px,
            transparent 40px
          );
        }

        /* Gold tassel */
        .curtain-tassel {
          position: absolute;
          bottom: 20%;
          width: 24px;
          height: 80px;
          z-index: 5;
        }
        .curtain-left .curtain-tassel { right: 15%; }
        .curtain-right .curtain-tassel { left: 15%; }
        .curtain-tassel::before {
          content: '';
          display: block;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle, #FFD700, #B8860B);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .curtain-tassel::after {
          content: '';
          display: block;
          width: 20px;
          height: 50px;
          margin: 2px auto 0;
          background: repeating-linear-gradient(
            180deg,
            #DAA520 0px, #FFD700 3px, #DAA520 6px
          );
          border-radius: 0 0 10px 10px;
        }

        /* Rope across top edge */
        .curtain-rope {
          position: absolute;
          top: 38px;
          left: 0;
          right: 0;
          height: 6px;
          background: repeating-linear-gradient(
            90deg,
            #DAA520 0px, #B8860B 4px, #DAA520 8px
          );
          z-index: 36;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        /* ---------- CONFETTI ---------- */
        @keyframes confetti-fall {
          0%   { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .confetti-container { position: fixed; inset: 0; z-index: 50; pointer-events: none; overflow: hidden; }
        .confetti-piece {
          position: absolute;
          top: -5%;
          width: 10px;
          height: 10px;
          animation: confetti-fall linear forwards;
        }

        /* ---------- DECORATIVE FLOWERS ---------- */
        .flower-corner {
          position: absolute;
          width: 120px;
          height: 120px;
          opacity: 0.15;
          z-index: 1;
        }
        .flower-corner svg { width: 100%; height: 100%; }
        .flower-tl { top: 0; left: 0; }
        .flower-tr { top: 0; right: 0; transform: scaleX(-1); }
        .flower-bl { bottom: 0; left: 0; transform: scaleY(-1); }
        .flower-br { bottom: 0; right: 0; transform: scale(-1); }

        @media (max-width: 640px) {
          .flower-corner { width: 60px; height: 60px; }
          .curtain-valance { height: 28px; }
          .curtain-valance::after { height: 8px; bottom: -8px; }
          .curtain-rope { top: 26px; height: 4px; }
          .curtain-tassel { width: 16px; height: 50px; }
          .curtain-tassel::before { width: 16px; height: 16px; }
          .curtain-tassel::after { width: 14px; height: 30px; }
        }
      `}</style>

      {/* ========= CONFETTI ========= */}
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 60 }).map((_, i) => {
            const colors = ["#FFD700", "#FF6347", "#32CD32", "#1E90FF", "#FF69B4", "#FFA500", "#8B5CF6"];
            const color = colors[i % colors.length];
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const dur = 2.5 + Math.random() * 2;
            const size = 6 + Math.random() * 8;
            const shapes = ["50%", "0%", "30%"];
            const shape = shapes[i % 3];
            return (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${left}%`,
                  width: size,
                  height: size * (0.6 + Math.random() * 0.8),
                  backgroundColor: color,
                  borderRadius: shape,
                  animationDelay: `${delay}s`,
                  animationDuration: `${dur}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* ========= FLOWER CORNERS ========= */}
      {["flower-tl", "flower-tr", "flower-bl", "flower-br"].map((cls) => (
        <div key={cls} className={`flower-corner ${cls}`}>
          <svg viewBox="0 0 120 120" fill="currentColor" className="text-primary">
            <path d="M0,0 C40,10 60,30 60,60 C30,60 10,40 0,0Z" />
            <path d="M20,0 C45,20 55,45 50,70 C30,50 15,25 20,0Z" opacity="0.6" />
            <circle cx="15" cy="15" r="4" opacity="0.4" />
            <circle cx="35" cy="10" r="3" opacity="0.3" />
            <circle cx="10" cy="35" r="3" opacity="0.3" />
            <path d="M5,5 Q30,5 40,20 Q20,25 5,5Z" opacity="0.2" />
          </svg>
        </div>
      ))}

      {/* ========= CURTAIN ========= */}
      <div className={`curtain-wrapper ${!curtainOpen ? "interactive" : ""} ${curtainOpen ? "curtain-open" : ""}`}>
        <div className="curtain-valance" />
        <div className="curtain-rope" />

        {/* Left curtain */}
        <div className="curtain-left">
          <div className="curtain-fabric" />
          <div className="curtain-tassel" />
        </div>

        {/* Right curtain */}
        <div className="curtain-right">
          <div className="curtain-fabric" />
          <div className="curtain-tassel" />
        </div>
      </div>

      {/* ========= MAIN CONTENT (behind curtains) ========= */}
      <div className="relative z-10 p-4 sm:p-6 space-y-6 pt-16 sm:pt-14">
        <div className="text-center">
          <h1 className="font-pixel text-sm sm:text-base text-primary neon-glow">✦ INAUGURATION ✦</h1>
          <p className="text-muted-foreground font-mono text-sm">Release problem statements to all participating teams</p>
        </div>

        {/* Status Banner */}
        <Card className={`border-2 max-w-2xl mx-auto ${problemsReleased ? "border-green-500/50 bg-green-500/5" : "border-amber-500/50 bg-amber-500/5"}`}>
          <CardContent className="flex items-center gap-4 py-6">
            {problemsReleased ? (
              <>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500/20 animate-pulse">
                  <Unlock className="h-7 w-7 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold font-mono text-green-500">RELEASED</h2>
                  <p className="text-muted-foreground font-mono text-xs sm:text-sm">
                    Problem statements are live. Teams can view their assigned problems.
                  </p>
                </div>
                <Badge variant="outline" className="border-green-500/50 text-green-500 font-pixel text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 shrink-0">
                  LIVE
                </Badge>
              </>
            ) : (
              <>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                  <Lock className="h-7 w-7 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold font-mono text-amber-500">NOT RELEASED</h2>
                  <p className="text-muted-foreground font-mono text-xs sm:text-sm">
                    Problem statements are hidden. Teams cannot see their assignments yet.
                  </p>
                </div>
                <Badge variant="outline" className="border-amber-500/50 text-amber-500 font-pixel text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 shrink-0">
                  HIDDEN
                </Badge>
              </>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground font-mono">Total Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold font-pixel text-primary">{problemStatements.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground font-mono">Teams Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold font-pixel text-secondary">{teamsWithProblems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold font-pixel text-foreground">{teams.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Action */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="font-mono flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="h-5 w-5 text-primary" />
              {problemsReleased ? "Problem Statements Are Live" : "Ready to Release?"}
            </CardTitle>
            <CardDescription className="font-mono text-xs sm:text-sm">
              {problemsReleased
                ? "All teams can now view their assigned problem statements on the homepage."
                : "Once released, the curtains will open and teams can view their problems."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!problemsReleased ? (
              <Button
                size="lg"
                className="w-full gap-3 font-pixel text-[10px] sm:text-xs py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground transition-all duration-300"
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
                className="w-full gap-3 font-mono text-xs sm:text-sm py-6 border-destructive/30 text-destructive hover:bg-destructive/10 transition-all"
                onClick={() => setRevokeOpen(true)}
              >
                <Lock className="h-4 w-4" />
                Revoke Access (Close Curtains)
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ========= DIALOGS ========= */}

      {/* Release Confirm */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-pixel text-xs text-primary neon-glow flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              RELEASE PROBLEM STATEMENTS
            </DialogTitle>
            <DialogDescription className="font-mono space-y-3 pt-2">
              <span className="block">
                The curtains will open and all assigned problem statements will become visible to teams.
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
              OPEN THE CURTAINS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Confirm */}
      <Dialog open={revokeOpen} onOpenChange={setRevokeOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-mono text-destructive">Close the Curtains?</DialogTitle>
            <DialogDescription className="font-mono">
              The curtains will close and teams will no longer be able to view their problem statements. You can reopen them any time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeOpen(false)} className="font-mono">Cancel</Button>
            <Button variant="destructive" onClick={handleRevoke} className="font-mono gap-2">
              <Lock className="h-4 w-4" />
              Close Curtains
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
