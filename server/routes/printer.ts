import { Router, Request, Response } from 'express';
import { PrintRequest, PrintResponse, PrinterStatus } from '../types/index.js';

const router = Router();

/**
 * Get printer status
 * GET /api/printer/status
 * @returns {PrinterStatus}
 */
router.get('/status', (_req: Request, res: Response) => {
  const status: PrinterStatus = {
    status: 'ready',
    message: 'Printer is ready',
    connected: true,
  };

  res.json(status);
});

/**
 * Submit print job
 * POST /api/printer/print
 * @body {PrintRequest}
 * @returns {PrintResponse}
 *
 * TODO: Integrate with actual printer web API
 */
router.post('/print', (req: Request, res: Response) => {
  const { employeeId, reason, visitorName } = req.body as PrintRequest;

  // DEBUG: Set breakpoint here to inspect print requests
  console.log('Print request received:', {
    employeeId,
    reason,
    visitorName,
  });

  // Generate job ID
  const jobId = `JOB-${Date.now()}`;
  console.log('Generated job ID:', jobId);

  // TODO: This is where you'll integrate with the actual printer web API
  const response: PrintResponse = {
    success: true,
    message: 'Print job submitted',
    jobId,
  };

  res.json(response);
});

export default router;
