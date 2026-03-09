import { useState, useEffect, useCallback } from "react";
import { Gamepad2, RotateCcw, Trophy, Star, ChevronRight, Zap, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFunZone } from "@/context/FunZoneContext";

// ──────────────────────────────────────────────────────────────────
//  GAME 1 — Memory Match (Electronics Components) 
// ──────────────────────────────────────────────────────────────────
const CARD_PAIRS = [
  { id: "resistor",   emoji: "🔧", label: "Resistor" },
  { id: "capacitor",  emoji: "⚡", label: "Capacitor" },
  { id: "led",        emoji: "💡", label: "LED" },
  { id: "transistor", emoji: "🔋", label: "Transistor" },
  { id: "diode",      emoji: "➡️", label: "Diode" },
  { id: "inductor",   emoji: "🌀", label: "Inductor" },
];

interface MemCard {
  uid: number;
  id: string;
  emoji: string;
  label: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck(): MemCard[] {
  const doubled = [...CARD_PAIRS, ...CARD_PAIRS];
  return shuffle(doubled).map((c, i) => ({
    uid: i,
    ...c,
    flipped: false,
    matched: false,
  }));
}

function MemoryMatchGame() {
  const [deck, setDeck] = useState<MemCard[]>(buildDeck);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (deck.every((c) => c.matched)) setWon(true);
  }, [deck]);

  const handleFlip = (uid: number) => {
    if (locked) return;
    const card = deck[uid];
    if (card.flipped || card.matched) return;
    if (selected.length === 1 && selected[0] === uid) return;

    const newSelected = [...selected, uid];
    setDeck((prev) => prev.map((c) => (c.uid === uid ? { ...c, flipped: true } : c)));

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newSelected;
      const cardA = deck[a];
      const cardB = deck.find((c) => c.uid === uid)!;

      if (cardA.id === cardB.id) {
        setTimeout(() => {
          setDeck((prev) =>
            prev.map((c) => (c.id === cardA.id ? { ...c, matched: true } : c))
          );
          setSelected([]);
          setLocked(false);
        }, 600);
      } else {
        setTimeout(() => {
          setDeck((prev) =>
            prev.map((c) =>
              c.uid === a || c.uid === uid ? { ...c, flipped: false } : c
            )
          );
          setSelected([]);
          setLocked(false);
        }, 900);
      }
    } else {
      setSelected(newSelected);
    }
  };

  const reset = () => {
    setDeck(buildDeck());
    setSelected([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">Moves: <span className="text-foreground font-bold">{moves}</span></p>
        <Button size="sm" variant="outline" onClick={reset} className="gap-1 font-mono">
          <RotateCcw className="h-3 w-3" /> New Game
        </Button>
      </div>

      {won && (
        <div className="rounded-lg border border-secondary/40 bg-secondary/10 p-4 text-center animate-pulse">
          <Trophy className="h-8 w-8 text-secondary mx-auto mb-1" />
          <p className="font-pixel text-sm text-secondary neon-glow-cyan">YOU WIN!</p>
          <p className="font-mono text-sm mt-1">Completed in <strong>{moves} moves</strong></p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {deck.map((card) => (
          <button
            key={card.uid}
            onClick={() => handleFlip(card.uid)}
            className={`
              aspect-square rounded-lg border text-2xl flex flex-col items-center justify-center
              transition-all duration-300 cursor-pointer select-none
              ${card.matched
                ? "border-secondary/50 bg-secondary/10 scale-95 cursor-default"
                : card.flipped
                ? "border-primary/50 bg-primary/10 scale-105"
                : "border-border bg-card hover:bg-muted/60 hover:border-primary/30"
              }
            `}
          >
            {(card.flipped || card.matched) ? (
              <>
                <span>{card.emoji}</span>
                <span className="font-pixel text-[8px] mt-1 text-muted-foreground">{card.label}</span>
              </>
            ) : (
              <span className="font-pixel text-xs text-primary">?</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
//  GAME 2 — Logic Gate Quiz
// ──────────────────────────────────────────────────────────────────
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is the output of AND gate when inputs are A=1 and B=0?",
    options: ["0", "1", "X", "Z"],
    correct: 0,
    explanation: "AND gate outputs 1 only when ALL inputs are 1. One input is 0, so output = 0.",
  },
  {
    question: "Which gate outputs 1 when at least one input is 1?",
    options: ["AND", "NOR", "OR", "XNOR"],
    correct: 2,
    explanation: "OR gate outputs 1 if ANY input is 1.",
  },
  {
    question: "What is the output of NOT gate when input is 0?",
    options: ["0", "1", "High-Z", "Undefined"],
    correct: 1,
    explanation: "NOT gate inverts the input. NOT(0) = 1.",
  },
  {
    question: "XOR gate output for A=1, B=1?",
    options: ["0", "1", "Z", "X"],
    correct: 0,
    explanation: "XOR (Exclusive OR) outputs 1 only when inputs DIFFER. 1≠1 is false, so output = 0.",
  },
  {
    question: "Which gate is known as the 'universal gate'?",
    options: ["AND", "OR", "NAND", "XOR"],
    correct: 2,
    explanation: "NAND gate is called the universal gate because any logic function can be built from NAND gates alone.",
  },
  {
    question: "How many inputs does a half adder have?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "A half adder has exactly 2 binary inputs (A and B) and produces a Sum and Carry output.",
  },
  {
    question: "What does CMOS stand for?",
    options: ["Common Metal Oxide Semiconductor", "Complementary Metal-Oxide-Semiconductor", "Controlled Metal Output Switching", "Cyclic MOS"],
    correct: 1,
    explanation: "CMOS stands for Complementary Metal-Oxide-Semiconductor — the dominating technology in modern ICs.",
  },
  {
    question: "Which component stores energy in an electric field?",
    options: ["Resistor", "Inductor", "Capacitor", "Transistor"],
    correct: 2,
    explanation: "Capacitors store energy in an electric field between two conductive plates.",
  },
  {
    question: "What is the forward voltage of a typical silicon diode?",
    options: ["0.1V", "0.7V", "1.5V", "3.3V"],
    correct: 1,
    explanation: "A silicon P-N junction diode has a forward voltage drop of approximately 0.6–0.7V.",
  },
  {
    question: "Ohm's Law states: V = ?",
    options: ["I / R", "I × R", "I + R", "R / I"],
    correct: 1,
    explanation: "Ohm's Law: V = I × R. Voltage equals current multiplied by resistance.",
  },
];

function getShuffledQuestions() {
  return shuffle(QUIZ_QUESTIONS).slice(0, 7);
}

function LogicGateQuiz() {
  const [questions] = useState<QuizQuestion[]>(getShuffledQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const question = questions[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center space-y-4">
        <div className={`rounded-lg border p-6 ${pct >= 70 ? "border-secondary/40 bg-secondary/10" : "border-warning/40 bg-warning/10"}`}>
          <Trophy className={`h-10 w-10 mx-auto mb-3 ${pct >= 70 ? "text-secondary" : "text-warning"}`} />
          <p className={`font-pixel text-lg ${pct >= 70 ? "text-secondary neon-glow-cyan" : "text-warning"}`}>
            {pct >= 90 ? "GENIUS!" : pct >= 70 ? "GREAT JOB!" : pct >= 50 ? "KEEP LEARNING!" : "STUDY MORE!"}
          </p>
          <p className="font-mono text-2xl font-bold mt-2">{score} / {questions.length}</p>
          <p className="font-mono text-sm text-muted-foreground">{pct}% correct</p>
        </div>
        <Button onClick={handleRestart} className="gap-2 font-mono w-full">
          <RotateCcw className="h-4 w-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-muted-foreground">
          Question <span className="text-foreground font-bold">{current + 1}</span> / {questions.length}
        </p>
        <Badge variant="outline" className="font-mono">Score: {score}</Badge>
      </div>

      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${((current) / questions.length) * 100}%` }}
        />
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="font-mono font-semibold text-foreground leading-relaxed">{question.question}</p>
      </div>

      <div className="grid gap-2">
        {question.options.map((opt, idx) => {
          let variant: string = "border-border hover:border-primary/50 hover:bg-primary/5";
          if (selected !== null) {
            if (idx === question.correct) variant = "border-secondary bg-secondary/10 text-secondary";
            else if (idx === selected) variant = "border-destructive bg-destructive/10 text-destructive";
            else variant = "border-border opacity-50";
          }
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all font-mono text-sm ${variant} ${selected === null ? "cursor-pointer" : "cursor-default"}`}
            >
              <span className="font-pixel text-[10px] text-muted-foreground w-4">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="rounded-lg border border-warning/30 bg-warning/5 p-3">
          <p className="font-pixel text-[9px] text-warning mb-1">EXPLANATION</p>
          <p className="font-mono text-sm text-foreground/80">{question.explanation}</p>
        </div>
      )}

      {selected !== null && (
        <Button onClick={handleNext} className="w-full gap-2 font-mono">
          {current + 1 < questions.length ? (
            <>Next Question <ChevronRight className="h-4 w-4" /></>
          ) : (
            <>See Results <Trophy className="h-4 w-4" /></>
          )}
        </Button>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
//  GAME 3 — Component Bingo
// ──────────────────────────────────────────────────────────────────
const BINGO_COMPONENTS = [
  "Resistor", "Capacitor", "LED", "Transistor", "Diode",
  "Inductor", "Relay", "Buzzer", "MOSFET", "Op-Amp",
  "Oscillator", "Regulator", "ADC", "DAC", "UART",
  "SPI", "I2C", "PWM", "EEPROM", "Sensor",
  "Display", "Motor", "Servo", "Encoder", "Timer",
];

function buildBingoGrid() {
  return shuffle(BINGO_COMPONENTS).slice(0, 25);
}

function ComponentBingo() {
  const [grid, setGrid] = useState<string[]>(buildBingoGrid);
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [called, setCalled] = useState<string[]>([]);
  const [calling, setCalling] = useState<string | null>(null);
  const [bingo, setBingo] = useState(false);

  const checkBingo = useCallback((markedSet: Set<number>) => {
    const lines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
      [0,6,12,18,24],[4,8,12,16,20],
    ];
    return lines.some((line) => line.every((idx) => markedSet.has(idx)));
  }, []);

  const callNext = () => {
    const remaining = BINGO_COMPONENTS.filter((c) => !called.includes(c));
    if (remaining.length === 0) return;
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    setCalling(next);
    setCalled((prev) => [...prev, next]);
  };

  const markCell = (idx: number) => {
    if (bingo) return;
    const comp = grid[idx];
    if (!called.includes(comp)) return;
    const newMarked = new Set(marked);
    if (newMarked.has(idx)) {
      newMarked.delete(idx);
    } else {
      newMarked.add(idx);
    }
    setMarked(newMarked);
    if (checkBingo(newMarked)) setBingo(true);
  };

  const reset = () => {
    setGrid(buildBingoGrid());
    setMarked(new Set());
    setCalled([]);
    setCalling(null);
    setBingo(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <Button onClick={callNext} className="gap-2 font-mono" disabled={bingo}>
          <Zap className="h-4 w-4" /> Call Next Component
        </Button>
        <Button size="sm" variant="outline" onClick={reset} className="gap-1 font-mono">
          <RotateCcw className="h-3 w-3" /> Reset
        </Button>
      </div>

      {calling && (
        <div className="rounded-lg border border-secondary/50 bg-secondary/10 p-3 text-center">
          <p className="font-pixel text-[9px] text-muted-foreground">CALLED COMPONENT</p>
          <p className="font-pixel text-lg text-secondary neon-glow-cyan mt-1">{calling}</p>
          <p className="font-mono text-xs text-muted-foreground mt-1">Mark it on your card if you have it!</p>
        </div>
      )}

      {bingo && (
        <div className="rounded-lg border border-accent/50 bg-accent/10 p-4 text-center animate-pulse">
          <Trophy className="h-8 w-8 text-accent mx-auto mb-1" />
          <p className="font-pixel text-lg text-accent neon-glow-green">BINGO! 🎉</p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-1.5">
        {grid.map((comp, idx) => {
          const isMarked = marked.has(idx);
          const isAvail = called.includes(comp);
          return (
            <button
              key={idx}
              onClick={() => markCell(idx)}
              className={`
                rounded border text-[10px] font-mono p-1.5 leading-tight
                flex items-center justify-center text-center transition-all min-h-[44px]
                ${isMarked
                  ? "border-accent bg-accent/20 text-accent font-bold"
                  : isAvail
                  ? "border-primary/40 bg-primary/5 text-foreground cursor-pointer hover:bg-primary/10"
                  : "border-border/40 text-muted-foreground/40 cursor-not-allowed"
                }
              `}
            >
              {comp}
            </button>
          );
        })}
      </div>

      {called.length > 0 && (
        <div>
          <p className="font-pixel text-[9px] text-muted-foreground mb-2">CALLED ({called.length})</p>
          <div className="flex flex-wrap gap-1">
            {called.map((c) => (
              <Badge key={c} variant="outline" className="font-mono text-[10px]">{c}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────
//  Main Games Page
// ──────────────────────────────────────────────────────────────────
const GAMES = [
  {
    id: "memory",
    name: "Memory Match",
    emoji: "🧠",
    description: "Flip cards to find matching electronics component pairs. Test your memory!",
    duration: "5–10 min",
    players: "Solo / Team",
    color: "text-primary",
    borderColor: "border-primary/30",
    bgColor: "bg-primary/5",
    component: MemoryMatchGame,
  },
  {
    id: "quiz",
    name: "Logic Gate Quiz",
    emoji: "⚡",
    description: "Test your electronics knowledge with rapid-fire questions about circuits and components.",
    duration: "5 min",
    players: "Solo / Team",
    color: "text-secondary",
    borderColor: "border-secondary/30",
    bgColor: "bg-secondary/5",
    component: LogicGateQuiz,
  },
  {
    id: "bingo",
    name: "Component Bingo",
    emoji: "🎯",
    description: "Call components and mark your bingo card. First to complete a line wins!",
    duration: "10–20 min",
    players: "Team",
    color: "text-accent",
    borderColor: "border-accent/30",
    bgColor: "bg-accent/5",
    component: ComponentBingo,
  },
];

export default function GamesPage() {
  const { funZoneEnabled } = useFunZone();
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const active = GAMES.find((g) => g.id === activeGame);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 ${funZoneEnabled ? "border-secondary/30 bg-secondary/10 neon-border-cyan" : "border-border bg-muted/30"}`}>
              <Gamepad2 className={`h-4 w-4 ${funZoneEnabled ? "text-secondary" : "text-muted-foreground"}`} />
              <span className={`font-mono text-sm ${funZoneEnabled ? "text-secondary" : "text-muted-foreground"}`}>BREAK TIME GAMES</span>
            </div>
            <h1 className={`font-pixel text-2xl mb-3 ${funZoneEnabled ? "text-primary neon-glow" : "text-muted-foreground"}`}>FUN ZONE</h1>
            <p className="text-muted-foreground font-mono">
              {funZoneEnabled ? "Take a break, recharge and play between rounds!" : "Fun Zone is currently not active."}
            </p>
          </div>

          {/* Fun Zone Not Active */}
          {!funZoneEnabled && (
            <div className="flex flex-col items-center justify-center py-20 gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-border bg-muted/20">
                <Lock className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="text-center max-w-md">
                <h2 className="font-pixel text-sm text-muted-foreground mb-3">NOT ACTIVE YET</h2>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  The Fun Zone will open during scheduled breaks. Keep an eye out — the organizers will announce when it's time to play!
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card/50 px-6 py-4 text-center">
                <p className="font-pixel text-[9px] text-muted-foreground mb-1">GAMES AVAILABLE WHEN OPENED</p>
                <div className="flex justify-center gap-4 mt-2">
                  {GAMES.map((g) => (
                    <div key={g.id} className="flex flex-col items-center gap-1">
                      <span className="text-2xl opacity-40">{g.emoji}</span>
                      <span className="font-mono text-[10px] text-muted-foreground/60">{g.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Game selector — only when enabled */}
          {funZoneEnabled && !activeGame && (
            <div className="grid gap-6 md:grid-cols-3">
              {GAMES.map((game) => (
                <Card
                  key={game.id}
                  className={`group border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${game.borderColor} ${game.bgColor}`}
                  onClick={() => setActiveGame(game.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="text-4xl mb-2">{game.emoji}</div>
                    <CardTitle className={`font-mono text-lg ${game.color}`}>{game.name}</CardTitle>
                    <CardDescription className="font-mono text-sm">{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                      <span>⏱ {game.duration}</span>
                      <span>👥 {game.players}</span>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full font-mono gap-2 group-hover:gap-3 transition-all`}
                      onClick={() => setActiveGame(game.id)}
                    >
                      Play Now <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Active game */}
          {funZoneEnabled && active && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 font-mono"
                  onClick={() => setActiveGame(null)}
                >
                  ← Back to Games
                </Button>
                <Badge variant="outline" className={`font-pixel text-[9px] ${active.color}`}>
                  {active.emoji} {active.name}
                </Badge>
              </div>
              <Card className={`border ${active.borderColor}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{active.emoji}</span>
                    <div>
                      <CardTitle className={`font-mono ${active.color}`}>{active.name}</CardTitle>
                      <CardDescription className="font-mono text-sm">{active.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <active.component />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stars row — only when enabled */}
          {funZoneEnabled && (
            <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-warning fill-warning" />
              ))}
              <span className="font-mono text-sm ml-2">Have fun and come back refreshed!</span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
