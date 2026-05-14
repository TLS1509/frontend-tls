import React from 'react';
import { HelpCircle, Send, ArrowLeft, Calendar, Headphones } from 'lucide-react';
import { EditorialHero } from '../components/patterns/EditorialHero';
import { SectionCard } from '../components/patterns/SectionCard';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Input } from '../components/core/Input';
import { FormGroup } from '../components/core/FormGroup';

export default function HelpTicketDetail() {
  return (
    <div className="flex flex-col gap-section">
      <EditorialHero
        eyebrow={{ icon: <HelpCircle size={14} />, label: 'Aide · Ticket' }}
        title="Problème de connexion à mon compte"
        summary="Ticket #1042 — Ouvert le 12 mai 2026"
        tone="default"
        trailing={
          <Badge variant="brand">En cours</Badge>
        }
      />

      <div className="max-w-page mx-auto w-full px-4 flex flex-col gap-section pb-page">
        <div className="flex items-center gap-stack-xs">
          <Button variant="ghost" leadingIcon={<ArrowLeft size={16} />} size="sm">
            Retour aux tickets
          </Button>
          <Badge variant="brand">En cours</Badge>
        </div>

        <SectionCard
          title="Votre message"
          titleIcon={<HelpCircle size={18} />}
        >
          <div className="flex flex-col gap-stack-xs">
            <div className="flex items-center gap-stack-xs text-caption text-ink-500">
              <Calendar size={12} />
              12 mai 2026 à 09:42
            </div>
            <p className="text-body text-ink-700 leading-relaxed m-0">
              Bonjour, depuis ce matin je n'arrive plus à me connecter à mon compte. Quand je saisis mon email et mon mot de passe, j'obtiens le message "Identifiants invalides" alors que je suis certain que mes informations sont correctes. J'ai essayé de réinitialiser mon mot de passe mais je ne reçois pas l'email de réinitialisation. Pouvez-vous m'aider ?
            </p>
          </div>
        </SectionCard>

        <SectionCard
          title="Réponse du support"
          titleIcon={<Headphones size={18} />}
        >
          <Card tone="neutral">
            <div className="flex gap-stack">
              <Avatar size="md" tint="brand">SP</Avatar>
              <div className="flex flex-col gap-stack-xs flex-1">
                <div className="flex items-center justify-between gap-stack-xs">
                  <span className="font-display font-semibold text-body-sm text-ink-900">Sarah P. — Support TLS</span>
                  <span className="text-caption text-ink-500">12 mai 2026 à 14:15</span>
                </div>
                <p className="text-body-sm text-ink-700 leading-relaxed m-0">
                  Bonjour, merci de nous avoir contactés. Nous avons vérifié votre compte et avons constaté une anomalie lors d'une récente mise à jour de sécurité. Nous avons réinitialisé manuellement votre session. Pouvez-vous essayer de vous connecter de nouveau en utilisant la procédure de mot de passe oublié ? L'email devrait arriver dans les 5 minutes. N'hésitez pas à nous contacter si le problème persiste.
                </p>
              </div>
            </div>
          </Card>
        </SectionCard>

        <SectionCard
          title="Répondre"
          titleIcon={<Send size={18} />}
        >
          <div className="flex flex-col gap-stack">
            <FormGroup label="Votre message">
              <Input
                multiline
                rows={4}
                placeholder="Décrivez votre problème ou apportez des précisions…"
              />
            </FormGroup>
            <div className="flex gap-stack-xs">
              <Button variant="primary" leadingIcon={<Send size={16} />}>
                Envoyer
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
