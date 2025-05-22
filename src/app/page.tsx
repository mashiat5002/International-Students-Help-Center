import Navbar from "@/app/components/layout/Navbar";
import Hero from '@/app/components/Landing/Hero';
import CountrySelector from '@/app/components/Landing/CountrySelector';
import Features from '@/app/components/Landing/Features';
import Footer from '@/app/components/layout/Footer';

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