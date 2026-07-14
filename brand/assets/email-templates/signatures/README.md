# Signatures email TLS

Signatures **de production**, une par personne. 3ᵉ itération (2026-07-10) : logo TLS ajouté, d'après les layouts déjà construits dans Figma — page **"📧 Templates — Signatures Email"** (node `4114:26`, fichier `LccBZ1GKWQVwVzPtsSzk5Y`), **Option A** (node `4123:52`, "Classique · Divider vertical").

Historique rapide :
1. Avatar cercle initiales + bordure d'accent colorée → rejeté ("trop template IA")
2. Texte pur, zéro élément graphique → rejeté aussi ("mets juste logo TLS")
3. **Version actuelle** : logo TLS réel (SVG inline, pas d'image à héberger) + carte blanche + séparateurs neutres 1px — traduction fidèle du design déjà validé dans Figma.

```
signatures/
├── chloe-mimault-talagrand/
│   ├── signature-complete.html   — carte : logo · divider · nom/rôle/contacts
│   ├── signature-minimale.html   — logo compact (28px) + nom/rôle/email, sans carte
│   └── signature-banniere.html   — signature-complete + bandeau promo Learning App
├── pierre-armand-dennery/
│   ├── signature-complete.html
│   ├── signature-minimale.html
│   └── signature-banniere.html
└── propositions/                 — 2 directions alternatives (Badge/Compact),
                                     voir propositions/README.md — rien en prod
```

## Ce qui vient de Figma

Page **"📧 Templates — Signatures Email"**, 3 options — les 2 utilisées ici :

**Option A** (node `4123:52`, "Classique · Divider vertical") → `signature-complete.html` / `signature-minimale.html` :
- **Logo TLS réel** : composant `TlsLogo`, variant `color-svg` — 4 tracés SVG (corps `primary-500 #55A1B4`, accent central `primary-400 #73AFBF`, point haut `secondary-500 #ED843A`, point bas `accent-400 #F8B044`). Embarqué **en inline SVG** dans le HTML (paths copiés depuis l'asset Figma réel, pas reconstruits de mémoire) — donc **aucune image externe à héberger**.
- **Carte blanche** avec coins arrondis (8px) — le fond de la signature n'est plus transparent, c'est une card distincte (ombre douce `box-shadow` en bonus, dégrade proprement si non supporté).
- **Séparateurs neutres 1px** (`ink-200 #E5E7EB`) entre logo/texte et entre nom/contacts — ce sont des lignes fines de structuration, **pas** la bordure d'accent colorée rejetée précédemment (différence de registre : gris neutre fin vs couleur de marque épaisse).
- **Une seule touche de couleur** : "The Learning Society" et le lien `thelearningsociety.fr` en `primary-600 #4A8FA1`. Tout le reste (nom, rôle, téléphone, LinkedIn) en encre neutre (`ink-900`/`ink-500`/`ink-300`).

**Option D** (node `4123:80`, "Classique + bannière Learning App") → `signature-banniere.html` :
- Reprend exactement le bloc contact d'Option A, avec un **bandeau promo en plus** en pied de signature : fond gradient `primary-800 → primary-700` (`#2F5F6A → #3D7786`), eyebrow "LEARNING APP" en `primary-200 #B9D7DF`, accroche blanche League Spartan, CTA pill `secondary-500 #ED843A` "Tester →". Tout le bandeau est cliquable (`<a>` englobant).
- ⚠️ Le lien du bandeau pointe vers `thelearningsociety.fr` (home) par défaut — à remplacer par une landing page dédiée si vous en créez une.
- À utiliser avec modération : une bannière promo dans CHAQUE email (y compris les réponses dans un fil déjà engagé) peut lasser — pense à réserver `signature-banniere.html` aux nouveaux emails / premiers contacts, et `signature-complete.html` (sans bandeau) pour le reste.

Option C (logo sur fond teinté primary-50) existe aussi dans la même page Figma mais n'a pas été traduite — pas de besoin identifié au-delà de A et D.

## ⚠️ Limite connue — SVG inline en email

Le logo est en SVG inline dans le HTML (pas de fichier à héberger, mais) : le support SVG email-client est inégal. **Bien rendu** : Apple Mail, Gmail (web/app), la plupart des clients modernes. **Rendu dégradé possible** : Outlook desktop Windows (moteur Word) ignore parfois le SVG inline — dans ce cas le logo n'apparaît juste pas, le texte reste intact (pas de layout cassé, juste un manque visuel). Si Outlook desktop Windows est un client cible important pour le destinataire, teste avant diffusion large ; alternative si ça pose problème : héberger le logo en PNG et utiliser `<img src="...">` à la place du SVG inline (échange : plus fiable partout, mais nécessite un hébergement).

## Statut

✅ Nom Chloé tranché : **Chloé Mimault-Talagrand**.
⚠️ Signature Pierre-Armand Dennery construite sur 2 hypothèses non confirmées : rôle (`Co-fondateur`, pas de titre plus précis inventé) et email (`pierre-armand@thelearningsociety.fr`, déduit du pattern de Chloé). À corriger dès confirmation.

## Installation

1. Ouvre le `.html` de ta personne (double-clic).
2. **Sélectionne tout** (Cmd+A) puis **copie** (Cmd+C).
3. Colle dans l'éditeur de signature :
   - **Gmail** : ⚙️ → *Voir tous les paramètres* → *Signature* → colle.
   - **Outlook (Mac/Web)** : *Préférences → Signatures* (ou *Paramètres → Courrier → Composer → Signatures*) → colle.
   - **Apple Mail** : *Réglages → Signatures* → décoche « Toujours utiliser ma police par défaut » → colle.

## À personnaliser

- **Nom**, **rôle**, **email**, **téléphone** (le `+33 6 00 00 00 00` est un placeholder pour les deux personnes).
- Sur `signature-banniere.html` : le `href` du bandeau (2 occurrences du lien `thelearningsociety.fr`) et éventuellement l'accroche "Formation IA pour formateurs & équipes L&D" si l'angle promo change.
- Pour une 3ᵉ personne : crée un nouveau sous-dossier `signatures/prenom-nom/` en dupliquant la structure existante — le bloc `<svg>` (4 `<path>`) se copie tel quel, changer uniquement le texte.
