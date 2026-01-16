
import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Lock, Info, CheckCircle2, Clock, ChevronDown, AlertCircle } from 'lucide-react';
import { SERVICE_SUBTYPES } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trackEvent } from '../../utils/analytics';

interface Props {
  serviceName: string;
  serviceId: string;
}

// Validation Regex
const postcodeRegex = /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i;
const hpPostcodeRegex = /^HP/i;
const phoneRegex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;

// Zod Schema
const quoteSchema = z.object({
  postcode: z.string()
    .min(1, "Postcode is required")
    .regex(postcodeRegex, "Invalid UK Postcode format")
    .regex(hpPostcodeRegex, "We currently only serve HP postcodes"),
  serviceType: z.string().min(1, "Please select a service type"),
  urgency: z.enum(['As soon as possible', 'Within 1 week', 'Within 1 month', 'Flexible']),
  description: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid UK phone number"),
  botField: z.string().optional()
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export const QuoteForm: React.FC<Props> = ({ serviceName, serviceId }) => {
  const [step, setStep] = useState(1);
  const [isSimulatingCheck, setIsSimulatingCheck] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  const availableSubtypes = SERVICE_SUBTYPES[serviceId] || [];

  const {
    register,
    trigger,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      urgency: 'As soon as possible',
      postcode: '',
      description: '',
      serviceType: '',
      botField: ''
    }
  });

  const formData = watch();

  const handleNextStep = async (nextStep: number) => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger('postcode');
      if (isValid) {
        setIsSimulatingCheck(true);
        setTimeout(() => {
          setIsSimulatingCheck(false);
          setStep(nextStep);
        }, 800);
      }
    } else if (step === 2) {
      // If service subtypes exist, validate serviceType
      if (availableSubtypes.length > 0) {
        isValid = await trigger(['serviceType', 'urgency', 'description']);
      } else {
         // If no subtypes, just force serviceType to generic and validate rest
         setValue('serviceType', `General ${serviceName}`);
         isValid = await trigger(['urgency', 'description']);
      }
      if (isValid) setStep(nextStep);
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitError(null);
    if (data.botField) return;

    const payload = new URLSearchParams();
    payload.append("form-name", "quote-request");
    payload.append("subject", `Quote Request for ${serviceName} in ${data.postcode}`);
    payload.append("postcode", data.postcode);
    payload.append("serviceType", data.serviceType);
    payload.append("urgency", data.urgency);
    payload.append("description", data.description || "");
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("phone", data.phone);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (response.ok) {
        setStep(4);
        trackEvent('quote_request', { 
            service: serviceName, 
            postcode: data.postcode 
        });
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch (err) {
      setSubmitError("Network error. Please try again.");
    }
  };

  const getPlaceholder = (service: string) => {
    const s = service.toLowerCase();
    if (s.includes('roof')) return "E.g., Replacing 5 tiles on a pitched roof...";
    if (s.includes('plumb')) return "E.g., Leaking tap in kitchen...";
    if (s.includes('electric')) return "E.g., Install new sockets in living room...";
    if (s.includes('clean') && !s.includes('window')) return "E.g., Weekly clean for 3 bed house...";
    if (s.includes('garden')) return "E.g., Lawn mowing and hedge trimming...";
    if (s.includes('window')) return "E.g., External clean for semi-detached...";
    return "Describe your project...";
  };

  // --- SUCCESS STATE ---
  if (step === 4) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl shadow-brand-900/10 overflow-hidden border border-slate-100 p-8 text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-6">
          We've matched your request with 3 vetted {serviceName} pros in <strong>{getValues('postcode').toUpperCase()}</strong>.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
          <p className="text-sm text-slate-500">They will contact you shortly via email or phone to provide your free quote.</p>
        </div>
        <Button onClick={() => navigate('/')} variant="outline" className="w-full">
          Return to Home
        </Button>
      </div>
    );
  }

  // --- FORM STEPS ---
  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-brand-900/10 overflow-hidden border border-slate-100 transform transition-all hover:shadow-brand-900/20">
      
      {/* Progress Bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-4 px-6">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Get your accurate price today
          </p>
          <div className="flex gap-1">
            <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 1 ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 2 ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
            <div className={`h-1.5 w-6 rounded-full transition-colors ${step >= 3 ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            {step === 1 && `Get a Quote for ${serviceName}`}
            {step === 2 && `Get a Quote for ${serviceName}`}
            {step === 3 && 'Contact Information'}
          </h3>
          <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded border border-blue-100">
            Step {step} of 3
          </span>
        </div>

        {/* STEP 1: POSTCODE */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Enter your Postcode</label>
              <input 
                {...register('postcode')}
                placeholder="E.G. HP11 2DA" 
                className={`w-full px-5 py-4 text-lg rounded-xl border ${errors.postcode ? 'border-red-300 bg-red-50 focus:ring-red-200' : 'border-slate-300 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500'} focus:ring-2 outline-none transition-all placeholder:text-slate-400 font-medium shadow-sm uppercase bg-slate-50 text-slate-900`}
                autoFocus
              />
              {errors.postcode ? (
                <p className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1">
                  <Info className="h-3 w-3" /> {errors.postcode.message}
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  We only serve High Wycombe (HP10-HP15).
                </p>
              )}
            </div>

            <Button 
              onClick={() => handleNextStep(2)}
              className="w-full text-lg font-bold shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 py-4 rounded-xl transform hover:-translate-y-0.5 transition-all bg-brand-600 hover:bg-brand-700" 
              size="lg"
              isLoading={isSimulatingCheck}
            >
              Check Availability <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 2: DETAILS */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            
            {availableSubtypes.length > 0 && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{serviceName} Requirements</label>
                <div className="relative">
                  <select
                    {...register('serviceType')}
                    className={`w-full px-4 py-3 text-base rounded-xl border ${errors.serviceType ? 'border-red-300' : 'border-slate-300'} bg-white text-slate-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all appearance-none cursor-pointer`}
                  >
                    <option value="">Select Service Type...</option>
                    {availableSubtypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
                {errors.serviceType && <p className="text-xs text-red-600 mt-2">{errors.serviceType.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">When do you need this done?</label>
              <div className="grid grid-cols-1 gap-3">
                {['As soon as possible', 'Within 1 week', 'Within 1 month', 'Flexible'].map((opt) => (
                  <label key={opt} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.urgency === opt ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input 
                      {...register('urgency')}
                      type="radio" 
                      value={opt}
                      className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                    />
                    <span className="ml-3 text-sm font-medium text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Brief Description (Optional)</label>
              <textarea 
                {...register('description')}
                placeholder={getPlaceholder(serviceName)}
                className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-slate-400 resize-none h-24"
              />
            </div>

            <Button onClick={() => handleNextStep(3)} className="w-full text-lg font-bold py-4 rounded-xl bg-brand-600 hover:bg-brand-700" size="lg">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-xs text-slate-400 font-medium hover:text-slate-600 mt-2">
              Back to step 1
            </button>
          </div>
        )}

        {/* STEP 3: CONTACT */}
        {step === 3 && (
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-4 animate-fade-in"
            noValidate
          >
            <input type="hidden" name="form-name" value="quote-request" />
            {/* Honeypot */}
            <p className="hidden">
              <label>Don’t fill this out if you’re human: <input {...register('botField')} /></label>
            </p>

            <div className="bg-blue-50 p-4 rounded-lg flex gap-3 mb-2">
              <Clock className="h-5 w-5 text-blue-600 shrink-0" />
              <p className="text-xs text-blue-900 leading-tight">
                <strong>Great news!</strong> We have 3 {serviceName} pros available in {formData.postcode} who can help {formData.urgency?.toLowerCase()}.
              </p>
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="h-3 w-3" />
                {submitError}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
              <input 
                {...register('name')}
                type="text" 
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-brand-500 outline-none bg-white text-slate-900`}
                placeholder="John Smith"
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
              <input 
                {...register('email')}
                type="email" 
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-brand-500 outline-none bg-white text-slate-900`}
                placeholder="john@example.com"
              />
               {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
              <input 
                {...register('phone')}
                type="tel" 
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-300' : 'border-slate-300'} focus:ring-2 focus:ring-brand-500 outline-none bg-white text-slate-900`}
                placeholder="07700 900000"
              />
               {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg font-bold shadow-xl shadow-brand-500/20 py-4 rounded-xl mt-4 bg-brand-600 hover:bg-brand-700" 
              size="lg"
              isLoading={isSubmitting}
            >
              Get My Free Quotes
            </Button>
            <button type="button" onClick={() => setStep(2)} className="w-full text-xs text-slate-400 font-medium hover:text-slate-600 mt-2">
              Back to details
            </button>
          </form>
        )}

        {/* Footer Trust Signals */}
        {step < 4 && (
          <div className="mt-8 text-center pt-6 border-t border-slate-50">
             <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                <Lock className="h-3 w-3" />
                <span className="text-[10px] font-medium">SSL Secured & GDPR Compliant</span>
             </div>
             <p className="text-[10px] text-slate-400">
               Your data is safe with us. Read our <a href="#/privacy" className="underline hover:text-brand-500 transition-colors">Privacy Policy</a>.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
