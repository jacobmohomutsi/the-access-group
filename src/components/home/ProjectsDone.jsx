import React from 'react';

const projects = [
  { value: '250+', label: 'Delegates at IEAS 2025' },
  { value: '15,000+', label: 'Businesses reached through community networks' },
  { value: '5', label: 'SA companies connected to China trade opportunities' },
  { value: '100,000+', label: 'Community members served through project support' },
];

export default function ProjectsDone() {
  return (
    <section id="projects" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">Projects done</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              A track record built across communities, trade, and brand activation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              This section is ideal for a rolling wall of delivered work, supported by metrics, logos, or future CMS-driven project cards.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-4xl font-black text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/75">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
