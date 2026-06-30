import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Products from '../components/home/Products';
import SuccessCalculator from '../components/home/SuccessCalculator';
import Summit from '../components/home/Summit';
import CaseStudies from '../components/home/CaseStudies';
import CTA from '../components/home/CTA';


export default async function TheAccessGroupLandingPage() {

  return (
    <div className="min-h-screen bg-primary text-white">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee 22s linear infinite;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 72px 72px;
        }
      `}</style>

      <Header />
      <main>
        <Hero heroData={hero} />
        <About aboutData={about} />
        <Products productsData={products} />
        <SuccessCalculator />
        <Summit featureData={feature} />
        <CaseStudies caseStudiesData={caseStudies} />
        <CTA ctaData={cta} />

      </main>
      <Footer />
    </div>
  );
}
