import React from 'react';

const summitHighlights = [
  '15 October 2026 — Investment Dinner',
  '16 October 2026 — Import Export Access Summit',
  'Waiting list open for partners, delegates, and exhibitors',
];

export default function Summit() {
  return (
    <section id="summit" className="bg-[#F5F5F2] text-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Summit</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
              Import Export Access Summit 2026
            </h2>
            <p className="mt-5 text-lg leading-8 text-primary/80">
              Build momentum around your annual event with a section that supports both immediate lead capture and long-form storytelling.
            </p>

            <div className="mt-8 space-y-4">
              {summitHighlights.map((line) => (
                <div key={line} className="rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4">
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl shadow-black/10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Join the waiting list</p>
            <h3 className="mt-3 text-3xl font-bold">Be first in line for summit updates.</h3>
            <p className="mt-4 text-white/65">
              Use this form area for an email capture, partner expression of interest, or speaking / exhibition requests.
            </p>
            <div className="mt-6 space-y-4">
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35" placeholder="Full name" />
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35" placeholder="Email address" />
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35" placeholder="Company / Organisation" />
              <button className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95">
                Join the waiting list
              </button>
            </div>
            <a href="#" className="mt-4 inline-flex text-sm font-semibold text-white">
              Learn more about the summit →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
