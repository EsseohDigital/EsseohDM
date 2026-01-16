
import React from 'react';
import { ArrowLeft, AlertTriangle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsOfUse: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link 
          to="/"
          className="group flex items-center text-sm font-medium text-slate-500 hover:text-brand-600 mb-8 transition-colors inline-flex"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="border-b border-slate-100 pb-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Terms of Use</h1>
          <p className="text-slate-500">
            Last Updated: January 1, 2026 <br />
            Applicable Law: England & Wales
          </p>
        </div>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 not-prose rounded-r-xl">
             <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Important Disclaimer
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Wycombe Local Pros is a <strong>referral service</strong>. We are NOT a building contractor, cleaning company, or trade service provider. We do not perform any work at your property. We connect you with independent local professionals who perform the work.
            </p>
          </div>

          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using the Wycombe Local Pros website ("the Site"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this Site.
          </p>

          <h3>2. Description of Service</h3>
          <p>
            Wycombe Local Pros operates as an online marketplace/lead generation platform connecting homeowners in High Wycombe (the "User") with independent tradespeople and service providers (the "Contractor" or "Pro").
          </p>
          <p>
            When you submit a request for a quote, we act solely as an intermediary to transmit your details to third-party Contractors who may be able to fulfill your request.
          </p>

          <h3>3. Relationship Between Parties</h3>
          <ul className="marker:text-slate-400">
            <li><strong>No Contract for Work:</strong> Wycombe Local Pros is not a party to any agreement for work, services, or materials. Any contract for services is formed <strong>directly and exclusively between You and the Contractor</strong>.</li>
            <li><strong>No Agency:</strong> There is no partnership, joint venture, employee-employer, or franchiser-franchisee relationship between Wycombe Local Pros and any Contractor.</li>
            <li><strong>No Guarantee:</strong> While we endeavor to partner with reputable, vetted professionals, we do not guarantee the quality, safety, or legality of the work performed, nor the truth or accuracy of Contractor listings.</li>
          </ul>

          <h3>4. Limitation of Liability</h3>
          <p className="uppercase font-bold text-xs tracking-wider text-slate-400">Please read this section carefully</p>
          <p>
            To the fullest extent permitted by applicable law (England and Wales), Wycombe Local Pros shall not be liable for any:
          </p>
          <ul>
            <li>Indirect, incidental, special, consequential, or punitive damages.</li>
            <li>Damages resulting from the conduct of any Contractor, including but not limited to: poor workmanship, property damage, theft, delay, or failure to complete work.</li>
            <li>Personal injury or emotional distress arising from your interactions with Contractors.</li>
          </ul>
          <p>
            You agree that your sole remedy for any dispute regarding the services provided is directly with the Contractor who performed (or failed to perform) the work.
          </p>

          <h3>5. User Obligations</h3>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information in the Quote Request forms.</li>
            <li>Use the Site only for lawful purposes (i.e., genuine inquiries for home improvement services).</li>
            <li>Treat Contractors with respect and courtesy.</li>
          </ul>

          <h3>6. Intellectual Property</h3>
          <p>
            The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>

          <h3>7. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. You should review these Terms periodically. Your continued use of the Site after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h3>8. Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of <strong>England and Wales</strong>. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Questions regarding these Terms? Contact us at <a href="mailto:support@wycombelocalpros.co.uk" className="text-brand-600 underline">support@wycombelocalpros.co.uk</a>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
