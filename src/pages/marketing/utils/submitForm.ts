/**
 * submitForm — envoi des formulaires de contact marketing
 *
 * Service : Web3Forms (gratuit, 250 envois/mois, aucun backend)
 * Config  : VITE_FORM_ACCESS_KEY dans .env (obtenir sur https://web3forms.com)
 *
 * Usage :
 *   const { ok, error } = await submitForm({ name, email, subject, message });
 */

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  org?: string;
  message?: string;
  need?: string;
  /** Identifie la page source dans la notification email */
  _source?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_FORM_ACCESS_KEY as string | undefined;

export async function submitForm(payload: ContactPayload): Promise<SubmitResult> {
  if (!ACCESS_KEY) {
    console.warn(
      '[TLS] Formulaire non configuré — ajouter VITE_FORM_ACCESS_KEY dans .env\n' +
      'Obtenir une clé gratuite : https://web3forms.com'
    );
    // Retourne ok en dev pour ne pas bloquer le prototype
    return { ok: true };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        from_name: 'Site TLS',
        subject: payload.subject
          ? `[TLS Contact] ${payload.subject}`
          : '[TLS Contact] Nouveau message',
        ...payload,
      }),
    });

    const data = await res.json();
    if (data.success) return { ok: true };
    return { ok: false, error: data.message ?? 'Erreur lors de l\'envoi.' };
  } catch {
    return { ok: false, error: 'Impossible de joindre le serveur. Réessayez ou contactez-nous par email.' };
  }
}
