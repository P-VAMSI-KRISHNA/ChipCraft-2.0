import { useState, useEffect } from "react";
import { useResultsContext } from "@/context/ResultsContext";
import { Trophy, Medal, Award, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResultsDisplay() {
  const { resultsState, winners } = useResultsContext();
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [prevState, setPrevState] = useState(resultsState);

  // Reset curtain on every state change so it re-animates
  useEffect(() => {
    if (resultsState !== prevState) {
      setCurtainOpen(false);
      const timer = setTimeout(() => {
        setCurtainOpen(true);
        setPrevState(resultsState);
      }, 600);
      return () => clearTimeout(timer);
    }
    if (resultsState > 0) setCurtainOpen(true);
  }, [resultsState, prevState]);

  // Don't render if hidden
  if (resultsState === 0) return null;
  if (!winners) return null;

  return (
    <section id="results" className="py-16 md:py-24 relative overflow-hidden bg-background">
      <style>{`
        .results-curtain-wrap { position: absolute; inset: 0; z-index: 30; pointer-events: none; overflow: hidden; }
        .results-curtain-wrap.c-open { opacity: 0; transition: opacity 0.8s ease 1.2s; }
        .rc-left, .rc-right { position: absolute; top: 0; bottom: 0; width: 52%; transition: transform 1.2s cubic-bezier(0.76, 0, 0.24, 1); will-change: transform; }
        .rc-left { left: 0; transform: translateX(0); }
        .rc-right { right: 0; transform: translateX(0); }
        .c-open .rc-left { transform: translateX(-105%); }
        .c-open .rc-right { transform: translateX(105%); }
        .rc-fabric { width: 100%; height: 100%; position: relative; overflow: hidden; }
        .rc-left .rc-fabric { background: linear-gradient(135deg, #1A365D 0%, #2A4365 15%, #2C5282 25%, #2A4365 40%, #1A365D 55%, #1A202C 70%, #2A4365 85%, #1A365D 100%); }
        .rc-right .rc-fabric { background: linear-gradient(225deg, #1A365D 0%, #2A4365 15%, #2C5282 25%, #2A4365 40%, #1A365D 55%, #1A202C 70%, #2A4365 85%, #1A365D 100%); }
        .rc-fabric::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.15) 8px, transparent 16px, rgba(255,255,255,0.08) 24px, transparent 32px); }
        .rc-fabric::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 8%, transparent 85%, rgba(0,0,0,0.3) 100%); }
        .rc-valance { position: absolute; top: 0; left: -5%; right: -5%; height: 30px; background: linear-gradient(180deg, #C0C0C0 0%, #E8E8E8 30%, #C0C0C0 50%, #A9A9A9 100%); z-index: 35; box-shadow: 0 4px 12px rgba(0,0,0,0.5); }
        .rc-rope { position: absolute; top: 28px; left: 0; right: 0; height: 4px; background: repeating-linear-gradient(90deg, #C0C0C0 0px, #A9A9A9 4px, #C0C0C0 8px); z-index: 36; }
      `}</style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-warning/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="container px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-warning/20 text-warning hover:bg-warning/20 border-warning/50 font-mono px-3 py-1">
            <Sparkles className="h-3 w-3 mr-2 inline" />RESULTS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-pixel text-foreground drop-shadow-[0_0_15px_rgba(var(--warning),0.3)]">
            WINNERS <span className="text-warning">ANNOUNCED</span>
          </h2>
        </div>

        {/* Single card display area with curtain */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          {/* Curtain overlay */}
          <div className={`results-curtain-wrap ${curtainOpen ? "c-open" : ""}`}>
            <div className="rc-valance" />
            <div className="rc-rope" />
            <div className="rc-left"><div className="rc-fabric" /></div>
            <div className="rc-right"><div className="rc-fabric" /></div>
          </div>

          {/* Content behind curtain */}
          <div className={`w-full transition-opacity duration-1000 ${curtainOpen ? "opacity-100" : "opacity-0"}`}>
            {/* 3rd place */}
            {resultsState === 3 && (
              <div className="max-w-md mx-auto">
                <Card className="border-orange-600/50 bg-black/60 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
                  <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-orange-900/50 flex items-center justify-center border-2 border-orange-500/50 shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                      <Award className="h-10 w-10 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-pixel text-2xl text-orange-500 mb-1">3rd Place</h3>
                    </div>
                    <div className="w-full h-[1px] bg-border" />
                    <div>
                      <p className="font-bold text-2xl text-foreground">{winners.third.teamName}</p>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{winners.third.college}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 2nd place */}
            {resultsState === 2 && (
              <div className="max-w-md mx-auto">
                <Card className="border-gray-400/50 bg-black/60 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-500" />
                  <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
                    <div className="h-20 w-20 rounded-full bg-gray-500/20 flex items-center justify-center border-2 border-gray-400/50 shadow-[0_0_20px_rgba(156,163,175,0.3)]">
                      <Medal className="h-10 w-10 text-gray-300" />
                    </div>
                    <div>
                      <h3 className="font-pixel text-2xl text-gray-300 mb-1">2nd Place</h3>
                    </div>
                    <div className="w-full h-[1px] bg-border" />
                    <div>
                      <p className="font-bold text-2xl text-foreground">{winners.second.teamName}</p>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{winners.second.college}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 1st place — two winners side by side */}
            {resultsState === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {/* Winner A */}
                <Card className="border-warning bg-warning/10 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(var(--warning),0.3)]">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-300 via-warning to-yellow-600" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-warning/30 blur-[40px] rounded-full pointer-events-none" />
                  <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className="h-20 w-20 rounded-full bg-warning/20 flex items-center justify-center border-4 border-warning shadow-[0_0_30px_rgba(var(--warning),0.6)]">
                      <Trophy className="h-10 w-10 text-warning animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-pixel text-2xl text-warning mb-1" style={{ textShadow: "0 0 10px hsl(45 100% 55% / 0.8)" }}>WINNER</h3>
                    </div>
                    <div className="w-full h-[1px] bg-warning/30" />
                    <div>
                      <p className="font-bold text-2xl text-foreground drop-shadow-md">{winners.firstA.teamName}</p>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{winners.firstA.college}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Winner B */}
                <Card className="border-warning bg-warning/10 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(var(--warning),0.3)]">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-300 via-warning to-yellow-600" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-warning/30 blur-[40px] rounded-full pointer-events-none" />
                  <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4 relative z-10">
                    <div className="h-20 w-20 rounded-full bg-warning/20 flex items-center justify-center border-4 border-warning shadow-[0_0_30px_rgba(var(--warning),0.6)]">
                      <Trophy className="h-10 w-10 text-warning animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-pixel text-2xl text-warning mb-1" style={{ textShadow: "0 0 10px hsl(45 100% 55% / 0.8)" }}>WINNER</h3>
                    </div>
                    <div className="w-full h-[1px] bg-warning/30" />
                    <div>
                      <p className="font-bold text-2xl text-foreground drop-shadow-md">{winners.firstB.teamName}</p>
                      <p className="text-sm font-mono text-muted-foreground mt-1">{winners.firstB.college}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
