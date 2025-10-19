import Hero from '@/components/Home/Hero';
import FeatureCards from '@/components/Home/FeatureCards';
import Testimonials from '@/components/Home/Testimonials';
import CTA from '@/components/Home/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <Testimonials />
      <CTA />
    </>
  );
}