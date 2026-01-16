
import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { ALL_SERVICES, getIconComponent } from '../../constants';
import { useNavigate } from 'react-router-dom';

export const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SectionWrapper id="services" bg="gray">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base font-semibold text-brand-600 uppercase tracking-wide">Our Expertise</h2>
        <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Complete Home Services
        </p>
        <p className="mt-4 text-lg text-slate-600">
          From emergency repairs to major renovations, our network of local professionals covers every trade you need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ALL_SERVICES.map((service) => {
          const Icon = getIconComponent(service.iconName);
          return (
            <div 
              key={service.id} 
              className="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/service/${service.id}`)}
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${service.popular ? 'bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-800 group-hover:text-white'}`}>
                <Icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              
              <p className="text-sm text-slate-500 mb-4 line-clamp-3">
                {service.description}
              </p>

              <div className="flex items-center text-sm font-medium text-brand-600 group-hover:underline">
                View Details &rarr;
              </div>

              {service.popular && (
                <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Popular
                </span>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
