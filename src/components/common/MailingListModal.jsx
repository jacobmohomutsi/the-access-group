"use client";

import React, { useState } from 'react';

export default function MailingListModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      } else {
        setStatus('success');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg rounded-[2rem] bg-primary p-8 text-white shadow-2xl shadow-black/40">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">You&lsquo;re on the list!</h3>
            <p className="mt-2 text-white/70">We&lsquo;ll keep you updated on the latest news and announcements.</p>
            <button
              onClick={onClose}
              className="mt-8 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Join the waiting list</p>
            <h3 className="mt-3 text-3xl font-bold">Be first in line for summit updates.</h3>
            <p className="mt-4 text-white/65">
              Receive announcements, partnership opportunities, speaker releases, exhibition applications, and delegate registration updates for IEAS 2026.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Full name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Email address"
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Company / Organisation"
              />

              {status === 'error' && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 disabled:opacity-70 transition-opacity flex justify-center items-center"
              >
                {status === 'loading' ? (
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Join the waiting list'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
