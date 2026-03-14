import { useState, useEffect } from "react";
import { Sparkles, Award, PartyPopper, RefreshCcw, Lock, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useResultsContext, ResultsState, Winners } from "@/context/ResultsContext";
import { useToast } from "@/hooks/use-toast";

const emptyWinners: Winners = {
  third:  { teamName: "", college: "" },
  second: { teamName: "", college: "" },
  firstA: { teamName: "", college: "" },
  firstB: { teamName: "", college: "" },
};

export default function Valedictory() {
  const { resultsState, winners, setResultsState } = useResultsContext();
  const { toast } = useToast();

  const [confirmState, setConfirmState] = useState<ResultsState | null>(null);
  const [form, setForm] = useState<Winners>(winners || emptyWinners);

  // Sync form if winners arrive from server
  useEffect(() => {
    if (winners) setForm(winners);
  }, [winners]);

  const updateField = (place: keyof Winners, field: "teamName" | "college", value: string) => {
    setForm(prev => ({ ...prev, [place]: { ...prev[place], [field]: value } }));
  };

  const canAnnounce3rd = form.third.teamName.trim() && form.third.college.trim();
  const canAnnounce2nd = form.second.teamName.trim() && form.second.college.trim();
  const canAnnounce1st = form.firstA.teamName.trim() && form.firstA.college.trim() && form.firstB.teamName.trim() && form.firstB.college.trim();

  const handleReveal = async (state: ResultsState) => {
    setConfirmState(null);
    await setResultsState(state, form);
    if (state === 3) {
      toast({ title: "3rd Place Announced!", description: `"${form.third.teamName}" is now visible on the public page.` });
    } else if (state === 2) {
      toast({ title: "2nd Place Announced!", description: `"${form.second.teamName}" is now visible on the public page.` });
    } else if (state === 1) {
      toast({ title: "Winners Announced!", description: `Both winners are now visible on the public page!` });
    } else if (state === 0) {
      toast({ title: "Results Reset", description: "All results hidden from public page." });
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-pixel text-sm sm:text-base text-warning" style={{ textShadow: "0 0 8px hsl(45 100% 55% / 0.8)" }}>✦ VALEDICTORY ✦</h1>
        <p className="text-muted-foreground font-mono text-sm">Enter winners manually and reveal them step by step on the public page</p>
      </div>

      {/* Current state indicator */}
      <Card className={`max-w-3xl mx-auto border-2 ${
        resultsState === 0 ? "border-amber-500/50 bg-amber-500/5" :
        resultsState === 3 ? "border-orange-500/50 bg-orange-500/5" :
        resultsState === 2 ? "border-gray-400/50 bg-gray-400/5" :
        "border-warning/50 bg-warning/5"
      }`}>
        <CardContent className="flex items-center gap-4 py-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            resultsState === 0 ? "bg-amber-500/20" : "bg-green-500/20 animate-pulse"
          }`}>
            {resultsState === 0 ? <Lock className="h-6 w-6 text-amber-500" /> : <Award className="h-6 w-6 text-green-500" />}
          </div>
          <div className="flex-1">
            <h2 className={`text-lg font-bold font-mono ${resultsState === 0 ? "text-amber-500" : "text-green-500"}`}>
              {resultsState === 0 ? "NOT ANNOUNCED" : resultsState === 3 ? "3rd PLACE LIVE" : resultsState === 2 ? "2nd PLACE LIVE" : "WINNERS LIVE"}
            </h2>
            <p className="text-muted-foreground font-mono text-xs">
              {resultsState === 0 ? "Fill in winners below and announce them." : "Results are visible on the public homepage."}
            </p>
          </div>
          <Badge variant="outline" className={`font-pixel text-[10px] px-3 py-1 ${
            resultsState === 0 ? "border-amber-500/50 text-amber-500" : "border-green-500/50 text-green-500"
          }`}>
            {resultsState === 0 ? "HIDDEN" : "LIVE"}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
        {/* INPUT FORM */}
        <Card className="border-warning/30 bg-card">
          <CardHeader>
            <CardTitle className="font-mono flex items-center gap-2"><Sparkles className="h-5 w-5 text-warning" />Winner Details</CardTitle>
            <CardDescription className="font-mono">Enter team name and college for each place.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* 3rd Place */}
            <div className="space-y-2 p-3 rounded-lg border border-orange-600/30 bg-orange-600/5">
              <div className="flex items-center gap-2 mb-2"><Badge className="bg-orange-700">3rd</Badge><span className="font-mono text-sm text-orange-400">Third Place</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs text-muted-foreground">Team Name</Label><Input value={form.third.teamName} onChange={e => updateField("third","teamName",e.target.value)} placeholder="Team name" className="font-mono" disabled={resultsState > 0} /></div>
                <div><Label className="text-xs text-muted-foreground">College</Label><Input value={form.third.college} onChange={e => updateField("third","college",e.target.value)} placeholder="College name" className="font-mono" disabled={resultsState > 0} /></div>
              </div>
            </div>

            {/* 2nd Place */}
            <div className="space-y-2 p-3 rounded-lg border border-gray-400/30 bg-gray-500/5">
              <div className="flex items-center gap-2 mb-2"><Badge className="bg-gray-400 text-black">2nd</Badge><span className="font-mono text-sm text-gray-300">Second Place</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs text-muted-foreground">Team Name</Label><Input value={form.second.teamName} onChange={e => updateField("second","teamName",e.target.value)} placeholder="Team name" className="font-mono" disabled={resultsState > 0 && resultsState <= 2} /></div>
                <div><Label className="text-xs text-muted-foreground">College</Label><Input value={form.second.college} onChange={e => updateField("second","college",e.target.value)} placeholder="College name" className="font-mono" disabled={resultsState > 0 && resultsState <= 2} /></div>
              </div>
            </div>

            {/* 1st Place A */}
            <div className="space-y-2 p-3 rounded-lg border border-warning/30 bg-warning/5">
              <div className="flex items-center gap-2 mb-2"><Badge className="bg-warning text-black">1st</Badge><span className="font-mono text-sm text-warning">Winner A</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs text-muted-foreground">Team Name</Label><Input value={form.firstA.teamName} onChange={e => updateField("firstA","teamName",e.target.value)} placeholder="Team name" className="font-mono" disabled={resultsState === 1} /></div>
                <div><Label className="text-xs text-muted-foreground">College</Label><Input value={form.firstA.college} onChange={e => updateField("firstA","college",e.target.value)} placeholder="College name" className="font-mono" disabled={resultsState === 1} /></div>
              </div>
            </div>

            {/* 1st Place B */}
            <div className="space-y-2 p-3 rounded-lg border border-warning/30 bg-warning/5">
              <div className="flex items-center gap-2 mb-2"><Badge className="bg-warning text-black">1st</Badge><span className="font-mono text-sm text-warning">Winner B</span></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs text-muted-foreground">Team Name</Label><Input value={form.firstB.teamName} onChange={e => updateField("firstB","teamName",e.target.value)} placeholder="Team name" className="font-mono" disabled={resultsState === 1} /></div>
                <div><Label className="text-xs text-muted-foreground">College</Label><Input value={form.firstB.college} onChange={e => updateField("firstB","college",e.target.value)} placeholder="College name" className="font-mono" disabled={resultsState === 1} /></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CONTROLS */}
        <Card className="border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="font-mono flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" />Announcement Controls</CardTitle>
            <CardDescription className="font-mono">Reveal one place at a time on the public homepage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant={resultsState === 3 ? "secondary" : "outline"}
              className={`w-full justify-start gap-3 font-mono ${resultsState === 3 ? 'border-orange-600 ring-2 ring-orange-600/50' : ''}`}
              onClick={() => setConfirmState(3)} disabled={resultsState > 0 || !canAnnounce3rd}>
              <Badge className="bg-orange-700">3rd</Badge>Announce 3rd Place
              {resultsState > 0 && <span className="ml-auto text-xs text-green-500">✓ Done</span>}
            </Button>

            <Button variant={resultsState === 2 ? "secondary" : "outline"}
              className={`w-full justify-start gap-3 font-mono ${resultsState === 2 ? 'border-gray-400 ring-2 ring-gray-400/50' : ''}`}
              onClick={() => setConfirmState(2)} disabled={resultsState !== 3 || !canAnnounce2nd}>
              <Badge className="bg-gray-400 text-black">2nd</Badge>Announce 2nd Place
              {(resultsState === 2 || resultsState === 1) && <span className="ml-auto text-xs text-green-500">✓ Done</span>}
            </Button>

            <Button size="lg"
              className={`w-full gap-3 font-pixel text-xs sm:text-sm py-6 transition-all duration-300 ${
                resultsState === 2 ? "bg-gradient-to-r from-warning to-yellow-500 animate-pulse text-black" : "opacity-50 grayscale pointer-events-none"
              }`}
              onClick={() => setConfirmState(1)} disabled={resultsState !== 2 || !canAnnounce1st}>
              <Badge className="bg-warning text-black">1st</Badge>ANNOUNCE WINNERS<PartyPopper className="h-5 w-5" />
              {resultsState === 1 && <span className="ml-auto text-xs text-green-500">✓ Done</span>}
            </Button>

            {resultsState > 0 && (
              <div className="pt-4 mt-4 border-t border-border">
                <Button variant="outline" className="w-full gap-3 font-mono text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={() => setConfirmState(0)}>
                  <RefreshCcw className="h-4 w-4" />Reset & Hide All Results
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CONFIRMATION DIALOG */}
      <Dialog open={confirmState !== null} onOpenChange={(open) => !open && setConfirmState(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono flex items-center gap-2">
              {confirmState === 0
                ? <span className="text-destructive flex items-center gap-2"><Lock className="h-4 w-4" /> Reset Results?</span>
                : confirmState === 1
                ? <span className="text-warning flex items-center gap-2 font-pixel text-sm"><Award className="h-4 w-4" /> Announce Winners?</span>
                : <span className="text-primary flex items-center gap-2"><Sparkles className="h-4 w-4" /> Announce {confirmState === 2 ? "2nd" : "3rd"} Place?</span>
              }
            </DialogTitle>
            <DialogDescription className="font-mono mt-2">
              {confirmState === 0
                ? "This will hide all results from the public homepage."
                : confirmState === 1
                ? `This will reveal BOTH winners: "${form.firstA.teamName}" & "${form.firstB.teamName}" on the public homepage.`
                : `This will reveal "${confirmState === 2 ? form.second.teamName : form.third.teamName}" on the public homepage.`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmState(null)} className="font-mono">Cancel</Button>
            <Button variant={confirmState === 0 ? "destructive" : "default"}
              className={confirmState === 1 ? "bg-warning text-black hover:bg-warning/90 font-pixel text-[10px]" : "font-mono"}
              onClick={() => { if (confirmState !== null) handleReveal(confirmState); }}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
