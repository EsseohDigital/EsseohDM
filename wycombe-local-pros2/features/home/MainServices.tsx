
import React from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { MAIN_SERVICES, getIconComponent } from '../../constants';
import { Button } from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MainServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    // Added pb-8 to reduce space before HowItWorks
    <SectionWrapper id="main-services" className="bg-white -mt-16 pt-0 pb-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MAIN_SERVICES.map((service) => {
          const Icon = getIconComponent(service.iconName);
          return (
            <div key={service.id} className="flex flex-col group">
              {/* Image Card - Clickable */}
              <div 
                className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-lg cursor-pointer bg-slate-100"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <img 
                  src={service.image} 
                  alt={`${service.title} services in High Wycombe`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="flex items-center gap-3 mb-3">
                <Icon className="h-6 w-6 text-brand-500" />
                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
              </div>
              
              <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>

              <Button 
                onClick={() => navigate(`/service/${service.id}`)}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-6 rounded-lg shadow-md group-hover:translate-x-1 transition-all"
              >
                Get Cost Estimate <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
