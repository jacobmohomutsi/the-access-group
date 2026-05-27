import { Target, Rocket, TrendingUp, GraduationCap } from "lucide-react";

const goals = [
    {
        icon: Target,
        title: "Policy in Action",
        description: "Showcase real-world trade incentives, compliance tools, and funding access for SMEs.",
    },
    {
        icon: Rocket,
        title: "Youth & Startups",
        description: "Spotlight innovation pipelines and market access for township-based enterprises.",
    },
    {
        icon: TrendingUp,
        title: "Investment Attraction",
        description: "Position SEZs as hubs for advancing manufacturing and exports across Africa.",
    },
    {
        icon: GraduationCap,
        title: "Skills & Workforce Readiness",
        description: "Integrate training, SETAs, and incubation hubs for global competitiveness.",
    },
];

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
                        this year we go bigger — with a focus on turning trade policy into real, actionable opportunities.
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

                {/* Goals grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {goals.map((goal, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-primary/10 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <goal.icon className="w-7 h-7 text-secondary" />
                            </div>
                            <h3 className="font-black tracking-tight text-xl text-primary mb-3">
                                {goal.title}
                            </h3>
                            <p className="text-primary/70 leading-relaxed">
                                {goal.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
