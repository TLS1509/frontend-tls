/**
 * CoachProfileView : Apprenant's view of their assigned coach profile.
 * Route: /coaching/coach/:id
 *
 * Distinct from CoachDashboard (coach's own workspace).
 * Two-column layout on md+: bio/testimonials on left, profile card + actions on right (sticky).
 */

import React from 'react';
import { Star, Calendar, MessageCircle, CheckCircle2, Clock3 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { ProfileCard } from '../components/ui/ProfileCard';
import { PageShell } from '../components/layout';

// ─── Mock data ─────────────────────────────────────────────────────────────────

const SPECIALTIES = [
  { text: "IA & Pédagogie", tone: 'warm' as const },
  { text: 'Leadership', tone: 'brand' as const },
  { text: 'Communication', tone: 'brand' as const },
  { text: 'Gestion du changement', tone: 'warm' as const },
  { text: 'Prise de parole', tone: 'brand' as const },
  { text: 'Design de formation', tone: 'brand' as const },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marie Leblanc',
    initials: 'ML',
    role: 'Responsable formation',
    quote:
      "Sophie m'a aidée à structurer une approche pédagogique intégrant l'IA dans nos parcours. Sa clarté et sa bienveillance ont fait toute la différence. Je recommande sans hésitation.",
    rating: 5,
    date: 'Mars 2026',
  },
  {
    id: 2,
    name: 'Thomas Girard',
    initials: 'TG',
    role: 'Chef de projet digital',
    quote:
      "En trois sessions, j'ai clarifié mes objectifs professionnels et appris des outils concrets. Sophie adapte vraiment son approche à chaque personne.",
    rating: 5,
    date: 'Février 2026',
  },
  {
    id: 3,
    name: 'Amira Benali',
    initials: 'AB',
    role: "Manager d'équipe",
    quote:
      "Un coaching très opérationnel et ancré dans la réalité du terrain. J'ai progressé rapidement sur la communication en réunion et la gestion des conflits.",
    rating: 4,
    date: 'Janvier 2026',
  },
];

const APPROACH_ITEMS = [
  { icon: <CheckCircle2 size={16} />, text: 'Écoute active et reformulation systématique' },
  { icon: <CheckCircle2 size={16} />, text: 'Objectifs SMART définis dès la première session' },
  { icon: <CheckCircle2 size={16} />, text: 'Exercices pratiques entre chaque séance' },
  { icon: <CheckCircle2 size={16} />, text: 'Feedback structuré sur les productions et missions' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-tight">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.75}
          className={i < value ? 'fill-accent-400 text-accent-400' : 'fill-transparent text-ink-300'}
        />
      ))}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoachProfileView() {
  return (
    <PageShell width="wide" noPadTop className="pt-6 md:pt-8 lg:pt-10">
      {/* ── Hero ── */}
      <EditorialHero
        eyebrow="Coaching · Mon coach"
        title="Sophie Martin"
        summary="Ta coach certifiée en IA & Pédagogie. Découvre son parcours, ses spécialités et réserve ta prochaine session."
        tone="flat"
      />

      {/* ── Main layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-page md:gap-section items-start">

        {/* ── Left : Bio + Approach + Testimonials ──
            Trois sections de la page, 48 px entre elles, titre h2 28 posé sur
            la page (ils étaient des h3 de 20 px dans des cartes). La biographie
            et l'approche sont du texte à lire, pas des objets : plus de carte
            autour — 16 px ink-900, à la largeur de lecture, une ligne entre
            deux paragraphes. */}
        <div className="flex flex-col gap-page min-w-0">

          <section className="flex flex-col gap-stack">
            <SectionHeader title="À propos" size="md" />
            <div className="flex flex-col gap-stack max-w-prose">
              <p className="text-body text-ink-900">
                Sophie Martin est coach certifiée (ICF PCC) spécialisée dans l'intégration pédagogique de l'intelligence artificielle. Avec plus de 10 ans d'expérience en formation professionnelle et en accompagnement d'équipes apprenantes, elle intervient auprès de managers, formateurs et chefs de projet souhaitant développer leurs compétences dans un environnement en transformation rapide.
              </p>
              <p className="text-body text-ink-900">
                Diplômée d'un Master en Sciences de l'Éducation (Université Paris-Cité) et certifiée IA & Design pédagogique (MIT OpenLearning), Sophie allie rigueur académique et pragmatisme terrain. Elle croit profondément que l'apprentissage transforme durablement quand il est ancré dans des situations réelles de travail.
              </p>
              <p className="text-body text-ink-900">
                En dehors du coaching, Sophie anime des ateliers en ligne sur la créativité pédagogique et contribue régulièrement à la revue <em>L'Apprenant</em> sur les enjeux de l'IA dans la formation.
              </p>
            </div>
            <MetaPillGroup items={SPECIALTIES} />
          </section>

          <section className="flex flex-col gap-stack">
            <SectionHeader title="Approche pédagogique" size="md" />
            <p className="text-body text-ink-900 max-w-prose">
              Sophie adopte une approche co-constructive : chaque session part de ta réalité, de tes blocages concrets et de tes ambitions. Elle ne prescrit pas, elle explore avec toi. L'objectif : que tu repartes avec des outils actionnables dès le lendemain matin.
            </p>
            {/* Coche calée sur la première ligne de chaque point (doctrine § 4). */}
            <ul className="flex flex-col gap-stack-xs max-w-prose">
              {APPROACH_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-stack-xs text-body text-ink-900">
                  <span className="shrink-0 inline-flex items-center h-lh text-success-fg" aria-hidden="true">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
            {/* La citation : texte en italique Nunito ink-900 (il était en teal
                800, une couleur de marque posée pour décorer), signature en
                légende. */}
            <figure className="rounded-lg bg-primary-50 border border-primary-100 p-stack-md flex flex-col gap-stack-xs max-w-prose">
              <blockquote className="font-body text-body italic text-ink-900">
                «&nbsp;Je travaille avec les apprenants pour qu'ils développent leur propre système de pensée : pas pour qu'ils adoptent le mien. Mon rôle est de créer les conditions de la clarté.&nbsp;»
              </blockquote>
              <figcaption className="text-caption font-semibold text-ink-600">Sophie Martin</figcaption>
            </figure>
          </section>

          {/* Témoignages : chaque avis est un objet autonome (une carte), sans
              carte de section autour — il y avait deux cartes emboîtées. */}
          <section className="flex flex-col gap-stack">
            <SectionHeader title="Témoignages" meta={`${TESTIMONIALS.length} avis d'apprenants`} size="md" />
            <div className="flex flex-col gap-stack-sm">
              {TESTIMONIALS.map((t) => (
                <Card key={t.id} className="flex flex-col gap-stack-sm">
                  <div className="flex items-start justify-between gap-stack-xs flex-wrap">
                    <div className="flex items-center gap-stack-xs">
                      <Avatar name={t.name} initials={t.initials} size="sm" />
                      <div className="flex flex-col gap-tight">
                        <span className="text-body font-semibold text-ink-900">{t.name}</span>
                        <span className="text-caption text-ink-600">{t.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-stack-xs">
                      <StarRating value={t.rating} />
                      <span className="text-caption text-ink-600">{t.date}</span>
                    </div>
                  </div>
                  <blockquote className="font-body text-body italic text-ink-900 max-w-prose">«&nbsp;{t.quote}&nbsp;»</blockquote>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right : Sticky sidebar ── */}
        <div className="flex flex-col gap-stack md:sticky md:top-24">

          {/* Profile card */}
          <ProfileCard
            name="Sophie Martin"
            role="Coach certifiée IA & Pédagogie"
            initials="SM"
            variant="featured"
            tone="warm"
            align="center"
            rating={{ value: 4.8, max: 5, count: 47 }}
            specialties={['IA & Pédagogie', 'Leadership', 'Communication']}
            contacts={[
              { type: 'email', href: 'mailto:sophie.martin@tls.com', label: 'sophie.martin@tls.com' },
              { type: 'linkedin', href: 'https://linkedin.com/in/sophiemartin', label: 'LinkedIn' },
            ]}
          />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-stack-sm">
            <StatCard label="Sessions réalisées" value="47" tone="warm" surface="tinted" size="sm" />
            <StatCard label="Satisfaction" value="98 %" tone="brand" surface="tinted" size="sm" />
          </div>

          {/* Prochain créneau : son titre 16/600, la date 16 ink-700, l'état
              en Badge — l'icône se cale sur la première ligne. */}
          <Card size="sm" className="flex flex-col gap-stack-xs">
            <p className="flex items-center gap-stack-xs text-body font-semibold text-ink-900">
              <Clock3 size={16} className="text-ink-600 shrink-0" aria-hidden="true" />
              Prochain créneau disponible
            </p>
            <p className="flex items-center gap-stack-xs text-body text-ink-700">
              <Calendar size={16} className="text-ink-600 shrink-0" aria-hidden="true" />
              Jeudi 15 mai 2026 · 14h00 – 15h00
            </p>
            <Badge variant="success">Disponible</Badge>
          </Card>

          {/* CTAs */}
          <div className="flex flex-col gap-stack-xs">
            <Button emphasis="soft" tone="warm" size="md" fullWidth leadingIcon={<Calendar size={16} />}>
              Réserver une session
            </Button>
            <Button emphasis="soft" tone="warm" size="md" fullWidth leadingIcon={<MessageCircle size={16} />}>
              Envoyer un message
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
