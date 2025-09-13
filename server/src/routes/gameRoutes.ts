import { Router } from 'express';
import { createGame, getGame, addPlayer, startGame, getNextTurn, submitTurn } from '@/controllers/gameController';

const router = Router();

// POST /api/games - Create new game
router.post('/', createGame);

// GET /api/games/:id - Get game details
router.get('/:id', getGame);

// POST /api/games/:id/players - Add player to game
router.post('/:id/players', addPlayer);

// POST /api/games/:id/start - Start the game
router.post('/:id/start', startGame);

// POST /api/games/:id/next - Get next turn for player
router.post('/:id/next', getNextTurn);

// POST /api/turns/:id/submit - Submit turn result
router.post('/turns/:id/submit', submitTurn);

export default router;
