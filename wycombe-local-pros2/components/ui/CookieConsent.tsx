
import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem('wycombe-pros-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('wycombe-pros-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] animate-fade-in md:left-auto md:right-4 md:max-w-md">
      <div className="bg-slate-900/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-700 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-slate-800 rounded-lg shrink-0">
            <Cookie className="h-6 w-6 text-brand-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-bold text-sm">We use cookies</h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              We use essential cookies to ensure our site works properly and to analyze traffic from High Wycombe residents. Read our <Link to="/privacy" className="text-white underline hover:text-brand-400 transition-colors">Privacy Policy</Link>.
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-white transition-colors -mt-1 -mr-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={handleAccept} 
            size="sm" 
            className="w-full bg-brand-600 hover:bg-brand-500 text-white border-none"
          >
            Accept All
          </Button>
          <Button 
            onClick={() => setIsVisible(false)} 
            variant="ghost" 
            size="sm" 
            className="w-full text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};
