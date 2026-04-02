import { Router } from 'express';
import healthRoutes from './health.js';
import authRoutes from './auth.js';
import printerRoutes from './printer.js';

const router = Router();

// Mount routes
router.use('/', healthRoutes);
router.use('/auth', authRoutes);
router.use('/printer', printerRoutes);

export default router;
