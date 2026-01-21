## Plan: Dockerize React Application for Production

I will set up a production-ready container environment for your React/Vite application. The setup ensures source code is not included in the final image by using a multi-stage build.

### Steps

1.  Create a `.dockerignore` file to exclude `node_modules` and local build artifacts.
2.  Create a custom `nginx.conf` to handle Single Page Application (SPA) routing correctly.
3.  Create a `Dockerfile` using a **multi-stage build**:
    - **Stage 1 (Builder):** Compiles the React code.
    - **Stage 2 (Production):** A lightweight Nginx server that contains _only_ the compiled assets.
4.  Create `docker-compose.yml` to define the service and bind it to port 80.
5.  Create a shell script `run.sh` to easily build and start the application.
6.  Create `README.md` with clear usage instructions.

### Further Considerations

1.  Since `react-router` isn't listed in dependencies, the Nginx config will still be configured with `try_files` as a best practice for future-proofing specific URL handling.
2.  Do you have specific image naming conventions you prefer for the Docker image? (default: `dhl-car-park-app`)
