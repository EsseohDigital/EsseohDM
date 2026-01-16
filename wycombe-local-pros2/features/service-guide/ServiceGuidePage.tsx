
import React from 'react';
import { ServicePageData } from '../../types';
import { CheckCircle2, Info, BarChart3, Check, Star } from 'lucide-react';
import { AccordionItem } from '../../components/ui/Accordion';
import { QuoteForm } from './QuoteForm';
import { ALL_SERVICES } from '../../constants';

interface Props {
  data: ServicePageData;
}

export const ServiceGuidePage: React.FC<Props> = ({ data }) => {
  // Find the specific image for this service to use as the background
  const serviceMetadata = ALL_SERVICES.find(s => s.id === data.id);
  // Fallback image if not found (though it should be)
  const bgImage = serviceMetadata?.image || 'https://images.unsplash.com/photo-1581578731117-104f2a41272c?auto=format&fit=crop&q=80';

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* React 19 Metadata Hoisting for SEO */}
      <title>{`${data.title} in High Wycombe | Prices & Vetted Pros`}</title>
      <meta name="description" content={`Find trusted ${data.title.toLowerCase()} in High Wycombe (HP10-HP15). Compare costs (${data.costRange}) and get free quotes from local experts.`} />
      
      {/* Contextual Hero Section */}
      <div className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden bg-slate-900">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt={`${data.title} services in High Wycombe`}
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            width="1200"
            height="800"
            // Priority loading for LCP since this is the main hero image
            fetchPriority="high" 
          />
          {/* Deep Slate Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
          
          {/* Subtle bottom fade to merge with the page content */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wide uppercase text-white mb-6 border border-white/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
            2026 Cost Guide Update
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            {data.heroTitle}
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-md mx-auto md:mx-0">
            Compare local estimates and find reliable, vetted professionals in High Wycombe.
          </p>

          {/* Mobile-only Trust Signal */}
          <div className="mt-6 md:hidden flex items-center justify-center gap-1 text-yellow-400">
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <Star className="w-4 h-4 fill-current" />
             <span className="text-white text-xs ml-2 font-medium">Trusted by locals</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Adjusted Grid: Content (7 cols) vs Form (5 cols) for better balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Content - Compacted */}
          {/* Added order-2 for mobile (so it comes second), lg:order-1 for desktop */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            
            {/* Cost Box */}
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-start gap-3 mb-4">
                <span className="bg-brand-100 text-brand-600 font-bold p-1.5 rounded-md text-lg">£</span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">How much does {data.title} cost?</h2>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-5 ml-11">
                Average market rates for HP10–HP15 postcodes.
              </p>

              <div className="mb-6 p-5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">ESTIMATED COST RANGE</p>
                <p className="text-4xl font-black text-slate-900 tracking-tight">{data.costRange}</p>
              </div>

              <p className="text-slate-700 mb-6 leading-relaxed">
                {data.costDescription}
              </p>

              {/* Factors */}
              <div className="bg-white rounded-xl p-0">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-brand-600" />
                  <span className="font-bold text-slate-900">Factors affecting your quote</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8">
                  {data.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                      <CheckCircle2 className="h-4 w-4 text-brand-500 shrink-0" />
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 flex gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <Info className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {data.infoBoxText}
                </p>
              </div>
            </div>

            {/* Why get a quote section */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 px-2">Why get a quote through us?</h2>
              
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md">
                <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
                  {data.promiseText}
                </p>

                <h3 className="font-bold text-slate-900 mb-4">The Wycombe Local Pros Promise</h3>
                <ul className="space-y-3">
                  {[
                    { label: 'Strictly Local', text: 'We only serve HP10-HP15 postcodes.' },
                    { label: 'Vetted Professionals', text: 'Insurance and trade checks passed.' },
                    { label: 'Fair Quotes', text: 'Compare up to 3 quotes obligation-free.' },
                    { label: 'Fast Response', text: 'Local partners ready to help quickly.' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm block md:inline md:mr-1">{item.label}:</span>
                        <span className="text-slate-600 text-sm">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 px-2">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {data.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} title={faq.question}>
                    {faq.answer}
                  </AccordionItem>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Form - Enhanced Size */}
          {/* Added order-1 for mobile (so it comes first), lg:order-2 for desktop */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <QuoteForm serviceName={data.title} serviceId={data.id} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
