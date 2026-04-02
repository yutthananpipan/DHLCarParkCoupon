#!/bin/bash

# DHL Car Park Coupon App - Docker Management Script
# Usage: ./run.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build the Docker image
build() {
    print_info "Building Docker image..."
    docker compose build
    print_info "Build completed successfully!"
}

# Function to start the application
start() {
    print_info "Starting application..."
    docker compose up -d --remove-orphans
    print_info "Application started successfully!"
    print_info "Access the app at: http://localhost"
}

# Function to stop the application
stop() {
    print_info "Stopping application..."
    docker compose down
    print_info "Application stopped successfully!"
}

# Function to restart the application
restart() {
    print_info "Restarting application..."
    stop
    start
}

# Function to view logs
logs() {
    print_info "Viewing application logs (Press Ctrl+C to exit)..."
    docker compose logs -f
}

# Function to check application status
status() {
    print_info "Checking application status..."
    docker compose ps
    echo ""
    print_info "Checking health status..."
    if curl -f http://localhost/health > /dev/null 2>&1; then
        print_info "Application is healthy ✓"
    else
        print_warning "Application health check failed or not running"
    fi
}

# Function to clean up
clean() {
    print_warning "This will remove all containers, images, and volumes related to this app."
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cleaning up..."
        docker compose down -v --rmi all
        print_info "Cleanup completed!"
    else
        print_info "Cleanup cancelled."
    fi
}

# Function to rebuild and restart
rebuild() {
    print_info "Rebuilding and restarting application..."
    docker compose down
    docker compose build --no-cache
    docker compose up -d --remove-orphans
    print_info "Rebuild completed successfully!"
    print_info "Access the app at: http://localhost"
}

# Function to show help
show_help() {
    echo "DHL Car Park Coupon App - Docker Management Script"
    echo ""
    echo "Usage: ./run.sh [command]"
    echo ""
    echo "Commands:"
    echo "  build      - Build Docker image"
    echo "  start      - Start the application"
    echo "  stop       - Stop the application"
    echo "  restart    - Restart the application"
    echo "  logs       - View application logs"
    echo "  status     - Check application status"
    echo "  clean      - Remove all containers, images, and volumes"
    echo "  rebuild    - Rebuild and restart (no cache)"
    echo "  help       - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./run.sh build     # Build the image"
    echo "  ./run.sh start     # Start the app"
    echo "  ./run.sh logs      # View logs"
}

# Main script logic
main() {
    check_docker

    case "${1:-help}" in
        build)
            build
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        logs)
            logs
            ;;
        status)
            status
            ;;
        clean)
            clean
            ;;
        rebuild)
            rebuild
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
