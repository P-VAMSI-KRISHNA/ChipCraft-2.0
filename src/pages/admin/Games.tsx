import { useState } from "react";
import { Sparkles, Timer, Users, Trophy, CheckCheck, Gamepad2, Power } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockGames } from "@/data/hackathonData";
import { useTeamContext } from "@/context/TeamContext";
import { useToast } from "@/hooks/use-toast";
import { useFunZone } from "@/context/FunZoneContext";

type ScheduledGameState = Record<string, string>;
type AnnouncedGameState = Record<string, boolean>;

const breakOptions = [
  "Unscheduled",
  "Between Rounds 1 & 2",
  "Midnight Fun Break",
  "Between Rounds 2 & 3",
  "Breakfast Break",
];

export default function Games() {
  const { toast } = useToast();
  const { funZoneEnabled, setFunZoneEnabled } = useFunZone();
  const { teams } = useTeamContext();

  const [scheduledGames, setScheduledGames] = useState<ScheduledGameState>(() => {
    const initial: ScheduledGameState = {};
    mockGames.forEach((game) => {
      initial[game.id] = game.breakSlot ?? "Unscheduled";
    });
    return initial;
  });

  const [announcedGames, setAnnouncedGames] = useState<AnnouncedGameState>({});

  const totalTeams = teams.length;

  const handleScheduleChange = (gameId: string, slot: string) => {
    if (announcedGames[gameId]) {
      setAnnouncedGames((prev) => ({ ...prev, [gameId]: false }));
    }
    setScheduledGames((prev) => ({ ...prev, [gameId]: slot }));
  };

  const handleAnnounce = (gameId: string) => {
    const game = mockGames.find((g) => g.id === gameId);
    const slot = scheduledGames[gameId];

    if (!game) return;

    if (slot === "Unscheduled") {
      toast({
        title: "Cannot announce an unscheduled game",
        description: "Please select a break slot before announcing.",
        variant: "destructive",
      });
      return;
    }

    if (announcedGames[gameId]) {
      setAnnouncedGames((prev) => ({ ...prev, [gameId]: false }));
      toast({
        title: "Announcement retracted",
        description: `${game.name} announcement has been removed.`,
      });
    } else {
      setAnnouncedGames((prev) => ({ ...prev, [gameId]: true }));
      toast({
        title: `🎮 ${game.name} Announced!`,
        description: `Teams will be notified to play during: ${slot}`,
      });
    }
  };

  const handleFunZoneToggle = (enabled: boolean) => {
    setFunZoneEnabled(enabled);
    toast({
      title: enabled ? "🎮 Fun Zone Enabled!" : "Fun Zone Disabled",
      description: enabled
        ? "Participants can now access the Fun Zone at /games."
        : "The Fun Zone is now hidden from participants.",
    });
  };

  const scheduledCount = new Set(
    Object.values(scheduledGames).filter((slot) => slot && slot !== "Unscheduled"),
  ).size;

  const announcedCount = Object.values(announcedGames).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-pixel text-sm text-secondary neon-glow-cyan">FUN GAMES</h1>
        <p className="text-muted-foreground font-mono">
          Admin-only control panel for mini-games between teams during 24-hour breaks.
        </p>
      </div>

      {/* Fun Zone Master Toggle */}
      <Card className={`border-2 transition-all ${funZoneEnabled ? "border-accent/50 bg-accent/5" : "border-border"}`}>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${funZoneEnabled ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>
                <Gamepad2 className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="font-mono flex items-center gap-2">
                  Fun Zone Access
                  <Badge
                    variant="outline"
                    className={`font-pixel text-[9px] ${funZoneEnabled ? "border-accent text-accent bg-accent/10" : "border-muted-foreground text-muted-foreground"}`}
                  >
                    {funZoneEnabled ? "ENABLED" : "DISABLED"}
                  </Badge>
                </CardTitle>
                <CardDescription className="font-mono">
                  {funZoneEnabled
                    ? "Participants can access the Fun Zone at /games right now."
                    : "Fun Zone is hidden from participants. Enable it during a break."}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="funzone-toggle" className="font-mono text-sm cursor-pointer">
                {funZoneEnabled ? "Disable" : "Enable"} Fun Zone
              </Label>
              <Switch
                id="funzone-toggle"
                checked={funZoneEnabled}
                onCheckedChange={handleFunZoneToggle}
                className="data-[state=checked]:bg-accent"
              />
            </div>
          </div>
        </CardHeader>
        {funZoneEnabled && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
              <Power className="h-4 w-4 text-accent animate-pulse" />
              <p className="font-mono text-sm text-accent">
                Fun Zone is <strong>LIVE</strong> — participants can play at{" "}
                <span className="underline">/games</span>
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-secondary">{totalTeams}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Available Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel">{mockGames.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Scheduled Breaks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-primary">{scheduledCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-mono">Announced</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-pixel text-accent">{announcedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <Sparkles className="h-5 w-5 text-secondary" />
            Break-Time Games
          </CardTitle>
          <CardDescription className="font-mono">
            Use these to keep all {totalTeams} teams energized during long 24-hour stretches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockGames.map((game) => {
              const isAnnounced = !!announcedGames[game.id];
              const currentSlot = scheduledGames[game.id] ?? game.breakSlot ?? "Unscheduled";
              return (
                <div
                  key={game.id}
                  className={`rounded-lg border p-4 transition-colors ${
                    isAnnounced
                      ? "border-accent/50 bg-accent/5"
                      : "border-border bg-card/80 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="font-pixel text-[9px] text-secondary">
                          FUN GAME
                        </Badge>
                        {isAnnounced && (
                          <Badge className="font-pixel text-[9px] bg-accent/20 text-accent border-accent/40">
                            ANNOUNCED
                          </Badge>
                        )}
                        <h2 className="text-lg font-bold text-foreground">{game.name}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground font-mono">
                        {game.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          {game.durationMinutes} min
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {game.minTeams}–{game.maxTeams} teams
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Trophy className="h-3 w-3 text-warning" />
                          Great for bonus points & morale
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-stretch gap-2 md:w-64">
                      <p className="font-pixel text-[9px] text-muted-foreground">BREAK SLOT</p>
                      <Select
                        value={currentSlot}
                        onValueChange={(slot) => handleScheduleChange(game.id, slot)}
                      >
                        <SelectTrigger className="font-mono text-xs">
                          <SelectValue placeholder="Choose break" />
                        </SelectTrigger>
                        <SelectContent>
                          {breakOptions.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant={isAnnounced ? "default" : "outline"}
                        className={`mt-1 font-mono text-xs gap-1 ${
                          isAnnounced
                            ? "bg-accent hover:bg-accent/80 text-accent-foreground"
                            : ""
                        }`}
                        onClick={() => handleAnnounce(game.id)}
                      >
                        <CheckCheck className="h-3 w-3" />
                        {isAnnounced ? "Announced ✓" : "Mark as Announced"}
                      </Button>
                      <p className="mt-1 text-[11px] text-muted-foreground font-mono">
                        {isAnnounced
                          ? `Active during: ${currentSlot}`
                          : "Share this during the selected break so teams can join in between rounds."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
