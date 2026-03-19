import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Offer } from "@/components/Offer";
import { Testimonials } from "@/components/Testimonials";
import { Benefits } from "@/components/Benefits";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { WaveSeparator } from "@/components/WaveSeparator";
import { ProductGallery } from "@/components/ProductGallery";
import { FeatureSections } from "@/components/FeatureSections";

const Index = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <ProductGallery />
        <WaveSeparator />
        <Offer />
        <Testimonials />
        <Benefits />
        <FeatureSections />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;