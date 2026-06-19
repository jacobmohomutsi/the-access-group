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
    <div className="fixed inset-0 z-[999] flex items-end justify-center sm:items-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-primary border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">COOKIE POLICY</h2>
            <p className="text-sm text-white/70">
              How The Access Group uses cookies and tracking technologies
            </p>
          </div>
          <button 
            onClick={handleAcceptEssential} 
            className="text-white/50 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content area (scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar text-white/80 space-y-6">
          <p className="text-sm leading-relaxed">
            Cookies are small text files placed on your device when you visit www.theaccessgroup.co.za. They do not contain your payment details or ID number, and cannot execute programs. They allow the site to remember preferences, maintain your portal session, and collect anonymous analytics.
          </p>

          <div className="border border-white/10 rounded-xl overflow-hidden">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
              <span className="font-semibold text-white">Cookie Details & Preferences</span>
              {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {showDetails && (
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
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
                      <td className="p-4 whitespace-nowrap">Session</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Required for website and portal to operate — cannot be disabled. Includes session tokens and portal login state.</td>
                      <td className="p-4 text-center">
                        <input type="checkbox" checked disabled className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] opacity-50 cursor-not-allowed" />
                      </td>
                    </tr>
                    
                    {/* Analytics */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Google Analytics</td>
                      <td className="p-4 whitespace-nowrap">Up to 12 months</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Anonymised data: page views, session duration, bounce rate, traffic sources. No personally identifiable data.</td>
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer" 
                        />
                      </td>
                    </tr>

                    {/* Zoho SalesIQ */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Zoho SalesIQ</td>
                      <td className="p-4 whitespace-nowrap">Session / 30 days</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Live chat functionality and visitor behaviour. Anonymised unless visitor identifies themselves in chat.</td>
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={preferences.salesIq}
                          onChange={(e) => setPreferences({...preferences, salesIq: e.target.checked})}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer" 
                        />
                      </td>
                    </tr>

                    {/* Zoho Forms */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Zoho Forms</td>
                      <td className="p-4 whitespace-nowrap">Session</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Maintains form state during the order process. Cleared when browser session ends.</td>
                      <td className="p-4 text-center">
                        <input type="checkbox" checked disabled className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] opacity-50 cursor-not-allowed" />
                      </td>
                    </tr>

                    {/* Preference */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Preference</td>
                      <td className="p-4 whitespace-nowrap">Up to 12 months</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Remembers UI settings and language preferences.</td>
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={preferences.preference}
                          onChange={(e) => setPreferences({...preferences, preference: e.target.checked})}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer" 
                        />
                      </td>
                    </tr>

                    {/* Marketing */}
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white whitespace-nowrap">Marketing (optional)</td>
                      <td className="p-4 whitespace-nowrap">Up to 12 months</td>
                      <td className="p-4 text-xs leading-relaxed text-white/60">Active only with explicit consent. Used for retargeting and campaign measurement on social platforms.</td>
                      <td className="p-4 text-center">
                        <input 
                          type="checkbox" 
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                          className="w-4 h-4 rounded border-white/20 bg-primary accent-[#C2A66B] cursor-pointer" 
                        />
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="text-xs text-white/50 leading-relaxed">
            A cookie consent banner will appear on your first visit. You may accept all, accept essentials only, or customise. You may change preferences at any time via "Cookie Settings" in the website footer. Blocking essential cookies will prevent the portal login from functioning.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-end bg-black/20 rounded-b-2xl">
          {showDetails && (
            <button 
              onClick={handleSavePreferences}
              className="px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors w-full sm:w-auto"
            >
              Save Preferences
            </button>
          )}
          <button 
            onClick={handleAcceptEssential}
            className="px-6 py-3 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors w-full sm:w-auto"
          >
            Accept Essentials
          </button>
          <button 
            onClick={handleAcceptAll}
            className="px-6 py-3 text-sm font-bold text-primary bg-white hover:bg-white/90 rounded-xl transition-colors w-full sm:w-auto shadow-lg shadow-white/10"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}
