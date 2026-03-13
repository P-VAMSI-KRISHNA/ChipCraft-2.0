import { Lightbulb, Code, Cpu, Presentation, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRounds } from "@/data/hackathonData";

const roundIcons = [Lightbulb, Code, Cpu, Presentation];
const roundColors = [
  "bg-round1/10 text-round1 border-round1/30",
  "bg-round2/10 text-round2 border-round2/30",
  "bg-round3/10 text-round3 border-round3/30",
  "bg-round4/10 text-round4 border-round4/30",
];
const roundAccents = ["text-round1", "text-round2", "text-round3", "text-round4"];

const RoundsInfo = () => {
  return (
    <section id="rounds" className="py-12 sm:py-20">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
          <h2 className="mb-3 sm:mb-4 font-pixel text-lg sm:text-xl text-primary neon-glow sm:text-2xl">
            GAME ROUNDS
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-mono">
            Four rounds of increasing intensity. Only the best survive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockRounds.map((round, index) => {
            const Icon = roundIcons[index];
            return (
              <Card key={round.id} className={`group border transition-all hover:shadow-lg hover:-translate-y-1 ${roundColors[index]} neon-border`}>
                <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${roundColors[index]}`}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <span className={`font-pixel text-[10px] sm:text-xs ${roundAccents[index]}`}>
                          ROUND {round.number}
                        </span>
                        <CardTitle className="text-base sm:text-lg text-foreground">{round.name}</CardTitle>
                      </div>
                    </div>

                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
                  <CardDescription className="text-foreground/70 text-sm sm:text-base">{round.description}</CardDescription>


                  <div className="space-y-1.5 sm:space-y-2">
                    <p className="font-pixel text-[9px] sm:text-[10px] text-muted-foreground">DELIVERABLES:</p>
                    {round.instructions.map((instruction, i) => (
                      <div key={i} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/80">
                        <ChevronRight className={`mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${roundAccents[index]}`} />
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
