const panels = [
    { title: "Export Readiness & Trade Incentives", subtitle: "North West Focus" },
    { title: "Youth & Startups Driving Export Innovation", subtitle: "Entrepreneurship" },
    { title: "Finance & Technology for Trade", subtitle: "FinTech & Digital" },
    { title: "Branding Africa", subtitle: 'Leveraging "Made in SA" Globally' },
];

const breakaways = [
    "Digital Enablement & Trade Intelligence",
    "SEZ Compliance & Customs",
    "Corporate Procurement & Supplier Development",
];

const Programme = () => {
    return (
        <section id="programme" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-primary">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-widest uppercase text-white/80">
                        Summit Programme
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white mt-3 mb-4">
                        High-Impact <span className="text-white">Engagement</span>
                    </h2>
                    <p className="text-white/70 text-lg">
                        Two days of panels, breakaway sessions, and networking
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {panels.map((panel, idx) => (
                        <div
                            key={idx}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-colors"
                        >
                            <span className="text-white font-bold text-sm tracking-widest uppercase">
                                Panel {idx + 1}
                            </span>
                            <h3 className="font-black tracking-tight text-xl md:text-2xl text-white mt-2 mb-1">
                                {panel.title}
                            </h3>
                            <p className="text-white/60">{panel.subtitle}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                    <h3 className="font-black tracking-tight text-2xl text-white mb-6 text-center">
                        Breakaway Sessions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {breakaways.map((session, idx) => (
                            <div
                                key={idx}
                                className="text-center p-6 rounded-lg bg-white/5 border border-white/10"
                            >
                                <span className="text-white font-bold text-xs tracking-widest uppercase">
                                    Session {String.fromCharCode(65 + idx)}
                                </span>
                                <p className="text-white font-medium mt-2">
                                    {session}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Programme;
