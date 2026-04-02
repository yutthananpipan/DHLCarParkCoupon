me## Plan: Persistent Login & Backend API Integration

The goal is to implement persistent login using `localStorage` so users remain logged in after refreshing, and to set up a Node.js/Express backend that runs concurrently with the frontend to handle future printer API requests.

### Steps

1.  **Add Dependencies**: Install `express`, `cors`, and `concurrently` (dev) to support the backend and running tasks in parallel.
2.  **Create Backend Server**: Create `server/index.js` (new file) with a basic Express app, CORS configuration, and a placeholder `/api/status` endpoint to simulate the future printer connection.
3.  **Configure Scripts**: Update `package.json` to add a `server` script and modify the `dev` script to run both frontend and backend using `concurrently`.
4.  **Implement Persistence**: Modify `src/App.tsx` `App` component to:
    - Check `localStorage` on initialization to restore `employeeId` and set `currentScreen`.
    - Save state to `localStorage` in `handleLogin`.
    - Clear `localStorage` in `handleLogout`.
5.  **Connect Frontend to API**: Create a helper in `src/constants/index.tsx` or a new utility file to fetch data from the new local API, proving the connection works.

### Further Considerations

1.  **Deployment**: The current `Dockerfile` only serves the frontend via Nginx. For the final production version to include the API, the Docker setup will eventually need to be changed to either run Node.js or use `docker-compose` to run two containers (frontend & backend). This plan focuses on the _development_ environment first.
2.  **Security**: Does the login need real password validation later? Currently, it only checks for an ID.
3.  **Printer API**: I will structure the backend to easily accept the printer logic later.
