"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { showSuccess } from "@/utils/toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Os dados do PIX e o ID do lead são passados através do state da navegação
  const { paymentData, leadId } = location.state || {};

  if (!paymentData || !leadId) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Erro ao carregar pagamento</h1>
          <p className="text-gray-600">Dados do pagamento não encontrados. Por favor, tente novamente.</p>
          <Button onClick={() => navigate("/checkout")} className="mt-4">Voltar ao Checkout</Button>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentData.paymentCode);
    setCopied(true);
    showSuccess("Código PIX copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirmation = () => {
    // Em um cenário real, um webhook confirmaria o pagamento.
    // Aqui, simplesmente avançamos para a próxima etapa.
    navigate(`/upsell/${leadId}`);
  };

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container max-w-2xl mx-auto py-16 px-6">
        <Card className="w-full text-center">
          <CardHeader>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold">Quase lá! Finalize o Pagamento</CardTitle>
            <CardDescription>Use o QR Code ou o código abaixo para pagar com PIX.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="p-4 bg-white border rounded-lg">
              <img
                src={paymentData.paymentCodeBase64}
                alt="PIX QR Code"
                className="w-64 h-64"
              />
            </div>
            <p className="text-gray-600">Abra o app do seu banco e escaneie o código acima.</p>
            
            <div className="w-full">
                <p className="font-semibold mb-2">Ou use o PIX Copia e Cola:</p>
                <div className="relative">
                    <input
                        readOnly
                        value={paymentData.paymentCode}
                        className="w-full bg-gray-100 border rounded-md p-3 pr-12 text-sm text-gray-700"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={handleCopy}
                    >
                        {copied ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            <div className="w-full mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="font-bold text-yellow-800">Aguardando pagamento...</p>
                <p className="text-sm text-yellow-700">Após o pagamento, clique no botão abaixo para continuar.</p>
            </div>

            <Button
              size="lg"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14"
              onClick={handlePaymentConfirmation}
            >
              Já paguei, quero continuar!
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Payment;