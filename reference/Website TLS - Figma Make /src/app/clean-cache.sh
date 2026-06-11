#!/bin/bash

# Script de nettoyage du cache Vite
# Utilisation : ./clean-cache.sh

echo "🧹 Nettoyage du cache Vite et des dépendances..."

# Supprimer node_modules
if [ -d "node_modules" ]; then
    echo "📦 Suppression de node_modules..."
    rm -rf node_modules
fi

# Supprimer le cache Vite
if [ -d ".vite" ]; then
    echo "⚡ Suppression du cache .vite..."
    rm -rf .vite
fi

if [ -d "node_modules/.vite" ]; then
    echo "⚡ Suppression du cache node_modules/.vite..."
    rm -rf node_modules/.vite
fi

# Supprimer dist
if [ -d "dist" ]; then
    echo "📁 Suppression de dist..."
    rm -rf dist
fi

# Supprimer les lock files
if [ -f "pnpm-lock.yaml" ]; then
    echo "🔒 Suppression de pnpm-lock.yaml..."
    rm pnpm-lock.yaml
fi

if [ -f "package-lock.json" ]; then
    echo "🔒 Suppression de package-lock.json..."
    rm package-lock.json
fi

if [ -f "yarn.lock" ]; then
    echo "🔒 Suppression de yarn.lock..."
    rm yarn.lock
fi

echo ""
echo "✅ Nettoyage terminé !"
echo ""
echo "🚀 Pour réinstaller les dépendances :"
echo "   pnpm install"
echo "   # ou"
echo "   npm install"
echo "   # ou"
echo "   yarn install"
echo ""
echo "🎯 Puis démarrer le projet :"
echo "   pnpm dev"
