import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Offer } from "@/components/Offer";
import { Testimonials } from "@/components/Testimonials";
import { Benefits } from "@/components/Benefits";
import { Guarantee } from "@/components/Guarantee";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Offer />
        <Testimonials />
        <Benefits />
        <Guarantee />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default Index;