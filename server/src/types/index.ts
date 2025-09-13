export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  hostId: string;
  scenarioId: string;
  status: 'waiting' | 'active' | 'completed';
  currentPlayerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Player {
  id: string;
  gameId: string;
  userId: string;
  name: string;
  avatar?: string;
  order: number;
  createdAt: Date;
}

export interface PlayerProfile {
  id: string;
  playerId: string;
  personality: string;
  preferences: string[];
  createdAt: Date;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  tone: 'classic' | 'party' | 'deep' | 'wild';
  isAdult: boolean;
  createdAt: Date;
}

export interface GeneratedItem {
  id: string;
  type: 'truth' | 'dare';
  content: string;
  scenarioId: string;
  playerProfileId?: string;
  createdAt: Date;
}

export interface Turn {
  id: string;
  gameId: string;
  playerId: string;
  generatedItemId: string;
  choice: 'truth' | 'dare';
  result?: string;
  completedAt?: Date;
  createdAt: Date;
}

export interface CreateGameRequest {
  hostId: string;
  scenarioId: string;
}

export interface AddPlayerRequest {
  name: string;
  avatar?: string;
}

export interface GenerateItemRequest {
  playerId: string;
  type: 'truth' | 'dare';
}

export interface SubmitTurnRequest {
  result: string;
}
