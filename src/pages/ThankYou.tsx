"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="container max-w-2xl mx-auto py-24 px-6 text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-800">Obrigado pelo seu pedido!</h1>
        <p className="mt-4 text-lg text-gray-600">
          Seu pedido foi recebido com sucesso. Em breve, nossa equipe entrará em contato com você para finalizar os detalhes do pagamento e envio.
        </p>
        <p className="mt-2 text-gray-600">
            Fique de olho no seu e-mail e WhatsApp!
        </p>
        <Link to="/">
            <Button className="mt-8" size="lg">Voltar para a página inicial</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;