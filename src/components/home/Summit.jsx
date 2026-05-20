"use client";

import React, { useState } from 'react';
import MailingListModal from '../common/MailingListModal';

export default function Summit({ featureData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = featureData;

  const points = data.points
    ?.split("\n")
    .filter(Boolean);

  return (
    <section id="summit" className="bg-[#F5F5F2] text-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">{data.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-primary sm:text-5xl">
              {data.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-primary/80">
              {data.description}
            </p>

            {points && (
              <div className="mt-8 space-y-4">
                {points.map((point, index) => (
                  <div key={index} className="rounded-2xl border border-primary/10 bg-primary/5 px-5 py-4">
                    {point}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-primary p-8 text-white shadow-2xl shadow-black/10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Join the waiting list</p>
            <h3 className="mt-3 text-3xl font-bold">Be first in line for summit updates.</h3>
            <p className="mt-4 text-white/65">
              Use this form area for an email capture, partner expression of interest, or speaking / exhibition requests.
            </p>
            <div className="mt-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-primary hover:opacity-95 transition-opacity"
              >
                Join the waiting list
              </button>
            </div>
            <a href="/summit" className="mt-4 inline-flex text-sm font-semibold text-white hover:opacity-80 transition-opacity">
              Learn more about the summit →
            </a>
          </div>
        </div>
      </div>

      <MailingListModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
