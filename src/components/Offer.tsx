"use client";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const OfferCard = ({ title, price, originalPrice, save, bestChoice = false, items }) => (
    <div className={`border rounded-2xl p-6 text-center relative transition-transform hover:scale-105 ${bestChoice ? 'border-teal-500 ring-4 ring-teal-100' : 'border-gray-200'}`}>
        {bestChoice && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500">Melhor Escolha</Badge>}
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{items} Bombas de Banho</p>
        <div className="my-4">
            <span className="text-4xl font-bold">R$ {price}</span>
            <p className="text-gray-400 line-through">R$ {originalPrice}</p>
        </div>
        {save && <p className="text-green-600 font-semibold mb-4">Você economiza R$ {save}!</p>}
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Comprar Agora</Button>
    </div>
)

export const Offer = () => {
  return (
    <section id="oferta" className="bg-gray-50 pt-8 pb-16">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Aproveite nossa oferta especial!</h2>
        <p className="text-gray-600 mb-10">Quanto mais você compra, mais você economiza.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <OfferCard title="Kit Explorador" price="97,90" originalPrice="149,90" items={12} />
            <OfferCard title="Kit Aventura em Dobro" price="175,90" originalPrice="299,80" save="123,90" items={24} bestChoice />
            <OfferCard title="Kit Família Mágica" price="249,90" originalPrice="449,70" save="199,80" items={36} />
        </div>
      </div>
    </section>
  );
};