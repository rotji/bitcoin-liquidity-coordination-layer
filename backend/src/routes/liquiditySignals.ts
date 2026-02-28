import { Router } from 'express';
import {
  getLiquiditySignals,
  postLiquiditySignal,
} from '../controllers/liquiditySignals.js';

const router = Router();

router.get('/', getLiquiditySignals);
router.post('/', postLiquiditySignal);

export default router;
