import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import FeaturedProjects from '@/sections/FeaturedProjects';
import FindHomeCTA from '@/sections/FindHomeCTA';
import ContactBanner from '@/sections/ContactBanner';
import AboutSection from '@/sections/AboutSection';
import ScheduleVisit from '@/sections/ScheduleVisit';
import MortgageCalculator from '@/sections/MortgageCalculator';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
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
    </>
  );
}
