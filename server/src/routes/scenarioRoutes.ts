import { Router, type Router as ExpressRouter } from 'express';
import { getScenarios, createScenario } from '../controllers/scenarioController';

const router: ExpressRouter = Router();

// GET /api/scenarios - Get all scenarios
router.get('/', getScenarios);

// POST /api/scenarios - Create new scenario
router.post('/', createScenario);

export default router;
