"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Faq = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Perguntas Frequentes</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">É seguro para crianças?</AccordionTrigger>
            <AccordionContent>
              Sim! Nossas bombas de banho são feitas com ingredientes 100% naturais, não-tóxicos e suaves, ideais para a pele sensível das crianças. São livres de parabenos e sulfatos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">Qual a idade recomendada?</AccordionTrigger>
            <AccordionContent>
              Recomendamos para crianças a partir de 3 anos, devido às pequenas surpresas dentro das bombas. A supervisão de um adulto é sempre aconselhada.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">Quantas surpresas vêm no kit?</AccordionTrigger>
            <AccordionContent>
              Cada kit contém 12 bombas de banho, e cada uma delas tem uma surpresa única de um animal marinho dentro. São 12 surpresas diferentes para colecionar!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold">Quanto tempo demora a entrega?</AccordionTrigger>
            <AccordionContent>
              O prazo de entrega varia de 7 a 15 dias úteis, dependendo da sua região. Oferecemos frete grátis para todo o Brasil!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};