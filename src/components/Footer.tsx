import { Cpu, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {/* ChipCraft branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Cpu className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-pixel text-xs text-primary neon-glow">ChipCraft</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              The ultimate electronics hackathon.
              <br />
              Design. Build. Demo. Win.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-pixel text-[10px] text-muted-foreground mb-4">QUICK LINKS</h4>
            <nav className="flex flex-col gap-2">
              <a href="#rounds" className="text-sm text-foreground/70 hover:text-primary font-mono transition-colors">Rounds</a>
              <a href="#search" className="text-sm text-foreground/70 hover:text-primary font-mono transition-colors">Find Your Team</a>
              <a href="#schedule" className="text-sm text-foreground/70 hover:text-primary font-mono transition-colors">Schedule</a>
            </nav>
          </div>

          {/* IEEE KARE EDS + Contact */}
          <div>
            <h4 className="font-pixel text-[10px] text-muted-foreground mb-4">ORGANISED BY</h4>
            <a
              href="https://studentbranches.ieee.org/in-kalasalingam-ed/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-4 flex items-center gap-3 w-fit transition-opacity hover:opacity-90"
              title="KARE IEEE Electron Devices Society"
            >
              <img
                src="/KARE IEEE EDS - About.png"
                alt="KARE IEEE EDS Logo"
                className="h-10 w-10 rounded-full border border-primary/30 bg-white object-contain p-0.5 shadow-sm"
              />
              <div>
                <p className="font-pixel text-[9px] text-primary neon-glow leading-tight">KARE IEEE EDS</p>
                <p className="font-mono text-[10px] text-muted-foreground leading-tight flex items-center gap-1">
                  Visit Website <ExternalLink className="h-2.5 w-2.5" />
                </p>
              </div>
            </a>
            <div className="flex flex-col gap-2">
              <a href="mailto:chipcraft@ieee-kare.org" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary font-mono transition-colors">
                <Mail className="h-4 w-4" />
                chipcraft@ieee-kare.org
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="font-pixel text-[8px] text-muted-foreground">
            © {new Date().getFullYear()} CHIPCRAFT — KARE IEEE ELECTRON DEVICES SOCIETY. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <a
              href="https://studentbranches.ieee.org/in-kalasalingam-ed/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-mono transition-colors"
            >
              <img
                src="/KARE IEEE EDS - About.png"
                alt="IEEE KARE EDS"
                className="h-4 w-4 rounded-full bg-white object-contain"
              />
              studentbranches.ieee.org/in-kalasalingam-ed
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
