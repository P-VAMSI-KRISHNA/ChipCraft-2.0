import { ArrowRight, Banknote, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSearch = () => {
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-24 bg-paper min-h-screen flex flex-col justify-center border-b-[8px] sm:border-b-[12px] border-double border-border">
      {/* Detailed Vintage Newspaper Background — hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05] hidden md:flex justify-between gap-8 px-8 mix-blend-multiply">
        {/* Faint Newspaper Columns */}
        <div className="w-1/4 h-full border-r border-foreground/30 flex flex-col pt-12 gap-4 whitespace-normal text-justify">
          <h4 className="font-rye text-3xl mb-2 text-foreground">Local News</h4>
          <p className="font-serif text-sm leading-tight text-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p className="font-serif text-sm leading-tight text-foreground">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          <h4 className="font-rye text-2xl mt-8 mb-2 text-foreground">Weather</h4>
          <p className="font-serif text-sm leading-tight text-foreground">Sunny with a chance of engineering breakthroughs. Expect heavy soldering in the evening.</p>
        </div>
        <div className="w-1/4 h-full border-r border-foreground/30 flex flex-col pt-32 gap-4 whitespace-normal text-justify">
          <h4 className="font-rye text-4xl mb-2 text-foreground">Classifieds</h4>
          <p className="font-serif text-sm leading-tight text-foreground">Wanted: Experienced Verilog developer for late-night debugging session. Will pay in pizza and energy drinks.</p>
          <p className="font-serif text-sm leading-tight text-foreground">For Sale: Used breadboard, slightly scorched. Still works perfectly. Contact lab assistant.</p>
          <div className="w-full h-48 border-4 border-double border-foreground mt-8 flex items-center justify-center">
            <span className="font-rye text-xl">ADVERTISEMENT</span>
          </div>
        </div>
        <div className="w-1/4 h-full border-r border-foreground/30 flex flex-col pt-16 gap-4 whitespace-normal text-justify">
          <h4 className="font-rye text-3xl mb-2 text-foreground">Technology</h4>
          <p className="font-serif text-sm leading-tight text-foreground">The future is silicon. New developments in chip design are revolutionizing the industry. Experts predict a surge in custom ASIC designs over the next decade.</p>
          <p className="font-serif text-sm leading-tight text-foreground">Students at IEEE KARE are leading the charge with innovative hackathons producing top-tier talent ready for the global market.</p>
        </div>
        <div className="w-1/4 h-full flex flex-col pt-48 gap-4 whitespace-normal text-justify">
          <p className="font-serif text-sm leading-tight text-foreground">Voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className="w-32 h-32 rounded-full border border-foreground mx-auto mt-12 flex items-center justify-center transform -rotate-12">
            <span className="font-rye text-lg text-center">APPROVED<br/>SEAL</span>
          </div>
        </div>

        {/* Faint Ink stains */}
        <div className="absolute top-[20%] left-[30%] w-64 h-64 bg-foreground rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-primary rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-5xl text-center space-y-4 sm:space-y-6">
          
          <div className="py-2 sm:py-4 overflow-hidden">
            <h1 className="font-rye text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] text-foreground drop-shadow-md uppercase leading-tight sm:leading-none" style={{ textShadow: '3px 3px 0px hsl(var(--card))' }}>
              ChipCraft 2.0
            </h1>
          </div>

          <p className="font-serif text-base sm:text-lg md:text-xl font-bold inline-block px-3 sm:px-4 py-1">
            Dates: 13<sup className="font-normal text-xs sm:text-sm">th</sup> March to 14<sup className="font-normal text-xs sm:text-sm">th</sup> March, 2026
          </p>

          <div className="my-6 sm:my-10 p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-double border-foreground bg-card/60 mx-auto max-w-4xl relative vintage-shadow">
            <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-paper px-4 sm:px-6 border-x-2 sm:border-x-4 border-foreground">
              <span className="font-sans font-bold text-xs sm:text-sm tracking-widest uppercase border-b border-foreground pb-0.5">
                About the event:
              </span>
            </div>
            <p className="font-serif text-base sm:text-lg md:text-xl leading-relaxed mt-3 sm:mt-4 text-justify">
              ChipCraft is a <strong className="font-sans text-base sm:text-xl tracking-wide mx-0.5 sm:mx-1 font-bold">"24 - hour Hackathon"</strong> event, where participants work on <span className="italic">Real - world</span> problem statements, implementing the designs using Verilog HDL, validating functionality through simulation and testbenches, and performing logic synthesis to generate gate-level netlists using <strong>Synopsys EDA tools</strong>.
            </p>
          </div>

          <div className="pt-2 sm:pt-4 pb-6 sm:pb-8 flex justify-center opacity-90">
            <Button size="lg" onClick={scrollToSearch} className="font-rye text-lg sm:text-2xl px-6 sm:px-12 py-5 sm:py-8 rounded-none border-2 sm:border-4 border-foreground bg-transparent hover:bg-foreground hover:text-background transition-colors text-foreground uppercase tracking-wider sm:tracking-widest shadow-[4px_4px_0_hsl(var(--foreground))] sm:shadow-[8px_8px_0_hsl(var(--foreground))] active:shadow-none active:translate-x-1 active:translate-y-1 sm:active:translate-x-2 sm:active:translate-y-2">
              Find Your Team
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
