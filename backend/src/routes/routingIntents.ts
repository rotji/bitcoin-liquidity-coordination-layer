import { Router } from 'express';
import {
  getRoutingIntents,
  postRoutingIntent,
} from '../controllers/routingIntents';

const router = Router();

router.get('/', getRoutingIntents);
router.post('/', postRoutingIntent);

export default router;
