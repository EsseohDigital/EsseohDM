import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { ClipboardList, UserSearch, PhoneCall } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    // Changed bg to gray to make white hover cards pop, reduced padding
    <SectionWrapper id="how-it-works" bg="gray" className="pt-8 pb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">How it Works</h2>
        <p className="text-slate-500 text-sm mt-2">Simple, secure, and local.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        
        {/* Step 1 */}
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-1 group cursor-default">
          <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <ClipboardList className="h-8 w-8 text-brand-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">1. Tell us what you need</h3>
          <p className="text-xs text-slate-500 max-w-[200px] text-center leading-relaxed">
            Answer a few quick questions about your project in High Wycombe.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-1 group cursor-default">
          <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <UserSearch className="h-8 w-8 text-brand-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">2. We find a Pro</h3>
          <p className="text-xs text-slate-500 max-w-[200px] text-center leading-relaxed">
            We match your details with a vetted, available local specialist.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-1 group cursor-default">
          <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <PhoneCall className="h-8 w-8 text-brand-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">3. They contact you</h3>
          <p className="text-xs text-slate-500 max-w-[200px] text-center leading-relaxed">
            The professional contacts you directly to discuss a quote. No spam.
          </p>
        </div>

      </div>
    </SectionWrapper>
  );
};