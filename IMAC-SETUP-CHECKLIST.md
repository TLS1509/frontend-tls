# iMac Setup Checklist

Complete checklist pour mettre en place le frontend sur votre iMac. Suivez cette liste étape par étape.

## Phase 1: Preparation (GitHub)

### On your Mac (where the project currently is):

- [ ] **Commit current changes**
  ```bash
  cd /Applications/MAMP/htdocs/app/frontend
  git status
  git add .
  git commit -m "Final updates before GitHub transfer"
  ```

- [ ] **Create GitHub repository**
  - Go to https://github.com/new
  - Name: `frontend-tls`
  - Leave empty (no README, .gitignore, license)
  - Create repository
  - Copy the repository URL

- [ ] **Push to GitHub**
  ```bash
  cd /Applications/MAMP/htdocs/app/frontend
  git remote add origin https://github.com/YOUR_USERNAME/frontend-tls.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Verify on GitHub**
  - Check files are there
  - Check `.env` is NOT present (git-ignored)
  - Check `.env.example` IS present

---

## Phase 2: iMac Setup (First Time)

### On your iMac (step by step):

### A) Basic Setup

- [ ] **Create projects directory**
  ```bash
  mkdir -p ~/Projects
  ```

- [ ] **Clone repository**
  ```bash
  cd ~/Projects
  git clone https://github.com/YOUR_USERNAME/frontend-tls.git
  cd frontend-tls
  ```

- [ ] **Check Node.js version**
  ```bash
  node --version  # Should be v18 or higher
  npm --version
  ```

- [ ] **Install dependencies**
  ```bash
  npm install
  # Wait for this to finish (might take 1-2 minutes)
  ```

### B) Configure Environment

- [ ] **Copy environment file**
  ```bash
  cp .env.example .env
  ```

- [ ] **Verify `.env` content**
  ```bash
  cat .env
  ```
  Should show:
  ```
  VITE_API_BASE=...
  VITE_WP_HOME=...
  VITE_APP_ENV=development
  VITE_SKIP_AUTH_CHECK=true
  VITE_USE_MOCK_DATA=true
  ```

### C) Test Dev Server

- [ ] **Start Vite dev server**
  ```bash
  npm run dev
  ```
  
  Should see:
  ```
  ➜  Local:   http://localhost:5173/
  ```

- [ ] **Open browser**
  - Open Chrome or Safari
  - Go to: http://localhost:5173
  - Should see TLS Dashboard page
  - No errors in browser console (F12 → Console)

- [ ] **Test HMR (Hot Module Reload)**
  - Edit any file in a text editor (or will use Claude Code next)
  - Example: open `src/pages/Dashboard.tsx`
  - Change "Dashboard" to "My Dashboard"
  - Save file
  - Check browser: page should auto-update without refresh
  - Change it back

- [ ] **Stop dev server**
  ```bash
  Ctrl+C
  ```

### D) Setup Claude Code

- [ ] **Install Claude Code CLI** (if not already installed)
  ```bash
  # If you have the desktop app, open terminal and run:
  which claude-code
  # If not found, install via App Store or from https://claude.ai/code
  ```

- [ ] **Open project in Claude Code**
  ```bash
  cd ~/Projects/frontend-tls
  claude-code .
  # Or open the desktop app and File → Open Folder → ~/Projects/frontend-tls
  ```

- [ ] **Verify settings files exist**
  ```bash
  ls -la .claude/
  # Should show: settings.json and launch.json
  ```

- [ ] **Configure Git in Claude Code** (if first time on iMac)
  - Open terminal in Claude Code (Ctrl+`)
  - Run:
    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "your@email.com"
    ```

---

## Phase 3: Daily Workflow

### Every time you work on the project:

- [ ] **Start dev server**
  ```bash
  cd ~/Projects/frontend-tls
  npm run dev
  # Keep this running
  ```

- [ ] **Open Claude Code**
  ```bash
  claude-code ~/Projects/frontend-tls
  ```

- [ ] **Open browser**
  - Chrome: http://localhost:5173
  - Keep open side-by-side with Claude Code

- [ ] **Start editing**
  - Modify files in Claude Code
  - See changes auto-reload in browser
  - Check console (F12) for errors

- [ ] **Commit changes**
  ```bash
  # In Claude Code terminal or any terminal:
  cd ~/Projects/frontend-tls
  git status                    # See what changed
  git add .                     # Stage all changes
  git commit -m "Description"   # Create commit
  git push                      # Push to GitHub
  ```

- [ ] **Stop dev server when done**
  ```bash
  Ctrl+C in the terminal running npm run dev
  ```

---

## Phase 4: Troubleshooting

### If dev server doesn't start:

- [ ] **Port 5173 already in use?**
  ```bash
  lsof -ti:5173 | xargs kill -9
  npm run dev
  ```

- [ ] **Dependencies issues?**
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  npm run dev
  ```

- [ ] **Node version too old?**
  ```bash
  node --version  # Should be v18+
  # If not: brew install node
  ```

### If browser shows blank page:

- [ ] **Check browser console (F12)**
  - Look for red error messages
  - Screenshot and note the error

- [ ] **Check terminal output**
  - `npm run dev` terminal should show no errors
  - Look for red warnings

- [ ] **Try manual refresh**
  ```bash
  Cmd+Shift+R  (hard refresh)
  ```

### If HMR not working:

- [ ] **Restart dev server**
  ```bash
  Ctrl+C
  npm run dev
  ```

- [ ] **Close and reopen Claude Code**

### If .env not working:

- [ ] **Check .env file exists**
  ```bash
  cat .env
  ```

- [ ] **Restart dev server** (env changes require restart)
  ```bash
  Ctrl+C
  npm run dev
  ```

---

## Phase 5: First Pull on iMac (After Others Push Changes)

- [ ] **Get latest changes**
  ```bash
  cd ~/Projects/frontend-tls
  git pull origin main
  ```

- [ ] **Reinstall dependencies** (if package.json changed)
  ```bash
  npm install
  ```

- [ ] **Restart dev server**
  ```bash
  npm run dev
  ```

---

## File Checklist

After setup, you should have:

### Root directory files:
- [ ] `.env` (local, git-ignored)
- [ ] `.env.example` (template)
- [ ] `.gitignore` (excludes node_modules, dist, .env)
- [ ] `package.json` (dependencies)
- [ ] `vite.config.ts` (build config)
- [ ] `tsconfig.json` (TypeScript config)
- [ ] `index.html` (entry point)
- [ ] `README.md` (guide)
- [ ] `SETUP-GITHUB.md` (GitHub instructions)
- [ ] `CLAUDE-CODE-SETUP.md` (Claude Code guide)
- [ ] `IMAC-SETUP-CHECKLIST.md` (this file)

### Directories:
- [ ] `src/` (React code - edit here)
- [ ] `public/` (static assets)
- [ ] `node_modules/` (dependencies - created by npm install)
- [ ] `dist/` (build output - created by npm run build)
- [ ] `.claude/` (Claude Code config)
- [ ] `.git/` (Git repository)

### You should NOT have:
- [ ] No bare `.env` file in Git (it's local only)
- [ ] No `node_modules/` in Git

---

## Success Criteria

✅ Setup is complete when:

1. ✅ Frontend cloned from GitHub on iMac
2. ✅ `npm run dev` starts without errors
3. ✅ http://localhost:5173 shows the dashboard page
4. ✅ Chrome console (F12) has no red error messages
5. ✅ Claude Code opens without permission errors
6. ✅ Modifying a file auto-reloads in browser (HMR works)
7. ✅ Can commit and push changes to GitHub

---

## Quick Reference Commands

```bash
# Clone and setup (first time)
cd ~/Projects
git clone https://github.com/YOUR_USERNAME/frontend-tls.git
cd frontend-tls
npm install
cp .env.example .env
npm run dev

# Daily development
npm run dev                              # Start server
npm run lint                             # Check for errors
npm run build                            # Production build
npm run preview                          # View build locally

# Git workflow
git status                               # See changes
git add .                                # Stage all
git commit -m "message"                  # Create commit
git push                                 # Push to GitHub
git pull origin main                     # Get latest

# Troubleshooting
npm install                              # Reinstall deps
rm -rf node_modules && npm install       # Clean reinstall
lsof -ti:5173 | xargs kill -9           # Kill port 5173
```

---

## Support Resources

- **README.md** - Quick start guide
- **SETUP-GITHUB.md** - GitHub transfer instructions
- **CLAUDE-CODE-SETUP.md** - Claude Code detailed guide
- **This file** - Step-by-step checklist

## Questions?

Check the appropriate guide above or review the code structure in Claude Code.

---

**You're ready to go!** 🚀 Follow this checklist and you'll have a fully functional development environment on your iMac.
