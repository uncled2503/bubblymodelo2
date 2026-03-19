import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { Benefits } from "@/components/Benefits";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { WaveSeparator } from "@/components/WaveSeparator";
import { ProductGallery } from "@/components/ProductGallery";
import { FeatureSections } from "@/components/FeatureSections";
import { ScrollAnimation } from "@/components/ScrollAnimation";

const Index = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <ScrollAnimation>
          <Hero />
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <ProductGallery />
        </ScrollAnimation>
        <WaveSeparator />
        <ScrollAnimation delay={0.1}>
          <Testimonials />
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <Benefits />
        </ScrollAnimation>
        <ScrollAnimation delay={0.1}>
          <FeatureSections />
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <Faq />
        </ScrollAnimation>
      </main>
      <Footer />
    </div>
  );
};

export default Index;