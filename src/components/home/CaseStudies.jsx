import React from 'react';

export default function CaseStudies({ caseStudiesData }) {
  const data = caseStudiesData;

  const caseStudies = [
    {
      badge: data.card1Badge,
      title: data.card1Title,
      body: data.card1Body,
    },

    {
      badge: data.card2Badge,
      title: data.card2Title,
      body: data.card2Body,
    },

    {
      badge: data.card3Badge,
      title: data.card3Title,
      body: data.card3Body,
    },
  ];

  return (
    <section id="cases" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">{data.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{data.title}</h2>
          </div>
          <p className="max-w-xl text-white/65">
            {data.description}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white">{item.badge}</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/65">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
