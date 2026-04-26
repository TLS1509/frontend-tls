# Claude Code Setup Guide for iMac

Complete setup guide pour utiliser Claude Code sur l'iMac avec le frontend React.

## Prerequisites

- Claude Code installed on iMac (desktop app or CLI)
- Node.js 18+ installed (`node --version`)
- Frontend cloned from GitHub: `~/Projects/frontend-tls`
- Dependencies installed: `npm install` done

## Step 1: Open Project in Claude Code

### Via CLI:
```bash
cd ~/Projects/frontend-tls
claude-code .

# Or specify the full path:
claude-code ~/Projects/frontend-tls
```

### Via Desktop App:
1. Open Claude Code desktop app
2. File → Open Folder
3. Navigate to `~/Projects/frontend-tls`
4. Click Open

## Step 2: Configure Settings

Claude Code should automatically detect the `.claude/settings.json` file, but you can verify it's configured:

**File: `.claude/settings.json`** (already created)
```json
{
  "permissions": {
    "npm": "allow",
    "node": "allow",
    "bash": ["npm", "node", "git", "grep", "find"]
  }
}
```

This allows Claude Code to:
- Run npm commands (install, run dev, build, lint)
- Use Node.js tools
- Use bash for git, grep, find operations

## Step 3: Start the Dev Server

### Method 1: Using Claude Code Preview

1. In Claude Code, use this command in chat:
   ```
   Start the Vite dev server using preview_start with "vite-dev"
   ```

2. Claude Code will automatically:
   - Read `.claude/launch.json`
   - Start: `npm run dev`
   - Open preview on http://localhost:5173

### Method 2: Manual Terminal

1. Open terminal in Claude Code (Ctrl+`)
2. Run:
   ```bash
   npm run dev
   ```
3. You'll see:
   ```
   ➜  Local:   http://localhost:5173/
   ```

## Step 4: Open in Chrome

While dev server is running:
1. Open Chrome
2. Go to: `http://localhost:5173`
3. You should see the TLS frontend dashboard

## Step 5: Verify Setup Works

Test that everything is working:

1. **In Claude Code**:
   - Modify a file: `src/pages/Dashboard.tsx`
   - Change any text, e.g., change "Dashboard" to "My Dashboard"

2. **In Chrome**:
   - Watch the page auto-reload (HMR - Hot Module Replacement)
   - Should see "My Dashboard" appear
   - If not, press F5 to manual refresh

3. **Revert the change**:
   - Undo in Claude Code (Cmd+Z)
   - Page auto-refreshes again

✅ If this works, your setup is perfect!

## Step 6: Development Workflow

### Typical Day on iMac:

```bash
# 1. Morning: Start dev server
cd ~/Projects/frontend-tls
npm run dev

# Keep this running in a terminal

# 2. Open Claude Code
claude-code ~/Projects/frontend-tls

# Or open the existing window

# 3. Start editing
# - Modify files in Claude Code
# - See changes auto-reload in Chrome (http://localhost:5173)
# - Check console (F12) for any errors

# 4. Commit changes
git add .
git commit -m "Description of changes"
git push

# 5. End of day: Stop dev server
# Ctrl+C in terminal running npm run dev
```

## Command Reference in Claude Code

| Task | Command |
|------|---------|
| Start dev server | Use preview_start or `npm run dev` in terminal |
| Check for errors | `npm run lint` in terminal |
| Build for production | `npm run build` in terminal |
| See build output | `npm run preview` in terminal |
| Git status | `git status` in terminal |
| Git commit | `git add . && git commit -m "msg"` |
| Git push | `git push origin main` |
| View dev server logs | Check terminal running `npm run dev` |

## Troubleshooting

### Problem: Port 5173 already in use

**Solution**:
```bash
# Find what's using port 5173
lsof -ti:5173 | xargs kill -9

# Or run on a different port
npm run dev -- --port 5174
```

Then visit `http://localhost:5174` instead.

### Problem: HMR not working (changes don't auto-reload)

**Solutions**:
1. Check that terminal shows `npm run dev` is running
2. Check that Chrome is on correct URL: `http://localhost:5173`
3. Try hard refresh: **Cmd+Shift+R** in Chrome
4. Check console (F12) for errors
5. Try restarting: kill `npm run dev` and run again

### Problem: "Cannot find module" errors

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: File watcher not detecting changes

**Cause**: Usually a permissions issue or too many files
**Solution**:
```bash
# Close and restart dev server
# Ctrl+C in the terminal running npm run dev
npm run dev
```

### Problem: TypeScript errors in Claude Code but site still works

**Why**: You might have TypeScript errors that don't affect runtime
**To check**:
```bash
npm run lint
```

**To fix**: Address the errors shown in CLI

### Problem: "VITE_SKIP_AUTH_CHECK is not defined"

**Solution**:
1. Check `.env` file has: `VITE_SKIP_AUTH_CHECK=true`
2. Restart dev server: stop and `npm run dev` again
3. The issue should resolve

## Environment Variables Reference

Your `.env` file should have:

```
# API endpoints (not used in dev mode)
VITE_API_BASE=http://localhost:8888/app/wp-json
VITE_WP_HOME=http://localhost:8888/app

# Environment
VITE_APP_ENV=development

# Dev mode flags (use mock data, don't call WordPress)
VITE_SKIP_AUTH_CHECK=true
VITE_USE_MOCK_DATA=true
```

If you change `.env`, restart dev server for changes to take effect.

## Using Chrome DevTools

While developing in Chrome with Claude Code:

```
F12 = Open DevTools
```

Useful tabs:
- **Console**: See JavaScript errors/warnings
- **Network**: See API calls (none expected in dev mode with mock data)
- **Elements**: Inspect HTML/CSS
- **Sources**: Debug JavaScript (set breakpoints)

## File Structure for Reference

```
~/Projects/frontend-tls/
├── .claude/
│   ├── settings.json       # Claude Code permissions
│   └── launch.json         # Dev server config
├── src/
│   ├── pages/              # Edit these (Dashboard, etc.)
│   ├── components/         # Edit these (UI components)
│   ├── styles/             # Edit these (CSS)
│   ├── services/
│   │   └── wpApi.ts        # Already configured for dev mode
│   ├── hooks/
│   │   └── useAuth.ts      # Already configured for dev mode
│   └── ...
├── .env                    # Local config (git-ignored)
├── .env.example            # Template
├── .gitignore              # Excludes node_modules, dist, .env
├── package.json            # Dependencies
├── vite.config.ts          # Build config
├── tsconfig.json           # TypeScript config
└── README.md               # Quick reference
```

## Next Steps

1. ✅ Open project in Claude Code
2. ✅ Start dev server (`npm run dev`)
3. ✅ Open http://localhost:5173 in Chrome
4. ✅ Modify a file and verify HMR works
5. ✅ Start developing!

---

**You're all set!** Start modifying components and pages. All changes will be visible in Chrome immediately (thanks to HMR).
