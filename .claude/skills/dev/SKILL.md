---
name: dev
description: Start the development servers (frontend + backend)
disable-model-invocation: true
allowed-tools: Bash
---

Start the development environment.

1. Check if ports 5173 (Vite) or 3001 (backend) are already in use
2. If ports are free, run `npm run dev` in background to start both frontend and backend concurrently
3. Report the URLs:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001
