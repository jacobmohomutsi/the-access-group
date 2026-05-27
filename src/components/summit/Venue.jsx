import { MapPin, Navigation } from "lucide-react";
import Image from "next/image";

const Venue = () => {
    return (
        <section id="venue" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-sm font-semibold tracking-widest uppercase text-primary">
                            The Venue
                        </span>
                        <h2 className="font-black tracking-tight text-3xl md:text-4xl text-primary mt-3 mb-6">
                            ANEW Resort
                            <br />
                            <span className="text-primary">Hunters Rest</span>
                        </h2>
                        <p className="text-primary/80 text-lg leading-relaxed mb-6">
                            Nestled in the Magaliesberg mountains near Rustenburg, North West Province.
                            This premier resort offers world-class conferencing facilities with capacity for up to 1,290 delegates,
                            surrounded by breathtaking natural beauty.
                        </p>

                        <div className="flex items-start gap-3 mb-4">
                            <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-primary">Address</p>
                                <p className="text-primary/80">
                                    R24 Road, Rustenburg, North West Province, South Africa
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mb-8">
                            <Navigation className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-primary">Getting There</p>
                                <p className="text-primary/80">
                                    ~2 hours from Johannesburg · ~30 min from Rustenburg · Near Sun City
                                </p>
                            </div>
                        </div>

                        <a
                            href="https://anewhotels.com/hotels/hunters-rest/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-secondary px-6 py-3.5 rounded-2xl text-primary font-extrabold hover:bg-primary hover:text-white transition-all duration-300 hover:scale-102 shadow-lg shadow-black/10"
                        >
                            View Venue & Accommodation
                        </a>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="https://anewhotels.com/wp-content/uploads/elementor/thumbs/ANEW-Resort-Hunters-Rest-1-px4h9yvoker0pejjgy7v39wom0a5qg3cp7xnws7tkg.jpg"
                            alt="ANEW Resort Hunters Rest, Rustenburg"
                            className="w-full h-full object-cover"
                            width={1280}
                            height={720}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Venue;
