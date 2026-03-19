"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Star, CheckCircle, Flame, Clock, Check } from "lucide-react";
import { ProductImageGallery } from "./ProductImageGallery";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

const kits = [
  { id: 1, title: "Kit Explorador", price: "97,90", originalPrice: "149,90", items: 12, save: null, bestChoice: false },
  { id: 2, title: "Kit Aventura em Dobro", price: "175,90", originalPrice: "299,80", items: 24, save: "123,90", bestChoice: true },
  { id: 3, title: "Kit Família Mágica", price: "249,90", originalPrice: "449,70", items: 36, save: "199,80", bestChoice: false },
];

export const Hero = () => {
  const [selectedKit, setSelectedKit] = useState(kits[1]); // Default to best choice

  const productImages = [
    { src: "/images/produto-caixa.png", alt: "Caixa do produto Bomba de Banho Surpresa Oceano" },
    { src: "/images/produto-uso.png", alt: "Criança usando a bomba de banho na banheira" },
    { src: "/images/produto-dimensoes.png", alt: "Dimensões da caixa e das bombas de banho" },
    { src: "/images/produto-variedade.png", alt: "Variedade de surpresas e bombas de banho" },
  ];

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

          {/* Kit Selector */}
          <div className="mt-8 space-y-3">
            {kits.map((kit) => (
                <div
                    key={kit.id}
                    onClick={() => setSelectedKit(kit)}
                    className={cn(
                        "border-2 rounded-xl p-4 cursor-pointer transition-all relative",
                        "flex items-center justify-between gap-4",
                        selectedKit.id === kit.id ? "border-teal-500 bg-teal-50" : "border-gray-200 hover:border-gray-300"
                    )}
                >
                    {kit.bestChoice && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500">Melhor Escolha</Badge>}
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                            selectedKit.id === kit.id ? "border-teal-500 bg-teal-500" : "border-gray-300"
                        )}>
                            {selectedKit.id === kit.id && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">{kit.title}</h4>
                            <p className="text-sm text-gray-500">{kit.items} Bombas de Banho</p>
                        </div>
                    </div>
                    {kit.save && <Badge variant="secondary" className="bg-green-100 text-green-700 flex-shrink-0">Economize R$ {kit.save}</Badge>}
                </div>
            ))}
          </div>

          <div className="my-6">
            <span className="text-4xl font-bold text-teal-600">R$ {selectedKit.price}</span>
            <span className="text-xl text-gray-400 line-through ml-2">R$ {selectedKit.originalPrice}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/checkout">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg w-full sm:w-auto animate-pulse">
                COMPRAR AGORA
              </Button>
            </Link>
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
          <ProductImageGallery images={productImages} />
        </div>
      </div>
    </section>
  );
};