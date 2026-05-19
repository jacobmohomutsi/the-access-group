import React from 'react';

const caseStudies = [
  {
    title: 'Perfect Petals Florals',
    category: 'Access to Business',
    impact: 'Business registration, bank account, catalogue design, and market research support.',
  },
  {
    title: 'Cheese Deep',
    category: 'Access for Creatives',
    impact: 'China tour management, brand support, album launch, and streaming positioning.',
  },
  {
    title: 'Eco-Break',
    category: 'Access Communication',
    impact: 'Email hosting, domain registration, and IT support for a more formal digital presence.',
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Case studies</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Real-world outcomes from practical support.</h2>
          </div>
          <p className="max-w-xl text-white/65">
            These cards can later be powered by WP posts or custom fields for each client, project type, and measurable outcome.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white">{item.category}</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">{item.impact}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
