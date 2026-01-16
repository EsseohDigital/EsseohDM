
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Menu, X, ChevronRight, Phone, FileText, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_SERVICES } from '../../constants';

interface HeaderProps {
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure header is solid when menu is open so controls are visible
  const isTransparentState = transparent && !isScrolled && !isMenuOpen;

  const closeMenu = () => setIsMenuOpen(false);

  const MenuButton = () => (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className={`p-2 rounded-lg transition-colors relative z-50 ${
         isTransparentState ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100'
      }`}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <Menu className="h-6 w-6" />
      )}
    </button>
  );

  return (
    <>
      {/* Click-away backdrop (only visible when menu is open) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isTransparentState 
            ? 'bg-white/0 border-slate-100/0 py-6 shadow-none' 
            : 'bg-white border-slate-100 py-3 shadow-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center relative z-50">
              <Link 
                to="/"
                onClick={closeMenu}
                className={`text-2xl font-bold tracking-tight hover:opacity-90 transition-colors duration-300 no-underline ${isTransparentState ? 'text-white' : 'text-slate-900'}`}
                aria-label="Go to Home"
              >
                Wycombe<span className={`transition-colors duration-300 ${isTransparentState ? 'text-white' : 'text-brand-600'}`}>LocalPros</span>
              </Link>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex flex-col items-end text-xs sm:text-sm transition-colors duration-300">
                <span className={`transition-colors duration-300 ${isTransparentState ? 'text-white/90' : 'text-slate-500'}`}>Questions?</span>
                <Link 
                  to="/contact"
                  className={`font-medium hover:text-brand-500 transition-colors duration-300 ${isTransparentState ? 'text-white' : 'text-slate-900'}`}
                >
                  Contact Support
                </Link>
              </div>
              
              {/* Menu Trigger */}
              <div className="ml-2">
                <MenuButton />
              </div>
            </div>

            {/* Mobile Right Side */}
            <div className="flex items-center gap-3 md:hidden">
              <MenuButton />
            </div>
          </div>

          {/* Slim Dropdown Menu */}
          <div 
            className={`absolute top-full right-4 mt-2 w-80 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 border border-slate-100 overflow-hidden origin-top-right transition-all duration-200 ease-out z-50 ${
              isMenuOpen 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            {/* Scrollable Content Area */}
            <div className="max-h-[80vh] overflow-y-auto">
              
              {/* Services Section */}
              <div className="p-4 border-b border-slate-100">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  Our Services
                </h3>
                <div className="space-y-1">
                  {ALL_SERVICES.map(service => (
                    <Link
                      key={service.id}
                      to={`/service/${service.id}`}
                      onClick={closeMenu}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-slate-50 transition-colors group text-left"
                    >
                      <span className="font-medium text-slate-700 group-hover:text-brand-600 text-sm">{service.title}</span>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support Section */}
              <div className="p-4 bg-slate-50/50">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  Support
                </h3>
                <div className="space-y-1">
                   <Link 
                     to="/contact"
                     onClick={closeMenu}
                     className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-left"
                   >
                     <div className="p-1.5 bg-blue-100 text-blue-600 rounded-md">
                        <Phone className="h-4 w-4" />
                     </div>
                     <span className="text-sm font-medium text-slate-700">Contact Us</span>
                   </Link>

                   <Link 
                     to="/terms"
                     onClick={closeMenu}
                     className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-left"
                   >
                     <div className="p-1.5 bg-slate-200 text-slate-600 rounded-md">
                        <FileText className="h-4 w-4" />
                     </div>
                     <span className="text-sm font-medium text-slate-700">Terms of Use</span>
                   </Link>
                   
                   <Link 
                     to="/privacy"
                     onClick={closeMenu}
                     className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-left"
                   >
                     <div className="p-1.5 bg-slate-200 text-slate-600 rounded-md">
                        <Shield className="h-4 w-4" />
                     </div>
                     <span className="text-sm font-medium text-slate-700">Privacy Policy</span>
                   </Link>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 border-t border-slate-100 bg-white">
                 <Link to="/" onClick={closeMenu}>
                   <Button className="w-full justify-center text-sm" size="md">
                     Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                   </Button>
                 </Link>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
};
