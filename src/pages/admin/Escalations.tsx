import { useState, useEffect, useRef } from "react";
import { Clock, Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockRounds } from "@/data/hackathonData";

const roundColorClasses = [
  "border-round1/30 bg-round1/5",
  "border-round2/30 bg-round2/5",
  "border-round3/30 bg-round3/5",
  "border-round4/30 bg-round4/5",
];

const roundTextColors = ["text-round1", "text-round2", "text-round3", "text-round4"];

const statusBadgeColors: Record<string, string> = {
  upcoming: "border-muted-foreground text-muted-foreground",
  active: "border-accent text-accent",
  completed: "border-secondary text-secondary",
};

type RoundStatus = "upcoming" | "active" | "completed";

interface TimerState {
  running: boolean;
  elapsed: number; // in seconds
  status: RoundStatus;
}

function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

export default function Escalations() {
  const [timers, setTimers] = useState<Record<string, TimerState>>(() => {
    const init: Record<string, TimerState> = {};
    mockRounds.forEach((r) => {
      init[r.id] = { running: false, elapsed: 0, status: r.status as RoundStatus };
    });
    return init;
  });

  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  const handleStart = (id: string) => {
    if (intervalsRef.current[id]) clearInterval(intervalsRef.current[id]);
    intervalsRef.current[id] = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [id]: { ...prev[id], elapsed: prev[id].elapsed + 1 },
      }));
    }, 1000);
    setTimers((prev) => ({
      ...prev,
      [id]: { ...prev[id], running: true, status: "active" },
    }));
  };

  const handlePause = (id: string) => {
    if (intervalsRef.current[id]) {
      clearInterval(intervalsRef.current[id]);
      delete intervalsRef.current[id];
    }
    setTimers((prev) => ({
      ...prev,
      [id]: { ...prev[id], running: false },
    }));
  };

  const handleReset = (id: string) => {
    if (intervalsRef.current[id]) {
      clearInterval(intervalsRef.current[id]);
      delete intervalsRef.current[id];
    }
    setTimers((prev) => ({
      ...prev,
      [id]: { running: false, elapsed: 0, status: "upcoming" },
    }));
  };

  const handleComplete = (id: string) => {
    if (intervalsRef.current[id]) {
      clearInterval(intervalsRef.current[id]);
      delete intervalsRef.current[id];
    }
    setTimers((prev) => ({
      ...prev,
      [id]: { ...prev[id], running: false, status: "completed" },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-accent neon-glow-green">ROUND CONTROL</h1>
        <p className="text-muted-foreground font-mono">Manage round timers and status</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {mockRounds.map((round, i) => (
          <Card key={round.id} className={roundColorClasses[i]}>
            <CardHeader className="pb-2">
              <CardTitle className={`font-pixel text-xs ${roundTextColors[i]}`}>ROUND {round.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{round.name}</p>
              <Badge variant="outline" className={`mt-2 font-mono text-xs capitalize ${statusBadgeColors[timers[round.id]?.status ?? round.status]}`}>
                {timers[round.id]?.status ?? round.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        {mockRounds.map((round, i) => {
          const timer = timers[round.id];
          const durationSeconds = round.durationMinutes * 60;
          const progressPct = Math.min(100, Math.round((timer.elapsed / durationSeconds) * 100));

          return (
            <Card key={round.id}>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <CardTitle className={`flex items-center gap-2 font-mono`}>
                      <Clock className={`h-5 w-5 ${roundTextColors[i]}`} />
                      Round {round.number}: {round.name}
                    </CardTitle>
                    <CardDescription className="font-mono">{round.description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={timer.status === "active" && timer.running ? "default" : "outline"}
                      className="gap-1 font-mono"
                      onClick={() => handleStart(round.id)}
                      disabled={timer.running || timer.status === "completed"}
                    >
                      <Play className="h-3 w-3" />
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 font-mono"
                      onClick={() => handlePause(round.id)}
                      disabled={!timer.running}
                    >
                      <Pause className="h-3 w-3" />
                      Pause
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 font-mono"
                      onClick={() => handleReset(round.id)}
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 font-mono text-secondary border-secondary/40 hover:bg-secondary/10"
                      onClick={() => handleComplete(round.id)}
                      disabled={timer.status === "completed"}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Complete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{progressPct}% of {round.durationMinutes}min</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        timer.status === "completed"
                          ? "bg-secondary"
                          : timer.running
                          ? "bg-primary"
                          : "bg-muted-foreground/40"
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border p-3">
                    <p className="font-pixel text-[10px] text-muted-foreground">DURATION</p>
                    <p className="mt-1 font-mono font-bold">{round.durationMinutes} minutes</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="font-pixel text-[10px] text-muted-foreground">STATUS</p>
                    <Badge variant="outline" className={`mt-1 capitalize ${statusBadgeColors[timer.status]}`}>
                      {timer.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="font-pixel text-[10px] text-muted-foreground mb-2">INSTRUCTIONS</p>
                  <div className="space-y-1">
                    {round.instructions.map((inst, idx) => (
                      <p key={idx} className="text-sm font-mono text-foreground/80">• {inst}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
