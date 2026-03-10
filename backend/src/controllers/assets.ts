import type { Request, Response } from 'express';
import { getAllAssets, createAsset as createAssetService } from '../services/assetsService';

export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await getAllAssets();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

export const createAsset = async (req: Request, res: Response) => {
  try {
    console.log('createAsset request body:', req.body);
    const { name, symbol, protocolId } = req.body;
    const asset = await createAssetService(name, symbol, protocolId);
    console.log('createAsset result:', asset);
    res.status(201).json(asset);
  } catch (err) {
    console.error('createAsset error:', err);
    res.status(500).json({ error: 'Failed to create asset' });
  }
};
