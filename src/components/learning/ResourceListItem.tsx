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
  const base = [
    'flex items-center justify-between gap-stack-xs p-stack rounded-lg bg-ink-50',
    onClick ? 'cursor-pointer hover:bg-ink-100 transition-colors duration-base w-full text-left border-0' : '',
    className,
  ].filter(Boolean).join(' ');

  /* Des <span> seulement : la rangée devient un <button> quand elle est
     cliquable, et un bouton n'admet que du contenu phrasé (il portait deux
     <div>). Les classes d'affichage donnent le même rendu. */
  const inner = (
    <>
      {/* Libellé de rangée 16/600 ink-900 (passe typographique du
          2026-09-24) : c'était une légende de 13 px, plus petite que le bouton
          « Télécharger » posé à côté — le nom du document passait après l'action. */}
      <span className="flex items-center gap-stack-xs min-w-0">
        {icon && <span className="text-ink-600 shrink-0 inline-flex">{icon}</span>}
        <span className="text-body font-semibold text-ink-900 truncate">{label}</span>
        {meta != null ? <span className="shrink-0 text-caption text-ink-600">{meta}</span> : badge}
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
