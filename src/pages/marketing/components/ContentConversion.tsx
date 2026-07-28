/**
 * ContentConversion — les points de contact exigés par la stratégie éditoriale
 * sur chaque contenu long (article, dossier).
 *
 * Source : doc "Cadrage & Positionnement du Magazine / Blog" §4 et doc
 * "Stratégie de Contenu Marketing B2B" §4 (mirroirs dans
 * docs/site/propositions-PAD/). Les deux exigent la même chose :
 *
 *   1. un encart Auto-Diagnostic en MILIEU d'article  → DiagnosticInlineCta
 *   2. un formulaire La Vigie IA en BAS d'article     → VigieSignupBanner
 *
 * Vérifié le 28/07 : les templates Article et Dossier n'en contenaient aucun,
 * alors que l'objectif déclaré du blog est « acquisition SEO brute et
 * génération de MQL ». Ce fichier comble cet écart.
 *
 * Le 3e point de contact mentionné par le doc Magazine (sticky sidebar
 * "demander une démo") est volontairement laissé de côté : il touche à la
 * composition de la page, donc à la phase design à valider ensemble.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, Radar } from 'lucide-react';
import { Button } from '../../../components/core/Button';
import { useMarketingToast } from '../../../components/marketing/motion';
import { submitForm } from '../utils/submitForm';

/* ────────────────────────────────────────────────────────────────────────────
   1. Encart milieu d'article — bascule vers l'autodiagnostic (lead magnet)
   ──────────────────────────────────────────────────────────────────────────── */

export const DiagnosticInlineCta: React.FC = () => (
  <aside
    aria-label="Évaluer la maturité de votre organisation"
    className="my-stack-lg flex flex-col gap-stack rounded-2xl bg-primary-50 p-stack-lg sm:p-section"
  >
    <div className="flex items-start gap-stack">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
        <Gauge size={20} />
      </span>
      <div className="flex flex-col gap-stack-xs">
        <p className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight [text-wrap:balance]">
          Où en est votre organisation, concrètement ?
        </p>
        <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
          Huit questions, trois minutes, un score commenté : évaluez votre
          maturité Skills-Based Organization ou votre maturité IA.
        </p>
      </div>
    </div>
    <div className="w-fit">
      <Button to="/website/diagnostic" variant="primary" size="md" trailingIcon={<ArrowRight size={16} />}>
        Lancer l'autodiagnostic
      </Button>
    </div>
  </aside>
);

/* ────────────────────────────────────────────────────────────────────────────
   2. Bandeau bas d'article — capture newsletter
   ──────────────────────────────────────────────────────────────────────────── */

export const VigieSignupBanner: React.FC<{ source?: string }> = ({ source = 'vigie-article' }) => {
  const toast = useMarketingToast();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || sending) return;
    setSending(true);
    const { ok, error } = await submitForm({
      name: email.trim(),
      email: email.trim(),
      subject: 'Inscription La Vigie IA',
      _source: source,
    });
    setSending(false);
    if (ok) {
      toast.push({ tone: 'success', message: 'Merci, votre inscription à La Vigie IA est enregistrée.' });
      setEmail('');
    } else {
      toast.push({
        tone: 'danger',
        message: "L'inscription n'a pas pu être enregistrée.",
        description: error ?? 'Réessayez ou écrivez-nous à contact@thelearningsociety.fr.',
      });
    }
  };

  const inputId = `vigie-inline-${source}`;

  return (
    <aside
      aria-label="S'abonner à la newsletter La Vigie IA"
      className="mt-section flex flex-col gap-stack rounded-2xl border border-ink-100 bg-ink-50/50 p-stack-lg sm:p-section"
    >
      <div className="flex items-start gap-stack">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700 shadow-card">
          <Radar size={20} />
        </span>
        <div className="flex flex-col gap-stack-xs">
          <p className="font-display text-h4 font-bold text-ink-900 m-0 leading-tight [text-wrap:balance]">
            Un mardi sur deux, dans votre boîte mail.
          </p>
          <p className="font-body text-body-sm text-ink-600 leading-relaxed m-0">
            La Vigie IA : un workflow pédagogique autopsié, une fiche Out-skill,
            un crash-test terrain. Cinq minutes, sans discours commercial.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-stack-xs">
        <label htmlFor={inputId} className="sr-only">
          Votre adresse email professionnelle
        </label>
        <input
          id={inputId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email professionnel"
          className="h-12 flex-1 rounded-pill border border-ink-200 bg-white px-5 font-body text-body text-ink-900 placeholder:text-ink-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        />
        <Button type="submit" variant="primary" size="lg" disabled={sending} trailingIcon={<ArrowRight size={18} />}>
          {sending ? 'Envoi en cours…' : "S'abonner"}
        </Button>
      </form>

      <p className="font-body text-caption text-ink-500 m-0">
        Un email tous les quinze jours, pas de spam. Désinscription en un clic.{' '}
        <Link
          to="/website/vigie"
          className="font-bold text-primary-700 underline underline-offset-2 transition-colors duration-fast hover:text-primary-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Voir le détail
        </Link>
      </p>
    </aside>
  );
};

/* ────────────────────────────────────────────────────────────────────────────
   Utilitaire — point d'insertion de l'encart milieu d'article
   ────────────────────────────────────────────────────────────────────────────
   On ne coupe pas au milieu brut du tableau : on cherche le titre de section
   (h2) le plus proche du milieu, pour que l'encart tombe entre deux sections
   et jamais au milieu d'un raisonnement.
   Retourne -1 s'il n'y a pas de point d'insertion acceptable (contenu court).
*/
export function midArticleInsertIndex(blocks: { type: string }[]): number {
  if (blocks.length < 6) return -1;
  const middle = blocks.length / 2;
  let best = -1;
  let bestDistance = Infinity;
  blocks.forEach((b, i) => {
    if (b.type !== 'h2' || i === 0) return;
    const d = Math.abs(i - middle);
    if (d < bestDistance) {
      bestDistance = d;
      best = i;
    }
  });
  // Pas de h2 exploitable : on retombe sur le milieu, après un paragraphe.
  return best === -1 ? Math.floor(middle) : best;
}
