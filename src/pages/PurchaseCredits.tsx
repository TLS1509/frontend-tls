import React, { useState } from 'react';
import { CreditCard, Check, Shield } from 'lucide-react';
import PageHero from '../components/patterns/EditorialHero';
import { SectionHeader } from '../components/patterns/SectionHeader';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { MetaPill } from '../components/ui/MetaPill';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Alert } from '../components/ui/Alert';
import { useUserProfileStore } from '../stores/persistence';
import { PageShell } from '../components/layout';

interface Pack {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  bonus?: number;
}

const PACKS: Pack[] = [
  { id: 'p1', credits: 100, price: 50 },
  { id: 'p2', credits: 500, price: 200, popular: true, bonus: 50 },
  { id: 'p3', credits: 1000, price: 380, bonus: 150 },
];

/* Montants à la française : « 200 € », « 0,40 € le crédit ». */
const euros = (n: number, decimales = 0) =>
  `${n.toFixed(decimales).replace('.', ',')}\u00a0€`;

const PurchaseCredits: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<string>('p2');
  const [purchased, setPurchased] = useState(false);
  const pack = PACKS.find((p) => p.id === selectedPack);

  const store = useUserProfileStore();
  const profile = store.get();
  const creditBalance = profile.credits.classic + profile.credits.special;

  const handlePurchase = () => {
    if (!pack) return;
    const totalCredits = pack.credits + (pack.bonus ?? 0);
    store.patch({ credits: { ...profile.credits, classic: profile.credits.classic + totalCredits } });
    setPurchased(true);
  };

  /* Passe typographique du 2026-09-24 : plus d'aplat `bg-surface` ; une seule
     colonne (l'en-tête était à x 311 et le contenu, centré, à x 488) ; les
     packs sont calés à gauche, sans l'éclair décoratif, le bonus en donnée
     (`MetaPill`) ; « Choisissez un pack » et « Paiement sécurisé » sont des
     sections à h2 ; les montants s'écrivent à la française, et le bouton dit
     ce qu'il fait (« Payer 200 € ») plutôt que son prestataire.
     Voix (arbitrage n°23) : « vous ». Un achat est une transaction, dans la
     famille Facturation qui vouvoie ; ce n'est pas l'intimité de l'espace
     d'apprentissage, et un cas ambigu se vouvoie. */
  return (
    <PageShell width="content">
      <PageHero
        eyebrow="Facturation · Crédits"
        title="Rechargez votre compte"
        summary="Les crédits servent à débloquer du coaching premium et des formations spécialisées."
        tone="flat"
      />

      <div className="flex flex-col gap-stack-sm">
        {purchased && (
          <Alert variant="success" title="Achat confirmé">
            {pack ? `${pack.credits + (pack.bonus ?? 0)} crédits ajoutés à votre compte.` : 'Crédits ajoutés.'}
          </Alert>
        )}
        <Alert variant="info" title={`Solde actuel : ${creditBalance} crédits`}>
          Vous pouvez acheter des crédits supplémentaires à tout moment.
        </Alert>
      </div>

      <section className="flex flex-col gap-stack">
        <SectionHeader title="Choisissez un pack" />
        {/* 12 px au-dessus des cartes : la pastille « Le plus populaire »
            déborde de 12 px au-dessus de la sienne. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack mt-stack-sm">
          {PACKS.map((p) => (
            <Card
              key={p.id}
              onClick={() => setSelectedPack(p.id)}
              className={`cursor-pointer relative transition-all flex flex-col gap-stack-sm ${
                selectedPack === p.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-ink-200 hover:border-primary-300'
              }`}
            >
              {p.popular && (
                <Badge variant="brand" className="absolute -top-3 left-stack-lg">
                  Le plus populaire
                </Badge>
              )}
              <div className="flex flex-col gap-stack-3xs">
                <p className="flex items-baseline gap-stack-xs">
                  <span className="font-display text-h2 text-ink-900 tabular-nums">{p.credits}</span>
                  <span className="text-body font-semibold text-ink-900">crédits</span>
                </p>
                {p.bonus ? (
                  <MetaPill text={`+${p.bonus} crédits offerts`} tone="success" className="self-start" />
                ) : (
                  /* Hauteur de la pastille (24) : le filet des trois cartes reste aligné. */
                  <span className="inline-flex items-center h-6 text-caption text-ink-600">Sans bonus</span>
                )}
              </div>
              <div className="flex flex-col gap-stack-3xs pt-stack-sm border-t border-ink-100">
                <p className="font-display text-h3 text-ink-900 tabular-nums">{euros(p.price)}</p>
                <p className="text-caption text-ink-600 tabular-nums">soit {euros(p.price / p.credits, 2)} le crédit</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {pack && (
        <section className="flex flex-col gap-stack">
          <SectionHeader title="Paiement sécurisé" />
          <Card className="@container flex flex-col gap-stack-lg">
            <div className="grid grid-cols-1 @lg:grid-cols-2 gap-stack">
              <FormGroup label="Numéro de carte">
                <Input placeholder="4242 4242 4242 4242" leadingIcon={<CreditCard className="w-4 h-4" />} />
              </FormGroup>
              <FormGroup label="Nom du titulaire">
                <Input placeholder="Nom tel qu'il figure sur la carte" />
              </FormGroup>
              <FormGroup label="Date d'expiration">
                <Input placeholder="MM/AA" />
              </FormGroup>
              <FormGroup label="CVC">
                <Input placeholder="123" />
              </FormGroup>
            </div>

            {/* Le récapitulatif : libellé en légende, montant au pas du titre
                de bloc, en encre (le teal ne dit pas que 550 compte plus). */}
            <dl className="flex items-start justify-between gap-stack p-stack rounded-lg bg-ink-50">
              <div className="flex flex-col gap-stack-3xs">
                <dt className="text-caption font-semibold text-ink-600">Total à payer</dt>
                <dd className="font-display text-h3 text-ink-900 tabular-nums">{euros(pack.price)}</dd>
              </div>
              <div className="flex flex-col gap-stack-3xs text-right">
                <dt className="text-caption font-semibold text-ink-600">Crédits reçus</dt>
                <dd className="font-display text-h3 text-ink-900 tabular-nums">
                  {pack.credits + (pack.bonus || 0)}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-stack-sm">
              <Button emphasis="solid" tone="brand" fullWidth size="lg" leadingIcon={<Check className="w-4 h-4" />} onClick={handlePurchase} disabled={purchased}>
                {purchased ? 'Achat confirmé' : `Payer ${euros(pack.price)}`}
              </Button>
              <p className="flex items-center justify-center gap-stack-xs text-caption text-ink-600">
                <Shield className="w-4 h-4" aria-hidden="true" />
                <span>Paiement sécurisé · SSL · PCI-DSS</span>
              </p>
            </div>
          </Card>
        </section>
      )}
    </PageShell>
  );
};

export default PurchaseCredits;
