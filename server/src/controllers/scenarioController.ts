import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
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
    const { name, description, tone, isAdult } = req.body;

    const scenario = await prisma.scenario.create({
      data: {
        id: uuidv4(),
        name,
        description,
        tone,
        isAdult: isAdult || false,
      },
    });

    res.status(201).json({ scenario });
  } catch (error) {
    next(error);
  }
};
