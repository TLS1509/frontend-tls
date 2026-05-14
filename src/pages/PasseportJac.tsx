import React from 'react';
import {
  Award,
  Clock,
  Target,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Alert } from '../components/ui/Alert';
import { ProgressBar } from '../components/ui/ProgressBar';
import { AchievementBadge } from '../components/ui/AchievementBadge';

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
    title: 'Leadership — Niveau D2',
    competence: 'Leadership',
    dreyfusLevel: 'D2',
    validatedAt: '15/03/2026',
    validatedBy: ['Manager', 'Coach'],
  },
  {
    id: 'c2',
    title: 'Communication — Niveau D3',
    competence: 'Communication',
    dreyfusLevel: 'D3',
    validatedAt: '02/02/2026',
    validatedBy: ['Manager', 'Coach'],
  },
  {
    id: 'c3',
    title: 'Tech & Outils — Niveau D2',
    competence: 'Tech & Outils',
    dreyfusLevel: 'D2',
    validatedAt: '10/01/2026',
    validatedBy: ['Manager'],
  },
];

const PENDING_VALIDATIONS: PendingValidation[] = [
  {
    id: 'p1',
    title: 'Analyse — Niveau D3',
    competence: 'Analyse',
    dreyfusLevel: 'D3',
    submittedDaysAgo: 3,
    waitingFor: 'Coach',
  },
  {
    id: 'p2',
    title: 'Leadership — Niveau D3',
    competence: 'Leadership',
    dreyfusLevel: 'D3',
    submittedDaysAgo: 1,
    waitingFor: 'Manager',
  },
];

const NEXT_JALONS: NextJalon[] = [
  {
    id: 'n1',
    title: 'Leadership — Niveau D4',
    competence: 'Leadership',
    dreyfusLevel: 'D4',
    requirements: ['3 exercices D3+', '1 session coaching', '1 évaluation 360°'],
    progress: 42,
  },
  {
    id: 'n2',
    title: 'Analyse — Niveau D4',
    competence: 'Analyse',
    dreyfusLevel: 'D4',
    requirements: ['Valider D3 Analyse (en cours)', '2 cas pratiques D4', '1 projet long'],
    progress: 15,
  },
  {
    id: 'n3',
    title: 'Communication — Niveau D4',
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

const CERT_COLORS: Array<'primary' | 'warm' | 'sun' | 'success'> = [
  'primary',
  'warm',
  'success',
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PasseportJac() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <EditorialHero
        tone="primary"
        eyebrow={{ label: 'Passeport · JAC' }}
        title="Jalons & Certifications"
        summary="Valide officiellement tes niveaux Dreyfus auprès de ton entreprise et obtiens tes certifications."
        trailing={
          <Badge variant="success" size="lg">
            3 certifications obtenues
          </Badge>
        }
      />

      {/* Body */}
      <div className="max-w-content mx-auto w-full px-4 py-section flex flex-col gap-section">

        {/* Info banner */}
        <Alert
          variant="info"
          title="Validation par ton manager et ton coach"
        >
          Les JAC sont validés par ton manager et ton coach. Une fois certifié, ton badge Dreyfus
          est officiel et exportable.
        </Alert>

        {/* Certifications obtenues */}
        <SectionCard
          title="Certifications obtenues"
          titleIcon={<Award size={18} />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-stack">
            {CERTIFICATIONS.map((cert, i) => (
              <Card
                key={cert.id}
                variant="tinted"
                tone="primary"
                className="p-4 flex flex-col gap-stack-xs"
              >
                <div className="flex justify-center">
                  <AchievementBadge
                    title={cert.dreyfusLevel}
                    description={cert.competence}
                    icon={CERT_ICONS[cert.competence] ?? <Award />}
                    unlockedDate={cert.validatedAt}
                    color={CERT_COLORS[i % CERT_COLORS.length]}
                    size="sm"
                  />
                </div>
                <div className="flex flex-col gap-tight">
                  <p className="m-0 font-display font-semibold text-body-sm text-ink-900 text-center">
                    {cert.title}
                  </p>
                  <div className="flex items-center justify-center gap-stack-xs">
                    <Badge variant="success" size="sm">Certifié</Badge>
                    {cert.validatedBy.map((v) => (
                      <Badge key={v} variant="neutral" size="sm">{v}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center pt-tight">
                  <Button variant="ghost" size="sm" trailingIcon={<FileText size={14} />}>
                    Voir le certificat
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </SectionCard>

        {/* En attente de validation */}
        <SectionCard
          title="En attente de validation"
          titleIcon={<Clock size={18} />}
        >
          <div className="flex flex-col gap-stack">
            {PENDING_VALIDATIONS.map((item) => (
              <Card key={item.id} variant="default" className="p-4 flex flex-col gap-stack-xs">
                <div className="flex items-start justify-between gap-stack flex-wrap">
                  <div className="flex flex-col gap-tight">
                    <span className="font-display font-semibold text-body-sm text-ink-900">
                      {item.title}
                    </span>
                    <div className="flex items-center gap-stack-xs text-caption text-ink-400">
                      <AlertCircle size={12} aria-hidden />
                      <span>
                        Soumis il y a {item.submittedDaysAgo} j — en attente {item.waitingFor}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-stack-xs shrink-0">
                    <Badge variant="sun" size="sm">En revue</Badge>
                    <Button variant="ghost" size="sm" trailingIcon={<ChevronRight size={14} />}>
                      Relancer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SectionCard>

        {/* Prochains jalons */}
        <SectionCard
          title="Prochains jalons"
          titleIcon={<Target size={18} />}
        >
          <div className="flex flex-col gap-stack">
            {NEXT_JALONS.map((jalon) => (
              <Card key={jalon.id} variant="default" className="p-4 flex flex-col gap-stack-xs">
                <div className="flex items-start justify-between gap-stack flex-wrap">
                  <div className="flex flex-col gap-tight flex-1 min-w-0">
                    <div className="flex items-center gap-stack-xs flex-wrap">
                      <span className="font-display font-semibold text-body-sm text-ink-900">
                        {jalon.title}
                      </span>
                      <Badge variant="brand" size="sm">{jalon.dreyfusLevel}</Badge>
                    </div>
                    <ul className="m-0 pl-0 list-none flex flex-col gap-tight">
                      {jalon.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-center gap-stack-xs text-caption text-ink-500"
                        >
                          <span className="w-1 h-1 rounded-full bg-ink-300 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-tight">
                      <ProgressBar
                        value={jalon.progress}
                        max={100}
                        fill="brand"
                        size="sm"
                        layout="inline"
                        label="Progression"
                        valueLabel={`${jalon.progress} %`}
                      />
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button variant="primary" size="sm" trailingIcon={<ChevronRight size={14} />}>
                      Préparer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
