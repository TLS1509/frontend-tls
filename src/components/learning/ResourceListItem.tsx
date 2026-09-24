import React from 'react';

export interface ResourceListItemProps {
  /** Leading icon (e.g. <FileText size={14} />) */
  icon?: React.ReactNode;
  /** Main label — truncated when too long */
  label: string;
  /**
   * Une DONNÉE sur la ressource (type de fichier, taille, durée) : rendue en
   * légende 13 px ink-600 après le libellé. La donnée chuchote, l'état crie
   * (doctrine § 6) : « PDF » n'est pas un état, il n'a rien à faire dans un Badge.
   */
  meta?: React.ReactNode;
  /**
   * @deprecated Depuis le 2026-09-24 — utiliser `meta`. Le nom invitait à
   * poser un `Badge` sur une donnée. Rendu tel quel, sans style, tant qu'une
   * page le passe ; ignoré quand `meta` est présent.
   */
  badge?: React.ReactNode;
  /** Optional action slot rendered on the right (e.g. a Download button) */
  action?: React.ReactNode;
  /** If provided, the row is rendered as a button and calls onClick on press */
  onClick?: () => void;
  className?: string;
}

export const ResourceListItem: React.FC<ResourceListItemProps> = ({
  icon,
  label,
  meta,
  badge,
  action,
  onClick,
  className = '',
}) => {
  /* Rangée de liste : rayon de son étage (`rounded-lg`, 14) et retrait 16 —
     le bouton d'action (rayon 14) y reste une forme fixe, là où 12 px dans un
     rayon de 20 le pinçait (check-radius). 16 + 36 + 16 = 68 px de haut. */
  /* `@container` : la rangée mesure sa propre largeur (voir le libellé plus
     bas). `w-full` lui donne une largeur définie — un conteneur de requête ne
     tire pas sa largeur de son contenu, et s'écraserait dans un parent en
     ligne. */
  const base = [
    '@container w-full flex items-center justify-between gap-stack-xs p-stack rounded-lg bg-ink-50',
    onClick ? 'cursor-pointer hover:bg-ink-100 transition-colors duration-base text-left border-0' : '',
    className,
  ].filter(Boolean).join(' ');

  /* Des <span> seulement : la rangée devient un <button> quand elle est
     cliquable, et un bouton n'admet que du contenu phrasé (il portait deux
     <div>). Les classes d'affichage donnent le même rendu. */
  const inner = (
    <>
      {/* Libellé de rangée 16/600 ink-900 (passe typographique du
          2026-09-24) : c'était une légende de 13 px, plus petite que le bouton
          « Télécharger » posé à côté — le nom du document passait après l'action.

          Dans une colonne étroite, le nom passe avant la donnée (2026-09-24).
          La méta ne rétrécissait pas et le libellé, seul à céder, disparaissait :
          mesuré dans la vitrine à 375 px (rangée de 195), « Support de
          l'atelier » gardait 54 px sur 140, « Supp… » ; à 160 px de rangée,
          19 px. Sous 20rem de contenu (`@xs`, une rangée de moins de 352 px),
          la méta descend donc SOUS le libellé, et le libellé se coupe sur deux
          lignes avant de s'abréger. Au-dessus, rien ne change : une ligne,
          libellé abrégé, méta à sa suite, alignés sur la ligne de base.
          Un seuil de conteneur plutôt qu'un repli au contenu : les rangées
          d'une même liste ont la même largeur, elles basculent ensemble — un
          repli au contenu empilait la méta sous un nom long et la laissait à
          côté d'un nom court, dans la même liste.
          L'icône se centre sur la première ligne (`h-lh`), pas sur le bloc. */}
      <span className="flex items-start gap-stack-xs min-w-0">
        {icon && <span className="text-body h-lh text-ink-600 shrink-0 inline-flex items-center">{icon}</span>}
        <span className="flex flex-col @xs:flex-row @xs:items-baseline @xs:gap-x-stack-xs min-w-0">
          <span className="min-w-0 text-body font-semibold text-ink-900 line-clamp-2 @xs:line-clamp-1 break-words">{label}</span>
          {meta != null ? <span className="shrink-0 text-caption text-ink-600">{meta}</span> : badge}
        </span>
      </span>
      {action && <span className="shrink-0">{action}</span>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={base} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return <div className={base}>{inner}</div>;
};
