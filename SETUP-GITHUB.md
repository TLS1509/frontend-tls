# Setup GitHub Repository

Guide pour mettre le frontend sur GitHub et le transférer sur l'iMac.

## Step 1: Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Fill in:
   - **Repository name**: `frontend-tls` (or your preferred name)
   - **Description**: "React frontend for TLS learning platform - independent SPA"
   - **Visibility**: Public or Private (your choice)
3. **DO NOT** check "Initialize this repository with..."
4. Click **Create repository**

You'll see a page with commands to push an existing repo. Copy the repository URL (looks like `https://github.com/YOUR_USERNAME/frontend-tls.git`)

## Step 2: Initialize Git Locally

From the frontend directory on your Mac:

```bash
cd /Applications/MAMP/htdocs/app/frontend

# Initialize git (if not already a git repo)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Extract React frontend from MAMP"

# Add remote (replace with YOUR repo URL)
git remote add origin https://github.com/YOUR_USERNAME/frontend-tls.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify on GitHub

1. Go to your repository on GitHub
2. You should see all the frontend files
3. Check that `.env` is NOT present (it should be git-ignored)
4. `.env.example` SHOULD be present

## Step 4: Clone on iMac

On your iMac, in a terminal:

```bash
# Create a projects directory if you don't have one
mkdir -p ~/Projects

# Clone the repository
cd ~/Projects
git clone https://github.com/YOUR_USERNAME/frontend-tls.git
cd frontend-tls

# Install dependencies
npm install

# Copy .env from .env.example
cp .env.example .env

# Start dev server
npm run dev
```

## Step 5: Setup Claude Code on iMac

```bash
# Open in Claude Code
claude-code ~/Projects/frontend-tls
```

Then create these files:

**`.claude/settings.json`**:
```json
{
  "permissions": {
    "npm": "allow",
    "node": "allow",
    "bash": ["npm", "node", "git", "grep", "find"]
  }
}
```

**`.claude/launch.json`**:
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

## Step 6: Development Workflow

Every day on iMac:

```bash
cd ~/Projects/frontend-tls
npm run dev
```

Then:
1. Open Chrome: http://localhost:5173
2. Modify code in Claude Code
3. See changes auto-reload in Chrome (HMR)

To save changes to GitHub:

```bash
git status                    # See what changed
git add .                     # Stage changes
git commit -m "Description"   # Create commit
git push                      # Push to GitHub
```

## Notes

- **DO NOT commit `.env`** - it's git-ignored, each developer has their own
- **DO commit `.env.example`** - it's the template
- When you pull latest on iMac: `git pull origin main`
- Always run `npm install` after pulling (in case dependencies changed)

## Troubleshooting

**Error: "fatal: not a git repository"**
- Make sure you're in the correct directory: `cd ~/Projects/frontend-tls`
- Check: `ls -la .git/` should exist

**Error: "remote origin already exists"**
- You probably already ran `git init` and added origin
- That's fine, just skip that step and continue to `git push`

**GitHub asking for password**
- Use Personal Access Token instead of password
- Or setup SSH key for authentication
- See: https://docs.github.com/en/authentication

**Can't clone the repo**
- Make sure repository visibility is set correctly
- If private, make sure you're logged into GitHub in terminal
- Try: `git config --global user.name "Your Name"` and `git config --global user.email "your@email.com"`
