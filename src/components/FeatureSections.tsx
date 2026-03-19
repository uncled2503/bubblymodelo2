"use client";

import { AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import { LoopingVideo } from "./LoopingVideo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const FeatureSections = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto space-y-20">
        {/* Como Funciona Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <div className="max-w-3xl mx-auto">
            <LoopingVideo src="/videos/how-it-works.mp4" />
          </div>
          <p className="text-gray-600 text-lg mt-6 max-w-3xl mx-auto">
            É simples! Basta encher a banheira, colocar uma de nossas bombas de banho mágicas e observar a efervescência colorida. Em instantes, uma surpresa divertida de um animal marinho aparecerá, transformando a hora do banho em uma aventura inesquecível.
          </p>
          <Link to="/checkout" className="mt-8 inline-block">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">
              Quero o Meu Agora!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Section 1: Hora do Banho, Reinventada */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Hora do Banho, Reinventada</h2>
            <p className="text-gray-600 text-lg">
              Transforme a rotina noturna do seu filho em uma experiência efervescente e colorida que eles mal podem esperar para mergulhar. Nossas Bombas de Banho tornam a hora do banho menos uma tarefa e mais uma recompensa divertida no final do dia!
            </p>
          </div>
          <div>
            <img src="/images/bath-time.jpg" alt="Mãe e filho se divertindo na banheira" className="rounded-2xl shadow-xl w-full h-auto" />
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="bg-teal-50 border-2 border-dashed border-teal-300 rounded-2xl p-8 text-center">
            <ShieldCheck className="h-16 w-16 text-teal-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-teal-800 mb-2">Garantia Blindada de 30 Dias</h2>
            <p className="text-teal-700 text-lg max-w-3xl mx-auto">
                Sua felicidade é nossa prioridade! Se por qualquer motivo você ou seu pequeno não amarem o produto, basta nos contatar em até 30 dias para um reembolso completo, sem complicações e sem perguntas. <span className="font-bold">Risco zero para você!</span>
            </p>
        </div>

        {/* Section 2: Uma Surpresa em Cada Mergulho */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img src="/images/spa-time.png" alt="Bombas de banho efervescendo na água com brinquedos" className="rounded-2xl shadow-xl w-full h-auto" />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Uma Surpresa em Cada Mergulho</h2>
            <p className="text-gray-600 text-lg">
              Cada bomba de banho efervesce na água para revelar brinquedos surpresa divertidos que mantêm as crianças curiosas, engajadas e felizes na banheira. Feitas com uma fórmula segura, elas também ajudam a deixar a hora do banho com uma sensação de frescor e diversão do início ao fim.
            </p>
          </div>
        </div>

        {/* Attention Banner */}
        <div className="border-2 border-dashed border-red-400 bg-red-50 p-6 rounded-2xl flex items-center gap-4">
          <AlertTriangle className="h-10 w-10 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-600">ATENÇÃO!</h3>
            <p className="text-red-500">
              Nossas redes sociais estão bombando e nosso estoque está acabando. Sugerimos que você faça seu pedido hoje antes que esgote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};