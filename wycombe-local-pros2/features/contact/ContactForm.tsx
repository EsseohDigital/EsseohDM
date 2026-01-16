
import React, { useState } from 'react';
import { SectionWrapper } from '../../components/ui/SectionWrapper';
import { Button } from '../../components/ui/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { ALL_SERVICES } from '../../constants';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trackEvent } from '../../utils/analytics';

interface ContactFormProps {
  variant?: 'default' | 'embedded';
  prefilledSubject?: string;
}

// 1. Define Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  serviceType: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  botField: z.string().optional(), // Honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC<ContactFormProps> = ({ variant = 'default', prefilledSubject = '' }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      serviceType: prefilledSubject ? "other" : "", // Note: prefilledSubject logic handled in onSubmit subject construction
      botField: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    
    // Honeypot check
    if (data.botField) return;

    // Construct subject
    const subject = prefilledSubject 
      ? `${prefilledSubject} from ${data.name}`
      : `New Website Inquiry from ${data.name}`;

    // Prepare URLSearchParams for Netlify
    const payload = new URLSearchParams();
    payload.append("form-name", "contact");
    payload.append("subject", subject);
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("serviceType", data.serviceType);
    payload.append("message", data.message);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (response.ok) {
        setSubmitted(true);
        trackEvent('form_submit', { form_name: 'contact_form', topic: data.serviceType });
        reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setSubmitError('Something went wrong. Please try again later.');
    }
  };

  if (submitted) {
    const SuccessMessage = (
      <div className={`text-center py-8 px-4 bg-green-50 rounded-3xl border border-green-100 ${variant === 'default' ? 'max-w-md mx-auto' : 'w-full'}`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-8">
          Thanks for contacting Wycombe Local Pros. One of our specialists will be in touch shortly.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Send Another Request
        </Button>
      </div>
    );

    if (variant === 'embedded') return SuccessMessage;

    return (
      <SectionWrapper id="contact" bg="white">
        {SuccessMessage}
      </SectionWrapper>
    );
  }

  const FormContent = (
    <form 
      name="contact"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 text-left"
      noValidate
    >
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot Field - Hidden from users */}
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human: <input {...register("botField")} />
        </label>
      </p>
      
      {submitError && (
        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
          <input 
            {...register("name")}
            id="name"
            type="text" 
            className={`w-full h-11 px-4 rounded-lg border ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-brand-500'} bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
          <input 
            {...register("email")}
            id="email"
            type="email" 
            className={`w-full h-11 px-4 rounded-lg border ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-brand-500'} bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="serviceType" className="text-sm font-medium text-slate-700">Topic / Service</label>
        <select 
          {...register("serviceType")}
          id="serviceType"
          className={`w-full h-11 px-4 rounded-lg border ${errors.serviceType ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-brand-500'} bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all`}
        >
          <option value="">Select a topic...</option>
          {ALL_SERVICES.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
          <option value="other">Other / General Inquiry</option>
          <option value="contractor">Contractor Partnership</option>
          <option value="billing">Billing / Admin</option>
        </select>
        {errors.serviceType && <p className="text-xs text-red-600">{errors.serviceType.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
        <textarea 
          {...register("message")}
          id="message"
          rows={4}
          className={`w-full p-4 rounded-lg border ${errors.message ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-brand-500'} bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none`}
          placeholder={prefilledSubject ? `Please provide details about your ${prefilledSubject.toLowerCase()}...` : "Describe what you need help with..."}
        ></textarea>
        {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg" 
        isLoading={isSubmitting}
      >
        {isSubmitting ? 'Sending Request...' : 'Submit Request'}
      </Button>
      
      <p className="text-xs text-center text-slate-400">
        By submitting this form, you agree to our <Link to="/terms" className="underline hover:text-brand-500 transition-colors">terms of service</Link>.
      </p>
    </form>
  );

  if (variant === 'embedded') {
    return FormContent;
  }

  return (
    <SectionWrapper id="contact" bg="brand">
      <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left: Info */}
        <div className="bg-slate-900 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get a Free Quote</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Tell us about your project and we'll connect you with the best local professionals for the job. No obligation, fast responses.
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-brand-500/20 p-2 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Verified Traders</h4>
                  <p className="text-sm text-slate-400">All pros are background checked.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-brand-500/20 p-2 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Fast Response</h4>
                  <p className="text-sm text-slate-400">Receive quotes within 24 hours.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800">
             <p className="text-slate-500 text-sm">Preferred by 500+ High Wycombe homeowners</p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="p-8 lg:p-12">
          {FormContent}
        </div>

      </div>
    </SectionWrapper>
  );
};
