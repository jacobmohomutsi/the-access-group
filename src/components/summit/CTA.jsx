import { ArrowRight, Mail, Phone } from "lucide-react";

const CTA = () => {
    return (
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
                        href="#tickets"
                        className="bg-secondary px-10 py-4 rounded-2xl text-primary font-extrabold text-lg flex items-center gap-2 hover:bg-white hover:scale-102 transition-all duration-300 shadow-lg shadow-black/20"
                    >
                        Get Tickets Now <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                        href="https://theaccessgroup.co.za/partners-and-sponsors/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:border-secondary hover:text-secondary hover:bg-white/5 transition-all duration-300"
                    >
                        Become a Partner
                    </a>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70">
                    <a href="mailto:info@theaccessgroup.co.za" className="flex items-center gap-2 hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                        info@theaccessgroup.co.za
                    </a>
                    <a href="tel:+27000000000" className="flex items-center gap-2 hover:text-white transition-colors">
                        <Phone className="w-4 h-4" />
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
