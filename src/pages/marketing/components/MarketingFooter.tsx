/**
 * MarketingFooter — pied de page du site vitrine.
 *
 * Refait le 2026-09-16. Ce qui part, et pourquoi :
 *
 *  - **Le bandeau teinté** (`bg-primary-50/40` pleine largeur). La coque porte
 *    un dégradé ambiant unique ; un second fond posé en bas se lit comme une
 *    couture. Même famille de défaut que les sept racines `bg-white` retirées
 *    des pages le même jour — sauf qu'ici il était teinté, donc moins visible
 *    et plus tenace. Remplacé par un simple filet.
 *
 *  - **Le paragraphe de présentation** (trois lignes). Il redisait ce que la
 *    page dit déjà au-dessus de la ligne de flottaison, et il portait **deux
 *    des onze occurrences de « conseil »** que D8 abandonne. Un pied de page
 *    n'a pas à repitcher : il oriente.
 *
 *  - **Les deux boutons ronds de 36 px** (LinkedIn, e-mail) posés sous la
 *    marque. Ils occupaient un bloc à eux seuls pour deux liens. Redescendus
 *    en texte dans la rangée de mentions.
 *
 *  - **`pt-16` / `gap-section`** → `pt-flow` / `gap-flow`. Le pied mesurait
 *    plus de 360 px de haut ; il en fait un peu plus de la moitié.
 *
 * Ce qui reste, et qu'il ne faut pas « nettoyer » :
 *  - `min-h-[24px]` sur chaque lien. Mesurés au navigateur le 29/07 en 375 px,
 *    ces liens faisaient 21 px de haut — les seules cibles du site sous le
 *    minimum normatif WCAG 2.2 AA (SC 2.5.8, 24×24). La densité visuelle tient
 *    au `gap`, pas à la hauteur de cible.
 *  - Le SVG LinkedIn écrit à la main. `lucide-react` **n'a pas** d'icône
 *    LinkedIn (vérifié) : c'est le cas d'exception prévu par CLAUDE.md, un
 *    logo de marque.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { TlsLogo } from '../../../components/ui/TlsLogo';

const LinkedInIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="shrink-0"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type FooterColumn = { title: string; links: { label: string; href: string }[] };

const COLUMNS: FooterColumn[] = [
  {
    title: 'Offres',
    links: [
      { label: 'Studio IA & Pédagogie', href: '/website/studio' },
      { label: 'Upskilling sur-mesure', href: '/website/upskilling' },
      { label: 'Learning App', href: '/website/learning-app' },
      { label: 'La méthode STRIDE', href: '/website/accompagnement' },
    ],
  },
  {
    // "La méthode STRIDE" a quitté la colonne Offres le 16/09/2026 : STRIDE est
    // gelée jusqu'en 2028 (catalogue du 31/08) et sa page a été rétrogradée en
    // page de méthode. La laisser sous un titre "Offres" affichait comme
    // achetable ce qui ne l'est plus. Elle rejoint les contenus, à côté des
    // diagnostics et de la Vigie. Emplacement définitif à confirmer avec
    // l'arbitrage de nav — voir docs/site/SITEMAP-V1.md §1 bis.
    title: 'Ressources',
    links: [
      { label: 'Autodiagnostics', href: '/website/diagnostic' },
      { label: 'La Vigie IA', href: '/website/vigie' },
      { label: 'La méthode STRIDE', href: '/website/accompagnement' },
      { label: 'Magazine & Ressources', href: '/website/resources' },
    ],
  },
  {
    title: 'La société',
    links: [
      { label: 'Les Fondateurs', href: '/website/equipe' },
      { label: 'Contact', href: '/website/contact' },
      { label: 'Accès anticipé', href: '/website/waitlist' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/website/mentions-legales' },
  { label: 'Confidentialité', href: '/website/politique-confidentialite' },
  { label: 'CGV / CGU', href: '/website/cgv-cgu' },
  { label: 'Charte IA', href: '/website/charte-ia' },
];

const LIEN = 'inline-flex min-h-[24px] items-center transition-colors duration-fast';

export const MarketingFooter: React.FC = () => (
  <footer className="border-t border-ink-200/70">
    <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-10 pt-flow pb-group flex flex-col gap-flow">

      {/* Rangée 1 — la marque tient sa ligne, la navigation occupe le reste. */}
      <div className="flex flex-col gap-flow sm:flex-row sm:items-start sm:justify-between">
        <Link
          to="/website"
          className="flex w-fit shrink-0 items-center gap-stack-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-lg"
        >
          <TlsLogo size={24} variant="primary" />
          <span className="font-display font-bold text-body-sm text-ink-900 whitespace-nowrap">
            The Learning Society
          </span>
        </Link>

        <div className="grid grid-cols-2 gap-x-flow gap-y-flow sm:flex sm:gap-x-flow lg:gap-x-chapter">
          {COLUMNS.map(({ title, links }) => (
            <nav key={title} aria-label={`Pied de page : ${title}`} className="flex flex-col gap-rule">
              <span className="font-display text-caption font-bold text-ink-900">{title}</span>
              <ul className="flex flex-col m-0 p-0 list-none">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className={`${LIEN} font-body text-body-sm text-ink-600 hover:text-ink-900`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Rangée 2 — mentions, légal et contact sur une seule ligne. */}
      <div className="flex flex-wrap items-center gap-x-group gap-y-stack-3xs border-t border-ink-200/70 pt-group font-body text-micro text-ink-600">
        <span>© 2026 The Learning Society · Paris</span>

        <nav aria-label="Pied de page : mentions légales" className="flex flex-wrap items-center gap-x-group gap-y-stack-3xs">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link key={href} to={href} className={`${LIEN} hover:text-ink-900`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-x-group sm:ml-auto">
          <a
            href="https://www.linkedin.com/company/thelearningsociety"
            target="_blank"
            rel="noopener noreferrer"
            className={`${LIEN} gap-stack-2xs hover:text-ink-900`}
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href="mailto:contact@thelearningsociety.fr"
            className={`${LIEN} hover:text-ink-900`}
          >
            contact@thelearningsociety.fr
          </a>
        </div>
      </div>

    </div>
  </footer>
);

export default MarketingFooter;
