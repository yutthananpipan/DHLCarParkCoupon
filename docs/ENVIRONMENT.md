# Environment Configuration Guide

## 📁 Environment Files

- `.env.development` - Development environment (localhost with proxy)
- `.env.production` - Production environment (same origin)
- `.env.example` - Template for local overrides
- `.env.local` - Local overrides (gitignored, create if needed)

## 🔧 How It Works

### Development Mode

```bash
npm run dev
```

- Vite proxy forwards `/api` requests to `http://localhost:3001`
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3001`
- No CORS issues because proxy handles it

**API Config:**

```typescript
VITE_API_URL = ''; // Empty = same origin
// Requests go to http://localhost:5173/api/*
// Vite proxies to http://localhost:3001/api/*
```

### Production Mode

```bash
npm run build
```

**API Config:**

```typescript
VITE_API_URL = ''; // Empty = same origin
// Requests go to https://yourdomain.com/api/*
```

## 🚀 Production Deployment Options

### Option 1: Nginx Reverse Proxy (Recommended)

Serve frontend and proxy API to backend:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Serve frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Docker Compose with Nginx

Already set up in your `docker-compose.yml` and `nginx.conf`

### Option 3: Cloud Platform with Services

- Frontend: Vercel/Netlify/Cloudflare Pages
- Backend: Railway/Render/Fly.io
- Set `VITE_API_URL=https://your-api.domain.com` in build settings

## 🔐 Environment Variables

### Required Variables

- `VITE_API_URL` - API base URL (empty for same origin)

### Adding New Variables

1. Prefix with `VITE_` (Vite requirement)
2. Add to `.env.example`
3. Add to `.env.development` and `.env.production`
4. Use in code: `import.meta.env.VITE_YOUR_VAR`

## 📝 Examples

### Development with Custom Backend Port

Create `.env.local`:

```
VITE_API_URL=http://localhost:8080
```

### Staging Environment

Create `.env.staging`:

```
VITE_API_URL=https://staging-api.yourdomain.com
```

Then build: `vite build --mode staging`

## ✅ Testing

```bash
# Test backend directly
curl http://localhost:3001/api/health

# Test through Vite proxy (development)
curl http://localhost:5173/api/health

# Both should return the same result
```

## 🔍 Debugging

Check current API URL in browser console:

```javascript
import { API_BASE_URL } from './config/api';
console.log('API URL:', API_BASE_URL);
```

## 📚 Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vite Server Proxy](https://vitejs.dev/config/server-options.html#server-proxy)
