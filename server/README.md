# Server Architecture

## 📁 Directory Structure

```
server/
├── index.ts              # Main entry point, Express app setup
├── tsconfig.json         # TypeScript configuration for server
├── routes/               # Route handlers (organized by domain)
│   ├── index.ts         # Route aggregator
│   ├── health.ts        # Health check endpoint
│   ├── auth.ts          # Authentication routes
│   └── printer.ts       # Printer-related routes
└── types/               # TypeScript type definitions
    └── index.ts         # Shared interfaces and types
```

## 🎯 Design Principles

### 1. Modular Architecture

- Each domain (auth, printer, health) has its own route file
- Easy to add new features without cluttering the main file
- Clear separation of concerns

### 2. Type Safety

- All request/response types defined in `types/index.ts`
- TypeScript interfaces for better IDE support and compile-time checks
- Prevents runtime errors from type mismatches

### 3. Scalability

- Easy to add new routes by creating new files in `routes/`
- Can extend to include controllers, services, middleware layers
- Ready for future integration with printer API

## 🔌 API Endpoints

### Health Check

- **GET** `/api/health`
- Returns server status

### Authentication

- **POST** `/api/auth/login`
- Body: `{ employeeId: string }`
- Returns: Login success/failure

### Printer

- **GET** `/api/printer/status`
- Returns: Printer connection status

- **POST** `/api/printer/print`
- Body: `{ employeeId, reason, visitorName? }`
- Returns: Print job ID

## 🚀 Adding New Routes

1. Create a new file in `server/routes/` (e.g., `reports.ts`)
2. Define your routes using Express Router
3. Import and mount in `server/routes/index.ts`
4. Add types to `server/types/index.ts` if needed

Example:

```typescript
// server/routes/reports.ts
import { Router } from 'express';

const router = Router();

router.get('/daily', (req, res) => {
  // Handler logic
});

export default router;

// server/routes/index.ts
import reportsRoutes from './reports.js';
router.use('/reports', reportsRoutes);
```

## 🔧 Future Enhancements

- [ ] Add controllers layer for business logic
- [ ] Add middleware for authentication/authorization
- [ ] Add validation layer (e.g., Zod, Joi)
- [ ] Add error handling middleware
- [ ] Add logging middleware (Winston, Morgan)
- [ ] Add rate limiting
- [ ] Add API documentation (Swagger/OpenAPI)
