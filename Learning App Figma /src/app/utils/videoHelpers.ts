/**
 * Video Helpers - The Learning Society
 * Fonctions utilitaires pour gérer les vidéos Vimeo
 */

/**
 * Extrait l'ID Vimeo depuis différents formats d'URL
 * @param url - URL Vimeo complète ou ID
 * @returns ID Vimeo ou null si invalide
 * 
 * @example
 * extractVimeoId('https://vimeo.com/76979871') // '76979871'
 * extractVimeoId('https://player.vimeo.com/video/76979871') // '76979871'
 * extractVimeoId('76979871') // '76979871'
 * extractVimeoId('vimeo.com/76979871') // '76979871'
 */
export function extractVimeoId(url: string): string | null {
  if (!url) return null;

  // Si c'est déjà juste un ID (nombre)
  if (/^\d+$/.test(url.trim())) {
    return url.trim();
  }

  // Pattern pour vimeo.com/ID
  const vimeoPattern = /vimeo\.com\/(\d+)/;
  const match = url.match(vimeoPattern);
  
  if (match && match[1]) {
    return match[1];
  }

  // Pattern pour player.vimeo.com/video/ID
  const playerPattern = /player\.vimeo\.com\/video\/(\d+)/;
  const playerMatch = url.match(playerPattern);
  
  if (playerMatch && playerMatch[1]) {
    return playerMatch[1];
  }

  return null;
}

/**
 * Convertit une URL YouTube en ID Vimeo de placeholder
 * Note: Cette fonction retourne un ID de placeholder.
 * Les vidéos doivent être uploadées sur Vimeo pour fonctionner.
 * 
 * @param youtubeUrl - URL YouTube
 * @returns ID Vimeo placeholder
 */
export function convertYouTubeToVimeoPlaceholder(youtubeUrl: string): string {
  // Pour l'instant, retourne l'ID de demo
  // TODO: Remplacer par l'upload automatique ou manuel vers Vimeo
  console.warn(
    `⚠️ YouTube URL detected: ${youtubeUrl}\n` +
    `Please upload this video to Vimeo and replace with the Vimeo ID.\n` +
    `Currently using placeholder ID.`
  );
  return '76979871'; // ID de demo Vimeo
}

/**
 * Détecte le type de plateforme vidéo
 * @param url - URL de la vidéo
 * @returns Type de plateforme
 */
export function detectVideoPlatform(url: string): 'vimeo' | 'youtube' | 'unknown' {
  if (!url) return 'unknown';

  if (url.includes('vimeo.com')) return 'vimeo';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  
  return 'unknown';
}

/**
 * Obtient l'ID vidéo approprié selon la plateforme
 * Convertit automatiquement YouTube en placeholder Vimeo
 * 
 * @param videoUrl - URL ou ID de la vidéo
 * @returns ID Vimeo
 * 
 * @example
 * getVideoId('https://vimeo.com/76979871') // '76979871'
 * getVideoId('https://youtube.com/watch?v=abc123') // '76979871' (placeholder)
 * getVideoId('76979871') // '76979871'
 */
export function getVideoId(videoUrl: string): string {
  const platform = detectVideoPlatform(videoUrl);

  if (platform === 'vimeo') {
    return extractVimeoId(videoUrl) || '76979871';
  }

  if (platform === 'youtube') {
    return convertYouTubeToVimeoPlaceholder(videoUrl);
  }

  // Si c'est juste un ID
  if (/^\d+$/.test(videoUrl.trim())) {
    return videoUrl.trim();
  }

  // Fallback sur l'ID de demo
  return '76979871';
}

/**
 * Génère une URL Vimeo embed à partir d'un ID
 * @param videoId - ID Vimeo
 * @param options - Options d'embed
 * @returns URL Vimeo embed complète
 */
export function getVimeoEmbedUrl(
  videoId: string,
  options: {
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
  } = {}
): string {
  const params = new URLSearchParams({
    autoplay: options.autoplay ? '1' : '0',
    loop: options.loop ? '1' : '0',
    muted: options.muted ? '1' : '0',
    controls: options.controls ? '1' : '0',
    title: '0',
    byline: '0',
    portrait: '0',
  });

  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

/**
 * Valide si un ID Vimeo est valide
 * @param videoId - ID à valider
 * @returns true si valide
 */
export function isValidVimeoId(videoId: string): boolean {
  return /^\d+$/.test(videoId);
}
