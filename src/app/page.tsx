import Hero from '../components/Home/Hero';
import FeatureCards from '../components/Home/FeatureCards';
import CTA from '../components/Home/CTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureCards />
      <CTA />
    </div>
  );
}