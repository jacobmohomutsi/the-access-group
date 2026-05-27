import React from 'react';

export default function ProjectsDone({ projectsData }) {
  const cards = [
    {
      title: "Project Management",
      body: "Initiation | Planning | Budgeting | Execution | Monitoring | Closure",
    },
    {
      title: "Stakeholder Engagement",
      body: "Co-ordination | Protocol | Conflict Management | Engagements",
    },
    {
      title: "Event Management",
      body: "Workshops | Festivals | Exhibitions | Summits | Conferences | AGM",
    },
    {
      title: "MERCHANDISE (Branded)",
      body: "T-Shirts | Water | Banner | Signage | Poster | Catalogue",
    },
  ];

  return (
    <section id="projects" className="bg-[#F8F9FA] text-gray-900 py-20 lg:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C2A66B]">
            OUR CAPABILITY
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#304945] sm:text-5xl">
            African innovation, packaged for a global audience.
          </h2>
        </div>

        {/* 2x2 Card Grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              className="flex rounded-xl overflow-hidden shadow-sm bg-[#304945] text-white transition-all duration-300 hover:shadow-md border-l-8 border-[#C2A66B]"
            >
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm font-medium text-white/80 leading-relaxed tracking-wide">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Bottom Paragraph */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg leading-relaxed text-gray-600 font-medium max-w-3xl mx-auto">
            We tailor project efficiency, manage and retain external stakeholder relations, and provide full-scale logistics for various engagements on behalf of your organisation whether governments, corporations, or traditional communities.
          </p>
        </div>

      </div>
    </section>
  );
}