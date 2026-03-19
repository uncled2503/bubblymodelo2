"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mariana F.",
    text: "Comprei sem muita expectativa e me surpreendi. O produto é ótimo e a entrega foi antes do prazo. As crianças adoraram.",
    image: "/images/testimonials/mulher1.jpg",
  },
  {
    name: "Ricardo P.",
    text: "A qualidade é incrível e o cheirinho é suave. O banho virou um momento de diversão e tranquilidade aqui em casa.",
    image: "/images/testimonials/homem1.jpg",
  },
  {
    name: "Sofia R.",
    text: "Minha sobrinha amou o presente! A caixa é linda e as bombas de banho são muito cheirosas. Sucesso total!",
    image: "/images/testimonials/mulher2.jpg",
  },
  {
    name: "Carlos M.",
    text: "Nunca pensei que diria isso, mas meu filho pede para tomar banho agora. Mágico!",
    image: "/images/testimonials/homem2.jpg",
  },
  {
    name: "Beatriz C.",
    text: "As surpresas são muito fofas e bem feitas. Minha filha está montando uma coleção dos animais marinhos.",
    image: "/images/testimonials/mulher3.jpg",
  },
  {
    name: "Lucas A.",
    text: "Produto excelente. Não irrita a pele e deixa um cheirinho delicioso. Recomendo!",
    image: "/images/testimonials/homem3.jpg",
  },
  {
    name: "Juliana S.",
    text: "Meu filho agora ama tomar banho! Ele fica super ansioso para descobrir a surpresa. Melhor compra do ano!",
    image: "/images/testimonials/mulher4.jpg",
  },
  {
    name: "Pedro H.",
    text: "Valeu cada centavo. A hora do banho era uma luta, agora é uma festa. Os brinquedos são de boa qualidade.",
    image: "/images/testimonials/homem4.jpg",
  },
  {
    name: "Fernanda L.",
    text: "Chegou super rápido! As crianças ficaram enlouquecidas. Já vou comprar o próximo kit.",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Gabriel T.",
    text: "Ótima ideia para presentear. É criativo, divertido e as crianças ficam super felizes com as surpresas.",
    image: "https://i.pravatar.cc/150?img=3",
  },
];

const TestimonialCard = ({ name, text, image }) => (
  <li className="mx-4 flex-shrink-0 w-[350px] bg-white p-6 rounded-3xl shadow-lg">
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4 object-cover" />
      <div>
        <p className="font-bold text-gray-800">{name}</p>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
      </div>
    </div>
    <p className="text-gray-600 italic">"{text}"</p>
  </li>
);

export const Testimonials = () => {
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          O que nossos clientes <span className="text-teal-500">amam</span> no produto
        </h2>
      </div>
      <div className="relative flex flex-col gap-8 -rotate-2">
        <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
            {[...firstRow, ...firstRow].map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
            ))}
        </div>
        <div className="flex w-max animate-marquee-reverse items-center hover:[animation-play-state:paused]">
            {[...secondRow, ...secondRow].map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
            ))}
        </div>
      </div>
    </section>
  );
};