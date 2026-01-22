export interface LoginRequest {
  employeeId: string;
}

export interface LoginResponse {
  success: boolean;
  employeeId: string;
  message: string;
}

export interface PrintRequest {
  employeeId: string;
  reason: string;
  visitorName?: string;
}

export interface PrintResponse {
  success: boolean;
  message: string;
  jobId: string;
}

export interface PrinterStatus {
  status: 'ready' | 'busy' | 'offline' | 'error';
  message: string;
  connected: boolean;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  message: string;
}

export interface ErrorResponse {
  error: string;
}
