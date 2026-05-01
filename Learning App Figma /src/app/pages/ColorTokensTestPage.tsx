import { ColorTokensValidation } from '../components/test/ColorTokensValidation';

/**
 * PAGE DE TEST - Color Tokens V2
 * 
 * Route: /color-tokens-test
 * 
 * Permet de valider rapidement:
 * 1. Legacy backgrounds (--primary-50, --accent-50)
 * 2. Tokens sémantiques (--foreground, --muted, --card)
 * 3. États UI (warning jaune, error/destructive rouge)
 */

export default function ColorTokensTestPage() {
  return <ColorTokensValidation />;
}
