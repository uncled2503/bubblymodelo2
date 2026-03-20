"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showError, showLoading, dismissToast } from "@/utils/toast";
import { Header } from "@/components/Header";

interface UpsellOffer {
    id: string;
    title: string;
    description: string;
    price: string;
    priceValue: number;
    image: string;
}

const upsellOffers: UpsellOffer[] = [
    {
        id: 'clube_aventura',
        title: "Clube da Aventura Aquática (Assinatura)",
        description: "Receba um kit novo com temas e surpresas exclusivas todo mês com 25% de desconto!",
        price: "R$ 73,40/mês",
        priceValue: 73.40,
        image: "/images/upsell/clube-aventura.jpg"
    },
    {
        id: 'kit_anual',
        title: "Kit Anual de Diversão no Banho",
        description: "Garanta a diversão pelo ano inteiro! Leve nosso Mega Kit com 50 bombas de banho, estojo organizador e um roupão infantil temático com 40% OFF.",
        price: "R$ 269,90",
        priceValue: 269.90,
        image: "/images/upsell/kit-anual.jpg"
    },
    {
        id: 'kit_spa',
        title: "Kit SPA Infantil Completo",
        description: "Adicione nosso Kit SPA com shampoo suave, loção hidratante e sais de banho relaxantes (100% natural) por um preço especial.",
        price: "R$ 89,90",
        priceValue: 89.90,
        image: "/images/upsell/kit-spa.jpg"
    }
];

const Upsell = () => {
    const navigate = useNavigate();
    const { leadId } = useParams();
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
    const [acceptedOffers, setAcceptedOffers] = useState<UpsellOffer[]>([]);

    const handleAcceptOffer = () => {
        setAcceptedOffers(prev => [...prev, upsellOffers[currentOfferIndex]]);
        setCurrentOfferIndex(prev => prev + 1);
    };

    const handleDeclineOffer = () => {
        setCurrentOfferIndex(prev => prev + 1);
    };

    const handleFinalizePurchase = async () => {
        if (!leadId) {
            showError("ID do pedido não encontrado.");
            return navigate("/thank-you");
        }

        const toastId = showLoading("Atualizando seu pedido e gerando PIX...");

        const { data: leadData, error: leadFetchError } = await supabase.rpc('get_lead_details', {
            p_lead_id: leadId
        });

        const lead = leadData && leadData.length > 0 ? leadData[0] : null;

        if (leadFetchError || !lead) {
            dismissToast(toastId);
            showError("Não foi possível encontrar os dados do seu pedido original.");
            console.error("Error fetching lead:", leadFetchError);
            return;
        }

        const upsellTotal = acceptedOffers.reduce((sum, offer) => sum + offer.priceValue, 0);
        const acceptedOfferTitles = acceptedOffers.map(o => o.title).join(", ");

        const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-pix-payment', {
            body: {
                amount: upsellTotal,
                client: {
                    name: lead.full_name,
                    document: lead.cpf,
                    telefone: lead.phone,
                    email: lead.email,
                }
            }
        });

        if (paymentError || !paymentData || paymentData.error || !paymentData.idTransaction) {
            dismissToast(toastId);
            showError("Ocorreu um erro ao gerar o PIX para os itens adicionais.");
            console.error("Error invoking payment function for upsell:", paymentError || paymentData?.error);
            return;
        }

        const { error: updateError } = await supabase.rpc('add_upsell_to_lead', {
            p_lead_id: leadId,
            p_upsell_offer: acceptedOfferTitles,
            p_upsell_transaction_id: paymentData.idTransaction
        });

        if (updateError) {
            // The PIX was generated, but we couldn't save the info.
            // This is a problem, but we should still let the user pay.
            // Log the error and continue.
            console.error("Critical: Failed to update lead with upsell info:", updateError);
            showError("Não foi possível salvar os itens extras no seu pedido, mas o PIX foi gerado. Por favor, continue com o pagamento.");
        }
        
        dismissToast(toastId);
        
        navigate('/payment', { state: { paymentData, leadId, isUpsell: true } });
    };

    const allOffersShown = currentOfferIndex >= upsellOffers.length;

    useEffect(() => {
        if (allOffersShown && acceptedOffers.length === 0) {
            navigate("/thank-you");
        }
    }, [allOffersShown, acceptedOffers, navigate]);

    if (allOffersShown) {
        if (acceptedOffers.length === 0) {
            return null; // Render nothing while redirecting
        }

        const upsellTotal = acceptedOffers.reduce((sum, offer) => sum + offer.priceValue, 0);

        return (
            <div className="bg-gray-50 min-h-screen">
                <Header />
                <main className="container max-w-2xl mx-auto py-16 px-6 text-center">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">Ótima escolha!</CardTitle>
                            <CardDescription>Você adicionou os seguintes itens ao seu pedido:</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 text-left mb-6">
                                {acceptedOffers.map(offer => (
                                    <li key={offer.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                                        <span className="font-semibold">{offer.title}</span>
                                        <span className="font-bold text-teal-600">{offer.price}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t pt-4">
                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total Adicional:</span>
                                    <span>{upsellTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                            <Button onClick={handleFinalizePurchase} size="lg" className="w-full mt-8 bg-green-500 hover:bg-green-600 text-lg">
                                Pagar com PIX e Finalizar
                            </Button>
                            <Button onClick={() => navigate('/thank-you')} variant="link" className="mt-4 text-gray-600">
                                Não, obrigado. Finalizar sem os extras.
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        );
    }

    const currentOffer = upsellOffers[currentOfferIndex];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="container max-w-2xl mx-auto py-16 px-6 text-center">
                <h1 className="text-4xl font-extrabold text-teal-600">Espere! Uma oferta especial para você...</h1>
                <p className="mt-4 text-xl text-gray-700">
                    Aproveite esta oportunidade única antes de finalizar sua compra!
                </p>

                <Card className="mt-12">
                    <CardHeader>
                        <img src={currentOffer.image} alt={currentOffer.title} className="rounded-t-lg aspect-video object-cover" />
                        <CardTitle className="mt-4 text-2xl">{currentOffer.title}</CardTitle>
                        <CardDescription className="text-base">{currentOffer.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-800 my-4">{currentOffer.price}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button onClick={handleAcceptOffer} size="lg" className="w-full bg-green-500 hover:bg-green-600 text-lg h-14">
                                Sim, eu quero!
                            </Button>
                            <Button onClick={handleDeclineOffer} size="lg" variant="outline" className="w-full text-lg h-14">
                                Não, obrigado
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default Upsell;