"use client";

import React, { useState } from "react";

const initialFormData = {
  fullName: "",
  email: "",
  contactDetails: "",
  portfolioLink: "",
  projectSummary: "",
  location: "",
};

export default function CareerApplicationModal({ isOpen, onClose, jobTitle }) {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData(initialFormData);
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const message = [
      `Role: ${jobTitle}`,
      `LinkedIn / Portfolio: ${formData.portfolioLink}`,
      `Location: ${formData.location}`,
      "",
      "Biggest project summary:",
      formData.projectSummary,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.contactDetails,
          company: `Career Application: ${jobTitle}`,
          source: "Career Application",
          message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] bg-primary p-8 text-white shadow-2xl shadow-black/40">
        <button
          onClick={handleClose}
          className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors"
          aria-label="Close modal"
          type="button"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold">Application received</h3>
            <p className="mt-2 text-white/70">Thanks for applying. Our team will review your details.</p>
            <button
              onClick={handleClose}
              className="mt-8 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 transition-opacity"
              type="button"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">Career Application</p>
            <h3 className="mt-3 pr-8 text-3xl font-bold">{jobTitle}</h3>
            <p className="mt-4 text-white/65">
              Share your details and a short project summary for this role.
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
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Contact details"
              />
              <input
                type="text"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="LinkedIn or portfolio link"
              />
              <textarea
                name="projectSummary"
                value={formData.projectSummary}
                onChange={handleChange}
                required
                rows={4}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="2-sentence summary of the biggest project you've successfully executed"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-white/30 placeholder:text-white/35 transition-colors"
                placeholder="Location"
              />

              {status === "error" && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 disabled:opacity-70 transition-opacity"
              >
                {status === "loading" ? "Submitting..." : "Submit application"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
