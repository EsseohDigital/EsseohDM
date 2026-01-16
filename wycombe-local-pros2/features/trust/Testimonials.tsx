import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { TESTIMONIALS } from '../../constants';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    // Reduced top padding and removed mt-12 from text-center
    <SectionWrapper id="reviews" bg="white" className="pt-8 border-t border-slate-50">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900">What your neighbours are saying</h2>
        <p className="mt-2 text-xs text-slate-400">We've helped hundreds of homeowners in High Wycombe find trusted tradespeople.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div key={t.id} className="p-2 flex flex-col">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                />
              ))}
            </div>

            <p className="text-slate-500 text-xs italic leading-relaxed mb-6 font-light">
              "{t.text}"
            </p>

            <div className="mt-auto">
              <p className="font-bold text-slate-900 text-sm">{t.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};