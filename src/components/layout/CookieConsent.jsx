"use client";
import React, { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // always true
    analytics: false,
    salesIq: false,
    preference: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setIsOpen(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setIsOpen(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-primary border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-8 duration-500">
      <div className="max-w-8xl mx-auto w-full max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col p-4 md:p-6 gap-4">

        {/* Main Strip Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-2">Cookie Preferences</h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-4xl">
              We use cookies to ensure our website functions securely, remember your preferences, and provide anonymous analytics to improve your experience.
              You can choose to accept all cookies, or customize your preferences below. Blocking essential cookies will prevent our portal from functioning.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2"
            >
              {showDetails ? 'Hide Details' : 'Customise'}
              {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={handleAcceptEssential}
              className="px-5 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors whitespace-nowrap"
            >
              Accept Essentials
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2.5 text-sm font-bold text-primary bg-white hover:bg-white/90 rounded-xl transition-colors shadow-lg shadow-white/10 whitespace-nowrap"
            >
              Accept All
            </button>
            <button
              onClick={handleAcceptEssential}
              className="text-white/40 hover:text-white transition-colors p-2 ml-2 hidden sm:block"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Expandable Details Area */}
        {showDetails && (
          <div className="mt-4 border-t border-white/10 pt-6 animate-in fade-in duration-300">
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                  <thead className="bg-white/5 text-white text-xs uppercase">
                    <tr>
                      <th className="p-4 whitespace-nowrap">Cookie Type</th>
                      <th className="p-4 whitespace-nowrap">Duration</th>
                      <th className="p-4">Purpose</th>
                      <th className="p-4 text-center whitespace-nowrap">Enabled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {/* Essential */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Essential / Functional</td>
                      <td className="p-4 text-white/70 whitespace-nowrap">Session</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Required for website and portal to operate — cannot be disabled. Includes session tokens and portal login state.</td>
                      <td className="p-4 text-center">
                        <input type="checkbox" checked disabled className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] opacity-50 cursor-not-allowed" />
                      </td>
                    </tr>

                    {/* Analytics */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Google Analytics</td>
                      <td className="p-4 text-white/70 whitespace-nowrap">Up to 12 months</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Anonymised data: page views, session duration, bounce rate, traffic sources. No personally identifiable data.</td>
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer"
                        />
                      </td>
                    </tr>

                    {/* Zoho SalesIQ */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Zoho SalesIQ</td>
                      <td className="p-4 text-white/70 whitespace-nowrap">Session / 30 days</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Live chat functionality and visitor behaviour. Anonymised unless visitor identifies themselves in chat.</td>
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={preferences.salesIq}
                          onChange={(e) => setPreferences({ ...preferences, salesIq: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer"
                        />
                      </td>
                    </tr>

                    {/* Zoho Forms */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Zoho Forms</td>
                      <td className="p-4 text-white/70 whitespace-nowrap">Session</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Maintains form state during the order process. Cleared when browser session ends.</td>
                      <td className="p-4 text-center">
                        <input type="checkbox" checked disabled className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] opacity-50 cursor-not-allowed" />
                      </td>
                    </tr>

                    {/* Preference */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Preference</td>
                      <td className="p-4 text-white/70 whitespace-nowrap">Up to 12 months</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Remembers UI settings and language preferences.</td>
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={preferences.preference}
                          onChange={(e) => setPreferences({ ...preferences, preference: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer"
                        />
                      </td>
                    </tr>

                    {/* Marketing */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Marketing (optional)</td>
                      <td className="p-4 text-white/70 whitespace-nowrap">Up to 12 months</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Active only with explicit consent. Used for retargeting and campaign measurement on social platforms.</td>
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2.5 text-sm font-bold text-white bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
