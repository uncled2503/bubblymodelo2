"use client";

import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="bg-teal-500">
      <div className="container max-w-4xl mx-auto text-center py-16 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para a Diversão?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Garanta já o seu kit e transforme a hora do banho em uma aventura inesquecível para seus filhos!
        </p>
        <Link to="/checkout">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shine-effect">
            Comprar Agora com Desconto
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};