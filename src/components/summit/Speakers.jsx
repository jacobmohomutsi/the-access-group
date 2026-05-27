import { Linkedin } from "lucide-react";

const Speakers = ({ speakersData }) => {
    const data = speakersData;

    const speakers = [
        {
            name: data.card1Title,
            role: data.card1Position,
            organisation: data.card1Body,
            image: data.card1Image?.node,
        },
        {
            name: data.card2Title,
            role: data.card2Position,
            organisation: data.card2Body,
            image: data.card2Image?.node,
        },
        {
            name: data.card3Title,
            role: data.card3Position,
            organisation: data.card3Body,
            image: data.card3Image?.node,
        },
        {
            name: data.card4Title,
            role: data.card4Position,
            organisation: data.card4Body,
            image: data.card4Image?.node,
        }
    ];

    return (
        <section id="speakers" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                        Industry Leaders
                    </span>
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-primary mt-3 mb-4">
                        Meet Our <span className="text-primary">Speakers</span>
                    </h2>
                    <p className="text-primary/70 text-lg max-w-2xl mx-auto">
                        Learn from seasoned experts driving Africa&apos;s trade agenda. Full speaker lineup coming soon.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {speakers.map((speaker, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {/* Placeholder avatar */}
                            <div className="aspect-[4/3] bg-primary flex items-center justify-center">
                                <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
                                    <span className="font-black tracking-tight text-3xl text-white">?</span>
                                </div>
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="font-black tracking-tight text-xl text-primary mb-1">
                                    {speaker.name}
                                </h3>
                                <p className="text-sm font-semibold text-primary mb-1">
                                    {speaker.role}
                                </p>
                                <p className="text-sm text-primary/70">
                                    {speaker.organisation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-primary/70 text-sm">
                        Speaker announcements rolling out monthly.{" "}
                        <a href="#cta" className="text-primary font-semibold hover:underline">
                            Subscribe for updates
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Speakers;
