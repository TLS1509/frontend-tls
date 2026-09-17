import os, shutil

OUT = os.environ.get('OUT') or os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out', 'components')

HEAD = """<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {{ margin: 0; padding: {pad}; background: var({bg}); font-family: var(--font-body); color: var(--color-text-strong); }}
  .rows {{ display: flex; flex-direction: column; gap: 20px; }}
  .label {{ font-size: 11px; line-height: 18px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-text-muted); margin: 0 0 8px; }}
  .row {{ display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }}
  .grid2 {{ display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-items: start; }}
  .grid3 {{ display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }}
  .stack {{ display: flex; flex-direction: column; gap: 12px; }}
  .tile {{ padding: 16px; border-radius: var(--radius-xl); background: var(--color-surface); border: 1px solid var(--color-border-default); }}
{css}
</style>
</head>
<body>
<div id="root"></div>
<script>
(function () {{
  var h = React.createElement;
  var useState = React.useState;
  var DS = window.TheLearningSocietyDesignSystem_96f558;
  var ICON = {{ plus: 'Plus', arrow: 'ArrowRight', clock: 'Clock', book: 'BookOpen', calendar: 'Calendar', search: 'Search', flame: 'Flame', home: 'House', mail: 'Mail', users: 'Users', sparkles: 'Sparkles', lock: 'Lock' }};
  function I(name, size) {{ return h(DS.Icons[ICON[name]], {{ size: size || 16, 'aria-hidden': true }}); }}
  function Label(t) {{ return h('p', {{ className: 'label' }}, t); }}
{js}
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
}})();
</script>
</body>
</html>
"""

C = {}

def add(name, group, height, subtitle, js, css='', pad='24px', bg='--color-surface', width=None):
    C[name] = dict(group=group, height=height, subtitle=subtitle, js=js, css=css, pad=pad, bg=bg, width=width)

add('Badge', 'Atoms', 200, "l'état qui crie : 7 variantes, 3 tailles, point", """
  var Badge = DS.Badge;
  function App() {
    var v = ['brand', 'neutral', 'warm', 'sun', 'success', 'danger', 'info'];
    return h('div', { className: 'rows' },
      h('div', null, Label('Variantes'), h('div', { className: 'row' }, v.map(function (x) { return h(Badge, { key: x, variant: x }, x); }))),
      h('div', null, Label('Tailles compact · normal · large, avec point'), h('div', { className: 'row' },
        h(Badge, { size: 'compact', variant: 'warm' }, 'En retard'),
        h(Badge, { size: 'normal', variant: 'success', dot: true }, 'Validé'),
        h(Badge, { size: 'large', variant: 'brand' }, 'Nouveau'))));
  }""")

add('StatusBadge', 'Atoms', 170, "les cinq états d'une leçon", """
  var StatusBadge = DS.StatusBadge;
  function App() {
    var s = ['locked', 'available', 'in-progress', 'completed', 'failed'];
    return h('div', { className: 'rows' },
      h('div', null, Label('Avec libellé'), h('div', { className: 'row' }, s.map(function (x) { return h(StatusBadge, { key: x, status: x, showLabel: true }); }))),
      h('div', null, Label('Icône seule, sm'), h('div', { className: 'row' }, s.map(function (x) { return h(StatusBadge, { key: x, status: x, size: 'sm' }); }))));
  }""")

add('MetaPill', 'Atoms', 200, "la donnée qui chuchote : tons et tailles", """
  var MetaPill = DS.MetaPill;
  function App() {
    var t = ['neutral', 'primary', 'warm', 'sun', 'brand', 'success', 'danger', 'info'];
    return h('div', { className: 'rows' },
      h('div', null, Label('Tons'), h('div', { className: 'row' }, t.map(function (x) { return h(MetaPill, { key: x, text: x, tone: x }); }))),
      h('div', null, Label('Avec icône · sm (défaut) · md'), h('div', { className: 'row' },
        h(MetaPill, { text: '45 min', icon: I('clock', 14) }),
        h(MetaPill, { text: '12 leçons', icon: I('book', 14), tone: 'primary' }),
        h(MetaPill, { text: 'Intermédiaire', size: 'md', tone: 'warm' }))));
  }""")

add('MetaPillGroup', 'Composites', 200, "la rangée de métadonnées d'une carte", """
  var MetaPillGroup = DS.MetaPillGroup;
  function App() {
    var items = [{ text: 'Intermédiaire', tone: 'warm' }, { text: '3 h', icon: I('clock', 14) }, { text: '12 leçons', icon: I('book', 14) }];
    return h('div', { className: 'rows' },
      h('div', null, Label('Horizontal'), h(MetaPillGroup, { items: items })),
      h('div', null, Label('Vertical'), h(MetaPillGroup, { items: items, layout: 'vertical' })));
  }""")

add('FilterChip', 'Search & Filters', 190, "filtres à bascule, compteur, réinitialisation", """
  var FilterChip = DS.FilterChip;
  function App() {
    var st = useState('all'); var active = st[0], setActive = st[1];
    var f = [['all', 'Tous'], ['doing', 'En cours'], ['done', 'Validés'], ['todo', 'À commencer']];
    return h('div', { className: 'rows' },
      h('div', null, Label('Un filtre actif'), h('div', { className: 'row' },
        f.map(function (x) { return h(FilterChip, { key: x[0], label: x[1], active: active === x[0], onClick: function () { setActive(x[0]); } }); }),
        h(FilterChip, { label: 'Réinitialiser', variant: 'reset', onClick: function () { setActive('all'); } }))),
      h('div', null, Label('Tons, compteur, sm'), h('div', { className: 'row' },
        h(FilterChip, { label: 'Coaching', active: true, tone: 'warm', count: 3 }),
        h(FilterChip, { label: 'Réussites', active: true, tone: 'sun', count: 8 }),
        h(FilterChip, { label: 'Réglages', tone: 'neutral', size: 'sm' }),
        h(FilterChip, { label: 'Indisponible', disabled: true }))));
  }""")

add('Input', 'Atoms', 470, "champ, statuts, tailles, zone de texte, cases", """
  var Input = DS.Input, Checkbox = DS.Checkbox, Radio = DS.Radio, Switch = DS.Switch;
  function App() {
    return h('div', { className: 'grid2' },
      h('div', { className: 'stack' },
        h(Input, { label: 'Adresse e-mail', placeholder: 'vous@entreprise.fr', leadingIcon: I('mail', 16), hint: 'Nous ne la partageons jamais.' }),
        h(Input, { label: 'Code de session', defaultValue: 'TLS-2026', status: 'success' }),
        h(Input, { label: 'Mot de passe', type: 'password', defaultValue: 'abc', status: 'error', error: '8 caractères minimum.', required: true })),
      h('div', { className: 'stack' },
        h(Input, { size: 'sm', placeholder: 'sm · 36 px' }),
        h(Input, { size: 'lg', placeholder: 'lg · 52 px' }),
        h(Input, { label: 'Ta réflexion', multiline: true, rows: 3, placeholder: 'Ce que tu retiens de la mission…' }),
        h('div', { className: 'row' },
          h(Checkbox, { label: 'Rappel hebdomadaire', defaultChecked: true }),
          h(Radio, { name: 'r', label: 'Mardi', defaultChecked: true }),
          h(Switch, { label: 'Week-end silencieux', defaultChecked: true }))));
  }""")

add('Select', 'Atoms', 270, "liste déroulante native, tailles et statuts", """
  var Select = DS.Select;
  var o = [{ value: 'n', label: 'Novice' }, { value: 'a', label: 'Avancé' }, { value: 'e', label: 'Expert' }];
  function App() {
    return h('div', { className: 'grid2' },
      h('div', { className: 'stack' },
        h(Select, { label: 'Niveau Dreyfus', placeholder: 'Choisis ton niveau', options: o, hint: 'Tu pourras le modifier.' }),
        h(Select, { label: 'Équipe', options: o, status: 'error', error: 'Champ requis.', required: true })),
      h('div', { className: 'stack' },
        h(Select, { size: 'sm', placeholder: 'sm', options: o }),
        h(Select, { size: 'md', placeholder: 'md', options: o }),
        h(Select, { size: 'lg', placeholder: 'lg', options: o })));
  }""")

add('Combobox', 'Search & Filters', 150, "saisie filtrée parmi des options", """
  var Combobox = DS.Combobox;
  var o = ['Prompt engineering', 'Pilotage de projet', 'Facilitation', 'Analyse de données', 'Conduite du changement'].map(function (l, i) { return { value: 'c' + i, label: l }; });
  function App() {
    var st = useState('c1');
    return h('div', { className: 'grid2' },
      h(Combobox, { label: 'Compétence', options: o, value: st[0], onChange: st[1], hint: 'Tape pour filtrer.' }),
      h(Combobox, { label: 'Compétence visée', options: o, placeholder: 'Rechercher…', status: 'error', error: 'Choisis une compétence.' }));
  }""")

add('Search', 'Search & Filters', 240, "barre de recherche : défaut, verre, tailles", """
  var Search = DS.Search;
  function App() {
    return h('div', { className: 'rows' },
      h(Search, { placeholder: 'Rechercher un parcours, une ressource…', shortcut: '⌘K' }),
      h('div', { style: { padding: '16px', borderRadius: 'var(--radius-xl)', background: 'var(--color-primary-700)' } },
        h(Search, { variant: 'glass', placeholder: 'Sur fond coloré', shortcut: '⌘K' })),
      h('div', { className: 'grid2' }, h(Search, { size: 'sm', placeholder: 'sm' }), h(Search, { size: 'lg', placeholder: 'lg' })));
  }""")

add('Alert', 'Feedback', 430, "info, succès, attention, danger", """
  var Alert = DS.Alert, Button = DS.Button;
  function App() {
    return h('div', { className: 'stack' },
      h(Alert, { variant: 'info', title: 'Nouvelle ressource' }, 'Un guide sur la facilitation a été ajouté à ton parcours.'),
      h(Alert, { variant: 'success', title: 'Pratique soumise', dismissible: true }, 'Ton coach la relira cette semaine.'),
      h(Alert, { variant: 'warning', title: 'JAC à valider bientôt', actions: h(Button, { size: 'sm', emphasis: 'soft', tone: 'sun' }, 'Voir') }, 'Il reste 3 jours pour soumettre ton jalon.'),
      h(Alert, { variant: 'danger', title: 'Envoi impossible' }, 'La connexion a été interrompue. Tes réponses sont conservées.'));
  }""")

add('Toast', 'Feedback', 330, "notifications passagères", """
  var Toast = DS.Toast;
  function App() {
    return h('div', { className: 'stack', style: { maxWidth: '420px' } },
      h(Toast, { variant: 'success', title: 'Brouillon enregistré', dismissible: false }, 'Tu peux reprendre plus tard.'),
      h(Toast, { variant: 'info', title: 'Session déplacée', actionLabel: 'Voir', onAction: function () {} }, 'Mardi 14 h au lieu de lundi.'),
      h(Toast, { variant: 'warning', title: 'Session bientôt expirée', dismissible: false }, 'Encore 5 minutes.'),
      h(Toast, { variant: 'danger', title: 'Erreur', dismissible: false }, 'Impossible de joindre le serveur.'));
  }""")

add('Modal', 'Modals', 440, "boîte de dialogue sur voile", """
  var Modal = DS.Modal, Button = DS.Button;
  function App() {
    return h(Modal, { open: true, onClose: function () {}, closeOnScrim: false,
      title: 'Supprimer ce brouillon ?',
      description: 'Ta réflexion sera définitivement effacée.',
      actions: h(React.Fragment, null, h(Button, { emphasis: 'ghost', tone: 'neutral' }, 'Annuler'), h(Button, { emphasis: 'solid', tone: 'danger' }, 'Supprimer')) });
  }""", bg='--color-surface-muted')

add('Breadcrumb', 'Navigation', 170, "simple et navigation repliable", """
  var Breadcrumb = DS.Breadcrumb;
  function App() {
    var items = [{ label: 'Accueil', href: '#', icon: I('home', 14) }, { label: 'Parcours', href: '#' }, { label: 'IA et pédagogie', href: '#' }, { label: 'Module 2', href: '#' }, { label: 'Leçon 4' }];
    return h('div', { className: 'rows' },
      h('div', null, Label('simple'), h(Breadcrumb, { items: items })),
      h('div', null, Label('nav, 3 niveaux visibles'), h(Breadcrumb, { variant: 'nav', items: items, maxVisible: 3, current: 4, onNavigate: function () {} })));
  }""")

add('Pagination', 'Composites', 120, "numérotée, avec voisins et état", """
  var Pagination = DS.Pagination;
  function App() {
    var st = useState(4);
    return h(Pagination, { page: st[0], totalPages: 12, onChange: st[1], info: 'Page ' + st[0] + ' sur 12' });
  }""")

add('Tabs', 'Navigation', 280, "pill, underline, boxed", """
  var Tabs = DS.Tabs;
  function App() {
    var a = useState('p'), b = useState('p'), c = useState('p');
    var items = [{ id: 'p', label: 'Pratiques', badge: 3 }, { id: 'r', label: 'Ressources' }, { id: 'n', label: 'Notes' }, { id: 'x', label: 'Archivé', disabled: true }];
    return h('div', { className: 'rows' },
      h('div', null, Label('pill'), h(Tabs, { items: items, value: a[0], onChange: a[1], variant: 'pill' })),
      h('div', null, Label('underline'), h(Tabs, { items: items, value: b[0], onChange: b[1], variant: 'underline' })),
      h('div', null, Label('boxed'), h(Tabs, { items: items, value: c[0], onChange: c[1], variant: 'boxed' })));
  }""")

add('Stepper', 'Composites', 400, "étapes nommées, horizontal et vertical", """
  var Stepper = DS.Stepper;
  function App() {
    var steps = [{ label: "S'orienter", description: 'Positionnement', state: 'done' }, { label: 'Tester', description: 'Première mission', state: 'current' }, { label: 'Réaliser', state: 'upcoming' }, { label: 'Intégrer', state: 'upcoming' }];
    return h('div', { className: 'rows' },
      h('div', null, Label('horizontal'), h(Stepper, { items: steps, orientation: 'horizontal' })),
      h('div', null, Label('vertical'), h(Stepper, { items: steps, orientation: 'vertical' })));
  }""")

add('SectionHeader', 'Headers & Sections', 470, "5 variantes, tons, tailles", """
  var SectionHeader = DS.SectionHeader, Button = DS.Button;
  function App() {
    return h('div', { className: 'rows' },
      h(SectionHeader, { variant: 'default', icon: I('calendar', 20), title: 'Tes prochaines sessions', subtitle: 'Pastille teintée (défaut)' }),
      h(SectionHeader, { variant: 'solid', tone: 'warm', icon: I('users', 20), title: 'Coaching', subtitle: 'Pastille pleine, icône blanche', action: h(Button, { size: 'sm', emphasis: 'soft', tone: 'warm' }, 'Réserver') }),
      h(SectionHeader, { variant: 'minimal', tone: 'sun', icon: I('sparkles', 20), title: 'Réussites récentes', subtitle: 'Sans pastille' }),
      h(SectionHeader, { variant: 'accent', title: 'Ressources', subtitle: 'Barre verticale', size: 'sm' }),
      h(SectionHeader, { variant: 'underline', title: 'Journal de la semaine', size: 'lg', divider: true }));
  }""")

add('PageHero', 'Headers & Sections', 520, "héros d'ouverture : tons default et brand", """
  var PageHero = DS.PageHero;
  function App() {
    return h('div', { className: 'rows' },
      h(PageHero, { eyebrow: { icon: I('book', 14), label: 'Parcours' }, title: 'IA et ingénierie pédagogique', summary: 'Quatre missions pour intégrer l’IA à ta pratique de formateur.', meta: [{ icon: I('clock', 14), label: '6 h' }, { icon: I('book', 14), label: '12 leçons' }], progress: 40, progressLabel: '40 % validé' }),
      h(PageHero, { tone: 'brand', compact: true, eyebrow: { label: 'Tableau de bord' }, title: 'Bonjour Chloé', summary: 'Ta prochaine pratique t’attend.' }));
  }""", pad='0')

add('CardGrid', 'Lists & Feeds', 530, "colonnage selon le type de carte", """
  var CardGrid = DS.CardGrid, Card = DS.Card;
  function cards(n, t) { var a = []; for (var i = 1; i <= n; i++) a.push(h(Card, { key: i, eyebrow: t, title: 'Carte ' + i, description: 'Un contenu par carte.' })); return a; }
  function App() {
    return h('div', { className: 'rows' },
      h('div', null, Label('default · 1 / 2 / 3'), h(CardGrid, { layout: 'default', gapSize: 'sm' }, cards(3, 'Default'))),
      h('div', null, Label('feature · 1 / 2 / 4'), h(CardGrid, { layout: 'feature', gapSize: 'sm' }, cards(4, 'Feature'))));
  }""", bg='--color-surface-muted')

add('StatCard', 'Cards', 380, "KPI : variantes, tons, tailles", """
  var StatCard = DS.StatCard;
  function App() {
    return h('div', { className: 'rows' },
      h('div', { className: 'grid3' },
        h(StatCard, { icon: I('book', 20), label: 'Pratiques validées', value: 12, sub: '/24', delta: '+3 ce mois', deltaDirection: 'up' }),
        h(StatCard, { variant: 'elevated', icon: I('clock', 20), label: 'Temps de pratique', value: '48', sub: 'h' }),
        h(StatCard, { variant: 'warm', icon: I('flame', 20), label: 'Semaines actives', value: 7, delta: 'Record', deltaDirection: 'up' })),
      h('div', { className: 'grid3' },
        h(StatCard, { size: 'sm', tone: 'brand', label: 'sm', value: 86, unit: '%' }),
        h(StatCard, { size: 'md', tone: 'sun', label: 'md', value: 4, sub: '/5' }),
        h(StatCard, { size: 'lg', label: 'lg', value: '2,4', unit: 'k' })));
  }""", bg='--color-surface-muted')

add('Avatar', 'Atoms', 230, "tailles, teintes, statut, groupe", """
  var Avatar = DS.Avatar, AvatarGroup = DS.AvatarGroup;
  function App() {
    return h('div', { className: 'rows' },
      h('div', null, Label('Tailles xs → xl, teinte dérivée du nom'), h('div', { className: 'row' },
        ['xs', 'sm', 'md', 'lg', 'xl'].map(function (s, i) { return h(Avatar, { key: s, size: s, name: ['Jeanne Dupont', 'Paul Martin', 'Inès Kader', 'Marc Leroy', 'Sofia Rossi'][i] }); }))),
      h('div', null, Label('Teintes, forme, statut, niveau · groupe'), h('div', { className: 'row' },
        h(Avatar, { initials: 'CM', tint: 'brand', status: 'online' }),
        h(Avatar, { initials: 'PC', tint: 'warm', status: 'busy' }),
        h(Avatar, { initials: 'AL', tint: 'sun', shape: 'square', level: 3 }),
        h(Avatar, { initials: 'TL', tint: 'ink', ring: true }),
        h(AvatarGroup, { max: 3, size: 'sm' }, ['Jeanne Dupont', 'Paul Martin', 'Inès Kader', 'Marc Leroy', 'Sofia Rossi'].map(function (n) { return h(Avatar, { key: n, name: n }); })))));
  }""")

add('EmptyState', 'Feedback', 360, "état vide, toujours avec une action", """
  var EmptyState = DS.EmptyState, Button = DS.Button;
  function App() {
    return h('div', { className: 'grid2' },
      h(EmptyState, { icon: I('book', 40), title: 'Aucune réflexion cette semaine', description: 'Note ce que ta dernière mission t’a appris.', actions: h(Button, { leadingIcon: I('plus', 16) }, 'Commence ta réflexion') }),
      h(EmptyState, { tone: 'warm', icon: I('calendar', 40), title: 'Pas de session prévue', description: 'Ton coach propose des créneaux le mardi.', actions: h(Button, { emphasis: 'soft', tone: 'warm' }, 'Voir les créneaux') }));
  }""")

add('TlsLogo', 'Atoms', 360, "le mark en 6 variantes et le lockup", """
  var TlsLogo = DS.TlsLogo, TlsLogoLockup = DS.TlsLogoLockup;
  function Tile(bg, child) { return h('div', { style: { padding: '16px', borderRadius: 'var(--radius-xl)', background: 'var(' + bg + ')', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, child); }
  function App() {
    return h('div', { className: 'rows' },
      h('div', null, Label('Variantes sur leur surface'), h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' } },
        Tile('--color-surface-muted', h(TlsLogo, { size: 56, variant: 'color' })),
        Tile('--color-primary-800', h(TlsLogo, { size: 56, variant: 'light' })),
        Tile('--color-primary-50', h(TlsLogo, { size: 56, variant: 'primary' })),
        Tile('--color-secondary-50', h(TlsLogo, { size: 56, variant: 'warm' })),
        Tile('--color-accent-50', h(TlsLogo, { size: 56, variant: 'sun' })),
        Tile('--color-surface-muted', h(TlsLogo, { size: 56, variant: 'ink' })))),
      h('div', null, Label('Aplat sous 28 px, dégradé au-dessus · lockup'), h('div', { className: 'row' },
        h(TlsLogo, { size: 24 }), h(TlsLogo, { size: 40 }), h(TlsLogo, { size: 64 }),
        h(TlsLogoLockup, { layout: 'horizontal', iconSize: 40 }))));
  }""")

add('Sidebar', 'Navigation', 520, "navigation latérale du bureau", """
  var Sidebar = DS.Sidebar, NavItem = DS.NavItem, SidebarGroup = DS.SidebarGroup, SidebarUserCard = DS.SidebarUserCard, TlsLogo = DS.TlsLogo, Avatar = DS.Avatar;
  function App() {
    return h('div', { style: { display: 'flex', height: '520px', background: 'var(--color-surface-muted)' } },
      h(Sidebar, {
        brand: h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-primary-800)' } }, h(TlsLogo, { size: 28 }), 'The Learning Society'),
        userCard: h(SidebarUserCard, { avatar: h(Avatar, { initials: 'CM', tint: 'brand', size: 'sm' }), name: 'Chloé', subtitle: 'Apprenante', notificationCount: 2 }) },
        h(SidebarGroup, null,
          h(NavItem, { href: '#', icon: I('home', 20), label: 'Tableau de bord', active: true }),
          h(NavItem, { href: '#', icon: I('book', 20), label: 'Parcours', count: 3 }),
          h(NavItem, { href: '#', icon: I('calendar', 20), label: 'Coaching' }),
          h(NavItem, { href: '#', icon: I('sparkles', 20), label: 'Veille' }))),
      h('div', { style: { flex: 1 } }));
  }""", pad='0')

add('BottomNav', 'Navigation', 200, "barre du bas, mobile", """
  var BottomNav = DS.BottomNav, MemoryRouter = DS.MemoryRouter;
  function App() {
    return h(MemoryRouter, { initialEntries: ['/parcours'] },
      h('p', { style: { margin: '16px', fontSize: '13px', color: 'var(--color-text-muted)' } }, 'Rendue sous 768 px, fixée en bas de l’écran.'),
      h(BottomNav));
  }""", pad='0', width=390)

add('AuthShell', 'Auth Family', 980, "coque d'authentification glass-dark", """
  var A = DS;
  function App() {
    var form = h('form', { className: 'stack', onSubmit: function (e) { e.preventDefault(); } },
      h('h1', { style: { margin: 0, fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff' } }, 'Connexion'),
      h(A.AuthSocialButton, { icon: h(A.AuthGoogleIcon) }, 'Continuer avec Google'),
      h(A.AuthDivider, null, 'ou'),
      h(A.AuthField, { label: 'E-mail', icon: I('mail', 18), placeholder: 'vous@entreprise.fr' }),
      h(A.AuthPasswordField, { label: 'Mot de passe', icon: I('lock', 18), placeholder: '••••••••' }),
      h(A.AuthCheckbox, { label: 'Rester connecté' }),
      h(A.AuthPrimaryButton, { type: 'submit' }, 'Se connecter'),
      h(A.AuthGhostButton, { type: 'button' }, 'Recevoir un lien magique'));
    return h(A.AuthShell, { form: form, aside: h('div', { style: { color: '#fff' } }, h('p', { style: { fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, margin: 0 } }, 'Pratique, valide, maîtrise.')) });
  }""", pad='0', width=1200)

for name, c in C.items():
    d = os.path.join(OUT, name)
    os.makedirs(d, exist_ok=True)
    marker = f'<!-- @dsCard group="{c["group"]}" height={c["height"]}' + (f' width={c["width"]}' if c['width'] else '') + f' subtitle="{c["subtitle"]}" -->\n'
    html = marker + HEAD.format(pad=c['pad'], bg=c['bg'], css=c['css'], js=c['js'])
    open(os.path.join(d, 'preview.html'), 'w').write(html)
# Aperçus écrits à la main (l'essai du 16/09), copiés tels quels
MAN = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'apercus-manuels')
for name in sorted(os.listdir(MAN)):
    os.makedirs(os.path.join(OUT, name), exist_ok=True)
    shutil.copy(os.path.join(MAN, name, 'preview.html'), os.path.join(OUT, name, 'preview.html'))
    C.setdefault(name, None)
print(len(C), 'aperçus')
