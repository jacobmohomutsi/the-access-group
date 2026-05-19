import React from 'react';

const partners = [
  'CIPC Ready',
  'SARS Compliant',
  'BEE Support',
  'Google Business',
  'Trade Access',
  'Brand Identity',
  'Media Strategy',
  'Procurement Prep',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-primary">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute right-[-6rem] top-36 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            Productized services for growth
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your Strategic Gateway to{' '}
            <span className="text-white">Market Access</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            PhD-led strategy, compliance, brand architecture, and market-entry support — packaged into fixed-cost access boxes for high-growth SMEs, creative businesses, and community-led organisations.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#products" className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-primary shadow-lg shadow-white/20 hover:opacity-95">
              Explore Products
              <span className="ml-3">→</span>
            </a>
            <a href="#summit" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10">
              Book a Consultation
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {[
              ['CIPC & SARS Ready', 'Formalisation support for launch and scale.'],
              ['7-Day Delivery', 'Fast turnaround for selected starter packages.'],
              ['R2B+ Won', 'Built to help businesses win tenders and markets.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-white/60">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners slider */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Trusted by partners and ecosystems
          </p>
          <div className="overflow-hidden">
            <div className="marquee flex w-[200%] gap-4">
              {[...partners, ...partners].map((item, idx) => (
                <div
                  key={`${item}-${idx}`}
                  className="flex min-w-[180px] items-center justify-center rounded-2xl border border-white/10 bg-primary/40 px-5 py-4 text-sm font-medium text-white/80"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
