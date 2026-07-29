# Déployer le showcase — préparé le 2026-07-29, **non activé**

> Les fichiers `vercel.json` et `.vercelignore` sont posés à la racine. Ils sont
> **inertes** : rien ne se déploie tant que le dépôt n'est pas connecté à un
> hébergeur. Ce document explique ce qu'ils font et ce qui reste à trancher.

## Pourquoi déployer

Aujourd'hui, voir le design system TLS demande de cloner le dépôt, `npm install`
et `npm run dev`. C'est la seule raison d'être du miroir Claude Design : être la
surface où le DS est visible sans environnement de dev.

Une URL n'est pas une copie. `/components` déployé **est** le code buildé, donc
il ne peut pas mentir sur ce que fait l'app. C'est le même mouvement que
remplacer une valeur recopiée par une lecture du token, à l'échelle d'un projet.

## Ce que la config fait

| Réglage | Pourquoi |
|---|---|
| `rewrites: /(.*) → /index.html` | L'app utilise `BrowserRouter`. Sans cette règle, ouvrir `/components/atoms` directement renvoie un 404 : l'hébergeur cherche un fichier à ce chemin, qui n'existe pas |
| `X-Robots-Tag: noindex, nofollow` | Un showcase interne n'a rien à faire dans Google. **Ce n'est pas une protection** — voir la décision 1 |
| `Cache-Control immutable` sur `/assets/` | Les noms de fichiers portent un hash, donc leur contenu ne change jamais. Cache long, sans risque de servir du périmé |
| `.vercelignore` → `public/videos/` | 33 Mo sur 42. Vérifié : `src/components/` ne référence aucune vidéo — le DS n'en a pas besoin |

## Ce qu'il faut fournir

Deux variables d'environnement, et rien d'autre :

```
VITE_USE_MOCK_DATA=true
VITE_SKIP_AUTH_CHECK=true
```

Elles font tourner l'app entièrement sur des données simulées, sans backend.
C'est déjà le mode de fonctionnement en local. `VITE_FORM_ACCESS_KEY` ne sert
qu'aux formulaires du site marketing : inutile pour le showcase, et **à laisser
vide** si le déploiement ne doit pas pouvoir envoyer de mail.

## Trois décisions à prendre

### 1. Public, ou protégé ?

`noindex` empêche le référencement, **pas l'accès** : quiconque a l'URL entre.

Le déploiement expose **185 routes** — tout le produit et tout le site marketing,
pas seulement `/components`. Une SPA sert un seul bundle : on ne peut pas
publier une partie des routes sans construire une entrée séparée.

Ce qui plaide pour une protection par mot de passe :

- Le site marketing contient des contenus qui n'ont pas été relus pour
  publication sous cette forme — un article « Qualiopi sans la charge mentale »,
  des mentions de l'AI Act, l'offre « Formateur Augmenté » retirée du discours.
  Rien de tout cela n'est faux en soi, mais rien n'a été validé pour être
  accessible à cette adresse.
- L'app tourne sur des données simulées : des parcours, des noms, des chiffres
  qui ressemblent à du réel sans l'être.

**Recommandé** : protection par mot de passe, et traiter l'URL comme un outil
interne. C'est ce dont une équipe de deux personnes plus un freelance
occasionnel a besoin.

### 2. Quel hébergeur ?

Aucune préférence n'existe dans le dépôt. La config posée vise **Vercel** parce
qu'il détecte Vite sans réglage et gère la protection par mot de passe. Netlify
et Cloudflare Pages font la même chose ; il faudrait alors remplacer
`vercel.json` par `netlify.toml` ou un fichier `_redirects`, avec la même règle
de réécriture.

### 3. Déploiement automatique, ou manuel ?

Connecter le dépôt déclenche un déploiement **à chaque push sur `main`**. C'est
l'intérêt principal — le showcase ne peut plus dater. Mais cela veut dire qu'un
commit non fini part en ligne.

L'alternative est de ne déployer que depuis une branche dédiée, ou à la main.
Vu que le but est justement d'éliminer la péremption silencieuse, **l'automatique
depuis `main` est cohérent** — à condition d'accepter la décision 1.

## Ce que ça change pour le miroir Claude Design

Le miroir ne disparaît pas. Il fait deux métiers, et le déploiement n'en retire
qu'un.

| Métier | Après déploiement |
|---|---|
| **Surface de design** — les 60 `.jsx` permettent à Claude de composer des écrans contre le DS | **Conservé.** Ce sont des miroirs mécaniques, régénérables par script |
| **Documentation** — les ~30 pages HTML écrites à la main | **Sans objet.** Elles redisent ce que `/components` montre, sans source dont on pourrait les régénérer. C'est là qu'était toute la dérive mesurée le 2026-07-29 |

On passe de « resynchroniser un projet entier, à la main, quand quelqu'un y
pense » à « regénérer 60 fichiers par script, et le reste est une URL ».

## Rappel sur la synchronisation

Il n'existe **aucune** synchronisation automatique entre le dépôt et Claude
Design. Pas de watcher, pas de hook CI, pas de webhook, pas de détection de
conflit. L'outil `DesignSync` est piloté à la main, dans une session, sur
demande — et dans un seul sens, dépôt → miroir. Une modification faite côté
Claude Design est écrasée au push suivant.

C'est pour cela que le miroir a pu dater du 24 juillet sans que personne le
sache : il n'était pas cassé, il n'avait simplement aucune raison de bouger.

## Pour activer

Rien à écrire de plus. Il reste à :

1. Trancher les trois décisions ci-dessus
2. Connecter le dépôt à l'hébergeur et y renseigner les deux variables
3. Vérifier qu'un lien profond fonctionne — `/components/atoms#trendingbadge`
   est le bon test, il valide la règle de réécriture et l'ancre
