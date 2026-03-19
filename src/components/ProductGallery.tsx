"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const ProductGallery = () => {
  const gifs = [
    {
      src: "/gifs/video1.gif",
      alt: "Criança animada na banheira com a bomba de banho",
    },
    {
      src: "/gifs/video2.gif",
      alt: "Bebê curioso com a bomba de banho na banheira",
    },
    {
      src: "/gifs/video3.gif",
      alt: "Variedade de bombas de banho coloridas sendo jogadas na piscina",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Veja a Mágica Acontecer!</h2>
        <div className="flex justify-center">
          <Carousel className="w-full max-w-lg">
            <CarouselContent>
              {gifs.map((gif, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={gif.src}
                      alt={gif.alt}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};