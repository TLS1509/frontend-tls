import { useEffect } from 'react';

/**
 * WEB FONT LOADER
 * 
 * Charge Google Fonts (League Spartan + Nunito) dynamiquement
 * via JavaScript car @import CSS ne fonctionne pas dans cet environnement
 */

export function WebFontLoader() {
  useEffect(() => {
    // Créer les éléments link pour preconnect
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    
    // Créer les éléments link pour les fonts
    const leagueSpartan = document.createElement('link');
    leagueSpartan.rel = 'stylesheet';
    leagueSpartan.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap';
    
    const nunito = document.createElement('link');
    nunito.rel = 'stylesheet';
    nunito.href = 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
    
    // Ajouter au head
    document.head.appendChild(preconnect1);
    document.head.appendChild(preconnect2);
    document.head.appendChild(leagueSpartan);
    document.head.appendChild(nunito);
    
    // Cleanup
    return () => {
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(leagueSpartan);
      document.head.removeChild(nunito);
    };
  }, []);

  return null;
}
