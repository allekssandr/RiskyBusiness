import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getScenarios = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const scenarios = await prisma.scenario.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({ scenarios });
  } catch (error) {
    next(error);
  }
};

export const createScenario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, type, isAdult } = req.body;

    const scenario = await prisma.scenario.create({
      data: {
        title,
        description,
        type: type.toUpperCase() as 'CLASSIC' | 'PARTY' | 'DEEP' | 'WILD',
        isAdult: isAdult || false,
      },
    });

    res.status(201).json({ scenario });
  } catch (error) {
    next(error);
  }
};
