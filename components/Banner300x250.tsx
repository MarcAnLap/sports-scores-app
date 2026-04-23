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

export default function AdBanner({ 
  id, 
  width = 300, 
  height = 250, 
  format = 'iframe',
  className = ''
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Éviter les chargements multiples
    if (scriptLoaded.current || !containerRef.current) return;
    
    // Configuration Adsterra
    window.atOptions = {
      key: ADSTERRA_KEY,
      format: format,
      height: height,
      width: width,
      params: {},
    };

    // Injection du script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.highperformanceformat.com/${ADSTERRA_KEY}/invoke.js`;
    script.async = true;
    script.defer = true;
    
    const container = containerRef.current;
    container.appendChild(script);
    scriptLoaded.current = true;

    // Cleanup
    return () => {
      if (container && scriptLoaded.current) {
        container.innerHTML = '';
        scriptLoaded.current = false;
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