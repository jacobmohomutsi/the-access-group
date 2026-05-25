"use client";

import React, { useState, useEffect } from "react";

export default function ProposalOffcanvas({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    bestTime: "",
    message: product ? `I'm interested in ${product}. ` : ""
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen && product) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message.startsWith(`I'm interested in ${product}`)
          ? prev.message
          : `I'm interested in ${product}. `
      }));
    }
    // eslint-disable-next-line
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      } else {
        setStatus("success");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Offcanvas Content */}
      <div className="relative w-full max-w-md h-full bg-primary text-white shadow-2xl shadow-black/40 rounded-l-3xl p-8 overflow-y-auto animate-slide-in-right">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors"
          aria-label="Close offcanvas"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {status === "success" ? (
          <div className="text-center py-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Request received!</h3>
            <p className="mt-2 text-white/70">We will contact you soon to discuss your proposal.</p>
            <button
              onClick={onClose}
              className="mt-8 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Request a Proposal</p>
            <h3 className="mt-3 text-3xl font-bold">Let's talk about your business needs</h3>
            <p className="mt-4 text-white/65">Fill in your details and we'll get in touch to discuss the best solution for you.</p>
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
                placeholder="Business / Organisation"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Phone number (optional)"
              />
              <select
                name="bestTime"
                value={formData.bestTime}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 text-white/80 placeholder:text-white/35 transition-colors"
                required
              >
                <option value="" disabled>Best time to chat</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Tell us more about your needs (optional)"
              />
              <div className="text-sm text-white/70">
                <div>Contact: <a href="mailto:info@theaccessgroup.co.za" className="underline hover:text-white">info@theaccessgroup.co.za</a></div>
                <div>Phone: <a href="tel:+27123456789" className="underline hover:text-white">+27 12 345 6789</a></div>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 disabled:opacity-70 transition-opacity flex justify-center items-center"
              >
                {status === "loading" ? (
                  <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Send request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
