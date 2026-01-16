import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AccordionItemProps } from '../../types';

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg mb-3 bg-white overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm md:text-base">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-brand-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>
      
      {/* Explicit height animation or just simple conditional rendering for React 19 simplicity */}
      {isOpen && (
        <div className="p-4 pt-0 text-sm text-slate-600 border-t border-transparent leading-relaxed animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};