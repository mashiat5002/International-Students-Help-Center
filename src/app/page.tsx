import Navbar from "@/components/layout/Navbar";
import Hero from '@/components/home/Hero';
import CountrySelector from '@/components/home/CountrySelector';
import Features from '@/components/home/Features';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#000033] overflow-y-auto scrollbar-hide">
        <Hero />
        <CountrySelector />
        <Features />
      </main>
    </>
  );
}