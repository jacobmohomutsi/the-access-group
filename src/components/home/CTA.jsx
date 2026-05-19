import React from 'react';

export default function CTA() {
  return (
    <section id="cta" className="bg-white text-primary">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 rounded-[2rem] bg-primary/5 p-8 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/70">Call to action</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Let us build the structure behind your growth.</h2>
            <p className="mt-4 text-lg leading-8 text-primary/80">
              This CTA can drive consultation bookings, quote requests, or a WhatsApp / email action depending on the final conversion flow.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#products" className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 font-semibold text-white hover:opacity-95">
              View products
            </a>
            <a href="#summit" className="inline-flex items-center justify-center rounded-2xl border border-primary/15 bg-white px-6 py-4 font-semibold text-primary hover:bg-black/5">
              Join summit waiting list
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
