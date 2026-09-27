import React, { useState, useEffect } from 'react';
import { Smartphone, Download, HardDrive, CheckCircle2, ArrowRight, X, Sparkles, Monitor, Share2, Rocket } from 'lucide-react';

export const InstallPWABanner = ({ onNavigateToOffline }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(window.deferredPWAInstallPrompt || null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.deferredPWAInstallPrompt = e;
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.deferredPWAInstallPrompt = null;
      setShowModal(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.deferredPWAInstallPrompt;

    if (promptEvent) {
      try {
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        window.deferredPWAInstallPrompt = null;
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    }

    setShowModal(true);
  };

  return (
    <>
      {/* PWA Banner Card */}
      <div className="bg-white border border-[#E5E2DA] rounded-3xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF0ED] rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4 max-w-2xl relative z-10">
          <div className="p-3 bg-[#FFF0ED] border border-[#F95738]/30 rounded-2xl text-[#F95738] shadow-xs shrink-0">
            <Smartphone className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#FFF0ED] text-[#F95738] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#F95738]/20">
                Offline PWA App Ready
              </span>
              {isInstalled && (
                <span className="bg-[#EEFDFB] text-[#0D9488] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#0D9488]/20">
                  <CheckCircle2 className="w-3 h-3" /> App Installed
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1E2229]">
              Add Offline Orbit to Home Screen
            </h3>
            
            <p className="text-xs text-[#5A606C] mt-1.5 leading-relaxed">
              Install Offline Orbit as a standalone app. Launch directly from your home screen or desktop to study downloaded lessons, flashcards, and quizzes offline!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={handleInstallClick}
            className="btn-coral text-xs py-3 px-6 shadow-sm hover:scale-105 transition-transform flex items-center gap-2 font-bold"
          >
            <Smartphone className="w-4 h-4" />
            <span>Add to Home Screen</span>
          </button>

          <button
            onClick={onNavigateToOffline}
            className="btn-outline text-xs py-3 px-5 bg-[#FAF9F6] border-[#E5E2DA] text-[#1E2229] hover:bg-[#F3F1EC] transition-colors flex items-center gap-2 font-bold"
          >
            <HardDrive className="w-4 h-4 text-[#0D9488]" />
            <span>Browse Offline Contents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dedicated PWA App Installation & Success Screen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#1E2229]/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center space-y-5 animate-in fade-in zoom-in duration-200">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-[#89909E] hover:text-[#1E2229] rounded-xl hover:bg-[#FAF9F6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Icon */}
            <div className="w-16 h-16 bg-gradient-to-tr from-[#F95738] to-[#E04728] text-white rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg">
              🪐
            </div>

            <div>
              <span className="bg-[#EEFDFB] text-[#0D9488] border border-[#0D9488]/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> PWA Standalone App
              </span>
              <h3 className="text-2xl font-extrabold text-[#1E2229] tracking-tight">
                Add Offline Orbit App
              </h3>
              <p className="text-xs text-[#5A606C] mt-2 leading-relaxed">
                Add Offline Orbit directly to your Home Screen or Desktop for fast 1-click access to all your offline lessons and practice quizzes.
              </p>
            </div>

            {/* Browser Guide Cards */}
            <div className="space-y-2.5 text-left text-xs">
              <div className="p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-[#FFF0ED] text-[#F95738] rounded-xl shrink-0">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1E2229]">Chrome / Edge (Desktop):</strong>
                  <span className="text-[#5A606C]">Click the <strong>⊕ (Install App)</strong> icon in your address bar or press <strong>Ctrl + D</strong> to bookmark.</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-2xl flex items-start gap-3">
                <div className="p-2 bg-[#EEFDFB] text-[#0D9488] rounded-xl shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#1E2229]">Mobile (Android / iPhone):</strong>
                  <span className="text-[#5A606C]">Tap browser menu <strong>⋮</strong> or Share <strong>⎋</strong> → Select <strong>"Add to Home Screen"</strong>.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full btn-coral py-3.5 text-xs shadow-md justify-center font-bold flex items-center gap-2"
              >
                <span>Close</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};



