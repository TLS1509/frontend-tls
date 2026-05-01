# 📋 Documentation Guidelines - RÈGLES STRICTES

**Version:** 1.0.0  
**Date:** 22/02/2026  
**Obligation:** Ces règles DOIVENT être suivies

---

## 🚨 RÈGLE #1 : Maximum 3 fichiers racine

### ✅ AUTORISÉS à la racine
```
/README.md        - Point d'entrée unique
/CHANGELOG.md     - Historique versions
/Attributions.md  - Crédits légaux
```

### ❌ INTERDITS à la racine
- Fichiers de documentation détaillée
- Guides spécifiques
- Fichiers de travail
- Archives
- Tutoriels
- Notes

**Raison:** Clarté et navigation immédiate

---

## 🚨 RÈGLE #2 : Toute doc détaillée dans /docs/

### Structure OBLIGATOIRE
```
/docs/
├── 00-GUIDE-COMPLET.md          # Tout-en-un
├── 01-DESIGN-SYSTEM.md          # Design uniquement
├── 02-COMPONENTS.md             # Composants uniquement
├── 03-FIGMA-INTEGRATION.md      # Figma uniquement
├── 04-USER-FLOWS.md             # Flows uniquement
└── /archives/AAAA-MM-JJ/        # Archives datées
```

### ✅ Fichiers /docs/ doivent
- Avoir préfixe numérique (00-, 01-, 02-...)
- Être focalisés sur UN sujet
- Être versionnés dans l'en-tête
- Être datés

### ❌ Fichiers /docs/ ne doivent PAS
- Dépasser 1000 lignes (scinder si besoin)
- Avoir de doublons
- Être obsolètes (archiver immédiatement)

---

## 🚨 RÈGLE #3 : Archives OBLIGATOIRES

### Quand archiver
- ✅ Fichier obsolète
- ✅ Contenu intégré ailleurs
- ✅ Fonctionnalité terminée
- ✅ Version supersédée

### Comment archiver
```bash
1. Créer /docs/archives/AAAA-MM-JJ/
2. Déplacer fichier
3. Créer README.md dans archive
4. Documenter raison archivage
```

### ❌ NE JAMAIS
- Laisser fichiers obsolètes
- Supprimer sans archiver (sauf si vraiment inutile)
- Archiver sans documentation

---

## 🚨 RÈGLE #4 : Versioning OBLIGATOIRE

### Format en-tête IMPOSÉ
```markdown
# 📚 Titre Document

**Version:** X.Y.Z  
**Date:** JJ/MM/AAAA  
**Status:** Production|Draft|Obsolète
```

### Versioning sémantique
- **MAJOR (X.0.0)** - Refonte complète
- **MINOR (1.X.0)** - Ajout section importante
- **PATCH (1.1.X)** - Correction mineure

---

## 🚨 RÈGLE #5 : Nomenclature STRICTE

### Fichiers racine
```
README.md           ✅ Accepté
CHANGELOG.md        ✅ Accepté
Attributions.md     ✅ Accepté

DOCUMENTATION.md    ❌ Interdit (→ /docs/)
GUIDE.md            ❌ Interdit (→ /docs/)
LISEZ-MOI.md        ❌ Interdit (redondant)
```

### Fichiers /docs/
```
00-GUIDE-COMPLET.md           ✅ Préfixe numérique
01-DESIGN-SYSTEM.md           ✅ Préfixe numérique
MonGuide.md                   ❌ Pas de préfixe
guide-complet.md              ❌ Pas de préfixe
GUIDE_COMPLET.md              ❌ Underscore (utiliser tiret)
```

### Dossiers archives
```
/docs/archives/2026-02-22/    ✅ Date ISO inversée
/docs/archives/old/           ❌ Nom vague
/docs/old/                    ❌ Hors structure
```

---

## 🚨 RÈGLE #6 : Un seul guide complet

### ✅ OBLIGATOIRE
`/docs/00-GUIDE-COMPLET.md` contient :
- Démarrage rapide
- Architecture
- Design System (synthèse)
- Composants (liste)
- Pages (liste)
- Développement (guidelines)
- Changelog (dernières versions)

### ❌ INTERDIT
- Créer DOCUMENTATION-COMPLETE.md
- Créer GUIDE-TOUT-EN-UN.md
- Créer INDEX-PRINCIPAL.md
- Dupliquer le guide

**Raison:** Une seule source de vérité

---

## 🚨 RÈGLE #7 : Pas de doublons

### Avant de créer un fichier
1. ✅ Vérifier si info existe déjà
2. ✅ Chercher dans /docs/00-GUIDE-COMPLET.md
3. ✅ Chercher dans fichiers existants
4. ❌ Ne PAS créer si doublon

### Si modification
1. ✅ Mettre à jour fichier existant
2. ✅ Incrémenter version
3. ✅ Mettre à jour date
4. ❌ Ne PAS créer nouveau fichier

---

## 🚨 RÈGLE #8 : Maintenance continue

### CHAQUE semaine
- [ ] Vérifier fichiers racine (max 3)
- [ ] Vérifier /docs/ (pas d'obsolètes)
- [ ] Archiver si nécessaire
- [ ] Mettre à jour 00-GUIDE-COMPLET.md

### CHAQUE modification
- [ ] Documenter dans bon fichier
- [ ] Ajouter entrée CHANGELOG.md
- [ ] Incrémenter version si significatif
- [ ] Archiver ancien si supersédé

---

## 🚨 RÈGLE #9 : Composants - Max 2 fichiers .md par dossier

### Structure /components/
```
/components/
├── /ui/
│   └── README.md              ✅ Index uniquement
├── /common/
│   ├── README.md              ✅ Index
│   └── GUIDE.md               ❌ INTERDIT (→ /docs/)
├── /celebrations/
│   └── README.md              ✅ Index uniquement
└── /feedback/
    └── README.md              ✅ Index uniquement
```

### README.md doit contenir
- Liste composants du dossier
- Import examples (1-2 lignes)
- Lien vers /docs/02-COMPONENTS.md

### ❌ README.md ne doit PAS
- Dépasser 100 lignes
- Contenir documentation complète
- Dupliquer /docs/02-COMPONENTS.md

---

## 🚨 RÈGLE #10 : Prompt de validation

### Avant CHAQUE commit documentation
```
Vérifier :
1. ✅ Maximum 3 fichiers racine ?
2. ✅ Docs détaillées dans /docs/ ?
3. ✅ Préfixes numériques /docs/ ?
4. ✅ Versioning en-têtes ?
5. ✅ Pas de doublons ?
6. ✅ Archives datées ?
7. ✅ README.md composants < 100 lignes ?
8. ✅ CHANGELOG.md à jour ?

Si OUI partout → Commit
Si NON → Nettoyer AVANT
```

---

## 📋 Checklist Création Fichier

### Je veux créer un fichier .md

#### 1. Où ?
- [ ] C'est un point d'entrée ? → Racine (si pas déjà 3)
- [ ] C'est de la doc détaillée ? → /docs/
- [ ] C'est un index composants ? → /components/[cat]/README.md
- [ ] C'est obsolète ? → /docs/archives/

#### 2. Nom ?
- [ ] Racine : README|CHANGELOG|Attributions
- [ ] /docs/ : XX-NOM-SUJET.md (préfixe numérique)
- [ ] Composants : README.md uniquement
- [ ] Archives : Dossier /AAAA-MM-JJ/ + README.md

#### 3. Contenu ?
- [ ] En-tête avec version/date/status
- [ ] Table matières si > 200 lignes
- [ ] Pas de doublon avec existant
- [ ] Focalisé sur UN sujet

#### 4. Validation ?
- [ ] Checklist prompt OK
- [ ] CHANGELOG.md mis à jour
- [ ] Ancien archivé si supersédé

---

## ⚡ Exemples Violations

### ❌ VIOLATION 1 : Trop de fichiers racine
```
/ (6 fichiers racine)
├── README.md
├── CHANGELOG.md
├── Attributions.md
├── DOCUMENTATION.md           ❌ → /docs/00-GUIDE-COMPLET.md
├── GUIDE-RAPIDE.md            ❌ → Section dans README.md
└── LISEZ-MOI.md               ❌ Redondant avec README.md
```

### ❌ VIOLATION 2 : Docs sans préfixe
```
/docs/
├── guide-complet.md           ❌ → 00-GUIDE-COMPLET.md
├── components.md              ❌ → 02-COMPONENTS.md
└── design.md                  ❌ → 01-DESIGN-SYSTEM.md
```

### ❌ VIOLATION 3 : README.md trop long
```
/components/ui/README.md       ❌ 500 lignes
→ Scinder : garder 50 lignes index, reste → /docs/02-COMPONENTS.md
```

### ❌ VIOLATION 4 : Fichier obsolète
```
/docs/OLD-GUIDE.md             ❌ Obsolète
→ Archiver : /docs/archives/2026-02-22/OLD-GUIDE.md
→ Créer : /docs/archives/2026-02-22/README.md
```

---

## ✅ Exemples Corrects

### ✅ CORRECT 1 : Structure racine
```
/ (3 fichiers uniquement)
├── README.md                  ✅ Point entrée
├── CHANGELOG.md               ✅ Historique
└── Attributions.md            ✅ Légal
```

### ✅ CORRECT 2 : Structure /docs/
```
/docs/
├── 00-GUIDE-COMPLET.md        ✅ Tout-en-un
├── 01-DESIGN-SYSTEM.md        ✅ Design détaillé
├── 02-COMPONENTS.md           ✅ Composants détaillés
├── 03-FIGMA-INTEGRATION.md    ✅ Figma détaillé
├── 04-USER-FLOWS.md           ✅ Flows détaillés
└── /archives/
    └── 2026-02-22/            ✅ Archive datée
        └── README.md          ✅ Index archive
```

### ✅ CORRECT 3 : README composant
```markdown
# UI Components

Button, Card, Dialog, Toast

## Import
`import { Button } from './components/ui/button';`

Voir `/docs/02-COMPONENTS.md` pour détails.
```

---

## 🎯 Prompt Auto-Check

### À copier-coller avant commit

```
Je m'apprête à commiter de la documentation.

VÉRIFIER :
1. Racine a maximum 3 fichiers .md
2. Docs détaillées sont dans /docs/
3. Fichiers /docs/ ont préfixe numérique
4. En-têtes ont version/date/status
5. Aucun doublon
6. Fichiers obsolètes archivés dans /docs/archives/AAAA-MM-JJ/
7. README.md composants < 100 lignes
8. CHANGELOG.md mis à jour
9. Nomenclature respectée
10. Un seul /docs/00-GUIDE-COMPLET.md

Si TOUTES réponses OUI → OK commit
Sinon → NETTOYER AVANT
```

---

## 🔄 Workflow Nettoyage Périodique

### Tous les mois

```bash
# 1. Vérifier racine
ls *.md | wc -l  # Doit être ≤ 3

# 2. Vérifier doublons
grep -r "même contenu" /docs/

# 3. Archiver obsolètes
mkdir /docs/archives/$(date +%Y-%m-%d)
mv /docs/OBSOLETE.md /docs/archives/$(date +%Y-%m-%d)/

# 4. Mettre à jour GUIDE-COMPLET
vim /docs/00-GUIDE-COMPLET.md

# 5. Incrémenter versions
# Mettre à jour Version: et Date: dans en-têtes

# 6. Commit
git add .
git commit -m "docs: cleanup $(date +%Y-%m)"
```

---

## 📌 Résumé Une Page

```
RÈGLES ABSOLUES :

✅ 3 fichiers MAX à la racine
✅ Docs → /docs/ avec préfixe numérique
✅ Archives → /docs/archives/AAAA-MM-JJ/
✅ Versioning en-têtes obligatoire
✅ Pas de doublons
✅ README composants < 100 lignes
✅ 1 seul guide complet : /docs/00-GUIDE-COMPLET.md

❌ Docs détaillées racine
❌ Fichiers obsolètes
❌ Doublons
❌ Noms sans préfixe /docs/
❌ Archives non datées
❌ README composants > 100 lignes
```

---

**Ces guidelines sont OBLIGATOIRES.**  
**Toute violation doit être corrigée immédiatement.**

_Version: 1.0.0 | Date: 22/02/2026 | Status: Production_
