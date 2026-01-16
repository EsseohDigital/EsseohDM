
import React from 'react';
import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500">
            Effective Date: January 1, 2026 <br />
            Jurisdiction: United Kingdom (UK GDPR)
          </p>
        </div>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <p className="lead text-xl text-slate-700 font-medium">
            Wycombe Local Pros ("we", "us", or "our") is committed to protecting your privacy. This policy explains how we collect, use, and share your personal information when you use our website to request quotes from local tradespeople.
          </p>

          <div className="bg-blue-50 border-l-4 border-brand-500 p-6 my-8 not-prose rounded-r-xl">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-600" />
              Summary of our Service
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              We operate as a <strong>Lead Generation Service</strong>. When you submit a request form on our site, you are explicitly asking us to share your details with independent third-party contractors in High Wycombe so they can contact you with a quote.
            </p>
          </div>

          <h3>1. Information We Collect</h3>
          <p>We collect the following types of personal data when you use our Quote Request forms or Contact forms:</p>
          <ul className="marker:text-brand-500">
            <li><strong>Identity Data:</strong> First name and last name.</li>
            <li><strong>Contact Data:</strong> Email address, telephone number, and property address/postcode (essential for local service matching).</li>
            <li><strong>Project Data:</strong> Details about the service you require, urgency, and specific job descriptions.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and usage data collected via essential cookies to ensure site performance and security.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use your data strictly under the lawful bases of <strong>Contractual Necessity</strong> (to fulfill your request) and <strong>Legitimate Interests</strong> (to operate our business). Specifically, we use it to:</p>
          <ul>
            <li>Match your service request with suitable local professionals in our network.</li>
            <li>Transmit your Quote Request details to up to 3 vetted contractors.</li>
            <li>Communicate with you regarding the status of your request.</li>
            <li>Improve our website functionality and user experience.</li>
            <li>Comply with legal obligations and prevent fraud.</li>
          </ul>

          <h3>3. Sharing Your Information (Core Business Function)</h3>
          <p>
            <strong>By submitting a quote request, you consent to us sharing your personal data with third parties.</strong>
          </p>
          <p>We share your data with:</p>
          <ul>
            <li><strong>Service Providers (Contractors):</strong> We send your name, phone number, email, and job details to independent tradespeople (e.g., roofers, plumbers) within the High Wycombe area so they can contact you to provide the service you requested.</li>
            <li><strong>Technical Service Providers:</strong> We use trusted third-party vendors for website hosting (Netlify), form processing, and email delivery.</li>
          </ul>
          <p>We do <strong>not</strong> sell your data to marketing agencies or unrelated third parties.</p>

          <h3>4. Data Security</h3>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Our website uses SSL encryption (HTTPS) to ensure data transmitted between your browser and our servers is secure.
          </p>

          <h3>5. Data Retention</h3>
          <p>
            We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Typically, lead data is retained for 12 months for audit purposes before being anonymized or deleted.
          </p>

          <h3>6. Your Legal Rights</h3>
          <p>Under the UK General Data Protection Regulation (UK GDPR), you have the following rights:</p>
          <ul>
            <li><strong>Request access</strong> to your personal data.</li>
            <li><strong>Request correction</strong> of your personal data.</li>
            <li><strong>Request erasure</strong> of your personal data ("Right to be forgotten").</li>
            <li><strong>Object to processing</strong> of your personal data.</li>
            <li><strong>Request restriction</strong> of processing your personal data.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <a href="mailto:support@wycombelocalpros.co.uk" className="text-brand-600 font-bold hover:underline">support@wycombelocalpros.co.uk</a>.
          </p>

          <h3>7. Third-Party Links</h3>
          <p>
            Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>

          <h3>8. Contact Us</h3>
          <p>
            Wycombe Local Pros is the Data Controller for this website. If you have any questions about this privacy policy, please contact us:
          </p>
          <p className="font-medium text-slate-900">
            Email: <a href="mailto:support@wycombelocalpros.co.uk" className="text-brand-600 hover:underline">support@wycombelocalpros.co.uk</a><br />
            Location: High Wycombe, Buckinghamshire, UK.
          </p>
        </div>
      </div>
    </div>
  );
};
