import React from 'react';

export default function ProjectsDone({ projectsData }) {
  const data = projectsData;

  const cards = [
    {
      title: "Digital Solutions & Transformation",
      body: "Web infrastructure, brand systems, digital identity, communication tools, and scalable online presence development.",
    },
    {
      title: "Compliance & Governance",
      body: "Business registration, tax compliance, operational structuring, governance support, and procurement readiness.",
    },
    {
      title: "Global Market Access",
      body: "Trade facilitation, export readiness, stakeholder matchmaking, procurement integration, and international partnerships.",
    },
    {
      title:"Professional Capability with Digital Agility",
      body: "Our proprietary framework combines strategic expertise with fast-moving digital execution to help organisations scale with confidence.",
    },
  ];

  console.log("projectsData", data);

  return (
    <section id="projects" className="bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
              OUR CAPABILITY
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              African innovation, packaged for a global audience.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/70">
              We help businesses move from informal activity into structured, investment-ready, and globally connected operations through strategic advisory, digital systems, stakeholder engagement, and market activation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-lg font-black text-white">
                  {card.title}
                </p>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}