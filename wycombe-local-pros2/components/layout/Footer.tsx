
import React from 'react';
import { Star } from 'lucide-react';
import { ALL_SERVICES } from '../../constants';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  // Split services list into two halves for balanced columns
  const half = Math.ceil(ALL_SERVICES.length / 2);
  const servicesCol1 = ALL_SERVICES.slice(0, half);
  const servicesCol2 = ALL_SERVICES.slice(half);

  return (
    <footer className="font-sans">
      {/* Top Section: Trust Signals - Compacted */}
      <div className="bg-white py-4 text-center border-t border-slate-100">
        <div className="flex justify-center gap-1 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <p className="text-slate-900 font-medium text-[10px] sm:text-xs">
          Connecting HP10–HP15 Homeowners since 2023
        </p>
      </div>

      {/* Main Footer Content - Slimmer padding */}
      <div className="bg-slate-950 text-slate-400 py-8 px-4 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-white text-base font-bold mb-2">
                  Wycombe<span className="text-brand-400">LocalPros</span>
                </h3>
                <p className="text-[10px] leading-relaxed max-w-xs text-slate-400">
                  Connecting High Wycombe homeowners with vetted, exclusive local professionals.
                </p>
              </div>
              <p className="text-[10px] text-slate-600">
                Not a directory. Not a marketplace.
              </p>
            </div>

            {/* Column 2: Services Part 1 */}
            <div>
              <h3 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Services</h3>
              <ul className="space-y-2 text-xs">
                {servicesCol1.map((service) => (
                  <li key={service.id}>
                    <Link 
                      to={`/service/${service.id}`}
                      className="hover:text-white transition-colors block"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services Part 2 */}
            <div>
              {/* Header is hidden visually on desktop to align with column 2, but visible on mobile for structure */}
              <h3 className="text-white text-xs font-bold mb-3 uppercase tracking-wider lg:invisible">More Services</h3>
              <ul className="space-y-2 text-xs">
                {servicesCol2.map((service) => (
                  <li key={service.id}>
                    <Link 
                      to={`/service/${service.id}`}
                      className="hover:text-white transition-colors block"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal & Service Area Combined */}
            <div className="space-y-6">
              <div>
                <h3 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Legal & Support</h3>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link 
                      to="/privacy"
                      className="hover:text-white transition-colors block"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/terms"
                      className="hover:text-white transition-colors block"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact"
                      className="hover:text-white transition-colors block"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-xs font-bold mb-2 uppercase tracking-wider">Service Area</h3>
                <p className="text-white font-medium text-xs mb-1">High Wycombe</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  HP10 • HP11 • HP12<br />HP13 • HP14 • HP15
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-slate-900 text-center">
            <p className="text-[10px] text-slate-500 mb-2">
              &copy; {new Date().getFullYear()} Wycombe Local Pros. All rights reserved.
            </p>
            <p className="text-[10px] text-slate-600 max-w-2xl mx-auto">
              Disclaimer: We are a referral service. All work is performed by independent local contractors.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
