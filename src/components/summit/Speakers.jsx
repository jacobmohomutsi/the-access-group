"use client";

import { useState } from "react";
import { Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const SpeakerCard = ({ speaker, isExpanded, onToggle }) => {
    return (
        <div className="group relative bg-white border border-primary/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col">
            {/* Avatar / Image */}
            <div className="aspect-[1/1] bg-primary flex items-center justify-center overflow-hidden">
                <div className="w-90 h-90 rounded-t-lg bg-white/10 flex items-center justify-center overflow-hidden">
                    {speaker.image ? (
                        <Image
                            src={speaker.image}
                            alt={speaker.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="font-black tracking-tight text-3xl text-white">
                            {speaker.name ? speaker.name.charAt(0) : "?"}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 text-center flex-grow flex flex-col items-center">
                <h3 className="font-black tracking-tight text-xl text-primary mb-1">
                    {speaker.name}
                </h3>
                <p className="text-sm font-semibold text-primary mb-1">
                    {speaker.role}
                </p>
                {speaker.organisation && (
                    <p className="text-sm text-primary/70 mb-4">
                        {speaker.organisation}
                    </p>
                )}

                {/* Bio Section */}
                <div
                    className={`overflow-hidden transition-all duration-300 w-full ${isExpanded ? "max-h-[500px] opacity-100 mt-2 mb-6" : "max-h-0 opacity-0 mt-0 mb-0"
                        }`}
                >
                    <p className="text-sm text-primary/80 text-left whitespace-pre-wrap">
                        {speaker.bio.replace(/\s+/g, " ").trim()}
                    </p>
                </div>

                <div className="mt-auto pt-4 w-full">
                    <button
                        onClick={onToggle}
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors mx-auto"
                    >
                        {isExpanded ? (
                            <>
                                Hide Bio <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                View Bio <ChevronDown size={16} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Speakers = ({ speakersData }) => {
    const [openSpeakerIdx, setOpenSpeakerIdx] = useState(null);

    const fallbackSpeakers = [
        {
            name: "Deputy Minister Jane Sithole", role: "Summit Speaker", image: "/images/speakers/TAG - The Access Group _ Jane_Sithole.jpg",
            bio: `Raesetja Jane Sithole is a distinguished South African leader currently serving as the Deputy Minister of Small Business Development in the Government of National Unity (GNU), a position she assumed in July 2024. She holds postgraduate qualifications in Political Leadership and Governance from the Wits School of Governance, equipping her to champion localised economic development and global market integration. As a Member of the National Assembly, she plays a vital role in
shaping national economic policy, with a dedicated focus on driving growth, sustainability, and
market access for SMMEs and cooperatives. Sithole’s extensive career in public governance spans
over two decades, beginning in local government as a councillor before she spent ten years in the
Mpumalanga Provincial Legislature. A committed advocate for trade and enterprise development,
she was a highlight at our 2025 Import Export Access Summit, where she engaged with
stakeholders to break down trade barriers for emerging businesses.` },
        {
            name: "Dr Sifiso Falala", role: "Summit Speaker", image: "/images/speakers/TAG - The Access Group _ Dr_Sifiso_Falala.jpg",
            bio: `Dr Sifiso Falala is a distinguished South African executive, researcher, and global leader in market
analytics and credit ratings. He is the founder and Chief Executive Officer (CEO) of Sovereign
Africa Ratings and concurrently serves as the CEO of Plus 94 Research, one of the largest
independent market research firms in South Africa. With deep expertise in consumer insights and
media analytics, Dr Falala is the current President of the Pan African Media Research
Organisation (PAMRO). His leadership in the sector is further reflected in his past tenure as
Chairman of the Southern African Marketing Research Association (SAMRA) and his active
membership in the European Society for Opinion and Marketing Research (ESOMAR). An
accomplished academic, he holds a Doctor of Philosophy (PhD) degree from the Da Vinci Institute, a
Master of Science in Population Studies, and an Honours degree in Business Studies. Through his
extensive career, Dr Falala continues to play a vital role in shaping data-driven economic, credit, and
market strategies across the African continent.` },
        {
            name: "Lehlohonolo Chabeli", role: "Summit Speaker", image: "/images/speakers/TAG - The Access Group _Lehlohonolo Chabeli.jpg",
            bio: `Lehlohonolo Chabeli is a prominent South African executive and community development
strategist currently serving as the Director of the Bakgatla-Ba-Kgafela Development & Welfare
NPC. In this role, he drives socio-economic advancement across the community's 32 villages in the
North West Province, focusing on sustainable agriculture, rural industrialisation, and local enterprise
development. With over 25 years of leadership across the financial, corporate, and non-profit
sectors, Chabeli has a distinguished track record of guiding high-impact social responsibility
initiatives. He previously served as the CEO of the Thebe Foundation, championing basic
education and early childhood development frameworks, and as the National Director and CEO of
World Vision South Africa, where he directed large-scale community development and economic
empowerment programmes.` },
        { name: "Nolo Mmeti", role: "Summit Speaker", image: "/images/speakers/nolo.jpg", bio: "A global policy expert and project leader with over 10 years of experience, Nolo has managed initiatives such as the Impala Vaccination Campaign, serving over 100,000 people." },
        { name: "Botlhale Mosito", role: "Summit Speaker", image: "/images/speakers/botlhale.jpg", bio: "A seasoned entrepreneur in consumer goods and SME consulting, Botlhale specializes in brand strategy, farming production, and innovation-driven growth." },
    ];

    const speakers = speakersData && speakersData.length > 0 ? speakersData : fallbackSpeakers;

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
                        Learn from seasoned experts driving Africa&apos;s trade agenda. More speakers to be
                        announced.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {speakers.map((speaker, idx) => (
                        <SpeakerCard
                            key={idx}
                            speaker={speaker}
                            isExpanded={openSpeakerIdx === idx}
                            onToggle={() => setOpenSpeakerIdx(openSpeakerIdx === idx ? null : idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Speakers;
