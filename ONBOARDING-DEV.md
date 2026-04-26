# 🚀 Onboarding Développeur - Frontend TLS

Bienvenue! Ce document t'explique comment commencer le développement du frontend React sur ton iMac.

## ⚡ TL;DR (5 minutes pour démarrer)

```bash
# 1. Clone le repo
cd ~/Projects
git clone https://github.com/TLS1509/frontend-tls.git
cd frontend-tls

# 2. Install & config
npm install
cp .env.example .env

# 3. Start dev server
npm run dev

# 4. Open in browser
# Go to: http://localhost:5173
```

Boom! Le frontend est prêt. Tu vois le dashboard. 👇

---

## 📋 Setup Complet (Étape par Étape)

### Étape 1: Cloner depuis GitHub

```bash
# Create projects folder
mkdir -p ~/Projects

# Clone the repo
cd ~/Projects
git clone https://github.com/TLS1509/frontend-tls.git

# Go into the folder
cd frontend-tls
```

### Étape 2: Vérifier Node.js

```bash
node --version    # Should be v18 or higher
npm --version
```

**Si tu n'as pas Node.js v18+:**
```bash
brew install node
```

### Étape 3: Installer les dépendances

```bash
npm install
```

Ça va prendre 1-2 minutes. Attends que ça finisse.

### Étape 4: Configurer l'environnement

```bash
# Copy the template
cp .env.example .env

# Verify the content
cat .env
```

Tu devrais voir:
```
VITE_API_BASE=...
VITE_WP_HOME=...
VITE_APP_ENV=development
VITE_SKIP_AUTH_CHECK=true
VITE_USE_MOCK_DATA=true
```

✅ **Important:** Les deux dernières lignes permettent au frontend de marcher **sans WordPress**. C'est voulu!

### Étape 5: Démarrer le dev server

```bash
npm run dev
```

Tu devrais voir:
```
✓ built in 2.3s

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**Garde ce terminal ouvert.** C'est ton dev server. Il doit tourner pendant que tu développes.

### Étape 6: Ouvrir dans le navigateur

1. Ouvre **Chrome** ou **Safari**
2. Va à: `http://localhost:5173`
3. Tu devrais voir le **Dashboard** de TLS

✅ **Vérification:**
- La page charge sans erreur
- Tu vois le sidebar et le contenu
- Console (F12) n'a pas d'erreurs rouges

---

## 💻 Développement avec Claude Code

### Setup Claude Code (First Time)

```bash
# Open the project in Claude Code
cd ~/Projects/frontend-tls
claude-code .
```

Ou ouvre l'app Claude Code → File → Open Folder → `~/Projects/frontend-tls`

### Workflow Quotidien

1. **Terminal**: `npm run dev` (keep running)
2. **Claude Code**: Modifie les fichiers React
3. **Chrome**: Vois les changements auto-reload
4. **Terminal**: Commande git pour sauvegarder

### Modifier un Fichier - Exemple

Essaie ça pour vérifier que tout fonctionne:

1. Dans Claude Code, ouvre: `src/pages/Dashboard.tsx`
2. Change "Dashboard" en "Mon Dashboard"
3. Sauve (Cmd+S)
4. Regarde Chrome → la page se reload automatiquement (HMR)
5. Tu vois "Mon Dashboard"
6. Reviens à "Dashboard" (Cmd+Z)

Si ça marche → **tu es prêt!** ✅

---

## 🔄 Workflow Git (Sauvegarder ton travail)

### Voir les changements
```bash
git status
```

Affiche les fichiers modifiés.

### Sauvegarder localement
```bash
git add .
git commit -m "Description de tes changements"
```

Exemples:
- `git commit -m "Add new Dashboard component"`
- `git commit -m "Fix styling on coaching page"`
- `git commit -m "Update design tokens"`

### Envoyer vers GitHub
```bash
git push origin main
```

Demande username/password:
- **Username**: `TLS1509`
- **Password**: Personal Access Token (voir ci-dessous)

### Récupérer les changements des autres
```bash
git pull origin main
npm install  # Si les dépendances ont changé
npm run dev  # Redémarre le dev server
```

---

## 🔑 GitHub Authentication (SSH ou Token)

### Option 1: Personal Access Token (Plus simple, première fois)

1. Va sur: https://github.com/settings/tokens/new
2. Crée un token avec permissions:
   - ✅ `repo` (accès complet au repo)
   - ✅ `workflow` (optional, si tu touch à CI/CD)
3. **Copie le token** (tu ne le reverras qu'une fois!)
4. Quand `git push` demande password → colle le token

### Option 2: SSH Key (Plus sécurisé, recommandé après)

```bash
# Génère une clé SSH
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copie la clé publique
cat ~/.ssh/id_ed25519.pub

# Va sur GitHub → Settings → SSH Keys → Add key
# Colle la clé
```

Après, `git push` ne demandera jamais password.

---

## 📁 Structure du Projet

```
frontend-tls/
├── src/
│   ├── pages/              ← Ajoute/modifie les pages ici
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   └── ... (40+ pages)
│   │
│   ├── components/         ← Composants réutilisables
│   │   ├── core/           (Button, Card, Input, etc.)
│   │   ├── layout/         (Sidebar, Header)
│   │   └── ui/             (Custom UI components)
│   │
│   ├── styles/             ← CSS global
│   │   ├── design-tokens.css
│   │   ├── tls-components.css
│   │   └── app-layout.css
│   │
│   ├── hooks/              ← Custom React hooks
│   │   └── useAuth.ts      (Déjà configuré pour dev mode)
│   │
│   └── services/           ← API clients
│       └── wpApi.ts        (Déjà configuré pour dev mode)
│
├── public/                 ← Images, assets statiques
├── .env                    ← Config locale (git-ignored)
├── .env.example            ← Template
├── package.json            ← Dépendances
├── vite.config.ts          ← Build config
└── README.md               ← Guide complet
```

**À modifier**: Essentiellement `src/pages/`, `src/components/`, `src/styles/`

---

## 🛠️ Commandes Utiles

| Commande | Effet |
|----------|--------|
| `npm run dev` | Démarrer le dev server (http://localhost:5173) |
| `npm run build` | Compiler pour production (`dist/`) |
| `npm run lint` | Vérifier les erreurs TypeScript/ESLint |
| `npm run preview` | Prévisualiser la build production |
| `git status` | Voir les changements |
| `git add .` | Préparer les changements |
| `git commit -m "..."` | Sauvegarder localement |
| `git push` | Envoyer vers GitHub |
| `git pull` | Récupérer les changements |

---

## 🐛 Troubleshooting

### Dev server ne démarre pas
```bash
# Port 5173 déjà utilisé?
lsof -ti:5173 | xargs kill -9

# Reinitialise npm
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Browser montre blank page
1. Ouvre console (F12 → Console)
2. Regarde pour erreurs rouges
3. Note l'erreur et demande
4. Essaie hard refresh: **Cmd+Shift+R**

### HMR (auto-reload) ne fonctionne pas
1. Redémarre dev server: `Ctrl+C` puis `npm run dev`
2. Ferme et rouvre Chrome
3. Vérifie que tu es sur `http://localhost:5173` (pas une autre URL)

### Erreur "ENOENT: no such file"
```bash
npm install
```

### Git push fails
1. Vérifie token: https://github.com/settings/tokens
2. Crée un nouveau token si ancien
3. Réessaie

---

## 📖 Documentations Utiles

- **README.md** - Guide général
- **SETUP-GITHUB.md** - GitHub details
- **CLAUDE-CODE-SETUP.md** - Claude Code details
- **IMAC-SETUP-CHECKLIST.md** - Checklist complète

---

## ✨ Prêt?

1. ✅ Clone le repo
2. ✅ `npm install` et `npm run dev`
3. ✅ Ouvre http://localhost:5173 dans Chrome
4. ✅ Ouvre Claude Code
5. ✅ Modifie un fichier
6. ✅ Vois les changements en temps réel

**C'est tout!** Tu as un environnement de dev complètement fonctionnel. 🎉

---

## 🚨 Questions?

- Dev server issues → voir Troubleshooting
- GitHub issues → voir SETUP-GITHUB.md
- Claude Code issues → voir CLAUDE-CODE-SETUP.md
- Project structure → voir README.md

Bon développement! 🚀
