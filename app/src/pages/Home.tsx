import { useState } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import FeaturedProjects from '@/sections/FeaturedProjects';
import FindHomeCTA from '@/sections/FindHomeCTA';
import ContactBanner from '@/sections/ContactBanner';
import AboutSection from '@/sections/AboutSection';
import ScheduleVisit from '@/sections/ScheduleVisit';
import MortgageCalculator from '@/sections/MortgageCalculator';
import Footer from '@/sections/Footer';
import RegistrationForm from '@/components/RegistrationForm';
import { X } from 'lucide-react';

export default function Home() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <>
      <Navbar onOpenRegistration={() => setShowRegistrationModal(true)} />
      <main>
        <Hero />
        <FeaturedProjects />
        <FindHomeCTA />
        <ContactBanner />
        <AboutSection />
        <ScheduleVisit />
        <MortgageCalculator />
      </main>
      <Footer />

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-[#0A0A0A] rounded-xl border border-white/10 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowRegistrationModal(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal content */}
            <div className="p-6 pt-16">
              <RegistrationForm onSuccess={() => setShowRegistrationModal(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}