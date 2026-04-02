# API Configuration - Production Deployment Guide

## ✅ แก้ไขแล้ว!

เดิม frontend hardcoded `http://localhost:3001` ซึ่งจะไม่ทำงานใน production

## 🎯 Solution

### 1. Environment Variables

สร้าง `.env` files สำหรับแต่ละ environment:

- `.env.development` - สำหรับ dev (ใช้ proxy)
- `.env.production` - สำหรับ production (same origin)
- `.env.example` - template

### 2. API Config Utility

สร้าง `src/config/api.ts`:

- จัดการ API URL อัตโนมัติตาม environment
- มี type-safe endpoints
- มี `apiFetch` wrapper สำหรับ error handling

### 3. Vite Proxy

Development mode ใช้ Vite proxy:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
  }
}
```

**ข้อดี:**

- ไม่มีปัญหา CORS ใน development
- URL เดียวกันทั้ง dev และ production
- Frontend เรียก `/api/*` ทุก environment

## 🚀 Production Deployment

### Option 1: Docker Compose (Recommended)

```yaml
services:
  frontend:
    # Nginx serves frontend and proxies /api to backend
  backend:
    # Node.js backend service
```

### Option 2: Nginx Reverse Proxy

```nginx
location /api/ {
    proxy_pass http://backend:3001;
}
```

### Option 3: Separate Domains

ตั้งค่า environment variable:

```
VITE_API_URL=https://api.yourdomain.com
```

## 📊 Before vs After

### ❌ Before

```typescript
fetch('http://localhost:3001/api/login', ...)
```

- Hardcoded localhost
- ไม่ทำงานใน production
- ไม่ flexible

### ✅ After

```typescript
import { apiFetch, API_ENDPOINTS } from './config/api';
apiFetch(API_ENDPOINTS.AUTH.LOGIN, ...)
```

- Environment-aware
- Type-safe
- Production-ready
- Maintainable

## 🧪 Testing

### Development

```bash
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
# API calls: http://localhost:5173/api/* → proxy → http://localhost:3001/api/*
```

### Production

```bash
npm run build
# API calls: https://yourdomain.com/api/* → backend
```

## 📝 Summary

✅ Environment variables สำหรับแต่ละ environment  
✅ API config utility มี type safety  
✅ Vite proxy สำหรับ development (no CORS)  
✅ Production-ready configuration  
✅ Nginx config พร้อม API proxy  
✅ Documentation ครบถ้วน

**ผลลัพธ์:** แอปพร้อม deploy production แล้ว! 🎉
