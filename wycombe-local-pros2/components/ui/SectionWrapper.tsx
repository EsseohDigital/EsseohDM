import React from 'react';
import { SectionProps } from '../../types';

export const SectionWrapper: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id, 
  bg = 'white' 
}) => {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    brand: 'bg-brand-600',
  };

  // Reduced py-16 md:py-24 to py-12 md:py-16 for a tighter layout
  return (
    <section id={id} className={`py-12 md:py-16 ${bgStyles[bg]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};