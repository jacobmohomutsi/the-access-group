import React from 'react';

const products = [
  {
    name: 'Access to Business',
    price: 'From R650',
    description:
      'Business registration, compliance setup, tax readiness, bank account support, and a clear launch foundation.',
    bullets: ['CIPC registration', 'SARS tax setup', 'BEE support'],
  },
  {
    name: 'Access for Creatives',
    price: 'From R1,500',
    description:
      'For artists, creators, and cultural entrepreneurs who need structure, packaging, and booking readiness.',
    bullets: ['EPK creation', 'Booking agreements', 'Funding support'],
  },
  {
    name: 'Access Digital Media',
    price: 'From R3,000',
    description:
      'A digital footprint package built for discovery, visibility, and content-led growth.',
    bullets: ['Social setup', 'SEO basics', '3-month strategy'],
  },
  {
    name: 'Access to Market',
    price: 'From R6,500',
    description:
      'Built for supply chains, procurement databases, and commercial readiness to sell into larger ecosystems.',
    bullets: ['Procurement profiles', 'Barcode setup', 'Proudly SA affiliation'],
  },
];

export default function Products() {
  return (
    <section id="products" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Product</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Access Boxes designed to be easy to understand and easy to sell.</h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            Use this section as a CMS-driven product archive later. For now, the cards simulate the structure, pricing, and content blocks that can be mapped from WordPress.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((item) => (
            <article key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">{item.price}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/65">{item.description}</p>
              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <a href="#cta" className="mt-6 inline-flex text-sm font-semibold text-white hover:opacity-90">
                Request proposal →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
