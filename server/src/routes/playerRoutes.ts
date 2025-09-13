import { Router, type Router as ExpressRouter } from 'express';
import { generateProfile } from '../controllers/playerController';

const router: ExpressRouter = Router();

// POST /api/players/:id/profile - Generate player profile
router.post('/:id/profile', generateProfile);

export default router;
