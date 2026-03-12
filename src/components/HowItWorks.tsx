import { Lightbulb, Code, Cpu, Presentation } from "lucide-react";

const steps = [
  { icon: Lightbulb, step: "01", title: "Problem Statement & Ideation", description: "Define your problem, propose an innovative solution, and present your implementation plan" },
  { icon: Code, step: "02", title: "RTL Simulation & Verification", description: "Write RTL code, design testbenches, verify functionality through simulation" },
  { icon: Cpu, step: "03", title: "Synthesis & Netlist Generation", description: "Synthesize your design, optimize timing, area & power using Synopsys EDA tools" },
  { icon: Presentation, step: "04", title: "Final Presentation", description: "Present your optimized design with results and clear visualization" },
];

const HowItWorks = () => {
  return (
    <section id="schedule" className="py-12 sm:py-20">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto mb-8 sm:mb-12 max-w-2xl text-center">
          <h2 className="mb-3 sm:mb-4 font-pixel text-lg sm:text-xl text-accent neon-glow-green sm:text-2xl">THE JOURNEY</h2>
          <p className="text-sm sm:text-base text-muted-foreground font-mono">From quiz to demo — your path through ChipCraft</p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Central spine line — desktop only */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-round1 via-round2 to-round4 opacity-30 lg:left-1/2 lg:block" />

          <div className="flex flex-col gap-0">
            {steps.map((step, index) => {
              const roundColors = ["text-round1", "text-round2", "text-round3", "text-round4"];
              const bgColors = ["bg-round1/10", "bg-round2/10", "bg-round3/10", "bg-round4/10"];
              const borderColors = ["border-round1/50", "border-round2/50", "border-round3/50", "border-round4/50"];
              const dotColors = ["bg-round1", "bg-round2", "bg-round3", "bg-round4"];
              const isLast = index === steps.length - 1;

              return (
                <div key={step.step}>
                  {/* === MOBILE layout: icon left, card right, vertical connector === */}
                  <div className="flex lg:hidden items-start gap-3 sm:gap-4">
                    {/* Mobile icon + vertical line */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full ${bgColors[index]} border-2 ${borderColors[index]} shadow-sm`}>
                        <step.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${roundColors[index]}`} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 min-h-[2rem] border-l-2 border-dashed ${borderColors[index]} opacity-50 my-1`} />
                      )}
                    </div>
                    {/* Mobile card */}
                    <div className={`flex-1 rounded-lg border-2 ${borderColors[index]} bg-card p-3 sm:p-4 mb-3 sm:mb-4`}>
                      <span className={`font-pixel text-[10px] sm:text-xs ${roundColors[index]}`}>ROUND {step.step}</span>
                      <h3 className="mt-1 text-base sm:text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* === DESKTOP layout: alternating timeline === */}
                  <div className="hidden lg:block">
                    {/* Step row */}
                    <div className={`flex items-center gap-0 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      {/* Card side */}
                      <div className={`flex-1 flex ${index % 2 === 1 ? "lg:justify-start" : "lg:justify-end"} px-4`}>
                        <div className={`rounded-lg border-2 ${borderColors[index]} bg-card p-5 transition-all hover:shadow-md w-full max-w-xs`}>
                          <span className={`font-pixel text-xs ${roundColors[index]}`}>ROUND {step.step}</span>
                          <h3 className="mt-2 text-lg font-bold text-foreground">{step.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground font-mono">{step.description}</p>
                        </div>
                      </div>

                      {/* Horizontal dashed bridge: card → node */}
                      <div className="flex items-center w-6 shrink-0">
                        <div className={`w-full border-t-2 border-dashed ${borderColors[index]} opacity-80`} />
                      </div>

                      {/* Icon node */}
                      <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${bgColors[index]} border-2 ${borderColors[index]} shadow-sm`}>
                        <step.icon className={`h-6 w-6 ${roundColors[index]}`} />
                        {/* Pulse ring */}
                        <span
                          className={`absolute inset-0 rounded-full ${dotColors[index]} opacity-15 animate-ping`}
                          style={{ animationDuration: "2.5s", animationDelay: `${index * 0.4}s` }}
                        />
                      </div>

                      {/* Horizontal dashed bridge: node → empty side */}
                      <div className="flex items-center w-6 shrink-0">
                        <div className={`w-full border-t-2 border-dashed ${borderColors[index]} opacity-80`} />
                      </div>

                      {/* Empty opposite side */}
                      <div className="flex-1" />
                    </div>

                    {/* Vertical connector between steps */}
                    {!isLast && (
                      <div className="relative flex justify-center" style={{ height: "2.5rem" }}>
                        <div
                          className={`w-0.5 border-l-2 border-dashed ${borderColors[index]} opacity-70`}
                          style={{ height: "100%" }}
                        />
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full ${dotColors[index]} shadow animate-bounce z-10`}
                          style={{ animationDuration: "1.2s", animationDelay: `${index * 0.3}s` }}
                        />
                      </div>
                    )}
                  </div>
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
