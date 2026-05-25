import React from 'react';

export default function CaseStudies({ caseStudiesData }) {
  const data = caseStudiesData;
  
  const caseStudies = [
    {
      badge:"Access to Branding & Market Positioning",
      title: "Living Sound Faith Tabernacle",
      body: "Delivered full digital brand activation including website development, merchandise production, ticketing systems, photography training, and large-scale event coordination supporting audiences exceeding 8,000 attendees.",
    },

    {
      badge: "Access to Business",
      title: "Perfect Petals Florals",
      body: "Supported formal business registration, banking setup, catalogue development, and client matching — helping transition the business into a more structured and commercially positioned operation.",
    },

    {
      badge: "International Access",
      title: "Shanghai Pufen Catering",
      body: "Facilitated international market access through stakeholder engagement, export roadmapping, licensing support, and strategic trade connections between South African and Chinese markets.",
    },
  ];

  return (
    <section id="cases" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">CASE STUDIES</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Real businesses. Structured growth. Market-ready outcomes.</h2>
          </div>
          <p className="max-w-xl text-white/65">
            From business formalisation to international trade facilitation, our work focuses on helping African businesses and creatives become visible, bankable, scalable, and globally connected.
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
