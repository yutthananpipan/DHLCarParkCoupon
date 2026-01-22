# Docker Production Setup

## ✅ พร้อม Production แล้ว!

### 📦 Docker Images

1. **Backend** - `dhl-car-park-backend:latest`
   - Node.js 20 Alpine
   - Express + TypeScript (tsx runtime)
   - Health check: `/api/health`
   - Port: 3001

2. **Frontend** - `dhl-car-park-frontend:latest`
   - Nginx Alpine
   - React SPA (built assets)
   - Proxy `/api/*` → backend
   - Port: 80 (mapped to 8080 for testing)

### 🚀 การใช้งาน

#### Development

```bash
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

#### Production (Docker)

```bash
# Build images
docker compose build

# Start containers
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop containers
docker compose down
```

### 🌐 Endpoints (Production)

- **Frontend**: http://localhost:8080 (หรือ port ที่กำหนด)
- **API**: http://localhost:8080/api/\*
- **Health Check**: http://localhost:8080/api/health

### 📊 Architecture

```
┌─────────────────────────────────────────┐
│  Browser                                │
│  http://localhost:8080                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Frontend Container (Nginx)             │
│  - Serves React SPA                     │
│  - Proxies /api/* to backend            │
│  Port: 80 → 8080                        │
└──────────────┬──────────────────────────┘
               │ /api/* requests
               ▼
┌─────────────────────────────────────────┐
│  Backend Container (Node.js)            │
│  - Express API                          │
│  - TypeScript with tsx                  │
│  Port: 3001                             │
└─────────────────────────────────────────┘
```

### 🔧 Configuration Files

- **Dockerfile** - Frontend build
- **Dockerfile.backend** - Backend build
- **docker-compose.yml** - Orchestration
- **nginx.conf** - Nginx configuration with API proxy
- **.dockerignore** - Exclude unnecessary files

### ✅ Testing Results

```bash
# Health check ✅
curl http://localhost:8080/api/health
{"status":"ok","message":"Backend server is running"}

# Login API ✅
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"employeeId":"TEST"}'
{"success":true,"employeeId":"TEST","message":"Login successful"}

# Frontend ✅
curl http://localhost:8080/
<!doctype html>...
```

### 🔐 Environment Variables

**Frontend:**

- `NODE_ENV=production`

**Backend:**

- `NODE_ENV=production`
- `PORT=3001`

### 📝 Deployment Checklist

- ✅ Backend Dockerfile created
- ✅ Frontend Dockerfile updated
- ✅ docker-compose.yml with both services
- ✅ Nginx proxy configuration
- ✅ Health checks configured
- ✅ Network isolation (dhl-network)
- ✅ Build tested successfully
- ✅ Containers running
- ✅ API endpoints working
- ✅ Frontend serving correctly

### 🎯 Production Deployment

```bash
# 1. ตั้งค่า environment variables (ถ้าจำเป็น)
# 2. Build images
docker compose build

# 3. Start services
docker compose up -d

# 4. Verify
docker compose ps
curl http://your-domain.com/api/health

# 5. Monitor logs
docker compose logs -f
```

### 🔄 Updates

```bash
# Pull latest code
git pull

# Rebuild and restart
docker compose down
docker compose build
docker compose up -d
```

### 🛡️ Security Notes

- ✅ Multi-stage builds (smaller images)
- ✅ Health checks enabled
- ✅ Non-root user (Node.js default)
- ✅ Security headers in nginx
- ✅ Production dependencies only
- ✅ Network isolation

### 📊 Container Status

```bash
$ docker ps
dhl-car-park-frontend  - healthy  (port 8080)
dhl-car-park-backend   - healthy  (port 3001)
```

## 🎉 พร้อมใช้งาน Production แล้ว!
