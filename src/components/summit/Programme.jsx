const Programme = () => {
    return (
        <section id="programme" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold tracking-widest uppercase text-white/80">
                        Summit Programme
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white mt-3 mb-4">
                        High-Impact Engagement
                    </h2>
                    <p className="text-white/70 text-lg">
                        Two days of panels, breakaway sessions, and networking
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Thursday Section */}
                    <div className="shadow-lg border border-primary/10 rounded-2xl overflow-hidden bg-white">
                        {/* Thursday Header */}
                        <div className="bg-primary p-6">
                            <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-1">
                                THURSDAY, 15 OCTOBER 2026
                            </span>
                            <h3 className="font-black tracking-tight text-2xl text-white mb-1">
                                Investment & Partnership Dinner
                            </h3>
                            <p className="text-white/70 text-sm">
                                By-invitation-only | Closing Deals, Building Trust
                            </p>
                        </div>

                        {/* Thursday Items */}
                        <div className="flex flex-col">
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">Keynote Address</h4>
                                <p className="text-primary/70 text-sm mt-1">Senior government minister or BRICS nation Finance representative</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">Curated Project Pitches</h4>
                                <p className="text-primary/70 text-sm mt-1">Pre-screened industrial and agro-processing projects presented to investor panel</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">MoU Signing Ceremony</h4>
                                <p className="text-primary/70 text-sm mt-1">Formalising commitments arising from IEAS 2025 between industry and government</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary bg-white">
                                <h4 className="font-bold text-primary text-lg">Structured Networking</h4>
                                <p className="text-primary/70 text-sm mt-1">Facilitated 1:1 matchmaking for investors, traditional councils, and corporates</p>
                            </div>
                        </div>
                    </div>

                    {/* Friday Section */}
                    <div className="shadow-lg border border-primary/10 rounded-2xl overflow-hidden bg-white">
                        {/* Friday Header */}
                        <div className="bg-primary p-6">
                            <span className="text-secondary font-bold text-sm tracking-widest uppercase block mb-1">
                                FRIDAY, 16 OCTOBER 2026
                            </span>
                            <h3 className="font-black tracking-tight text-2xl text-white mb-1">
                                Main Summit
                            </h3>
                            <p className="text-white/70 text-sm">
                                300+ Delegates · Full programme day
                            </p>
                        </div>

                        {/* Friday Items */}
                        <div className="flex flex-col">
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">Panel 1: The Infrastructure Nexus</h4>
                                <p className="text-primary/70 text-sm mt-1">Energy, Water & Digital Rails for the SEZ - closing the gap to unlock manufacturing and local beneficiation.</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">Panel 2: Financing the Pipeline</h4>
                                <p className="text-primary/70 text-sm mt-1">Blended finance models for SMME export growth with DFIs, banks & the Jobs Fund. Global start-ups for Africa.</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">Panel 3: Beyond Raw Materials</h4>
                                <p className="text-primary/70 text-sm mt-1">Building continental tech & advanced manufacturing hubs - vehicle assembly, battery production, and mining tech manufacturing in the NW.</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary border-b border-primary/10 bg-white">
                                <h4 className="font-bold text-primary text-lg">Panel 4: Climate-Smart and AI Trade</h4>
                                <p className="text-primary/70 text-sm mt-1">Carbon credits, green hydrogen & sustainable agri-exports - NW as green economy leader in AI-integrated systems.</p>
                            </div>
                            <div className="p-5 border-l-4 border-secondary bg-white">
                                <h4 className="font-bold text-primary text-lg">SEZ Innovation Challenge & Closing</h4>
                                <p className="text-primary/70 text-sm mt-1">Unveiling the digital platform & announcement of IEAS 2027</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Programme;
