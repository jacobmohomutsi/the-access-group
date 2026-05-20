import { Calendar, MapPin, ArrowRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import Image from "next/image";

const Hero = ({ heroData }) => {
    const data = heroData;

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/logo-white.png"
                    alt="Import Export Access Summit aerial view"
                    className="w-full h-full object-cover"
                    width={1920}
                    height={1080}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <div className="opacity-0 animate-fade-up">
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest uppercase bg-white text-primary mb-8">
                        {data.badgeText}
                    </span>
                </div>

                <h1 className="opacity-0 animate-fade-up animation-delay-200 font-black tracking-tight text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                    {data.heroTitle}
                </h1>

                <p className="opacity-0 animate-fade-up animation-delay-400 text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {data.heroDescription}
                </p>

                <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-5 h-5 text-white" />
                        <span className="text-lg font-medium">{data.date}</span>
                    </div>
                    <span className="hidden sm:block text-white/40">|</span>
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="text-lg font-medium">{data.location}</span>
                    </div>
                </div>

                <div className="opacity-0 animate-fade-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href={data.primaryButtonLink}
                        className="bg-white px-8 py-4 rounded-lg text-primary font-bold text-lg tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
                    >
                        {data.primaryButtonText} <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                        href={data.secondaryButtonLink}
                        className="px-8 py-4 rounded-lg border-2 border-white/30 text-white font-semibold text-lg hover:border-white hover:text-white transition-colors"
                    >
                        {data.secondaryButtonText}
                    </a>
                </div>
            </div>

            {/* Countdown */}
            <div className="relative z-10 mt-12">
                <CountdownTimer />
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                    <div className="w-1 h-3 rounded-full bg-white" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
