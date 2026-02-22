import { Router } from 'express';
import { getProtocols, createProtocol } from '../controllers/protocols.js';

const router = Router();

router.get('/', getProtocols);
router.post('/', createProtocol);

export default router;
