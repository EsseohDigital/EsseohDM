
import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, Search } from 'lucide-react';
import { ALL_SERVICES } from '../../constants';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (selectedService) {
      navigate(`/service/${selectedService}`);
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 min-h-[500px] flex items-center">
      {/* Map Background with Stronger Blue Overlay for Contrast */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79721.46513575647!2d-0.8170669287343697!3d51.628532431780825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487661b18366037b%3A0xe54625b55018a38!2sHigh%20Wycombe!5e0!3m2!1sen!2suk!4v1709230000000!5m2!1sen!2suk" 
          className="w-full h-full object-cover pointer-events-none opacity-50 grayscale contrast-125 scale-110" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          aria-hidden="true"
          title="Map of High Wycombe Background"
        ></iframe>
        
        {/* Darker Overlay: slightly more transparent than before (85 instead of 90) to let map show */}
        <div className="absolute inset-0 bg-blue-950/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-blue-950/80"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center w-full">
        
        {/* Trusted Badge - More Compact with Red Accent Shield */}
        <div className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold mb-6 backdrop-blur-md border border-white/20 shadow-sm animate-fade-in">
          <ShieldCheck className="h-3 w-3 text-accent-400" />
          <span>High Wycombe's Trusted Pro Network</span>
        </div>

        {/* Headlines - Tighter & Punchier */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
          Find Top Rated Local Pros <br className="hidden sm:block" /> in High Wycombe.
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-blue-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
          Enter your project details to get matched with vetted professionals near you.
        </p>

        {/* Compact Search Bar (HomeBuddy Style) */}
        <div className="max-w-xl mx-auto bg-white p-1.5 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-2 animate-fade-in transform transition-all hover:scale-[1.01]">
          <div className="relative flex-grow group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
             </div>
             <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border-none bg-transparent text-slate-800 font-semibold focus:ring-2 focus:ring-brand-500/20 cursor-pointer outline-none appearance-none text-sm sm:text-base truncate"
             >
                <option value="" disabled>What service do you need?</option>
                {ALL_SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
             </select>
             {/* Custom dropdown arrow */}
             <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
             </div>
          </div>
          
          <Button 
            onClick={handleNavigation}
            disabled={!selectedService}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold h-12 px-8 rounded-lg shadow-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base w-full sm:w-auto border-b-2 border-brand-800 active:border-b-0 active:translate-y-0.5"
          >
            Get Quotes
          </Button>
        </div>
        
        <p className="mt-4 text-[10px] text-blue-200 opacity-80 font-medium">
           Free, no-obligation estimates from local experts.
        </p>

      </div>
    </section>
  );
};
