import React, { useState } from 'react';
import { CreditCard, Check, Shield, Zap } from 'lucide-react';
import EditorialHero from '../components/patterns/EditorialHero';
import { Card } from '../components/core/Card';
import { Button } from '../components/core/Button';
import { Badge } from '../components/ui/Badge';
import { FormGroup } from '../components/core/FormGroup';
import { Input } from '../components/core/Input';
import { Alert } from '../components/ui/Alert';
import { useUserProfileStore } from '../stores/persistence';
import { Container } from '../components/layout';

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

  return (
    <div className="min-h-[100dvh] bg-surface">
      <EditorialHero
        eyebrow="Compte · Acheter des crédits"
        title="Recharge ton compte"
        summary="Les crédits servent à débloquer du coaching premium et des formations spécialisées"
        tone="flat"
      />

      <Container width="content" padding={false} className="px-stack py-section flex flex-col gap-section">
        {purchased && (
          <Alert variant="success" title="Achat confirmé !">
            {pack ? `${pack.credits + (pack.bonus ?? 0)} crédits ajoutés à ton compte.` : 'Crédits ajoutés.'}
          </Alert>
        )}
        <Alert variant="info" title={`Solde actuel : ${creditBalance} crédits`}>
          Tu peux acheter des crédits supplémentaires à tout moment.
        </Alert>

        <div>
          <h2 className="text-h3 font-display font-semibold mb-stack">Choisis un pack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack">
            {PACKS.map((p) => (
              <Card
                key={p.id}
                onClick={() => setSelectedPack(p.id)}
                className={`p-stack-lg cursor-pointer relative transition-all ${
                  selectedPack === p.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-ink-200 hover:border-primary-300'
                }`}
              >
                {p.popular && (
                  <Badge variant="brand" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Le plus populaire
                  </Badge>
                )}
                <div className="text-center">
                  <Zap className="w-8 h-8 text-accent-400 mx-auto mb-stack" />
                  <div className="text-h2 font-bold">{p.credits}</div>
                  <div className="text-caption text-ink-500 mb-stack-xs">crédits</div>
                  {p.bonus && (
                    <Badge variant="success" className="mb-stack">+{p.bonus} bonus</Badge>
                  )}
                  <div className="text-h3 font-semibold mt-stack">{p.price}€</div>
                  <div className="text-caption text-ink-500">soit {(p.price / p.credits).toFixed(2)}€ / crédit</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {pack && (
          <Card className="p-stack-lg">
            <h3 className="text-h4 font-semibold mb-stack">Paiement sécurisé</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
              <FormGroup label="Numéro de carte">
                <Input placeholder="4242 4242 4242 4242" leadingIcon={<CreditCard className="w-4 h-4" />} />
              </FormGroup>
              <FormGroup label="Nom du titulaire">
                <Input placeholder="Chloé Mimault" />
              </FormGroup>
              <FormGroup label="Date d'expiration">
                <Input placeholder="MM/AA" />
              </FormGroup>
              <FormGroup label="CVC">
                <Input placeholder="123" />
              </FormGroup>
            </div>

            <div className="flex items-center justify-between mt-stack-lg p-stack rounded-lg bg-ink-50">
              <div>
                <div className="text-caption text-ink-500">Total à payer</div>
                <div className="text-h3 font-bold">{pack.price}€</div>
              </div>
              <div className="text-right">
                <div className="text-caption text-ink-500">Crédits reçus</div>
                <div className="text-h3 font-bold text-primary-700">
                  {pack.credits + (pack.bonus || 0)}
                </div>
              </div>
            </div>

            <Button variant="primary" fullWidth size="lg" className="mt-stack" leadingIcon={<Check className="w-4 h-4" />} onClick={handlePurchase} disabled={purchased}>
              {purchased ? 'Achat confirmé' : 'Payer via WooCommerce / Stripe'}
            </Button>

            <div className="flex items-center gap-stack-xs mt-stack text-caption text-ink-500 justify-center">
              <Shield className="w-4 h-4" />
              <span>Paiement sécurisé · SSL · PCI-DSS</span>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default PurchaseCredits;
