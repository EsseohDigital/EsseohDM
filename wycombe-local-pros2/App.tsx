
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './features/home/Hero';
import { MainServices } from './features/home/MainServices';
import { HowItWorks } from './features/home/HowItWorks';
import { Testimonials } from './features/trust/Testimonials';
import { OtherServices } from './features/services/OtherServices';
import { ServiceGuidePage } from './features/service-guide/ServiceGuidePage';
import { PrivacyPolicy } from './features/legal/PrivacyPolicy';
import { TermsOfUse } from './features/legal/TermsOfUse';
import { SupportPage } from './features/support/SupportPage';
import { CookieConsent } from './components/ui/CookieConsent';
import { SERVICE_GUIDE_DATA } from './constants';

// Component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Wrapper to extract ID from router params and pass data
const ServiceRouteWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const data = id ? SERVICE_GUIDE_DATA[id] : undefined;

  if (!data) {
    return (
      <div className="pt-32 text-center pb-32">
        <h1 className="text-2xl font-bold">Service Not Found</h1>
        <a href="/" className="text-brand-600 underline mt-4 inline-block">Go Home</a>
      </div>
    );
  }

  return <ServiceGuidePage data={data} />;
};

const HomePage: React.FC = () => (
  <>
    {/* React 19 Metadata Hoisting for Home Page */}
    <title>Wycombe Local Pros - Trusted Tradesmen in High Wycombe</title>
    <meta name="description" content="Find trusted local tradespeople in High Wycombe. Get free quotes from vetted professionals for roofing, plumbing, electrical, and cleaning services in HP postcodes." />
    
    <Hero />
    <MainServices />
    <OtherServices />
    <HowItWorks />
    <Testimonials />
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans bg-white">
        <ScrollToTop />
        <HeaderWrapper />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/contact" element={<SupportPage />} />
            <Route path="/service/:id" element={<ServiceRouteWrapper />} />
            {/* Catch all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
};

// Wrap Header to use location hook for transparency logic
const HeaderWrapper: React.FC = () => {
  const location = useLocation();
  // Pages that require a solid header (no transparent overlay)
  const isSolidHeader = ['/privacy', '/terms', '/contact'].includes(location.pathname);
  
  return <Header transparent={!isSolidHeader} />;
};

export default App;
