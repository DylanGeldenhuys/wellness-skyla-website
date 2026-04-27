#!/bin/bash
# Wellness with Skyla — dev server launcher
# Double-click this file in Finder to install deps and start the dev server.

cd "$(dirname "$0")"
echo "📦 Installing dependencies..."
npm install
echo ""
echo "🚀 Starting dev server at http://localhost:3000"
npm run dev
