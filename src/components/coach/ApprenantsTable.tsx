import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { AtrophieIndicator } from '../ui/AtrophieIndicator';
import { DataTable, type DataTableColumn, type DataTableRow } from '../patterns/DataTable';
import type { Apprenant, ApprenantStatus } from '../../data/apprenants';

/**
 * ApprenantsTable — la collection des apprenants d'un coach, en table triable.
 *
 * Arbitrage n°5 du 23/09 : une collection d'objets du même type se lit en
 * rangées, et en table dès qu'on doit trier ou comparer. Le coach trie : qui
 * décroche (statut), qui est inactif (activité), où en est chacun (JAC,
 * Dreyfus). Partagée par le tableau de bord coach et la page Mes apprenants,
 * pour que les deux vues trient et affichent de la même façon.
 *
 * Le tri est celui de DataTable (`sortValue` par colonne) ; l'ordre de départ
 * est le tri du coach : « En difficulté » d'abord, puis le plus inactif.
 */

const STATUS_CONFIG: Record<ApprenantStatus, { label: string; variant: 'success' | 'danger' | 'brand' }> = {
  active: { label: 'Actif', variant: 'success' },
  stuck: { label: 'En difficulté', variant: 'danger' },
  ahead: { label: 'En avance', variant: 'brand' },
};

/** Ordre de tri par défaut : celui qui décroche d'abord, c'est le tri du coach. */
const STATUS_PRIORITY: Record<ApprenantStatus, number> = { stuck: 0, active: 1, ahead: 2 };

/** 2.9 → « 2,9 » : le niveau se lit sur 5, sans le préfixe « D » que rien n'expliquait. */
export const formatDreyfus = (n: number) => n.toFixed(1).replace('.', ',');

/** "2j", "8j", "Hier" → nombre de jours. */
export const parseDays = (s: string): number => {
  if (/hier/i.test(s)) return 1;
  const m = s.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
};

const jacPct = (level: number) => Math.round((level / 5) * 100);

/** Ordre de départ de la table : « En difficulté » d'abord, puis le plus inactif. */
export const sortApprenantsForCoach = (list: Apprenant[]): Apprenant[] =>
  [...list].sort(
    (a, b) =>
      STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status] ||
      parseDays(b.lastActivity) - parseDays(a.lastActivity),
  );

export interface ApprenantsTableProps {
  apprenants: Apprenant[];
  /** Apprenant mis en évidence (nom en teal foncé). */
  selectedId?: string | null;
  /** Clic ou Entrée sur une rangée. */
  onRowClick?: (apprenant: Apprenant) => void;
  /** Colonne d'action en fin de rangée (bouton « Profil », etc.). */
  renderAction?: (apprenant: Apprenant) => React.ReactNode;
  /** Libellé de la colonne d'action. */
  actionLabel?: string;
  emptyMessage?: string;
}

export const ApprenantsTable: React.FC<ApprenantsTableProps> = ({
  apprenants,
  selectedId,
  onRowClick,
  renderAction,
  actionLabel = 'Action',
  emptyMessage = "Aucun apprenant assigné pour l'instant.",
}) => {
  const ordered = sortApprenantsForCoach(apprenants);

  // Les valeurs de tri voyagent dans la rangée sous des clés que la table
  // n'affiche pas (seules les clés des colonnes sont rendues).
  const columns: DataTableColumn[] = [
    { key: 'name', label: 'Apprenant', sortable: true, sortValue: (r) => r._name as string },
    { key: 'status', label: 'Statut', sortable: true, sortValue: (r) => r._status as number },
    { key: 'lastActivity', label: 'Activité', sortable: true, sortValue: (r) => r._days as number },
    { key: 'jac', label: 'JAC', sortable: true, sortValue: (r) => r._level as number },
    { key: 'dreyfus', label: 'Dreyfus', sortable: true, align: 'right', sortValue: (r) => r._level as number },
    ...(renderAction ? [{ key: 'action', label: actionLabel, align: 'right' as const }] : []),
  ];

  const rows: DataTableRow[] = ordered.map((a) => {
    const status = STATUS_CONFIG[a.status];
    const jac = jacPct(a.dreyfusAvg);
    const days = parseDays(a.lastActivity);
    const isSelected = selectedId === a.id;
    return {
      _name: a.name,
      _status: STATUS_PRIORITY[a.status],
      _days: days,
      _level: a.dreyfusAvg,
      name: (
        <span className="flex items-center gap-stack-sm min-w-0">
          <Avatar initials={a.initials} size="sm" />
          <span className="flex flex-col min-w-0">
            <span className={`font-semibold truncate ${isSelected ? 'text-primary-800' : 'text-ink-900'}`}>{a.name}</span>
            <span className="text-caption text-ink-600 truncate">{a.role}</span>
          </span>
        </span>
      ),
      status: (
        <span className="inline-flex items-center gap-stack-xs">
          <Badge variant={status.variant} size="compact">{status.label}</Badge>
          <AtrophieIndicator daysSinceActivity={days} currentLevel={Math.round(a.dreyfusAvg)} size="sm" showLabel={false} />
        </span>
      ),
      lastActivity: <span className="text-ink-700">{a.lastActivity}</span>,
      jac: (
        <span className="flex items-center gap-stack-xs min-w-[5.5rem]">
          <ProgressBar value={jac} fill="brand" size="sm" valueLabel={false} className="flex-1" />
          <span className="tabular-nums text-ink-700 w-9 text-right">{jac} %</span>
        </span>
      ),
      dreyfus: <span className="tabular-nums text-ink-900">{formatDreyfus(a.dreyfusAvg)}</span>,
      ...(renderAction ? { action: renderAction(a) } : {}),
    };
  });

  return (
    <DataTable
      columns={columns}
      rows={rows}
      onRowClick={onRowClick ? (_row, index) => onRowClick(ordered[index]) : undefined}
      pageSize={Math.max(rows.length, 1)}
      emptyMessage={emptyMessage}
    />
  );
};

export default ApprenantsTable;
