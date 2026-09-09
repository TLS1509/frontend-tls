# Mode « Dark · perime » — valeurs retirées de Figma le 2026-09-09

Collection `TLS / Colors` du fichier Figma `LccBZ1GKWQVwVzPtsSzk5Y`. Le mode
`Dark · perime (hors code 28/07/26)` (id `3035:0`) a été supprimé. Sur 78 variables,
**37 avaient la même valeur dans les deux modes** et **41 différaient** — celles-ci
sont consignées ici, elles n'existent plus nulle part ailleurs.

## Pourquoi il fallait le retirer

Ces valeurs confirment ce que `CLAUDE.md` disait du dark mode supprimé du code le
2026-07-28 : « il surchargeait les couleurs sémantiques avec du RGB brut ». On le voit
ligne par ligne — `success-fg` passait à `#6ee7b7` (emerald Tailwind), `warning-fg` à
`#fcd34d` (amber Tailwind), `info-fg` à `#67e8f9` (cyan Tailwind), et `ink/900`
retombait sur `#1a1a1a`, la dérive neutre que le dépôt a corrigée. Aucun de ces tons
n'appartient à la palette TLS.

Le mode ne servait plus rien : le code n'a plus de dark mode depuis le 28/07/2026.

## Les 41 valeurs

| Variable | Light (conservé) | Dark (supprimé) |
|---|---|---|
| `primary/700` | `#3d7786` | `#4d96a8` |
| `primary/800` | `#2f5f6a` | `#3d7786` |
| `primary/900` | `#1f3e45` | `#2f5f6a` |
| `primary/950` | `#164267` | `#1f3e45` |
| `secondary/700` | `#8f5017` | `#b36520` |
| `secondary/800` | `#5e3710` | `#8f5017` |
| `secondary/900` | `#3b2109` | `#5e3710` |
| `secondary/650` | `#bf693b` | `#d4865a` |
| `accent/700` | `#a85f0a` | `#ae7b30` |
| `accent/800` | `#7e4006` | `#956a29` |
| `accent/900` | `#5f2e05` | `#7c5822` |
| `accent/canonical` | alias → `accent/400` | `#ffffff` |
| `ink/900` | `#252b37` | `#1a1a1a` ⚠️ |
| `surface/cyan` | `#f0f9ff` | `#0d2331` |
| `surface/mist` | `#f8fbfd` | `#16202a` |
| `surface/cream` | `#fefaf5` | `#2a2929` |
| `surface/default` | `#ffffff` | `#1a1a1a` |
| `surface/muted` | `#f9fafb` | `#1f2937` |
| `surface/sunken` | `#f3f4f6` | `#111827` |
| `surface/elevated` | `#ffffff` | `#252525` |
| `semantic/success-bg` | `#e8f2f0` | `#0d2420` |
| `semantic/success-fg` | `#335a56` | `#6ee7b7` ⚠️ emerald Tailwind |
| `semantic/success-vivid` | `#347572` | `#45968e` |
| `semantic/success-bright` | `#228b55` | `#2eaa6a` |
| `semantic/danger-bg` | `#fef4f0` | `#2d1206` |
| `semantic/danger-fg` | `#8f2a0e` | `#fca882` |
| `semantic/danger-strong` | `#c0432a` | `#e05c45` |
| `semantic/danger-deep` | `#9b2f1b` | `#c0432a` |
| `semantic/warning-bg` | `#fff9ee` | `#2a1f00` |
| `semantic/warning-fg` | `#2f1c13` | `#fcd34d` ⚠️ amber Tailwind |
| `semantic/info-bg` | `#e8f4f7` | `#0a2329` |
| `semantic/info-fg` | `#1f3e45` | `#67e8f9` ⚠️ cyan Tailwind |
| `text/strong` | alias → `ink/900` | `#f9fafb` |
| `text/default` | `#374151` | `#e5e7eb` |
| `text/muted` | `#6b7280` | `#9ca3af` |
| `text/subtle` | `#9ca3af` | `#6b7280` |
| `text/inverse` | `#ffffff` | `#1a1a1a` |
| `border/subtle` | `#f3f4f6` | `#1f2937` |
| `border/default` | `#e5e7eb` | `#374151` |
| `border/strong` | `#d1d5db` | `#4b5563` |
| `brown/editorial` | `#2f1c13` | `#ffffff` |

Si un vrai mode sombre est un jour demandé, il se reconstruit sur la palette TLS —
pas sur ces valeurs. Voir [`../BRAND-KIT.md`](../BRAND-KIT.md) §1.
