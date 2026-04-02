# DHL Car Park Coupon App

A React + Vite application for managing DHL car park coupons.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Port 80 available on your machine

### Running with Docker (Production)

The easiest way to run the application is using the provided shell script:

```bash
# Make the script executable (first time only)
chmod +x run.sh

# Build and start the application
./run.sh build
./run.sh start

# Access the app at http://localhost
```

### Available Commands

```bash
./run.sh build      # Build Docker image
./run.sh start      # Start the application
./run.sh stop       # Stop the application
./run.sh restart    # Restart the application
./run.sh logs       # View application logs
./run.sh status     # Check application status
./run.sh clean      # Remove all containers, images, and volumes
./run.sh rebuild    # Rebuild and restart (no cache)
./run.sh help       # Show help message
```

### Manual Docker Commands

If you prefer to use Docker commands directly:

```bash
# Build the image
docker-compose build

# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

## 🛠️ Development

### Running Locally (Development Mode)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## 📦 Docker Architecture

The application uses a multi-stage Docker build:

1. **Builder Stage**: Compiles the React application using Node.js
2. **Production Stage**: Serves the compiled assets using Nginx

### Key Features:

- ✅ Multi-stage build for minimal image size
- ✅ Source code not included in production image
- ✅ Nginx with optimized configuration
- ✅ SPA routing support
- ✅ Gzip compression enabled
- ✅ Security headers configured
- ✅ Health check endpoint (`/health`)
- ✅ Static asset caching

## 🔧 Configuration Files

- `Dockerfile` - Multi-stage build configuration
- `docker-compose.yml` - Service orchestration
- `nginx.conf` - Nginx web server configuration
- `.dockerignore` - Files excluded from Docker build
- `run.sh` - Management script for common operations

## 📝 Technology Stack

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- Tailwind CSS 3.4.19
- Lucide React (icons)

## 🏗️ Project Structure

```
DHLCarParkCoupon/
├── src/
│   ├── components/     # React components
│   │   └── screens/   # Screen components
│   ├── constants/     # App constants
│   ├── types/         # TypeScript types
│   └── assets/        # Static assets
├── public/            # Public assets
├── resource/          # Resource files
│   └── docs/         # Documentation
├── Dockerfile         # Docker build configuration
├── docker-compose.yml # Docker orchestration
├── nginx.conf         # Nginx configuration
└── run.sh            # Management script
```

## 🔒 Security

The production Docker image:

- Does not include source code
- Only contains compiled static assets
- Implements security headers
- Runs with minimal privileges

## 📱 Accessing the Application

Once running, access the application at:

- **URL**: http://localhost
- **Health Check**: http://localhost/health

## ⚠️ Troubleshooting

### Port 80 already in use

```bash
# Check what's using port 80
sudo lsof -i :80

# Stop the application and use a different port in docker-compose.yml
# Change "80:80" to "8080:80" and access at http://localhost:8080
```

### Application not starting

```bash
# Check logs for errors
./run.sh logs

# Check Docker status
./run.sh status

# Rebuild from scratch
./run.sh rebuild
```

## 📄 License

[Add your license information here]
