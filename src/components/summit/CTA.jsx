import { ArrowRight, Mail, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const CTA = () => {
    return (
        <>
            <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20 bg-primary relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="font-black tracking-tight text-3xl md:text-5xl text-white mb-6">
                        Register. Partner. Invest.
                        <br />
                        <span className="text-white">Shape the Future.</span>
                    </h2>
                    <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                        Be part of history. Whether as a partner, delegate, or supporter, your participation
                        ensures the North West is placed at the forefront of global trade conversations.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <a
                            href="/tickets"
                            className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300"
                        >
                            Get Tickets Now <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-center gap-6 mt-8">
                <button
                    onClick={handlePrevPartner}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
                    aria-label="Previous partners"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="flex items-center justify-center gap-2.5">
                    {partners.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPartnerIndex(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${partnerIndex === idx
                                ? 'w-6 bg-secondary'
                                : 'w-2.5 bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to partner ${idx + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNextPartner}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
                    aria-label="Next partners"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </>
    );
};

export default CTA;
