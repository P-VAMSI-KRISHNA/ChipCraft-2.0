import { Cpu, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {/* ChipCraft branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary border-2 border-foreground">
                <Cpu className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-rye text-xl text-primary tracking-wide">ChipCraft 2.0</span>
            </div>
            <p className="text-base text-muted-foreground font-serif">
              The ultimate electronics hackathon.
              <br />
              Design. Build. Demo. Win.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans font-bold tracking-widest uppercase text-muted-foreground mb-4">QUICK LINKS</h4>
            <nav className="flex flex-col gap-2">
              <a href="#rounds" className="text-sm text-foreground/80 hover:text-primary font-sans font-medium transition-colors">Rounds</a>
              <a href="#search" className="text-sm text-foreground/80 hover:text-primary font-sans font-medium transition-colors">Find Your Team</a>
              <a href="#schedule" className="text-sm text-foreground/80 hover:text-primary font-sans font-medium transition-colors">Schedule</a>
            </nav>
          </div>

          {/* IEEE KARE EDS + Contact */}
          <div>
            <h4 className="font-sans font-bold tracking-widest uppercase text-muted-foreground mb-4">ORGANISED BY</h4>
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
                className="h-10 w-10 rounded-full border-2 border-foreground/30 bg-white object-contain p-0.5 shadow-sm"
              />
              <div>
                <p className="font-sans font-bold text-sm text-primary tracking-wide leading-tight">KARE IEEE EDS</p>
                <p className="font-serif text-xs text-muted-foreground leading-tight flex items-center gap-1 mt-1">
                  Visit Website <ExternalLink className="h-3 w-3" />
                </p>
              </div>
            </a>
            <div className="flex flex-col gap-2 mt-4">
              <a href="mailto:chipcraft@ieee-kare.org" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary font-sans font-medium transition-colors">
                <Mail className="h-4 w-4" />
                chipcraft@ieee-kare.org
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t-2 border-dashed border-border pt-6 text-center">
          <p className="font-sans font-bold tracking-widest uppercase text-xs text-muted-foreground">
            © {new Date().getFullYear()} CHIPCRAFT 2.0 — KARE IEEE ELECTRON DEVICES SOCIETY. ALL RIGHTS RESERVED.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <a
              href="https://studentbranches.ieee.org/in-kalasalingam-ed/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-sans font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <img
                src="/KARE IEEE EDS - About.png"
                alt="IEEE KARE EDS"
                className="h-5 w-5 rounded-full bg-white object-contain"
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
