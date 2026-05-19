import React from 'react';

export default function About() {
  return (
    <section id="about" className="bg-[#F5F5F2] text-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">About</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
              African innovation, packaged for a global audience.
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary/80">
              The Access Group is an innovative digital business consultancy and strategic advisory firm. The brand is built around accessibility, compliance, and market activation — helping businesses move from informal activity into structured, bankable, and export-ready entities.
            </p>
            <p className="mt-4 text-lg leading-8 text-primary/80">
              Your CMS content can later plug directly into these sections, but this layout already mirrors the content hierarchy from the business profile and keeps the brand language consistent.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ['Digital Solutions & Transformation', 'Web, brand, and digital footprint support.'],
              ['Compliance & Formalisation', 'CIPC, SARS, BEE, and operational readiness.'],
              ['Global Market Access', 'Procurement, export, and partnership pathways.'],
              ['CAPAGILITY', 'Professional capability with digital agility.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl border border-primary/10 bg-primary/5 p-6">
                <p className="text-lg font-bold text-primary">{title}</p>
                <p className="mt-2 text-sm leading-6 text-primary/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
