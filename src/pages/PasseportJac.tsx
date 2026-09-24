import React from 'react';
import { Award, Target, CheckCircle2, FileText } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { Alert } from '../components/ui/Alert';
import { AchievementBadge } from '../components/ui/AchievementBadge';
import { JacCardPending, JacCardNextJalon } from '../components/ui/JacCard';
import { PageShell } from '../components/layout';

// ─── Mock data ────────────────────────────────────────────────────────────────

interface Certification {
  id: string;
  title: string;
  competence: string;
  dreyfusLevel: string;
  validatedAt: string;
  validatedBy: string[];
}

interface PendingValidation {
  id: string;
  title: string;
  competence: string;
  dreyfusLevel: string;
  submittedDaysAgo: number;
  waitingFor: string;
}

interface NextJalon {
  id: string;
  title: string;
  competence: string;
  dreyfusLevel: string;
  requirements: string[];
  progress: number;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 'c1',
    title: 'Leadership : Niveau D2',
    competence: 'Leadership',
    dreyfusLevel: 'D2',
    validatedAt: '15/03/2026',
    validatedBy: ['Manager', 'Coach'],
  },
  {
    id: 'c2',
    title: 'Communication : Niveau D3',
    competence: 'Communication',
    dreyfusLevel: 'D3',
    validatedAt: '02/02/2026',
    validatedBy: ['Manager', 'Coach'],
  },
  {
    id: 'c3',
    title: 'Tech & Outils : Niveau D2',
    competence: 'Tech & Outils',
    dreyfusLevel: 'D2',
    validatedAt: '10/01/2026',
    validatedBy: ['Manager'],
  },
];

const PENDING_VALIDATIONS: PendingValidation[] = [
  {
    id: 'p1',
    title: 'Analyse : Niveau D3',
    competence: 'Analyse',
    dreyfusLevel: 'D3',
    submittedDaysAgo: 3,
    waitingFor: 'Coach',
  },
  {
    id: 'p2',
    title: 'Leadership : Niveau D3',
    competence: 'Leadership',
    dreyfusLevel: 'D3',
    submittedDaysAgo: 1,
    waitingFor: 'Manager',
  },
];

const NEXT_JALONS: NextJalon[] = [
  {
    id: 'n1',
    title: 'Leadership : Niveau D4',
    competence: 'Leadership',
    dreyfusLevel: 'D4',
    requirements: ['3 exercices D3+', '1 session coaching', '1 évaluation 360°'],
    progress: 42,
  },
  {
    id: 'n2',
    title: 'Analyse : Niveau D4',
    competence: 'Analyse',
    dreyfusLevel: 'D4',
    requirements: ['Valider D3 Analyse (en cours)', '2 cas pratiques D4', '1 projet long'],
    progress: 15,
  },
  {
    id: 'n3',
    title: 'Communication : Niveau D4',
    competence: 'Communication',
    dreyfusLevel: 'D4',
    requirements: ['2 présentations stratégiques', '1 session mentoring', '1 évaluation coach'],
    progress: 60,
  },
];

// ─── Icon helper for AchievementBadge ────────────────────────────────────────

const CERT_ICONS: Record<string, React.ReactNode> = {
  Leadership: <Award />,
  Communication: <CheckCircle2 />,
  'Tech & Outils': <Target />,
};


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PasseportJac() {
  return (
    /* Un seul conteneur pour l'en-tête et le corps. Le titre était calé à
       gauche de la page (x 300 à 1440) et le corps recentré dans une colonne
       de 768 px (x 482) : deux bords gauches. Et l'en-tête, hors de toute
       coque, collait au haut de l'écran (surtitre à 8 px). */
    <PageShell width="content">
      <EditorialHero
        tone="flat"
        eyebrow={{ label: 'Passeport · JAC' }}
        title="Jalons d'Application Critique"
        summary="Valide officiellement tes niveaux Dreyfus auprès de ton entreprise et obtiens tes certifications."
        /* Un compte est une donnée : il chuchote dans la méta de l'en-tête. Il
           criait en Badge capitales, à la place d'une action. */
        meta={[{ icon: <Award size={14} aria-hidden="true" />, label: '3 certifications obtenues' }]}
      />

      {/* Info banner */}
      <Alert
        variant="info"
        title="Validation par ton manager et ton coach"
      >
        Les JAC sont validés par ton manager et ton coach. Une fois certifié, ton badge Dreyfus
        est officiel et exportable.
      </Alert>

      {/* Certifications obtenues — le titre de section sort de la carte (h2
          28) ; il reste deux niveaux (la carte du certificat, et son badge)
          au lieu de trois. Une seule couleur : le certificat du milieu était
          orange et les autres teal, sans que rien ne le justifie. */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Certifications obtenues" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
          {CERTIFICATIONS.map((cert) => (
            <Card
              key={cert.id}
              variant="tinted"
              tone="primary"
              className="p-stack-md flex flex-col items-center gap-stack-sm text-center"
            >
              <AchievementBadge
                title={cert.dreyfusLevel}
                description={cert.competence}
                icon={CERT_ICONS[cert.competence] ?? <Award />}
                unlockedDate={cert.validatedAt}
                color="primary"
                size="sm"
              />
              <div className="flex flex-col items-center gap-stack-xs">
                <p className="text-body font-semibold text-ink-900">{cert.title}</p>
                {/* L'état crie (Certifié), les valideurs chuchotent. */}
                <div className="flex flex-wrap items-center justify-center gap-stack-3xs">
                  <Badge variant="success" size="compact">Certifié</Badge>
                  {cert.validatedBy.map((v) => (
                    <MetaPill key={v} text={v} tone="neutral" />
                  ))}
                </div>
              </div>
              <Button emphasis="outline" size="sm" trailingIcon={<FileText size={14} />} className="mt-stack-3xs">
                Voir le certificat
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* En attente de validation */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="En attente de validation" />
        <div className="flex flex-col gap-stack-sm">
          {PENDING_VALIDATIONS.map((item) => (
            <JacCardPending key={item.id} {...item} />
          ))}
        </div>
      </section>

      {/* Prochains jalons */}
      <section className="flex flex-col gap-stack">
        <SectionHeader title="Prochains jalons" />
        <div className="flex flex-col gap-stack-sm">
          {NEXT_JALONS.map((jalon) => (
            <JacCardNextJalon key={jalon.id} {...jalon} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
