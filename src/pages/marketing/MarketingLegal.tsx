/**
 * MarketingLegal: 4 legal stub pages (mentions légales, politique de confidentialité, CGV/CGU, charte IA)
 * Content to be filled before production launch.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, ScrollText, Brain } from 'lucide-react';
import { Button } from '../../components/core/Button';
import { SEOHead } from './components/SEOHead';

interface LegalPageProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
  canonical: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ icon, title, subtitle, lastUpdated, sections, canonical }) => (
  <div className="min-h-[100dvh] bg-white">
    <SEOHead title={title} description={subtitle} canonical={canonical} noIndex />
    {/* Hero */}
    <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white pt-24 sm:pt-28 lg:pt-32 pb-16 px-6">
      <div className="max-w-page mx-auto">
        <Link to="/website" className="inline-flex items-center gap-stack-xs text-white/60 hover:text-white text-body-sm mb-section transition-colors duration-base">
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
        <div className="flex items-center gap-stack-xs mb-stack text-white/60">
          {icon}
          <span className="text-body-sm font-body uppercase tracking-widest">Document légal</span>
        </div>
        <h1 className="font-display text-h1 font-bold mb-3">{title}</h1>
        <p className="text-white/70 text-body-lg">{subtitle}</p>
        <p className="text-white/40 text-caption mt-stack">Dernière mise à jour : {lastUpdated}</p>
      </div>
    </div>

    {/* Content */}
    <div className="max-w-prose mx-auto px-6 py-section-lg">
      <div className="flex flex-col gap-section">
        {sections.map((s) => (
          <section key={s.heading} className="flex flex-col gap-stack">
            <h2 className="font-display text-h3 font-semibold text-ink-900">{s.heading}</h2>
            <p className="font-body text-body text-ink-600 leading-[1.8]">{s.body}</p>
          </section>
        ))}

        {/* Placeholder notice */}
        <div className="rounded-xl border border-warning-bg bg-warning-bg/50 p-stack mt-stack-lg">
          <p className="text-body-sm text-warning-fg font-body">
            <strong>Document en cours de rédaction.</strong> Ce contenu sera complété avant le lancement du site. Pour toute question, contactez-nous à{' '}
            <a href="mailto:contact@thelearningsociety.fr" className="underline hover:no-underline">
              contact@thelearningsociety.fr
            </a>.
          </p>
        </div>

        <div className="pt-stack border-t border-ink-100">
          <Button to="/website/contact" variant="primary">Nous contacter</Button>
        </div>
      </div>
    </div>
  </div>
);

// ── Mentions légales ──────────────────────────────────────────────────────────

export const MarketingMentionsLegales: React.FC = () => (
  <LegalPage
    icon={<FileText size={20} />}
    title="Mentions légales"
    subtitle="Informations légales relatives à l'éditeur et à l'hébergeur du site."
    lastUpdated="Juin 2026"
    canonical="/website/mentions-legales"
    sections={[
      {
        heading: 'Éditeur du site',
        body: 'The Learning Society, SAS au capital de 100 €. Siège social : 26 bis, rue Olivier Noyer, 75014 Paris, France. SIRET : 909 413 841 00026. RCS Paris 909 413 841. TVA intracommunautaire : FR38909413841. Directeur de la publication : Pierre-Armand Dennery. Contact : contact@thelearningsociety.fr.',
      },
      {
        heading: 'Hébergeur',
        body: 'OVH, SASU au capital de 10 174 560 €. Siège social : 2, rue Kellermann, 59100 Roubaix, France. SIRET : 424 761 419 00045. RCS Lille Métropole 424 761 419. Contact : support@ovh.com. Téléphone : +33 (0) 820 32 03 63.',
      },
      {
        heading: 'Propriété intellectuelle',
        body: 'L\'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d\'auteur et appartient à The Learning Society ou à ses partenaires. Toute reproduction sans autorisation écrite préalable est interdite, conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.',
      },
      {
        heading: 'Liens hypertextes et cookies',
        body: 'Le site peut contenir des liens vers des sites tiers. The Learning Society n\'est pas responsable du contenu de ces sites. Lors de votre navigation, des cookies peuvent être déposés sur votre terminal. Vous pouvez gérer vos préférences à tout moment via le bandeau de consentement.',
      },
    ]}
  />
);

// ── Politique de confidentialité ──────────────────────────────────────────────

export const MarketingPolitiqueConfidentialite: React.FC = () => (
  <LegalPage
    icon={<Shield size={20} />}
    title="Politique de confidentialité"
    subtitle="Comment nous collectons, utilisons et protégeons vos données personnelles."
    lastUpdated="Juin 2026"
    canonical="/website/politique-confidentialite"
    sections={[
      {
        heading: 'Responsable du traitement',
        body: 'The Learning Society (26 bis, rue Olivier Noyer, 75014 Paris) est responsable du traitement de vos données personnelles au sens du RGPD (Règlement Général sur la Protection des Données).',
      },
      {
        heading: 'Données collectées',
        body: 'Nous collectons les données que vous nous fournissez directement (nom, email, messages via le formulaire de contact) ainsi que des données de navigation anonymisées à des fins statistiques.',
      },
      {
        heading: 'Finalités du traitement',
        body: 'Vos données sont utilisées pour répondre à vos demandes, améliorer nos services, et si vous y avez consenti, vous envoyer des communications. Nous ne vendons jamais vos données à des tiers.',
      },
      {
        heading: 'Conservation',
        body: 'Vos données sont conservées pendant 3 ans à compter de votre dernière interaction (données prospects et contacts), et pendant la durée de la relation contractuelle augmentée de 5 ans pour les données clients, sauf obligation légale contraire.',
      },
      {
        heading: 'Vos droits',
        body: 'Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de portabilité et d\'opposition. Pour exercer ces droits : contact@thelearningsociety.fr.',
      },
      {
        heading: 'Cookies',
        body: 'Ce site utilise des cookies nécessaires au bon fonctionnement et, avec votre consentement, des cookies analytiques. Vous pouvez gérer vos préférences à tout moment.',
      },
    ]}
  />
);

// ── CGV / CGU ─────────────────────────────────────────────────────────────────

export const MarketingCgvCgu: React.FC = () => (
  <LegalPage
    icon={<ScrollText size={20} />}
    title="CGV & CGU"
    subtitle="Conditions Générales de Vente et d'Utilisation applicables aux prestations et à la plateforme The Learning Society."
    lastUpdated="Juin 2026"
    canonical="/website/cgv-cgu"
    sections={[
      {
        heading: 'Champ d\'application',
        body: 'Les présentes CGV/CGU s\'appliquent à toute commande de formation, de conseil ou d\'accès à la plateforme Learning App passée auprès de The Learning Society.',
      },
      {
        heading: 'Tarifs et paiement',
        body: 'Les tarifs sont indiqués en euros HT sur les devis émis. Le paiement est dû à réception de facture sauf accord contraire. Tout retard entraîne de plein droit des pénalités au taux de 3 fois le taux d\'intérêt légal en vigueur, ainsi qu\'une indemnité forfaitaire pour frais de recouvrement de 40 €.',
      },
      {
        heading: 'Annulation et report',
        body: 'Toute annulation doit être notifiée par écrit. En deçà de 5 jours ouvrés avant le début de la prestation, 50 % du montant reste dû. En deçà de 48 heures, la totalité du montant est due. Les reports sont acceptés sous réserve de disponibilité.',
      },
      {
        heading: 'Responsabilité',
        body: 'The Learning Society s\'engage à mettre en œuvre tous les moyens nécessaires à la bonne exécution de ses prestations. Sa responsabilité est limitée au montant de la prestation en cause.',
      },
      {
        heading: 'Droit applicable',
        body: 'Les présentes conditions sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents de Paris.',
      },
    ]}
  />
);

// ── Charte IA & éthique ───────────────────────────────────────────────────────

export const MarketingCharteIA: React.FC = () => (
  <LegalPage
    icon={<Brain size={20} />}
    title="Charte IA & éthique"
    subtitle="Nos engagements sur l'usage responsable de l'intelligence artificielle dans nos formations et notre plateforme."
    lastUpdated="Juin 2026"
    canonical="/website/charte-ia"
    sections={[
      {
        heading: 'IA augmentée, jamais substitutive',
        body: 'Chez The Learning Society, l\'IA est un outil au service du formateur et de l\'apprenant. Elle amplifie l\'expertise humaine: elle ne la remplace pas. Toute production générée par IA est relue, validée et contextualisée par un expert.',
      },
      {
        heading: 'Transparence algorithmique',
        body: 'Nous indiquons clairement quand un contenu a été produit ou assisté par IA. Les apprenants savent toujours à quoi ils ont affaire. Aucune IA ne prend de décision à leur place concernant leur parcours sans validation humaine.',
      },
      {
        heading: 'Protection des données dans l\'IA',
        body: 'Nous n\'utilisons pas les données personnelles des apprenants pour entraîner des modèles d\'IA tiers. Nos prompts sont conçus pour minimiser la transmission de données sensibles.',
      },
      {
        heading: 'Équité et non-discrimination',
        body: 'Nos systèmes de recommandation et de personnalisation sont régulièrement audités pour détecter et corriger les biais discriminatoires. Nous favorisons la diversité des profils dans nos données de référence.',
      },
      {
        heading: 'Conformité AI Act (UE)',
        body: 'Nos usages de l\'IA sont classifiés selon le règlement européen AI Act. Les systèmes à risque élevé font l\'objet d\'une documentation technique et d\'une supervision humaine renforcée.',
      },
      {
        heading: 'Contact éthique IA',
        body: 'Pour toute question relative à nos usages de l\'IA ou pour signaler un problème éthique : contact@thelearningsociety.fr avec l\'objet [Charte IA].',
      },
    ]}
  />
);
