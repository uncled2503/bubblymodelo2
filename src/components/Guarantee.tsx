"use client";

import { ShieldCheck } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="py-16">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:flex items-center gap-8">
            <ShieldCheck className="h-24 w-24 text-teal-500 mx-auto md:mx-0 mb-4 md:mb-0" />
            <div>
                <h2 className="text-2xl font-bold text-center md:text-left">Sua satisfação ou seu dinheiro de volta!</h2>
                <p className="text-gray-600 mt-2 text-center md:text-left">
                    Temos tanta confiança que seu filho vai amar as Bombas de Banho Surpresa Oceano que oferecemos uma garantia de 30 dias. Se você não ficar 100% satisfeito, devolvemos seu dinheiro. Sem perguntas, sem risco.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};