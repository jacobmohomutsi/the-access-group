import React from 'react';

export default function CTA({ ctaData }) {
  const data = ctaData;

  return (
    <section id="cta" className="bg-white text-primary h-auto h-screen flex items-center flex-col justify-center">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 rounded-[2rem] bg-primary/5 p-8 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/70">PRODUCTISED SERVICES FOR GROWTH</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Your strategic gateway to market access.</h2>
            <p className="mt-4 text-lg leading-8 text-primary/80">
              The Access Group combines business formalisation, digital transformation, branding, compliance, and international market activation into scalable service pathways designed for African entrepreneurs, creatives, and growth-stage enterprises.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#products" className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 font-semibold text-white hover:opacity-95">
              {data.primaryButtonText}
            </a>
            <a href={data.secondaryButtonLink} className="inline-flex items-center justify-center rounded-2xl border border-primary/15 bg-white px-6 py-4 font-semibold text-primary hover:bg-black/5">
              {data.secondaryButtonText}
            </a>
          </div>
        </div>
      </div>
      <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
        <a
          href="#partnerships"
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
        >
          LinkedIn
        </a>
        <button
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
        >
          Instagram
        </button>
        <a
          href="#tickets"
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
        >
          Facebook
        </a>
      </div>
    </section>
  );
}
