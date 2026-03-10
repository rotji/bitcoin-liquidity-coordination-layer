import type { Request, Response } from 'express';
import { getAllProtocols, createProtocol as createProtocolService } from '../services/protocolsService';

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
    console.log('createProtocol request body:', req.body);
    const { name, description } = req.body;
    const protocol = await createProtocolService(name, description);
    console.log('createProtocol result:', protocol);
    res.status(201).json(protocol);
  } catch (err) {
    console.error('createProtocol error:', err);
    res.status(500).json({ error: 'Failed to create protocol' });
  }
};
