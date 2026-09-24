import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Video } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { PageShell } from '../components/layout';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { ProgressBar } from '../components/ui/ProgressBar';

// ─── Mock data ───────────────────────────────────────────────────────────────

interface ProgramItem {
  time: string;
  label: string;
  duration: string;
}

const PROGRAMME: ProgramItem[] = [
  { time: '10h00', label: 'Accueil + icebreaker', duration: '15 min' },
  { time: '10h15', label: 'Théorie feedback constructif', duration: '30 min' },
  { time: '10h45', label: 'Exercice en paires', duration: '45 min' },
  { time: '11h30', label: 'Débriefing collectif', duration: '30 min' },
  { time: '12h00', label: 'Plan d\'action individuel', duration: '30 min' },
];

interface InfoItem {
  label: string;
  value: string;
}

const INFOS: InfoItem[] = [
  { label: 'Date', value: '18 juin 2026' },
  { label: 'Heure', value: '10h00 – 13h00' },
  { label: 'Durée', value: '3 heures' },
  { label: 'Mode', value: 'Distanciel (Google Meet)' },
  { label: 'Niveau requis', value: 'D2 et plus' },
  { label: 'Matériel', value: 'Papier + stylo recommandés' },
  /* Les deux seules informations propres à la bande de méta qui fermait la
     page (elle répétait sinon date, heure et mode). */
  { label: 'Participants', value: '12 au maximum' },
  { label: 'Lien de connexion', value: 'Envoyé 24 h avant la session' },
];

/* Fin de la session : passé ce moment, l'atelier est terminé et l'on n'y
   réserve plus de place. La page proposait « Réserver ma place » sur une date
   passée (audit du 23/09). À remplacer par la donnée du store quand la page y
   sera branchée. */
const FIN_SESSION = new Date('2026-06-18T13:00:00+02:00');

// ─── AtelierDetail ────────────────────────────────────────────────────────────

export default function AtelierDetail() {
  const { id = '1' } = useParams<{ id: string }>();
  const estTermine = Date.now() > FIN_SESSION.getTime();

  return (
    <PageShell width="medium" noPadTop={true} className="pt-6 md:pt-8 lg:pt-10">
      {/* Ton `flat`, comme les autres pages de l'app (l'en-tête était une
          carte teintée). Date, heure, mode et durée sont des données : la
          ligne de méta, en légende — ils étaient des pastilles d'état en
          capitales. Seul « Terminé », un état, reste un Badge. */}
      <EditorialHero
        tone="flat"
        eyebrow="Ateliers"
        title="Atelier Feedback 360°"
        summary="Pratique le feedback constructif en situation réelle. Jeux de rôle + débriefing collectif."
        meta={[
          ...(estTermine ? [{ label: <Badge variant="neutral" size="normal">Terminé</Badge> }] : []),
          { icon: <Calendar size={14} aria-hidden="true" />, label: '18 juin 2026 · 10h00' },
          { icon: <Video size={14} aria-hidden="true" />, label: 'Distanciel · 3h' },
        ]}
      />

      {/* Quatre temps à 48 px : le coach, le programme, les infos pratiques,
          l'inscription. Chaque section a son titre h2 hors de la carte (le
          coach était un h3 posé juste sous le h1). */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Ton coach" size="md" />
        <Card className="flex flex-col sm:flex-row items-start sm:items-center gap-stack">
          <Avatar name="Sophie Martin" initials="SM" size="xl" />
          <div className="flex flex-col gap-stack-xs">
            <div className="flex flex-col gap-tight">
              <p className="text-body font-semibold text-ink-900">Sophie Martin</p>
              <p className="text-caption text-ink-600">Coach certifiée ICF · Spécialité Communication</p>
            </div>
            <p className="text-body text-ink-700 max-w-prose">Animation de +120 ateliers. Approche pratique et bienveillante.</p>
          </div>
        </Card>
      </section>

      {/* Programme : l'heure en chiffres tabulaires (elle était une pastille
          d'état), l'étape en 16 ink-900, la durée alignée à droite. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Programme de l'atelier" meta={`${PROGRAMME.length} temps · 10h00 – 12h30`} size="md" />
        <Card className="p-0">
          <ol className="flex flex-col divide-y divide-ink-100">
            {PROGRAMME.map((item, idx) => (
              <li key={idx} className="flex items-baseline gap-stack px-stack-md sm:px-stack-lg py-stack-sm">
                <span className="w-14 shrink-0 text-caption font-semibold text-ink-600 tabular-nums">{item.time}</span>
                <span className="text-body text-ink-900 flex-1">{item.label}</span>
                <span className="text-caption text-ink-600 tabular-nums text-right">{item.duration}</span>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      {/* Infos pratiques : libellés en légende 600 ink-600, en casse normale
          (ils étaient en capitales ink-500), valeurs en 16 ink-900. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Infos pratiques" size="md" />
        <Card>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-stack-lg gap-y-stack">
            {INFOS.map((info, idx) => (
              <div key={idx} className="flex flex-col gap-tight">
                <dt className="text-caption font-semibold text-ink-600">{info.label}</dt>
                <dd className="text-body text-ink-900">{info.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </section>

      {/* Inscription CTA — ou, la date passée, l'état terminé */}
      {estTermine ? (
        <Card variant="default" className="p-stack-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
          <div className="flex flex-col gap-stack-3xs w-full sm:flex-1">
            <p className="text-body font-semibold text-ink-900">Cet atelier est terminé</p>
            <p className="text-caption text-ink-600">Les réservations sont closes.</p>
          </div>
          <Button emphasis="soft" size="lg" className="shrink-0" to={`/ateliers/${id}/recap`}>
            Voir le récapitulatif
          </Button>
        </Card>
      ) : (
      <Card variant="default" className="p-stack-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-stack">
        <div className="flex flex-col gap-stack-xs w-full sm:flex-1">
          <p className="text-body font-semibold text-ink-900 tabular-nums">7 / 12 places disponibles</p>
          <ProgressBar value={58} fill="warm" size="md" valueLabel={false} />
          <p className="text-caption text-ink-600">Clôture des inscriptions : 17 juin à 18h00</p>
        </div>
        <div className="flex flex-col gap-stack-xs items-stretch sm:items-end shrink-0">
          <Button emphasis="soft" size="lg">Réserver ma place</Button>
          <p className="text-caption text-ink-600 text-center">Annulation gratuite jusqu'à J-2</p>
        </div>
      </Card>
      )}
    </PageShell>
  );
}
