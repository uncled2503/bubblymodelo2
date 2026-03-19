"use client";

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

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Veja a Mágica Acontecer!</h2>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...gifs, ...gifs].map((gif, index) => (
              <div key={index} className="mx-2 flex-shrink-0 w-80">
                <div className="overflow-hidden rounded-2xl shadow-lg aspect-square">
                  <img
                    src={gif.src}
                    alt={gif.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};