export type RoundNumber = 1 | 2 | 3 | 4;

export type RoundStatus = "upcoming" | "active" | "completed";

export interface Round {
  id: string;
  number: RoundNumber;
  name: string;
  description: string;
  instructions: string[];
  durationMinutes: number;
  startTime: Date | null;
  endTime: Date | null;
  status: RoundStatus;
}

export interface ProblemStatement {
  id: string;
  teamNumber: number;
  teamName: string;
  title: string;
  description: string;
}

export interface Team {
  id: string;
  teamNumber: number;
  teamName: string;
  members: string[];
}

export interface Game {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  minTeams: number;
  maxTeams: number;
  breakSlot: string;
}

// Marks for a team per round: teamId → { round1?: number, round2?: number, ... }
export type TeamMarks = {
  teamId: string;
  scores: Partial<Record<RoundNumber, number>>;
};
