/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import SalesNotification from './components/SalesNotification';
import UpsellRFEF from './components/UpsellRFEF';
import { CheckCircle2, Download, Sparkles } from 'lucide-react';

export default function App() {
  const [timeLeftSticky, setTimeLeftSticky] = useState(1800); // 30 mins matching the Offer timer
  const [viewMode, setViewMode] = useState<'upsell' | 'thankyou_accepted' | 'thankyou_declined'>('upsell');


  // Shared countdown ticking sync
  useEffect(() => {
    document.title = "Pour seulement 9 € : Allez-vous vraiment laisser passer cette opportunité ? (-95%)";
    const timer = setInterval(() => {
      setTimeLeftSticky((prev) => {
        if (prev <= 1) {
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatStickyTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Scroll to top helper when state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [viewMode]);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 antialiased overflow-x-clip selection:bg-orange-500 selection:text-white">
      
      {/* Dynamic top-left small sales notifications */}
      <SalesNotification />

      {/* ================= CONDITIONAL FUNNEL PAGE RENDERING ================= */}

      {viewMode === 'upsell' && (
        <UpsellRFEF 
          onAccept={() => setViewMode('thankyou_accepted')}
          onDecline={() => setViewMode('thankyou_declined')}
        />
      )}

      {(viewMode === 'thankyou_accepted' || viewMode === 'thankyou_declined') && (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
          
          {/* Soccer field decoration overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"></div>

          <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 text-center space-y-8 text-slate-900">
            
            {/* Header Success Checkmark */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest block">
                {viewMode === 'thankyou_accepted' ? 'COMMANDE COMPLÈTE AVEC LE PACK ÉLITE !' : 'COMMANDE CONFIRMÉE AVEC SUCCÈS !'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Merci pour votre confiance !
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Vos accès et vos ressources numériques ont été envoyés directement sur votre adresse e-mail.
              </p>
            </div>

            {/* Order Summary receipt card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2.5 flex items-center justify-between">
                <span>Récapitulatif de votre commande</span>
                <span className="text-orange-600 font-mono text-[10px]">RÉF : ELITE-COACH-77</span>
              </p>
              <ul className="space-y-3 text-xs sm:text-sm">
                <li className="flex justify-between items-center text-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Programme d'Entraînement Principal</span>
                  </div>
                  <span className="font-bold font-mono text-slate-600 whitespace-nowrap">Confirmé</span>
                </li>

                {viewMode === 'thankyou_accepted' ? (
                  <li className="flex justify-between items-center text-amber-900 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-600 flex-shrink-0 animate-pulse" />
                      <span className="font-bold text-slate-900">Pack Entraîneur D'Élite</span>
                    </div>
                    <span className="font-black font-mono text-orange-600 whitespace-nowrap">9 €</span>
                  </li>
                ) : (
                  <li className="flex justify-between items-center text-slate-400 italic p-1 border-t border-slate-200 pt-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">✕</span>
                      <span>Pack Entraîneur D'Élite</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-slate-400">Non retenu</span>
                  </li>
                )}
              </ul>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-center font-bold text-slate-900 text-sm sm:text-base">
                <span>Statut de la commande :</span>
                <span className="font-mono text-emerald-600 text-sm sm:text-base whitespace-nowrap">
                  Paiement sécurisé et validé
                </span>
              </div>
            </div>

            {/* Downloads Block */}
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-orange-700 font-black uppercase tracking-wider bg-orange-50 py-2.5 px-4 rounded-xl border border-orange-200 inline-block">
                📥 ACCÈS ET TÉLÉCHARGEMENT IMMÉDIAT
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {viewMode === 'thankyou_accepted' && (
                  <button 
                    onClick={() => alert("Téléchargement du Pack Entraîneur D'Élite initié avec succès.")}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:brightness-110 text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg animate-pulse"
                  >
                    <Download className="h-4 w-4" />
                    <span>Télécharger le Pack Entraîneur D'Élite</span>
                  </button>
                )}
              </div>
            </div>

            {/* Back to main page indicator */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setViewMode('upsell')}
                className="text-xs text-slate-500 hover:text-slate-700 underline font-medium cursor-pointer transition-colors"
              >
                Retourner à la page d'offre
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}


