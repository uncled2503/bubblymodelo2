"use client";

import { Button } from "./ui/button";
import { Star, CheckCircle, Flame, Clock } from "lucide-react";

export const Hero = () => {
  return (
    <section id="inicio" className="container max-w-6xl mx-auto py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800">
            Transforme o banho do seu filho na hora mais divertida do dia!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Cada bomba de banho revela uma surpresa mágica do oceano dentro 💥
          </p>
          <ul className="mt-6 space-y-2 text-left inline-block">
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-teal-500 mr-2" />
              Torna o banho uma aventura emocionante
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-teal-500 mr-2" />
              Estimula a curiosidade e a imaginação
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-5 w-5 text-teal-500 mr-2" />
              Fórmula segura e suave para crianças
            </li>
          </ul>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-2">
            <div className="flex text-yellow-400">
              <Star /><Star /><Star /><Star /><Star className="text-gray-300" />
            </div>
            <span className="text-sm text-gray-500">4.8/5 (2.187 avaliações)</span>
          </div>
          <div className="my-6">
            <span className="text-4xl font-bold text-teal-600">R$ 97,90</span>
            <span className="text-xl text-gray-400 line-through ml-2">R$ 149,90</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg w-full sm:w-auto animate-pulse">
              COMPRAR AGORA
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Adicionar ao carrinho
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center md:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2 text-red-500 font-semibold">
              <Flame className="h-5 w-5" />
              <span>Estoque baixo</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>Alta demanda</span>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img
            src="https://placehold.co/600x500/81E6D9/333333?text=Produto+Incr%C3%ADvel&font=sans"
            alt="Bomba de Banho Surpresa Oceano"
            className="rounded-2xl shadow-2xl w-full"
          />
        </div>
      </div>
    </section>
  );
};