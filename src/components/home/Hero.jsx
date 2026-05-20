import React from 'react';
import Image from 'next/image';

export default function Hero({ heroData }) {
  const data = heroData;
  const cards = [
    {
      title: data.herocard1title,
      body: data.herocard1body,
    },
    {
      title: data.herocard2title,
      body: data.herocard2body,
    },
    {
      title: data.herocard3title,
      body: data.herocard3body,
    },
  ];

  const partners = [
    {
      name: data.partner1name,
      logo: data.partner1logo,
    },
    {
      name: data.partner2name,
      logo: data.partner2logo,
    },
    {
      name: data.partner3name,
      logo: data.partner3logo,
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-primary">
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute right-[-6rem] top-36 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            {data.badgeText}
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {data.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            {data.heroDescription}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={data.primaryButtonLink}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-primary shadow-lg shadow-white/20 hover:opacity-95"
            >
              {data.primaryButtonText}
              <span className="ml-3">→</span>
            </a>

            <a
              href={data.secondaryButtonLink}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[#263B38] px-7 py-4 text-base font-semibold text-white hover:bg-white/10"
            >
              {data.secondaryButtonText}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="font-semibold text-white">
                  {card.title}
                </p>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  {card.body}
                </p>
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
                  key={`${item.name}-${idx}`}
                  className="flex min-w-[180px] items-center justify-center rounded-2xl border border-white/10 bg-primary/40 px-5 py-4 text-sm font-medium text-white/80"
                >
                  {item.logo?.node?.sourceUrl ? (
                    <Image
                      src={item.logo.node.sourceUrl}
                      alt={item.logo.node.altText || item.name}
                      className="h-10 w-auto object-contain"
                    />
                  ) : (
                    item.name
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}