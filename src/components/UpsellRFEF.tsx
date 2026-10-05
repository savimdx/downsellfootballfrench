import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sparkles, 
  Check,
  Lock,
  Shield,
  Zap
} from 'lucide-react';

const MOCKUP_PACK_WEBP = "/100-exercices-explosif.webp";
const MOCKUP_PACK_PNG = "/100-exercices-explosif.png";
const MOCKUP_PACK_FALLBACK = "https://i.ibb.co/YC2hkqc/100-Exerc-cios-de-Futebol-Explosivo-compressed.png";

interface UpsellRFEFProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellRFEF({ onAccept, onDecline }: UpsellRFEFProps) {
  const [secondsLeft, setSecondsLeft] = useState(899); // 14:59 for urgency

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 899 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // <!-- HOTMART - Sales Funnel Widget -->
  // <!--- script load and setup --->
  useEffect(() => {
    let mounted = true;

    const mountHotmart = () => {
      if (!mounted) return;
      const checkoutElements = (window as any).checkoutElements;
      const target = document.getElementById('hotmart-sales-funnel');
      if (checkoutElements && target) {
        try {
          checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        } catch (err) {
          console.error("Hotmart salesFunnel init/mount error:", err);
        }
      }
    };

    let script = document.querySelector('script[src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
      script.async = true;
      script.onload = () => {
        if (mounted) mountHotmart();
      };
      document.body.appendChild(script);
    } else {
      if ((window as any).checkoutElements) {
        mountHotmart();
      } else {
        script.addEventListener('load', () => {
          if (mounted) mountHotmart();
        }, { once: true });
      }
    }

    mountHotmart();

    const interval = setInterval(() => {
      if (!mounted) return;
      const target = document.getElementById('hotmart-sales-funnel');
      if (target && target.children.length > 0) {
        clearInterval(interval);
      } else {
        mountHotmart();
      }
    }, 400);

    const timer = setTimeout(() => clearInterval(interval), 8000);

    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="upsell-page" className="relative min-h-screen bg-slate-50 text-slate-900 antialiased overflow-x-clip font-sans pb-16 selection:bg-orange-500 selection:text-white">
      
      {/* Background soccer pitch subtle grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"></div>

      {/* ================= 1. STICKY TOP RED BANNER (OFFRE UPSELL EXCLUSIVE) ================= */}
      <div className="bg-[#E61E05] text-white py-2 px-3 shadow-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 sm:gap-6 text-center">
          <div className="flex items-center gap-1.5 font-black tracking-wider text-xs sm:text-sm uppercase whitespace-nowrap">
            <span className="text-sm select-none animate-pulse">🔥</span>
            <span className="whitespace-nowrap">OFFRE UPSELL EXCLUSIVE</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#9c1202]/60 border border-white/20 px-2.5 py-0.5 rounded-full text-xs font-black font-mono tracking-wider whitespace-nowrap">
            <Clock className="h-3.5 w-3.5 text-amber-300 animate-pulse flex-shrink-0" />
            <span className="whitespace-nowrap">{formatTime(secondsLeft)}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-5 relative z-10 space-y-5">
        
        {/* ================= 2. BARRE DE PROGRESSION UPSELL ================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm text-center space-y-3">
          <p className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
            ATTENDEZ ! VOTRE COMMANDE N'EST PAS ENCORE TERMINÉE...
          </p>
          
          <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
            <div className="relative flex-1 bg-slate-100 h-4 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-orange-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: '95%' }}
              />
            </div>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-black whitespace-nowrap">
              95% COMPLÉTÉ
            </span>
          </div>
        </div>
        
        {/* ================= 3. TITRE PRINCIPAL UPSELL (+100 EXERCICES) ================= */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-[900] tracking-tight leading-tight uppercase text-slate-900">
            <span className="whitespace-nowrap text-[#E61E05]">+100 EXERCICES</span> POUR DÉVELOPPER{' '}
            <span className="whitespace-normal">VITESSE, ENDURANCE ET EXPLOSIVITÉ</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto font-medium">
            Complétez votre commande avec le programme complet de préparation physique moderne pour <span className="whitespace-nowrap font-bold text-slate-900">seulement 9 €</span> au lieu de 180 € (<span className="text-[#E61E05] font-bold">-95%</span>).
          </p>
        </div>

        {/* ================= 4. CARTE PRODUIT COMPACTE ================= */}
        <div className="bg-white border-2 border-orange-500 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden space-y-5">
          
          {/* MOCKUP DU PACK OPTIMISÉ POUR CHARGEMENT ULTRA-RAPIDE */}
          <div className="w-full flex justify-center pt-3">
            <picture className="w-full max-w-[340px] sm:max-w-[400px] flex justify-center">
              <source srcSet={MOCKUP_PACK_WEBP} type="image/webp" />
              <source srcSet={MOCKUP_PACK_PNG} type="image/png" />
              <img 
                src={MOCKUP_PACK_WEBP} 
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src !== MOCKUP_PACK_FALLBACK) {
                    target.src = MOCKUP_PACK_FALLBACK;
                  }
                }}
                alt="+100 Exercices pour Développer Vitesse, Endurance et Explosivité" 
                className="w-full h-auto object-contain drop-shadow-md"
                loading="eager"
                decoding="async"
                // @ts-ignore
                fetchPriority="high"
                width={640}
                height={640}
              />
            </picture>
          </div>

          {/* BLOC PRIX GARANTI SANS CASSE DE LIGNE */}
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5 sm:p-6 text-center space-y-3">
            
            <div className="flex items-center justify-center gap-3 whitespace-nowrap flex-nowrap">
              <span className="text-sm sm:text-base font-bold text-slate-400 line-through whitespace-nowrap">
                180 €
              </span>
              <span className="bg-red-600 text-white text-xs sm:text-sm font-black px-3 py-0.5 rounded-full uppercase whitespace-nowrap shadow-sm">
                -95%
              </span>
            </div>

            {/* PREÇO EM DESTAQUE - TAMANHO AUMENTADO COM WHITESPACE NOWRAP */}
            <div className="flex items-baseline justify-center text-[#E61E05] font-['Montserrat','Arial_Black',sans-serif] whitespace-nowrap flex-nowrap py-1">
              <span className="text-7xl sm:text-8xl md:text-9xl font-[900] tracking-tight leading-none whitespace-nowrap drop-shadow-[0_4px_12px_rgba(230,30,5,0.2)]">
                9 €
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              (Vous pouvez effectuer le paiement dans votre devise locale)
            </p>

            <p className="text-xs sm:text-sm text-orange-900 font-bold whitespace-nowrap">
              ⚡ Accès numérique immédiat à vie
            </p>
          </div>

          {/* LISTE D'AVANTAGES CONCISE (TEXTE ALLÉGÉ) */}
          <div className="space-y-2.5 pt-1">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <span>Ce que vous recevez immédiatement :</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-900">+100 Exercices Spécifiques de Vitesse</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-900">Endurance & Puissance Aérobie Football</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-900">Explosivité, Vivacité & Changements de Rythme</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-slate-900">Fiches prêtes à l'emploi, adaptées à tous les formats d'appareils</span>
              </div>
            </div>
          </div>

          {/* ================= 5. CTA & HOTMART FUNNEL ================= */}
          <div className="pt-2">
            
            {/* HOTMART CONTAINER */}
            <div className="w-full flex justify-center items-center">
              <div id="hotmart-sales-funnel" className="w-full flex justify-center items-center min-h-[60px]"></div>
            </div>

            {/* TRUST BADGES ROW (BELOW WIDGET) */}
            <div className="border-t border-slate-200 mt-4 pt-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                
                {/* 1. PAIEMENT SSL SÉCURISÉ */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-amber-500 mb-1 flex items-center justify-center">
                    <Lock className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider leading-tight">
                    PAIEMENT<br />SSL SÉCURISÉ
                  </span>
                </div>

                {/* 2. GARANTIE 7 JOURS */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-blue-500 mb-1 flex items-center justify-center">
                    <Shield className="h-4 w-4 fill-blue-500" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider leading-tight">
                    GARANTIE 7<br />JOURS
                  </span>
                </div>

                {/* 3. TÉLÉCHARGEMENT NUMÉRIQUE */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="text-amber-500 mb-1 flex items-center justify-center">
                    <Zap className="h-4 w-4 fill-amber-500" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider leading-tight">
                    TÉLÉCHARGEMENT<br />NUMÉRIQUE
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
