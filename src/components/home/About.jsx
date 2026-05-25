import React from 'react';
import Image from 'next/image';

export default function About({ aboutData }) {
  const data = aboutData;
  const cards = [
    {
      title: data.card1Title,
      body: data.card1Body,
    },
    {
      title: data.card2Title,
      body: data.card2Body,
    },
    {
      title: data.card3Title,
      body: data.card3Body,
    },
    {
      title: data.card4Title,
      body: data.card4Body,
    },
  ];
  return (
    <section id="about" className="bg-[#F5F5F2] text-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">ABOUT THE ACCESS GROUP</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
              Building pathways between African potential and global opportunity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary/80">
              The Access Group is a youth-led strategic consultancy focused on business activation, digital transformation, and market access across Africa.

We help entrepreneurs, creatives, organisations, and community-led enterprises transition from informal activity into structured, scalable, and globally connected operations.

Built around accessibility, compliance, and innovation, our work combines local understanding with internationally aligned business systems designed for long-term impact.
            </p>
          </div>

          <div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl shadow-black/10"> 
          <Image 
            src="/images/next-photos.jpg"
            alt="About The Access Group"
            width={500}
            height={500}
            className="w-full h-auto rounded-2xl object-cover"
          />

          </div>

          {/*<div className="grid gap-5 sm:grid-cols-2">
            {cards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-primary/10 bg-primary/5 p-6">
                <p className="text-lg font-bold text-primary">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-primary/70">{card.body}</p>
              </div>
            ))}
          </div>*/}
        </div>
      </div>
    </section>
  );
}
