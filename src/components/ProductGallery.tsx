"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

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

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Veja a Mágica Acontecer!</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {gifs.map((gif, index) => (
              <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3">
                <div className="overflow-hidden rounded-2xl shadow-lg aspect-square">
                  <img
                    src={gif.src}
                    alt={gif.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};