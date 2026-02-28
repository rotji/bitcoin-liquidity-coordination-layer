import type { Request, Response } from 'express';
import {
  getAllLiquiditySignals,
  createLiquiditySignal,
} from '../services/liquiditySignalsService.js';

export const getLiquiditySignals = async (req: Request, res: Response) => {
  try {
    const signals = await getAllLiquiditySignals();
    res.json(signals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch liquidity signals' });
  }
};

export const postLiquiditySignal = async (req: Request, res: Response) => {
  try {
    const signal = await createLiquiditySignal(req.body);
    res.status(201).json(signal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create liquidity signal' });
  }
};
