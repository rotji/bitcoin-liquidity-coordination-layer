import type { Request, Response } from 'express';
import {
  getAllRoutingIntents,
  createRoutingIntent,
} from '../services/routingIntentsService.js';

export const getRoutingIntents = async (req: Request, res: Response) => {
  try {
    const intents = await getAllRoutingIntents();
    res.json(intents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch routing intents' });
  }
};

export const postRoutingIntent = async (req: Request, res: Response) => {
  try {
    const intent = await createRoutingIntent(req.body);
    res.status(201).json(intent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create routing intent' });
  }
};
