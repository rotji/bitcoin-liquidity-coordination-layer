import type { Request, Response } from 'express';
import { getAllProtocols, createProtocol as createProtocolService } from '../services/protocolsService.js';

export const getProtocols = async (req: Request, res: Response) => {
  try {
    const protocols = await getAllProtocols();
    res.json(protocols);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch protocols' });
  }
};

export const createProtocol = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const protocol = await createProtocolService(name, description);
    res.status(201).json(protocol);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create protocol' });
  }
};
