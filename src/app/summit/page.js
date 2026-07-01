import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/summit/Hero';
import About from '../../components/summit/About';
import Speakers from '../../components/summit/Speakers';
import Tickets from '../../components/summit/Tickets';
import Partnerships from '../../components/summit/Partnerships';
import Programme from '../../components/summit/Programme';
import Venue from '../../components/summit/Venue';
import CTA from '../../components/summit/CTA';
import { supabaseAdmin } from "@/lib/supabase-admin";

export default async function TheAccessGroupLandingPage() {

  // Fetch active speakers from Supabase
  const { data: dbSpeakers, error } = await supabaseAdmin
    .from('speakers')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  // If the table doesn't exist yet (42P01), we just gracefully fallback to empty
  const speakersData = error ? [] : dbSpeakers;

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
        <Hero />
        <About />
        <Speakers speakersData={speakersData} />
        <Tickets />
        <Partnerships />
        <Programme />
        <Venue />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
