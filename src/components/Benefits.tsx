"use client";

import { Heart, Gift, Smile } from "lucide-react";

const BenefitItem = ({ icon, title, text }) => (
    <div className="text-center">
        <div className="flex justify-center items-center mb-4">
            <div className="bg-teal-100 p-4 rounded-full">
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{text}</p>
    </div>
)

export const Benefits = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <BenefitItem icon={<Smile className="h-8 w-8 text-teal-500" />} title="Banho sem estresse" text="Diga adeus às lágrimas e olá para sorrisos. A hora do banho nunca foi tão fácil e divertida." />
            <BenefitItem icon={<Gift className="h-8 w-8 text-teal-500" />} title="Surpresa em cada uso" text="Com 12 brinquedos diferentes do oceano para colecionar, a diversão é garantida todos os dias." />
            <BenefitItem icon={<Heart className="h-8 w-8 text-teal-500" />} title="Seguro e divertido" text="Feito com ingredientes naturais e seguros para a pele sensível das crianças. Dermatologicamente testado." />
        </div>
      </div>
    </section>
  );
};