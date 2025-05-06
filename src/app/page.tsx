import Navbar from "@/components/layout/Navbar";
import Hero from '@/components/home/Hero';
import CountrySelector from '@/components/home/CountrySelector';
import Features from '@/components/home/Features';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#000033] overflow-y-auto scrollbar-hide flex flex-col">
        <Hero />
        <CountrySelector />
        <Features />
        <div className="flex-grow">
          {/* Your existing components */}
        </div>
        <Footer />
      </main>
    </>
  );
}