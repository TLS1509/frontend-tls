/**
 * CoachProfileView — Apprenant's view of their assigned coach profile.
 * Route: /coaching/coach/:id
 *
 * Distinct from CoachDashboard (coach's own workspace).
 * Two-column layout on md+: bio/testimonials on left, profile card + actions on right (sticky).
 */

import React from 'react';
import { Star, Calendar, MessageCircle, CheckCircle2, Clock3 } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { StatCard } from '../components/ui/StatCard';
import { MetaPillGroup } from '../components/ui/MetaPillGroup';
import { ProfileCard } from '../components/ui/ProfileCard';

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
    <span className="inline-flex items-center gap-0.5">
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
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <EditorialHero
        eyebrow="Coaching · Mon Coach"
        title="Sophie Martin"
        summary="Votre coach certifiée en IA & Pédagogie. Découvrez son parcours, ses spécialités et réservez votre prochaine session."
        tone="warm"
      />

      {/* ── Main layout ── */}
      <div className="max-w-wide mx-auto w-full px-4 md:px-8 flex flex-col gap-section py-section">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-section items-start">

          {/* ── Left — Bio + Approach + Testimonials ── */}
          <div className="flex flex-col gap-section">

            {/* À propos */}
            <SectionCard title="À propos">
              <div className="flex flex-col gap-stack">
                <p className="text-body text-ink-700 leading-relaxed">
                  Sophie Martin est coach certifiée (ICF PCC) spécialisée dans l'intégration pédagogique de l'intelligence artificielle. Avec plus de 10 ans d'expérience en formation professionnelle et en accompagnement d'équipes apprenantes, elle intervient auprès de managers, formateurs et chefs de projet souhaitant développer leurs compétences dans un environnement en transformation rapide.
                </p>
                <p className="text-body text-ink-700 leading-relaxed">
                  Diplômée d'un Master en Sciences de l'Éducation (Université Paris-Cité) et certifiée IA & Design pédagogique (MIT OpenLearning), Sophie allie rigueur académique et pragmatisme terrain. Elle croit profondément que l'apprentissage transforme durablement quand il est ancré dans des situations réelles de travail.
                </p>
                <p className="text-body text-ink-700 leading-relaxed">
                  En dehors du coaching, Sophie anime des ateliers en ligne sur la créativité pédagogique et contribue régulièrement à la revue <em>L'Apprenant</em> sur les enjeux de l'IA dans la formation.
                </p>
                <MetaPillGroup items={SPECIALTIES} />
              </div>
            </SectionCard>

            {/* Approche pédagogique */}
            <SectionCard title="Approche pédagogique">
              <div className="flex flex-col gap-stack">
                <p className="text-body text-ink-700 leading-relaxed">
                  Sophie adopte une approche co-constructive : chaque session part de votre réalité, de vos blocages concrets et de vos ambitions. Elle ne prescrit pas, elle explore avec vous. L'objectif : que vous repartiez avec des outils actionnables dès le lendemain matin.
                </p>
                <ul className="flex flex-col gap-stack-xs">
                  {APPROACH_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-center gap-stack-xs text-body-sm text-ink-700">
                      <span className="text-success-base shrink-0">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-primary-50 border border-primary-100 p-4">
                  <p className="text-body-sm text-primary-800 italic leading-relaxed">
                    "Je travaille avec les apprenants pour qu'ils développent leur propre système de pensée — pas pour qu'ils adoptent le mien. Mon rôle est de créer les conditions de la clarté."
                  </p>
                  <p className="mt-2 text-caption text-primary-600 font-semibold">— Sophie Martin</p>
                </div>
              </div>
            </SectionCard>

            {/* Témoignages */}
            <SectionCard title="Témoignages">
              <div className="flex flex-col gap-stack">
                {TESTIMONIALS.map((t) => (
                  <Card key={t.id} className="p-5 flex flex-col gap-stack-xs">
                    <div className="flex items-start justify-between gap-stack-xs flex-wrap">
                      <div className="flex items-center gap-stack-xs">
                        <Avatar name={t.name} initials={t.initials} size="sm" />
                        <div className="flex flex-col gap-tight">
                          <span className="text-body-sm font-semibold text-ink-900">{t.name}</span>
                          <span className="text-caption text-ink-500">{t.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating value={t.rating} />
                        <span className="text-caption text-ink-400">{t.date}</span>
                      </div>
                    </div>
                    <p className="text-body-sm text-ink-700 leading-relaxed italic">"{t.quote}"</p>
                  </Card>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── Right — Sticky sidebar ── */}
          <div className="flex flex-col gap-stack sticky top-24">

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
            <div className="grid grid-cols-2 gap-stack-xs">
              <StatCard label="Sessions réalisées" value="47" tone="warm" surface="tinted" size="sm" />
              <StatCard label="Satisfaction" value="98%" tone="brand" surface="tinted" size="sm" />
            </div>

            {/* Next slot */}
            <Card className="p-4 flex flex-col gap-stack-xs">
              <div className="flex items-center gap-stack-xs text-body-sm text-ink-600">
                <Clock3 size={15} className="text-secondary-500 shrink-0" />
                <span className="font-semibold text-ink-900">Prochain créneau disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-ink-400 shrink-0" />
                <span className="text-body-sm text-ink-700">Jeudi 15 mai 2026 · 14h00 – 15h00</span>
              </div>
              <Badge variant="success" className="self-start">Disponible</Badge>
            </Card>

            {/* CTAs */}
            <div className="flex flex-col gap-stack-xs">
              <Button variant="warm" size="md" fullWidth leadingIcon={<Calendar size={16} />}>
                Réserver une session
              </Button>
              <Button variant="secondary" size="md" fullWidth leadingIcon={<MessageCircle size={16} />}>
                Envoyer un message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
