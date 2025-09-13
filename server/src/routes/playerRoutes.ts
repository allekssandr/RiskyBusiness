import { Router } from 'express';
import { generateProfile } from '@/controllers/playerController';

const router = Router();

// POST /api/players/:id/profile - Generate player profile
router.post('/:id/profile', generateProfile);

export default router;
