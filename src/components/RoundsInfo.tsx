import { BookOpen, Pencil, Wrench, Presentation, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRounds } from "@/data/hackathonData";

const roundIcons = [BookOpen, Pencil, Wrench, Presentation];
const roundColors = [
  "bg-round1/10 text-round1 border-round1/30",
  "bg-round2/10 text-round2 border-round2/30",
  "bg-round3/10 text-round3 border-round3/30",
  "bg-round4/10 text-round4 border-round4/30",
];
const roundAccents = ["text-round1", "text-round2", "text-round3", "text-round4"];

const RoundsInfo = () => {
  return (
    <section id="rounds" className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 font-pixel text-xl text-primary neon-glow sm:text-2xl">
            GAME ROUNDS
          </h2>
          <p className="text-muted-foreground font-mono">
            Four rounds of increasing intensity. Only the best survive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockRounds.map((round, index) => {
            const Icon = roundIcons[index];
            return (
              <Card key={round.id} className={`group border transition-all hover:shadow-lg hover:-translate-y-1 ${roundColors[index]} neon-border`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${roundColors[index]}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={`font-pixel text-xs ${roundAccents[index]}`}>
                          ROUND {round.number}
                        </span>
                        <CardTitle className="text-lg text-foreground">{round.name}</CardTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-mono">
                      <Clock className="mr-1 h-3 w-3" />
                      {round.durationMinutes}min
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-foreground/70">{round.description}</CardDescription>


                  <div className="space-y-2">
                    <p className="font-pixel text-[10px] text-muted-foreground">INSTRUCTIONS:</p>
                    {round.instructions.map((instruction, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <ChevronRight className={`mt-0.5 h-4 w-4 shrink-0 ${roundAccents[index]}`} />
                        <span className="font-mono">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoundsInfo;
