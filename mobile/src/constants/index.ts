// Константы приложения

export const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#0f0f23',
  surface: 'rgba(255, 255, 255, 0.1)',
  surfaceLight: 'rgba(255, 255, 255, 0.2)',
  text: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  accent: '#f59e0b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const GLASSMORPHISM = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
} as const;

export const GAME_CONFIG = {
  minPlayers: 2,
  maxPlayers: 8,
  defaultRounds: 10,
} as const;

export const API_ENDPOINTS = {
  baseUrl: 'http://localhost:3000/api',
  players: '/players',
  scenarios: '/scenarios',
  games: '/games',
} as const;