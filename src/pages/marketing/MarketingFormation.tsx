import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Award,
  Clock,
  Users,
  BookOpen,
  Cpu,
  Shield,
  Wand2,
  BarChart3,
  MessageSquare,
  Zap,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { AmbientBlobs } from '../../components/patterns/AmbientBlobs';
import { EditorialHero } from '../../components/patterns/EditorialHero';
import { SectionCard } from '../../components/patterns/SectionCard';
import { CardGrid } from '../../components/patterns/CardGrid';
import { SectionHeader } from '../../components/patterns/SectionHeader';
import { MetaPill } from '../../components/ui/MetaPill';
import { TrendingBadge } from '../../components/ui/Badge';
import { Steps } from '../../components/ui/Steps';
import { Card } from '../../components/core/Card';

const MODULES = [
  { title: 'Comprendre l\'IA pour mieux l\'enseigner', description: 'Fondamentaux de l\'IA générative, LLMs et leurs usages pédagogiques.', state: 'done' as const },
  { title: 'Maîtriser le Prompt Engineering', description: 'Techniques avancées pour concevoir des instructions efficaces et reproductibles.', state: 'done' as const },
  { title: 'Concevoir des formations augmentées', description: 'Intégrer l\'IA dans la conception pédagogique sans perdre l\'intention humaine.', state: 'current' as const },
  { title: 'Animer avec l\'IA en séance', description: 'Utilisation live de l\'IA : démonstrations, quiz adaptatifs, feedback instantané.', state: 'upcoming' as const },
  { title: 'Automatiser les tâches administratives', description: 'Emails, comptes-rendus, évaluations, fiches de suivi — IA comme assistant.', state: 'upcoming' as const },
  { title: 'Mesurer l\'impact des formations IA', description: 'KPIs, tableaux de bord, A/B testing pédagogique.', state: 'upcoming' as const },
  { title: 'Éthique, biais et responsabilité numérique', description: 'RGPD, propriété intellectuelle, biais algorithmiques et posture du formateur augmenté.', state: 'upcoming' as const },
];

const TARGETS = [
  { icon: <BookOpen size={20} />, role: 'Formateurs', desc: 'Vous concevez et animez des formations et souhaitez intégrer l\'IA à vos pratiques.' },
  { icon: <BarChart3 size={20} />, role: 'Responsables formation', desc: 'Vous pilotez la stratégie formation d\'une organisation et cherchez à moderniser votre approche.' },
  { icon: <Wand2 size={20} />, role: 'Concepteurs pédagogiques', desc: 'Vous créez des contenus et parcours d\'apprentissage et voulez exploiter les nouvelles possibilités de l\'IA.' },
];

const PRICING = [
  {
    name: 'Autonome',
    price: '249€',
    tone: 'neutral' as const,
    badge: null,
    features: ['Accès à tous les modules', 'Ressources téléchargeables', 'Forum de la communauté', 'Certificat de complétion'],
    cta: 'S\'inscrire',
  },
  {
    name: 'Certifiant',
    price: '369€',
    tone: 'primary' as const,
    badge: 'Le plus populaire',
    features: ['Tout le plan Autonome', 'Open Badge certifiant', 'Évaluations corrigées', 'Accès à vie aux mises à jour', 'Groupe d\'échange live (×2/mois)'],
    cta: 'S\'inscrire — certifiant',
  },
  {
    name: 'Premium',
    price: '890€',
    tone: 'warm' as const,
    badge: 'Premium',
    features: ['Tout le plan Certifiant', '3 sessions coaching individuel (60 min)', 'Feedback personnalisé sur vos projets', 'Accès prioritaire aux nouveaux modules', 'Support direct par email'],
    cta: 'S\'inscrire — coaching',
  },
];

const FAQ = [
  { q: 'Faut-il déjà connaître l\'IA pour suivre la formation ?', a: 'Non, la formation part des bases et progresse graduellement. Le module 1 vous donnera toutes les clés pour comprendre l\'IA générative.' },
  { q: 'La formation est-elle éligible au CPF ou OPCO ?', a: 'La formation est réalisée en partenariat avec C-Campus, organisme certifié Qualiopi. La prise en charge OPCO est possible selon votre secteur — contactez-nous pour vérifier votre éligibilité.' },
  { q: 'Quelle est la durée de la formation ?', a: 'La formation comprend environ 14 heures de contenu. En autonome, vous progressez à votre rythme. En mode certifiant, des sessions live bi-mensuelles rythment l\'apprentissage sur 2 mois.' },
  { q: 'Qu\'est-ce qu\'un Open Badge ?', a: 'Un Open Badge est une certification numérique vérifiable, reconnue par des employeurs et plateformes professionnelles (LinkedIn, France Compétences). Il atteste de vos compétences avec une preuve cryptographique.' },
  { q: 'Puis-je passer du plan Autonome au plan Certifiant ?', a: 'Oui, le passage d\'un plan à l\'autre est possible à tout moment, avec un simple complément tarifaire.' },
];

export const MarketingFormation: React.FC = () => (
  <div className="flex flex-col">

    {/* ── Hero ── */}
    <section className="relative overflow-hidden">
      <AmbientBlobs intensity="normal" position="absolute" />
      <div className="relative z-base">
        <EditorialHero
          tone="warm"
          eyebrow={{ icon: <Award size={14} />, label: 'Certification Open Badge · C-Campus' }}
          title="Devenez Formateur Augmenté"
          summary="Maîtrisez l'intégration de l'IA dans vos pratiques pédagogiques. 7 modules, certification reconnue, accompagnement expert."
          meta={[
            { icon: <Clock size={14} />, label: '~14h de contenu' },
            { icon: <Users size={14} />, label: '200+ certifiés' },
            { icon: <Award size={14} />, label: 'Open Badge certifiant' },
          ]}
          trailing={
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/marketing/contact">
                <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={16} />}>
                  S'inscrire
                </Button>
              </Link>
              <Link to="#programme">
                <Button variant="glass" size="lg">Voir le programme</Button>
              </Link>
            </div>
          }
        />
      </div>
    </section>

    {/* ── Garanties ── */}
    <section className="bg-white border-b border-ink-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Award size={20} />, label: 'Open Badge certifiant' },
            { icon: <Shield size={20} />, label: 'Partenaire Qualiopi' },
            { icon: <Zap size={20} />, label: 'Accès immédiat' },
            { icon: <Users size={20} />, label: 'Communauté active' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-body-sm font-semibold text-ink-700">
              <span className="text-secondary-500 shrink-0">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Programme ── */}
    <section id="programme" className="py-section-lg bg-gradient-page-ambient">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="solid"
          tone="warm"
          size="lg"
          icon={<BookOpen size={24} />}
          title="Le programme"
          subtitle="7 modules progressifs pour maîtriser la pédagogie augmentée par l'IA"
        />
        <div className="max-w-3xl mx-auto w-full">
          <Steps items={MODULES} />
        </div>
      </div>
    </section>

    {/* ── Pour qui ── */}
    <section className="py-section-lg bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="minimal"
          tone="primary"
          size="lg"
          icon={<Users size={24} />}
          title="Pour qui ?"
          subtitle="Cette formation s'adresse aux professionnels de la formation et de l'apprentissage"
        />
        <CardGrid layout="default" gapSize="md">
          {TARGETS.map(({ icon, role, desc }) => (
            <SectionCard
              key={role}
              titleIcon={<span className="text-secondary-500">{icon}</span>}
              title={role}
            >
              <p className="text-body-sm text-ink-600 leading-relaxed m-0">{desc}</p>
            </SectionCard>
          ))}
        </CardGrid>
      </div>
    </section>

    {/* ── Tarifs ── */}
    <section className="py-section-lg bg-gradient-page-ambient-warm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="solid"
          tone="warm"
          size="lg"
          icon={<Award size={24} />}
          title="Choisissez votre formule"
          subtitle="3 niveaux d'accompagnement selon vos objectifs"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg items-start">
          {PRICING.map(({ name, price, tone, badge, features, cta }) => (
            <Card
              key={name}
              tone={tone === 'neutral' ? undefined : tone === 'primary' ? 'primary' : 'warm'}
              className={[
                'p-6 flex flex-col gap-stack',
                badge === 'Le plus populaire' ? 'ring-2 ring-primary-400 shadow-lg scale-[1.02]' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <h3 className="font-display text-h4 font-bold text-ink-900 m-0">{name}</h3>
                {badge && (
                  <TrendingBadge
                    type={badge === 'Le plus populaire' ? 'recommended' : 'trending'}
                    size="sm"
                  />
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-h1 font-bold text-ink-900">{price}</span>
                <span className="text-body-sm text-ink-400">TTC</span>
              </div>
              <ul className="flex flex-col gap-2 list-none p-0 m-0 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-body-sm text-ink-700">
                    <CheckCircle2 size={16} className="text-primary-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/marketing/contact" className="mt-2">
                <Button
                  variant={tone === 'neutral' ? 'secondary' : tone === 'primary' ? 'primary' : 'warm'}
                  size="md"
                  fullWidth
                >
                  {cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="py-section-lg bg-white">
      <div className="max-w-3xl mx-auto px-6 flex flex-col gap-section">
        <SectionHeader
          variant="accent"
          tone="neutral"
          size="lg"
          icon={<HelpCircle size={24} />}
          title="Questions fréquentes"
        />
        <div className="flex flex-col gap-stack">
          {FAQ.map(({ q, a }) => (
            <div key={q} className="border border-ink-200 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MessageSquare size={18} className="text-primary-500 shrink-0 mt-0.5" />
                <h4 className="font-display text-body font-bold text-ink-900 m-0 leading-snug">{q}</h4>
              </div>
              <p className="text-body-sm text-ink-600 leading-relaxed m-0 pl-7">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA final ── */}
    <section className="bg-gradient-to-br from-secondary-700 via-secondary-600 to-secondary-500 py-section-lg">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-stack-lg">
        <h2 className="font-display text-h1 font-bold text-white m-0">
          Prêt à passer au niveau supérieur ?
        </h2>
        <p className="text-body-lg text-white/80 m-0">
          Rejoignez plus de 200 formateurs qui ont déjà transformé leurs pratiques.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/marketing/contact">
            <Button variant="glass" size="lg" trailingIcon={<ArrowRight size={16} />}>
              S'inscrire maintenant
            </Button>
          </Link>
          <Link to="/marketing/accompagnement">
            <Button variant="glass" size="lg">Voir l'accompagnement sur mesure</Button>
          </Link>
        </div>
      </div>
    </section>

  </div>
);

export default MarketingFormation;
