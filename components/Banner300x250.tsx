// components/Banner300x250.tsx - Version ultra robuste
'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

type AdBannerProps = {
  id: string;
  width?: number;
  height?: number;
  format?: string;
  className?: string;
};

const ADSTERRA_KEY = 'cf698724bf9b3eb306509c04b96158eb';

export default function Banner300x250({ 
  id, 
  width = 300, 
  height = 250, 
  format = 'iframe',
  className = ''
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;
    
    // Nettoyer le conteneur avant d'ajouter un nouveau script
    if (scriptRef.current) {
      container.removeChild(scriptRef.current);
    }
    
    container.innerHTML = '';
    
    // Configuration Adsterra
    window.atOptions = {
      key: ADSTERRA_KEY,
      format: format,
      height: height,
      width: width,
      params: {},
    };

    // Création du script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.highperformanceformat.com/${ADSTERRA_KEY}/invoke.js`;
    script.async = true;
    script.defer = true;
    
    container.appendChild(script);
    scriptRef.current = script;

    // Cleanup
    return () => {
      if (container && scriptRef.current) {
        try {
          container.removeChild(scriptRef.current);
        } catch {
          // Ignorer l'erreur si le script n'existe plus
        }
        scriptRef.current = null;
      }
    };
  }, [width, height, format]);

  return (
    <div className={`flex justify-center items-center my-4 ${className}`}>
      <div 
        ref={containerRef}
        id={id} 
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`
        }}
        className="bg-gray-800/30 rounded-lg overflow-hidden"
      />
    </div>
  );
}