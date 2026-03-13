---
name: deploy
description: Build and restart Docker containers for production deployment
disable-model-invocation: true
allowed-tools: Bash
---

Rebuild and redeploy the application using Docker Compose.

1. Run `docker compose build --no-cache` to rebuild both frontend and backend images
2. Run `docker compose up -d` to restart containers
3. Run `docker compose ps` to verify both services are healthy
4. Report the status of each container (name, status, ports)
