const About = () => {
    return (
        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                        About the Summit
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-primary mt-3 mb-6">
                        Where African Innovation
                        <br />
                        Meets <span className="text-primary">Global Markets</span>
                    </h2>
                    <p className="text-lg text-primary/80 max-w-3xl mx-auto leading-relaxed">
                        The <strong>Import-Export Access Summit (IEAS) 2026</strong>, hosted by <strong>The Access Group</strong>,
                        is a high-level platform connecting export-ready SMMEs, youth enterprises, investors, and policymakers.
                        Building on the success of the 2025 summit held under the G20 South Africa Presidency,
                        this year we go bigger - with a focus on turning trade policy into real, actionable opportunities.
                    </p>
                </div>

                {/* YouTube embed */}
                <div className="mb-20 max-w-3xl mx-auto">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
                        <iframe
                            src="https://www.youtube.com/embed/1gLvx_oQImk"
                            title="IEAS Summit 2025 Highlights"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            loading="lazy"
                        />
                    </div>
                    <p className="text-center text-primary/70 mt-4 text-sm">
                        Watch highlights from the inaugural IEAS Summit 2025
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
