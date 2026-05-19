import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ExternalLink,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Smartphone,
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import { EditorialHero } from '../../components/patterns/EditorialHero';
import { SectionCard } from '../../components/patterns/SectionCard';
import { SectionHeader } from '../../components/patterns/SectionHeader';
import { FormGroup } from '../../components/core/FormGroup';
import { Input } from '../../components/core/Input';

const QUICK_LINKS = [
  { icon: <BookOpen size={18} />, label: 'Formation Formateur Augmenté', href: '/marketing/formation', desc: 'À partir de 249€ — 7 modules' },
  { icon: <Briefcase size={18} />, label: 'Accompagnement sur mesure', href: '/marketing/accompagnement', desc: 'Devis personnalisé' },
  { icon: <Smartphone size={18} />, label: 'Learning App — accès anticipé', href: '/marketing/learning-app', desc: 'Inscription bêta gratuite' },
];

export const MarketingContact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <EditorialHero
        tone="default"
        eyebrow={{ icon: <MessageSquare size={14} />, label: 'Contact' }}
        title="Parlons de votre projet"
        summary="Une question sur nos formations, un projet d'accompagnement, ou envie d'en savoir plus sur la Learning App ? Nous vous répondons sous 48h."
      />

      {/* ── Layout 2 colonnes ── */}
      <section className="py-section-lg bg-gradient-page-ambient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-section">

            {/* Formulaire (col principale) */}
            <div className="lg:col-span-2 flex flex-col gap-section">
              <SectionHeader
                variant="solid"
                tone="primary"
                size="md"
                icon={<MessageSquare size={20} />}
                title="Envoyez-nous un message"
              />

              {submitted ? (
                <SectionCard>
                  <div className="flex flex-col items-center text-center gap-stack py-8">
                    <CheckCircle2 size={48} className="text-success-base" />
                    <h3 className="font-display text-h3 font-bold text-ink-900 m-0">Message envoyé !</h3>
                    <p className="text-body text-ink-600 m-0 max-w-prose">
                      Merci pour votre message. Nous vous répondrons sous 48h ouvrées.
                    </p>
                    <Button variant="primary" size="md" onClick={() => setSubmitted(false)}>
                      Envoyer un autre message
                    </Button>
                  </div>
                </SectionCard>
              ) : (
                <SectionCard>
                  <form
                    className="flex flex-col gap-stack"
                    onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-stack">
                      <FormGroup label="Prénom et nom" id="c-name" required>
                        <Input id="c-name" placeholder="Marie Dupont" required />
                      </FormGroup>
                      <FormGroup label="Email professionnel" id="c-email" required>
                        <Input id="c-email" type="email" placeholder="marie@organisation.fr" required />
                      </FormGroup>
                    </div>
                    <FormGroup label="Organisation" id="c-org">
                      <Input id="c-org" placeholder="Nom de votre entreprise ou organisation" />
                    </FormGroup>
                    <FormGroup label="Sujet" id="c-subject">
                      <Input id="c-subject" placeholder="Formation, accompagnement, Learning App, partenariat…" />
                    </FormGroup>
                    <FormGroup label="Votre message" id="c-message" required>
                      <textarea
                        id="c-message"
                        rows={5}
                        placeholder="Décrivez votre contexte, vos objectifs et vos questions…"
                        className="w-full px-3 py-2.5 rounded-lg border border-ink-200 text-body-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 resize-y transition-colors h-auto min-h-[120px]"
                        required
                      />
                    </FormGroup>
                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        trailingIcon={<ArrowRight size={16} />}
                      >
                        Envoyer le message
                      </Button>
                    </div>
                  </form>
                </SectionCard>
              )}
            </div>

            {/* Aside sticky */}
            <div className="flex flex-col gap-stack-lg">

              {/* Infos de contact */}
              <SectionCard
                titleIcon={<Mail size={18} />}
                title="Nous contacter"
              >
                <div className="flex flex-col gap-stack">
                  <a
                    href="mailto:contact@thelearningsociety.fr"
                    className="flex items-center gap-2 text-body-sm text-primary-700 hover:text-primary-800 font-semibold transition-colors"
                  >
                    <Mail size={16} />
                    contact@thelearningsociety.fr
                  </a>
                  <a
                    href="https://linkedin.com/company/thelearningsociety"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-body-sm text-primary-700 hover:text-primary-800 font-semibold transition-colors"
                  >
                    <ExternalLink size={16} />
                    LinkedIn
                  </a>
                  <div className="pt-2 border-t border-ink-100">
                    <p className="text-caption text-ink-500 m-0">
                      Réponse sous <strong className="text-ink-700">48h ouvrées</strong><br />
                      Du lundi au vendredi, 9h–18h
                    </p>
                  </div>
                </div>
              </SectionCard>

              {/* Accès rapide */}
              <SectionCard
                titleIcon={<ArrowRight size={18} />}
                title="Accès rapide"
              >
                <div className="flex flex-col gap-2">
                  {QUICK_LINKS.map(({ icon, label, href, desc }) => (
                    <Link
                      key={href}
                      to={href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-ink-50 transition-colors group"
                    >
                      <span className="text-primary-500 shrink-0 mt-0.5">{icon}</span>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-body-sm font-semibold text-ink-800 group-hover:text-primary-700 transition-colors leading-tight">
                          {label}
                        </span>
                        <span className="text-caption text-ink-400">{desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </SectionCard>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MarketingContact;
