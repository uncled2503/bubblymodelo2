"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const TestimonialCard = ({ name, text, image }) => (
    <Card className="shadow-lg border-none rounded-xl">
        <CardContent className="p-6">
            <div className="flex items-center mb-4">
                <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <p className="font-bold">{name}</p>
                    <div className="flex text-yellow-400">
                        <Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" />
                    </div>
                </div>
            </div>
            <p className="text-gray-600">"{text}"</p>
        </CardContent>
    </Card>
)

export const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">O que os pais estão dizendo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard name="Juliana S." text="Meu filho agora ama tomar banho! Ele fica super ansioso para descobrir a surpresa. Melhor compra do ano!" image="https://placehold.co/100x100/FFC0CB/333333?text=JS" />
            <TestimonialCard name="Ricardo P." text="A qualidade é incrível e o cheirinho é suave. O banho virou um momento de diversão e tranquilidade aqui em casa." image="https://placehold.co/100x100/87CEEB/333333?text=RP" />
            <TestimonialCard name="Fernanda L." text="Chegou super rápido! As crianças ficaram enlouquecidas. Já vou comprar o próximo kit." image="https://placehold.co/100x100/98FB98/333333?text=FL" />
        </div>
      </div>
    </section>
  );
};