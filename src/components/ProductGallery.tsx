"use client";

export const ProductGallery = () => {
  const images = [
    {
      src: "/images/produto-uso.png",
      alt: "Criança brincando com as bombas de banho na banheira",
    },
    {
      src: "/images/produto-variedade.png",
      alt: "Variedade de bombas de banho e surpresas",
    },
    {
      src: "/images/produto-dimensoes.png",
      alt: "Dimensões da caixa e do produto",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Veja a Mágica Acontecer!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};