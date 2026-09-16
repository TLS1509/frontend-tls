import {
  LayoutDashboard,
  Map as MapIcon,
  PenLine,
  GraduationCap,
  BookOpenText,
  Layers,
  type LucideIcon,
} from 'lucide-react';

/**
 * La navigation principale — UNE liste, deux surfaces.
 *
 * Avant le 2026-09-16, `Sidebar` recevait ses entrées d'`App.tsx` en JSX et
 * `BottomNav` codait les siennes en dur. Deux listes maintenues à la main, donc
 * deux listes qui ont dérivé — mesuré au navigateur, trois divergences :
 *
 *   ce qu'on croyait     bureau                mobile
 *   ─────────────────────────────────────────────────────────────
 *   même libellé         « Tableau de bord »   « Accueil »
 *                        « Journal de bord »   « Journal »
 *   même icône           Video (Coaching)      GraduationCap
 *                        Sparkles (Veille)     BookOpenText
 *   même périmètre       6 entrées             5 (pas d'Espace Apprentissage)
 *
 * Le même écran portait donc deux noms ET deux icônes selon l'appareil. Ce n'est
 * pas un détail de style : c'est la carte mentale de l'utilisateur qui change en
 * changeant de téléphone.
 *
 * ⚠️ Les icônes retenues sont celles du MOBILE, contre l'intuition, parce que
 * celles du bureau collidaient avec des sens déjà pris ailleurs dans `src/` :
 * `Sparkles` y sert 76 fois comme marqueur « IA » — or la Veille n'a rien d'IA —
 * et `Video` 40 fois pour du contenu vidéo, alors que le Coaching est une
 * séance humaine. `BookOpenText` et `GraduationCap` étaient libres.
 *
 * ⚠️ `label` et `labelCourt` restent deux mots différents pour l'accueil et le
 * journal. Ce n'est pas un oubli : un onglet de la barre du bas dispose d'environ
 * 75 px, où « Tableau de bord » ne tient pas. La forme courte est donc
 * structurellement nécessaire — mais elle est désormais déclarée À CÔTÉ de la
 * longue, donc un écart se voit au lieu de se propager.
 */
export interface EntreeNavigation {
  id: string;
  href: string;
  /** Libellé canonique — celui du rail de bureau, qui a la place. */
  label: string;
  /** Ce qu'affiche la barre du bas. Absent = `label` tient déjà. */
  labelCourt?: string;
  icon: LucideIcon;
  /** Chemins qui allument l'entrée. `/` est comparé en égalité stricte. */
  match: string[];
  /** La barre du bas s'arrête à cinq onglets — au-delà, chacun passe sous 70 px. */
  dansLaBarreDuBas: boolean;
}

export const NAVIGATION_PRINCIPALE: EntreeNavigation[] = [
  {
    id: 'tableau-de-bord',
    href: '/',
    label: 'Tableau de bord',
    labelCourt: 'Accueil',
    icon: LayoutDashboard,
    match: ['/', '/dashboard'],
    dansLaBarreDuBas: true,
  },
  {
    id: 'parcours',
    href: '/learning-paths',
    label: 'Parcours',
    icon: MapIcon,
    match: ['/learning-paths', '/course', '/lesson'],
    dansLaBarreDuBas: true,
  },
  {
    id: 'journal',
    href: '/journal',
    label: 'Journal de bord',
    labelCourt: 'Journal',
    icon: PenLine,
    match: ['/journal'],
    dansLaBarreDuBas: true,
  },
  {
    id: 'coaching',
    href: '/coaching',
    label: 'Coaching',
    icon: GraduationCap,
    match: ['/coaching', '/coach'],
    dansLaBarreDuBas: true,
  },
  {
    id: 'veille',
    href: '/veille',
    label: 'Veille',
    icon: BookOpenText,
    match: ['/veille', '/magazine', '/newsletter'],
    dansLaBarreDuBas: true,
  },
  {
    id: 'espace-apprentissage',
    href: '/learning-space',
    label: 'Espace Apprentissage',
    icon: Layers,
    match: ['/learning-space'],
    dansLaBarreDuBas: false,
  },
];

/** Les cinq onglets de la barre du bas, dans l'ordre de la liste. */
export const NAVIGATION_BARRE_DU_BAS = NAVIGATION_PRINCIPALE.filter(
  (e) => e.dansLaBarreDuBas
);

/**
 * Une entrée est-elle allumée pour ce chemin ?
 *
 * `/` est comparé en égalité stricte — sinon `startsWith('/')` allumerait
 * l'accueil sur toutes les pages du site.
 */
export const entreeActive = (entree: EntreeNavigation, chemin: string): boolean =>
  entree.match.some((p) =>
    p === '/' ? chemin === '/' : chemin === p || chemin.startsWith(p + '/') || chemin === p + '/'
  );
