#!/bin/bash

# =============================================================================
# Docker build script for michess monorepo applications
# Usage: ./docker-build.sh <app-name> [tag] [--no-cache]
# Example: ./docker-build.sh node-chess
#          ./docker-build.sh node-chess my-tag:v1.0
# =============================================================================

set -e

# Check if app name is provided
if [ $# -eq 0 ]; then
    echo "❌ Error: App name is required"
    echo "Usage: ./docker-build.sh <app-name> [tag] [--no-cache]"
    echo ""
    echo "Available apps:"
    ls -1 apps/ | grep -v ".json" || echo "  No apps found"
    exit 1
fi

APP_NAME=$1
shift

# Default values
TAG=${1:-"$APP_NAME:latest"}
CACHE_FLAG=""

# Parse remaining arguments
for arg in "$@"; do
  case $arg in
    --no-cache)
      CACHE_FLAG="--no-cache"
      shift
      ;;
  esac
done

echo "🐳 Building Docker image for $APP_NAME..."
echo "📦 Tag: $TAG"
echo "🏗️  Context: $(pwd)"

# Ensure we're in the workspace root
if [ ! -f "package.json" ] || [ ! -f "nx.json" ]; then
    echo "❌ Error: This script must be run from the workspace root"
    exit 1
fi

# Check if app exists
if [ ! -d "apps/$APP_NAME" ]; then
    echo "❌ Error: App 'apps/$APP_NAME' does not exist"
    echo ""
    echo "Available apps:"
    ls -1 apps/ | grep -v ".json" || echo "  No apps found"
    exit 1
fi

# Check if Dockerfile exists
if [ ! -f "apps/$APP_NAME/Dockerfile" ]; then
    echo "❌ Error: Dockerfile not found at 'apps/$APP_NAME/Dockerfile'"
    exit 1
fi

# Build the Docker image
echo "🔨 Running: docker build $CACHE_FLAG -t $TAG -f apps/$APP_NAME/Dockerfile ."
docker build \
    $CACHE_FLAG \
    -t "$TAG" \
    -f "apps/$APP_NAME/Dockerfile" \
    . || {
    echo "❌ Docker build failed"
    exit 1
}

echo "✅ Docker image built successfully: $TAG"
echo ""
echo "🚀 To run the container:"
if [ -f "apps/$APP_NAME/.env.local" ]; then
    echo "   docker run -p 5000:5000 --env-file apps/$APP_NAME/.env.local $TAG"
else
    echo "   docker run -p 5000:5000 $TAG"
fi
echo ""
echo "🔍 To inspect the image:"
echo "   docker run --rm -it $TAG sh"
echo ""
echo "📊 Image size:"
docker images "$TAG" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"