import { BookOpen, Pencil, Wrench, Presentation } from "lucide-react";

const steps = [
  { icon: BookOpen, step: "01", title: "Circuit Quiz", description: "Prove your electronics fundamentals with rapid-fire MCQs" },
  { icon: Pencil, step: "02", title: "Schematic Design", description: "Design a circuit solution for your assigned problem" },
  { icon: Wrench, step: "03", title: "Build & Prototype", description: "Bring your design to life on a breadboard" },
  { icon: Presentation, step: "04", title: "Demo & Pitch", description: "Present your working prototype to the judges" },
];

const HowItWorks = () => {
  return (
    <section id="schedule" className="py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 font-pixel text-xl text-accent neon-glow-green sm:text-2xl">THE JOURNEY</h2>
          <p className="text-muted-foreground font-mono">From quiz to demo — your path through ChipCraft</p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-round1 via-round2 to-round4 lg:left-1/2 lg:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const roundColors = ["text-round1", "text-round2", "text-round3", "text-round4"];
              const bgColors = ["bg-round1/10", "bg-round2/10", "bg-round3/10", "bg-round4/10"];
              return (
                <div key={step.step} className={`flex items-center gap-6 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${index % 2 === 1 ? "lg:text-right" : ""}`}>
                    <div className="rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/30">
                      <span className={`font-pixel text-xs ${roundColors[index]}`}>ROUND {step.step}</span>
                      <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground font-mono">{step.description}</p>
                    </div>
                  </div>
                  <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${bgColors[index]} border border-border`}>
                    <step.icon className={`h-6 w-6 ${roundColors[index]}`} />
                  </div>
                  <div className="hidden flex-1 lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
