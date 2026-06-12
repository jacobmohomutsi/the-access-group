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

import { client } from "@/lib/graphql";
import { HOME_QUERY } from "@/queries/homeQuery";

export default async function TheAccessGroupLandingPage() {

  const data = await client.request(HOME_QUERY);

  console.log(data.page);
  const hero = data.page.homeHero;
  const about = data.page.homeAbout;
  const products = data.page.homeProducts;
  const feature = data.page.homeFeature;
  const caseStudies = data.page.homeCaseStudies;
  const cta = data.page.homeCTA;
  const projects = data.page.homeProjects;

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
