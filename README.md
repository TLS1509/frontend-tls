# TLS Frontend - React SPA

Independent React frontend for The Learning Society learning platform. Developed and tested without requiring WordPress backend.

## Tech Stack

- **React 19** - UI framework
- **Vite 5** - Build tool & dev server (port 5173)
- **TypeScript 6** - Type safety
- **React Router 7** - Client-side routing
- **Zustand 5** - State management
- **TailwindCSS 4** - Styling
- **Lucide React** - Icon library

## Quick Start (Mac/iMac)

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/frontend-tls.git
cd frontend-tls
npm install
```

### 2. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Verify these settings in .env:
# VITE_SKIP_AUTH_CHECK=true
# VITE_USE_MOCK_DATA=true
```

### 3. Start Dev Server

```bash
npm run dev

# You'll see:
# ➜  Local:   http://localhost:5173/
```

### 4. Open in Browser

Navigate to `http://localhost:5173` in Chrome/Safari. You'll see the dashboard without needing WordPress running.

## Development Mode

This frontend runs in **development mode** using mock data:

- **VITE_SKIP_AUTH_CHECK=true** - Skip WordPress authentication, use mock user
- **VITE_USE_MOCK_DATA=true** - Return mock data instead of WordPress AJAX calls
- No WordPress backend required
- No special configuration needed

## Development with Claude Code

### Setup on iMac

1. **Open folder in Claude Code**:
   ```bash
   claude-code ~/Projects/frontend-tls
   ```

2. **Create `.claude/settings.json`**:
   ```json
   {
     "permissions": {
       "npm": "allow",
       "node": "allow",
       "bash": ["npm", "node", "git", "grep", "find"]
     }
   }
   ```

3. **Create `.claude/launch.json`**:
   ```json
   {
     "version": "0.0.1",
     "configurations": [
       {
         "name": "vite-dev",
         "runtimeExecutable": "npm",
         "runtimeArgs": ["run", "dev"],
         "port": 5173
       }
     ]
   }
   ```

### Development Workflow

1. Start dev server: `npm run dev`
2. Modify files in Claude Code or your editor
3. Browser auto-reloads (HMR - Hot Module Replacement)
4. See changes instantly in Chrome

**Pro tip**: Open Chrome DevTools (F12) to see console errors and network requests.

## Scripts

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Build for production (output: dist/)
npm run preview  # Preview production build locally
npm run lint     # Check TypeScript & ESLint errors
```

## Project Structure

```
frontend-tls/
├── src/
│   ├── pages/              # 40+ page components
│   ├── components/         # Reusable UI components
│   ├── hooks/              # useAuth, custom hooks
│   ├── services/           # API clients (wpApi, ajaxClient)
│   ├── store/              # Zustand state stores
│   ├── styles/             # Global CSS & design tokens
│   └── types/              # TypeScript interfaces
├── public/                 # Static assets
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies
├── .env.example           # Environment template
└── .gitignore             # Git exclusions
```

## Pages Available

When you start the dev server, you can navigate to:

- `/` - Dashboard
- `/learning-paths` - Learning paths list
- `/coaching` - Coaching interface
- `/veille` - Monitoring/research content
- `/journal` - Personal journal
- `/collaboration` - Team collaboration
- `/profile` - User profile
- `/settings` - Settings page

All pages are interactive and styled with the TLS design system.

## Configuration

### Environment Variables (.env)

```
# API endpoints (used when VITE_USE_MOCK_DATA=false)
VITE_API_BASE=http://localhost:8888/app/wp-json
VITE_WP_HOME=http://localhost:8888/app

# App environment
VITE_APP_ENV=development

# Development flags
VITE_SKIP_AUTH_CHECK=true    # Use mock user, skip WordPress auth
VITE_USE_MOCK_DATA=true      # Use mock data, don't call WordPress endpoints
```

### For Production (Future)

To use real WordPress backend:
1. Set `VITE_SKIP_AUTH_CHECK=false`
2. Set `VITE_USE_MOCK_DATA=false`
3. Ensure WordPress is running and accessible
4. Run `npm run build` for production bundle

## Troubleshooting

### App shows blank page
- Check browser console (F12) for errors
- Verify `npm run dev` is running
- Try refreshing the page

### Port 5173 already in use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
# Or run on different port: npm run dev -- --port 5174
```

### Dependencies issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### HMR (hot reload) not working
- Make sure Vite dev server is running
- Try manual refresh: Cmd+Shift+R (hard refresh in Chrome)
- Check that localhost:5173 is accessible

## Design System

See documentation in:
- `src/styles/design-tokens.css` - Color, spacing, typography
- `src/styles/tls-components.css` - Component styles
- `src/pages/Components.tsx` - Component library page

## Git Workflow

```bash
# Check status
git status

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

**Note**: `.env` is git-ignored - each developer uses their own local copy.

## Resources

- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [TailwindCSS Docs](https://tailwindcss.com)

## Questions?

Check the docs folder or review:
- `package.json` - Dependencies & scripts
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript settings
