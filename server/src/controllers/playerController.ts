import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../config/database';

export const generateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const player = await prisma.player.findUnique({
      where: { id },
    });

    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // This would integrate with LLM service to generate personality profile
    const profile = await prisma.playerProfile.create({
      data: {
        id: uuidv4(),
        playerId: id,
        personality: 'Generated personality profile',
        preferences: ['fun', 'adventure'],
      },
    });

    res.json({ profile });
  } catch (error) {
    next(error);
  }
};
