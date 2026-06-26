# Signatures email TLS

Deux signatures HTML on-brand (teal `#2F5F6A`, accent orange `#ED843A`, gris `#6B7280`), **email-safe** : tables + styles inline, polices système (les clients mail ne chargent pas League Spartan/Nunito — fallback Arial/Georgia propre).

| Fichier | Quand l'utiliser |
|---|---|
| `signature-complete.html` | Signature principale : avatar initiales + nom + rôle + contacts + tagline. |
| `signature-minimale.html` | Réponses / fils internes : 2 lignes compactes. |

## Installation

1. Ouvre le `.html` dans un navigateur (double-clic).
2. **Sélectionne tout** (Cmd+A) puis **copie** (Cmd+C).
3. Colle dans l'éditeur de signature :
   - **Gmail** : ⚙️ → *Voir tous les paramètres* → *Signature* → colle.
   - **Outlook (Mac/Web)** : *Préférences → Signatures* (ou *Paramètres → Courrier → Composer → Signatures*) → colle.
   - **Apple Mail** : *Réglages → Signatures* → décoche « Toujours utiliser ma police par défaut » → colle.

## À personnaliser

- **Initiales** (`CM`), **nom**, **rôle**, **email**, **téléphone** (le `+33 6 00 00 00 00` est un placeholder).
- L'avatar est un rond de couleur avec initiales (pas d'image à héberger). Pour un vrai logo : remplace la cellule avatar par `<img src="https://...logo.png" width="58" height="58" style="border-radius:50%">` (héberge le PNG d'abord).
- ⚠️ Outlook **desktop Windows** n'arrondit pas toujours les coins (`border-radius`) → l'avatar peut apparaître carré. C'est cosmétique ; si gênant, retire `border-radius:50%`.
- Pour décliner par personne (Pierre-Armand, etc.) : duplique le fichier et change les champs.
