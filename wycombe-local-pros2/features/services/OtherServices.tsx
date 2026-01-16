
import React from 'react';
import { OTHER_SERVICES, getIconComponent } from '../../constants';
import { Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OtherServices: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            More Home Projects
          </h2>
          <div className="w-20 h-1.5 bg-brand-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Select a project category below to get matched with vetted local professionals in High Wycombe.
          </p>
        </div>

        {/* Dense Icon Grid: 2 col mobile, 3 col tablet, 4 col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {OTHER_SERVICES.map((service) => {
            const Icon = getIconComponent(service.iconName);
            // Highlight Locksmith and Builders as popular in this secondary list
            const isPopular = service.id === 'locksmith' || service.id === 'builders';

            return (
              <Link
                key={service.id} 
                to={`/service/${service.id}`}
                className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 cursor-pointer text-center no-underline
                  ${isPopular 
                    ? 'bg-red-50/50 border-red-100' 
                    : 'bg-white border-slate-100'
                  }
                  /* Pastel Brand Teal Glow */
                  hover:shadow-[0_0_25px_rgba(94,234,212,0.6)] hover:border-brand-300 hover:-translate-y-1
                `}
              >
                {/* Popular Tag */}
                {isPopular && (
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 animate-fade-in z-10">
                    <span className="flex items-center gap-1 bg-white border border-red-200 text-red-600 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      <Star className="w-3 h-3 fill-red-600 text-red-600" />
                      Popular
                    </span>
                  </div>
                )}

                {/* Stylized Icon Wrapper */}
                <div className="relative mb-6">
                  {/* Decorative Sparkles (Brand Pastel on hover) */}
                  <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 text-brand-400 fill-brand-400" />
                  </div>
                  <div className="absolute -bottom-1 -left-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="h-2 w-2 rounded-full bg-brand-400"></div>
                  </div>
                  
                  {/* Main Icon */}
                  <div className={`p-4 rounded-2xl transition-all duration-300 group-hover:bg-white group-hover:text-brand-600 group-hover:shadow-md
                    ${isPopular ? 'bg-white text-red-500 shadow-sm' : 'bg-blue-50 text-primary-blue'}
                  `}>
                    <Icon strokeWidth={1.5} className="h-10 w-10 md:h-12 md:w-12 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-slate-700 group-hover:text-brand-700 transition-colors">
                  {service.title}
                </h3>
                
                {/* Subtext */}
                <p className="mt-2 text-[10px] md:text-xs text-brand-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Get Quotes &rarr;
                </p>

                {/* Subtle bottom border highlight on hover (Brand) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-400 rounded-t-full transition-all duration-300 group-hover:w-1/2"></div>
              </Link>
            );
          })}
        </div>
        
        {/* Trust Note */}
        <div className="mt-20 flex flex-col items-center">
           <div className="px-6 py-3 bg-slate-50 rounded-full border border-slate-100 flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-brand-500"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Trusted by 5,000+ Wycombe Residents
              </span>
           </div>
        </div>
      </div>
    </section>
  );
};
