
import React, { useState } from 'react';
import { ContactForm } from '../contact/ContactForm';
import { ArrowLeft, Mail, Calculator, Handshake, MessageSquare, MailMinus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const SupportPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [unsubState, setUnsubState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setUnsubState('idle');
  };

  const handleUnsubscribeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUnsubState('submitting');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    const data = new URLSearchParams();
    data.append('form-name', 'contact');
    data.append('subject', 'Unsubscribe Request');
    data.append('email', email);
    // Add dummy fields to satisfy potentially required fields in main form handler/Netlify
    data.append('name', 'Unsubscribe User'); 
    data.append('message', 'User requested to unsubscribe via website form.');
    data.append('serviceType', 'other'); // Added for schema consistency with index.html

    try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data.toString(),
        });
        setUnsubState('success');
    } catch (err) {
        setUnsubState('error');
    }
  };

  const topics = [
    {
      id: 'unsubscribe',
      label: 'Unsubscribe',
      icon: MailMinus,
      action: () => handleTopicSelect('Unsubscribe Request')
    },
    {
      id: 'estimate',
      label: 'Cost Estimate',
      icon: Calculator,
      action: () => {
        // Redirect to home/quote flow
        navigate('/');
      }
    },
    {
      id: 'contractor',
      label: 'Contractor Inquiries',
      icon: Handshake,
      action: () => handleTopicSelect('Contractor Partnership')
    },
    {
      id: 'general',
      label: 'General Inquiry / Feedback',
      icon: MessageSquare,
      action: () => handleTopicSelect('General Inquiry')
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button 
          onClick={() => navigate('/')} 
          className="group flex items-center text-sm font-medium text-slate-500 hover:text-brand-600 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 p-8 md:p-12 text-center">
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Contact Wycombe Local Pros
          </h1>
          <p className="text-slate-500 mb-10 text-lg">
            Please select the subject we can help you with.
          </p>

          {/* Grid Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {topics.map((topic) => {
              const Icon = topic.icon;
              const isSelected = selectedTopic === topic.label || (topic.id === 'general' && selectedTopic === 'General Inquiry');
              
              return (
                <button
                  key={topic.id}
                  onClick={topic.action}
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200 h-40 group ${
                    isSelected 
                      ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-md transform scale-[1.02]' 
                      : 'border-slate-100 bg-white text-slate-600 hover:border-brand-200 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <div className={`mb-4 p-3 rounded-full transition-colors ${
                    isSelected ? 'bg-white' : 'bg-slate-50 group-hover:bg-brand-50'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'
                    }`} />
                  </div>
                  <span className={`font-bold text-sm leading-tight ${
                    isSelected ? 'text-brand-900' : 'text-slate-700'
                  }`}>
                    {topic.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Area */}
          <div className="min-h-[200px] transition-all duration-500">
            {selectedTopic === 'Unsubscribe Request' ? (
              // Simplified Unsubscribe Layout
              <div className="text-left animate-fade-in max-w-lg mx-auto bg-white p-2 md:p-6 rounded-2xl">
                 <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Unsubscribe</h2>
                    <p className="text-slate-500 text-sm">
                      Enter your email address below to unsubscribe from Wycombe Local Pros email communications.
                    </p>
                 </div>

                 {unsubState === 'success' ? (
                   <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center animate-fade-in">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">Unsubscribed</h3>
                      <p className="text-slate-600 text-sm mb-6">
                        You have been removed from our mailing list.
                      </p>
                      <Button onClick={() => setSelectedTopic(null)} variant="outline" size="sm">
                        Return to Support Options
                      </Button>
                   </div>
                 ) : (
                   <form onSubmit={handleUnsubscribeSubmit} className="space-y-6">
                      {unsubState === 'error' && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Something went wrong. Please try again.
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase ml-1">Subject</label>
                        <div className="w-full h-12 px-4 rounded-lg bg-brand-50/50 border border-slate-200 text-slate-900 font-medium flex items-center">
                          Unsubscribe
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase ml-1">Email address</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                        />
                      </div>

                      <div className="pt-2">
                         <Button 
                           type="submit" 
                           className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold h-12 rounded-lg"
                           isLoading={unsubState === 'submitting'}
                         >
                           Unsubscribe
                         </Button>
                         <button 
                           type="button"
                           onClick={() => setSelectedTopic(null)}
                           className="w-full mt-4 text-xs text-slate-400 hover:text-slate-600"
                         >
                           Cancel
                         </button>
                      </div>
                   </form>
                 )}
              </div>
            ) : selectedTopic ? (
              // Standard Layout for other topics
              <div className="text-left animate-fade-in max-w-2xl mx-auto bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                   <h3 className="text-xl font-bold text-slate-800">
                     {selectedTopic}
                   </h3>
                   <button 
                     onClick={() => setSelectedTopic(null)}
                     className="text-xs text-slate-400 hover:text-slate-600 underline"
                   >
                     Change Subject
                   </button>
                </div>
                <ContactForm variant="embedded" prefilledSubject={selectedTopic} />
              </div>
            ) : (
               <div className="py-8 text-slate-400 text-sm border-t border-slate-50 mt-8">
                  <p>Select an option above to proceed.</p>
               </div>
            )}
          </div>

          {/* Footer Area */}
          <div className="mt-12 pt-10 border-t border-slate-100">
            <p className="text-slate-600 mb-6 font-medium">
              Have a question about our service or need assistance? Our support team is here to help.
            </p>
            <a 
              href="mailto:support@wycombelocalpros.co.uk" 
              className="inline-flex items-center justify-center px-6 py-3 border border-slate-200 rounded-xl text-brand-600 font-bold hover:bg-slate-50 hover:border-brand-200 transition-all gap-2 group"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              support@wycombelocalpros.co.uk
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
