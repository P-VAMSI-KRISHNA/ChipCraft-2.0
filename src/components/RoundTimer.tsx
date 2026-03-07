import { useState, useEffect } from "react";

interface RoundTimerProps {
  targetTime: Date;
  label: string;
}

const RoundTimer = ({ targetTime, label }: RoundTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  if (isExpired) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-center">
        <span className="font-pixel text-xs text-accent neon-glow-green animate-blink">ROUND ACTIVE!</span>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
      <p className="mb-2 text-center font-pixel text-[10px] text-muted-foreground">{label}</p>
      <div className="flex items-center justify-center gap-2">
        {[
          { val: pad(timeLeft.hours), unit: "HRS" },
          { val: pad(timeLeft.minutes), unit: "MIN" },
          { val: pad(timeLeft.seconds), unit: "SEC" },
        ].map((block, i) => (
          <div key={block.unit} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <span className="font-pixel text-lg text-primary neon-glow sm:text-xl">{block.val}</span>
              <span className="font-pixel text-[8px] text-muted-foreground">{block.unit}</span>
            </div>
            {i < 2 && <span className="font-pixel text-lg text-primary/50 animate-blink">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundTimer;
