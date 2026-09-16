#!/usr/bin/env python3
"""Génère la page de référence des design tokens TLS depuis src/index.css.

La page est destinée à être publiée puis embarquée en iframe dans Notion.
Elle se régénère : c'est ce qui l'empêche de dériver, contrairement au Brand Hub
qui avait accumulé huit écarts en recopiant les valeurs à la main.

    python3 brand/tools/generer-reference-tokens.py <chemin/sortie.html>
"""
import json, re, sys, pathlib, datetime

RACINE = pathlib.Path(__file__).resolve().parents[2]
CSS = RACINE / 'src' / 'index.css'
SORTIE = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else RACINE / 'brand' / 'tools' / 'reference-tokens.html'

src = CSS.read_text()

# Les commentaires sont retirés AVANT toute collecte. Sans cela, un commentaire
# qui cite un token — `index.css` en contient un qui explique le piège de
# `--spacing-page: 3rem → gap-page` — est lu comme une déclaration, et comme la
# valeur court jusqu'au prochain `;`, elle avale le paragraphe entier. Le dict
# étant construit dans l'ordre, cette fausse valeur ÉCRASE la vraie, en silence.
sans_commentaires = re.sub(r'/\*.*?\*/', '', src, flags=re.S)

def collecte(prefixe):
    """Une déclaration tient sur une ligne : on ne franchit pas le saut."""
    return {m.group(1): m.group(2).strip()
            for m in re.finditer(rf'--{prefixe}-([a-z0-9-]+):\s*([^;\n]+);', sans_commentaires)}

couleurs = collecte('color')
texte    = collecte('text')
radius   = collecte('radius')
ombres   = collecte('shadow')
espaces  = collecte('spacing')

RAMPES = ['primary', 'secondary', 'accent', 'ink']
LEGENDES = {
    'primary':   ('Bleu TLS', 'La signature. Focus, leadership, surfaces principales.'),
    'secondary': ('Orange TLS', 'Action et parcours. C’est la couleur des CTA.'),
    'accent':    ('Doré TLS', 'Réflexion et réussites. Remplissage, jamais du texte.'),
    'ink':       ('Encre', 'Le texte et les gris. ink-900 est l’ancre à 14,20:1.'),
}
FAMILLES_SEM = {
    'success': ('Succès', ['success-bg', 'success-base', 'success-fg', 'success-vivid', 'success-bright']),
    'danger':  ('Danger', ['danger-bg', 'danger-base', 'danger-fg', 'danger-strong', 'danger-deep']),
    'warning': ('Alerte', ['warning-bg', 'warning-base', 'warning-fg']),
    'info':    ('Info',   ['info-bg', 'info-base', 'info-fg']),
}
ECHELLE = [
    ('hero', 'Hero', 'clamp — 44 à 80 px'), ('h1', 'Titre 1', ''), ('h2', 'Titre 2', ''),
    ('h3', 'Titre 3', ''), ('h4', 'Titre 4', ''), ('body-lg', 'Corps large', ''),
    ('body', 'Corps', ''), ('body-sm', 'Corps petit', ''), ('caption', 'Légende', ''),
    ('micro', 'Micro', ''),
]

# L'échelle d'empilement, dans l'ordre croissant. Les deux crans ajoutés le
# 2026-09-16 (`stack-3xs` à 4 px et `stack-sm` à 12 px) comblaient des trous que
# 76 usages numériques remplissaient à la main.
EMPILEMENT = [
    ('tight',      'le plus serré — étiquette et sa valeur'),
    ('stack-3xs',  'ajouté le 16/09 — 50 usages de gap-1 sans équivalent'),
    ('stack-2xs',  'ajouté le 09/09 — le barreau qui manquait'),
    ('stack-xs',   'la gouttière dominante du répertoire'),
    ('stack-sm',   'ajouté le 16/09 — entre stack-xs et stack'),
    ('stack',      'le cran de référence'),
    ('stack-lg',   'padding canonique d’une carte'),
    ('section',    'entre deux blocs d’une page'),
    ('section-lg', ''),
    ('page',       'marge de page'),
]
# Le rythme éditorial du site : des crans fluides, en clamp.
FLUIDES = [
    ('rule',    'étiquette ↔ valeur'), ('group',   'blocs d’un même groupe'),
    ('flow',    'titre de section ↔ contenu'), ('band',    'respiration d’une section'),
    ('hero',    'haut de hero'), ('chapter', 'rupture de mouvement, rare'),
    ('gutter',  'gouttière de grille'),
]

def en_px(v):
    """rem → px, pour que l'échelle se lise en pixels comme on la dessine."""
    v = v.strip()
    if v.endswith('rem'):
        n = float(v[:-3]) * 16
        return f'{n:.10g} px'
    return v

def rampe(fam):
    crans = sorted([k for k in couleurs if k.startswith(fam + '-') and k.rsplit('-', 1)[1].isdigit()],
                   key=lambda x: int(x.rsplit('-', 1)[1]))
    return [(k.rsplit('-', 1)[1], couleurs[k], f'--color-{k}') for k in crans]

donnees = {
    'rampes': {f: rampe(f) for f in RAMPES},
    'legendes': LEGENDES,
    'semantiques': {f: (lib, [(k, couleurs[k], f'--color-{k}') for k in ks if k in couleurs])
                    for f, (lib, ks) in FAMILLES_SEM.items()},
    'echelle': [{'cle': c, 'libelle': l, 'note': n, 'taille': texte.get(c, ''),
                 'ls': texte.get(c + '--letter-spacing', ''), 'fw': texte.get(c + '--font-weight', '')}
                for c, l, n in ECHELLE if c in texte],
    'espacements': [(c, espaces[c], en_px(espaces[c]), note) for c, note in EMPILEMENT if c in espaces],
    'fluides': [(c, espaces[c], note) for c, note in FLUIDES if c in espaces],
    'radius': sorted(radius.items(), key=lambda kv: 9999 if kv[0] == 'pill' else int(re.sub(r'\D', '', kv[1]) or 0)),
    'ombres': [(k, v) for k, v in ombres.items() if re.match(r'^(card|card-hover|card-lift|brand-sm|warm-sm|sun-sm)$', k)],
    'genere': datetime.date.today().isoformat(),
}

html = pathlib.Path(__file__).with_name('_gabarit.html').read_text()
html = html.replace('/*__DONNEES__*/', 'window.TLS = ' + json.dumps(donnees, ensure_ascii=False) + ';')
html = html.replace('__DATE__', donnees['genere'])
SORTIE.parent.mkdir(parents=True, exist_ok=True)
SORTIE.write_text(html)
print(f"  {SORTIE}")
print(f"  {sum(len(v) for v in donnees['rampes'].values())} crans de rampe · "
      f"{sum(len(v[1]) for v in donnees['semantiques'].values())} sémantiques · "
      f"{len(donnees['echelle'])} pas typographiques · {len(donnees['radius'])} rayons · "
      f"{len(donnees['espacements'])} crans d'espacement")
