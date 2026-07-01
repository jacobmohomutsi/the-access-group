"use client";

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Palette,
  Share2,
  PhoneCall,
  Briefcase,
  PenTool,
  Presentation,
  Globe,
  ArrowRight,
  Check,
  Info,
  ChevronLeft,
  CreditCard,
  X
} from 'lucide-react';
import { submitAccessBoxCheckout } from '@/lib/accessBoxCheckout';

const iconMap = {
  'building-2': Building2,
  'palette': Palette,
  'share-2': Share2,
  'phone-call': PhoneCall,
  'briefcase': Briefcase,
  'pen-tool': PenTool,
  'presentation': Presentation,
  'globe': Globe
};

export default function PackageDrawer({ isOpen, onClose, selectedProduct }) {
  const [activeView, setActiveView] = useState('tiers'); // 'tiers' | 'checkout'
  const [selectedTier, setSelectedTier] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Your Details, 2: Payment

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  // Lock body scroll and reset states when drawer is opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      setActiveView('tiers');
      setSelectedTier(null);
      setCheckoutStep(1);
      setStatus('idle');
      setErrorMessage('');
      setPaymentUrl('');

      const initialForm = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      };
      if (selectedProduct && selectedProduct.customFields) {
        selectedProduct.customFields.forEach(field => {
          initialForm[field.name] = '';
        });
      }
      setFormData(initialForm);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, selectedProduct]);

  if (!isOpen || !selectedProduct) return null;

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setCheckoutStep(1);
    setPaymentUrl('');
    setActiveView('checkout');
  };

  const handleBackToTiers = () => {
    setActiveView('tiers');
    setSelectedTier(null);
    setCheckoutStep(1);
    setPaymentUrl('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const paymentData = await submitAccessBoxCheckout({
        selectedProduct,
        selectedTier,
        formData,
      });

      setPaymentUrl(paymentData.url);
      setStatus('success');
      window.open(paymentData.url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Order checkout submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to connect to the server. Please check your network.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-[100] flex justify-end overflow-hidden">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />

        {/* Drawer Container */}
        <div className="relative w-full max-w-6xl h-full bg-[#F8F9FA] text-gray-900 shadow-2xl flex flex-col overflow-y-auto animate-slide-in-right z-10 p-6 pb-24 sm:p-12 sm:pb-32">

          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
            aria-label="Close drawer"
          >
            <X size={24} />
          </button>

          {/* VIEW A: Tiers Selection */}
          {activeView === 'tiers' && (
            <div className="min-h-full flex flex-col justify-start">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm text-[#304945] hover:text-[#C2A66B] mb-8 font-semibold transition-colors group self-start"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-4 pb-12">
                {/* Product Overview */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="bg-white border border-gray-100 p-4 rounded-3xl w-fit flex items-center justify-center text-[#304945] mb-6 shadow-sm">
                    {React.createElement(iconMap[selectedProduct.iconName] || Briefcase, { size: 36 })}
                  </div>

                  <h2 className="text-4xl font-extrabold text-[#304945] tracking-tight leading-none sm:text-5xl">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-6 text-base leading-relaxed text-gray-600">
                    {selectedProduct.fullDescription}
                  </p>

                  <div className="mt-8 p-6 bg-[#304945]/5 border border-[#304945]/10 rounded-3xl">
                    <div className="flex items-center gap-2.5 text-[#304945] font-bold text-xs uppercase tracking-wider mb-5">
                      <Info size={16} className="text-[#C2A66B]" /> How it works
                    </div>

                    <ol className="space-y-4 text-xs font-semibold text-gray-600">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#304945] text-white flex items-center justify-center text-[10px] font-bold">1</span>
                        <span>Choose your preferred tier</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#304945] text-white flex items-center justify-center text-[10px] font-bold">2</span>
                        <span>Complete payment safely via Yoco</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#304945] text-white flex items-center justify-center text-[10px] font-bold">3</span>
                        <span>Fill out your specific requirements</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#304945] text-white flex items-center justify-center text-[10px] font-bold">4</span>
                        <span>Our team begins work immediately</span>
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Tiers list selection */}
                <div className="lg:col-span-7">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C2A66B] block mb-2">Tier Options</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Select a tier</h3>

                  <div className="space-y-6">
                    {selectedProduct.tiers.map((tier, index) => {
                      const isRecommended = selectedProduct.tiers.length > 1 && index === selectedProduct.tiers.length - 1;

                      return (
                        <div
                          key={`${tier.name}-${index}`}
                          className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 ${isRecommended ? 'border-[#C2A66B]/50 ring-1 ring-[#C2A66B]/20' : 'border-gray-100'}`}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="text-xl font-bold text-[#304945]">{tier.name}</h4>
                              {isRecommended && (
                                <span className="bg-[#C2A66B] text-[#304945] text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md">
                                  RECOMMENDED
                                </span>
                              )}
                            </div>
                            <div className="text-2xl font-black text-gray-900 mt-1.5 mb-4">
                              {tier.priceDisplay}
                            </div>

                            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                              {tier.deliverables.map((deliv, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2.5">
                                  <span className="w-4 h-4 rounded-full bg-[#304945]/15 text-[#304945] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check size={10} strokeWidth={3} />
                                  </span>
                                  <span>{deliv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectTier(tier)}
                            className="bg-gray-950 text-white rounded-2xl px-6 py-3 font-semibold hover:bg-[#304945] hover:text-white transition-all flex-shrink-0 text-center w-full md:w-auto self-end md:self-center"
                          >
                            Get Access
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: Checkout form */}
          {activeView === 'checkout' && selectedTier && (
            <div className="min-h-full flex flex-col justify-start">
              <button
                onClick={handleBackToTiers}
                className="inline-flex items-center gap-2 text-sm text-[#304945] hover:text-[#C2A66B] mb-8 font-semibold transition-colors group self-start"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Tiers
              </button>

              <div className="max-w-md mx-auto mb-12 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2.5">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${checkoutStep === 1 ? 'bg-[#304945] border-[#304945] text-white scale-110 shadow-sm' : 'bg-white border-[#304945] text-[#304945]'}`}>1</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${checkoutStep === 1 ? 'text-gray-900' : 'text-gray-400'}`}>Your Details</span>
                </div>
                <div className={`w-16 h-0.5 transition-colors ${checkoutStep === 2 ? 'bg-[#304945]' : 'bg-gray-200'}`} />
                <div className="flex items-center gap-2.5">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${checkoutStep === 2 ? 'bg-[#304945] border-[#304945] text-white scale-110 shadow-sm' : 'bg-white border-gray-200 text-gray-400'}`}>2</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${checkoutStep === 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                  {checkoutStep === 1 && (
                    <form onSubmit={handleContinueToPayment} className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Client Information</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div>
                          <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleFormChange}
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none focus:border-[#304945] transition-all bg-slate-50/50"
                            placeholder="First Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleFormChange}
                            className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none focus:border-[#304945] transition-all bg-slate-50/50"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleFormChange}
                          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none focus:border-[#304945] transition-all bg-slate-50/50"
                          placeholder="email@example.com"
                        />
                      </div>

                      <div className="mb-5">
                        <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none focus:border-[#304945] transition-all bg-slate-50/50"
                          placeholder="e.g. +27 82 123 4567"
                        />
                      </div>

                      {selectedProduct.customFields && selectedProduct.customFields.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6">Box Requirements</h3>

                          <div className="space-y-5">
                            {selectedProduct.customFields.map((field) => (
                              <div key={field.name}>
                                <label htmlFor={field.name} className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                  {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                <input
                                  type={field.type || 'text'}
                                  id={field.name}
                                  name={field.name}
                                  required={field.required}
                                  value={formData[field.name] || ''}
                                  onChange={handleFormChange}
                                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-950 placeholder-gray-400 outline-none focus:border-[#304945] transition-all bg-slate-50/50"
                                  placeholder={`Enter ${field.label.toLowerCase()}`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-gray-950 text-white hover:bg-[#304945] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 mt-8 transition-colors text-sm"
                      >
                        Continue to Payment <ArrowRight size={16} />
                      </button>
                    </form>
                  )}

                  {checkoutStep === 2 && (
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
                      {status === 'success' ? (
                        <div className="py-6 animate-fade-up">
                          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <Check size={28} strokeWidth={2.5} />
                          </div>
                          <h3 className="text-3xl font-extrabold text-gray-900 mb-3">Order Captured!</h3>
                          <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                            Thank you! We've captured your details. A new tab has been launched for secure Yoco payment portal.
                          </p>

                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-8 text-left max-w-md mx-auto text-xs space-y-2.5 text-gray-600 font-medium">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">What's next?</p>
                            <p>1. Complete the payment on the Yoco portal.</p>
                            <p>2. We will automatically match the payment with your client details.</p>
                            <p>3. A consultant will email you within 24 hours to begin deliverables.</p>
                          </div>

                          <a
                            href={paymentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#304945] text-white hover:bg-[#C2A66B] hover:text-[#304945] font-extrabold py-4 px-8 rounded-2xl transition-all duration-300 shadow-md shadow-gray-200 mb-4 text-sm"
                          >
                            Launch Yoco Portal <ArrowRight size={16} />
                          </a>

                          <div className="mt-4">
                            <button
                              onClick={onClose}
                              className="text-xs text-gray-400 hover:text-[#304945] font-bold underline transition-colors"
                            >
                              Close Window
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-6">
                          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#304945]/5 text-[#304945] border border-[#304945]/10">
                            <CreditCard size={28} />
                          </div>
                          <h3 className="text-2xl font-bold text-[#304945] mb-2">Secure Yoco Payment</h3>
                          <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                            Pay safely and securely via Yoco. Once you click proceed, we'll save your contact requirements and redirect you to complete the payment of <strong className="text-gray-800">{selectedTier.priceDisplay}</strong>.
                          </p>

                          {status === 'error' && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold text-left max-w-sm mx-auto">
                              {errorMessage}
                            </div>
                          )}

                          <button
                            onClick={handlePayNow}
                            disabled={status === 'loading'}
                            className="w-full max-w-sm mx-auto bg-gray-950 text-white hover:bg-[#304945] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                          >
                            {status === 'loading' ? (
                              <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving Details...
                              </>
                            ) : (
                              <>
                                Proceed to Pay {selectedTier.priceDisplay} <ArrowRight size={16} />
                              </>
                            )}
                          </button>

                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={() => setCheckoutStep(1)}
                              disabled={status === 'loading'}
                              className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              Edit Client Details
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT PANEL: Order Summary Sticky Card */}
                <div className="lg:col-span-4">
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
                      Order Summary
                    </h3>

                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Selected Product</span>
                      <h4 className="text-lg font-bold text-[#304945] leading-tight mt-0.5">
                        {selectedProduct.name}
                      </h4>
                      <p className="text-xs font-semibold text-gray-500 mt-1">
                        {selectedTier.name}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-50 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">What's Included</span>
                      <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
                        {selectedTier.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className="text-gray-400 flex-shrink-0 mt-0.5">
                              <Check size={12} strokeWidth={2} />
                            </span>
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-100 pt-5 mt-5 flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-gray-500">Total Due</span>
                      <span className="text-2xl font-black text-[#304945]">{selectedTier.priceDisplay}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
