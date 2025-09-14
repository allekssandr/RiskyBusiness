// Основные типы приложения

export interface Player {
  id: string;
  name: string;
  avatar?: string;
}

export interface GameScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // в минутах
  minPlayers: number;
  maxPlayers: number;
}

export interface GameState {
  id: string;
  players: Player[];
  scenario: GameScenario;
  currentRound: number;
  totalRounds: number;
  status: 'waiting' | 'active' | 'paused' | 'completed';
  createdAt: Date;
}

export interface GameAction {
  id: string;
  type: 'question' | 'dare' | 'choice';
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  targetPlayer?: string;
}

// Навигационные типы
export type RootStackParamList = {
  Home: undefined;
  AddPlayers: undefined;
  ScenarioSelect: { players: Player[] };
  Game: { players: Player[]; scenario: GameScenario };
};