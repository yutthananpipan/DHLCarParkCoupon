import { Router, Request, Response } from 'express';
import { LoginRequest, LoginResponse, ErrorResponse } from '../types/index.js';

const router = Router();

/**
 * Login endpoint
 * POST /api/auth/login
 * @body {LoginRequest} - Employee ID
 * @returns {LoginResponse | ErrorResponse}
 */
router.post('/login', (req: Request, res: Response) => {
  const { employeeId } = req.body as LoginRequest;

  // DEBUG: Set breakpoint here to inspect login requests
  console.log('Login attempt:', {
    employeeId,
    timestamp: new Date().toISOString(),
  });

  if (!employeeId) {
    return res.status(400).json({
      error: 'Employee ID is required',
    } as ErrorResponse);
  }

  // Simulate login validation
  // TODO: Add real authentication logic here
  const response: LoginResponse = {
    success: true,
    employeeId,
    message: 'Login successful',
  };

  res.json(response);
});

export default router;
