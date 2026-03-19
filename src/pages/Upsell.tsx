"use client";

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { showError, showLoading, dismissToast } from "@/utils/toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const upsellOffers = [
    {
        title: "Clube da Aventura Aquática (Assinatura)",
        description: "Receba um kit novo com temas e surpresas exclusivas todo mês com 25% de desconto!",
        price: "R$ 73,40/mês",
        image: "/images/produto-variedade.png"
    },
    {
        title: "Kit Anual de Diversão no Banho",
        description: "Garanta a diversão pelo ano inteiro! Leve nosso Mega Kit com 50 bombas de banho, estojo organizador e um roupão infantil temático com 40% OFF.",
        price: "R$ 269,90",
        image: "/images/produto-caixa.png"
    },
    {
        title: "Kit SPA Infantil Completo",
        description: "Adicione nosso Kit SPA com shampoo suave, loção hidratante e sais de banho relaxantes (100% natural) por um preço especial.",
        price: "R$ 89,90",
        image: "/images/spa-time.png"
    }
];

const Upsell = () => {
    const navigate = useNavigate();
    const { leadId } = useParams();

    const handleAcceptOffer = async (offerTitle: string) => {
        if (!leadId) {
            showError("ID do pedido não encontrado.");
            return navigate("/thank-you");
        }

        const toastId = showLoading("Adicionando ao seu pedido...");

        const { error } = await supabase
            .from("leads")
            .update({ upsell_offer: offerTitle })
            .eq("id", leadId);

        dismissToast(toastId);

        if (error) {
            showError("Ocorreu um erro. Tente novamente.");
            console.error("Error updating lead with upsell:", error);
        }

        navigate("/thank-you");
    };

    const handleDeclineOffer = () => {
        navigate("/thank-you");
    };

    return (
        <div className="bg-gray-50">
            <Header />
            <main className="container max-w-4xl mx-auto py-16 px-6 text-center">
                <h1 className="text-4xl font-extrabold text-teal-600">Espere! Sua compra ainda não acabou...</h1>
                <p className="mt-4 text-xl text-gray-700">
                    Aproveite uma dessas ofertas exclusivas e torne a experiência ainda mais mágica!
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {upsellOffers.map((offer, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardHeader>
                                <img src={offer.image} alt={offer.title} className="rounded-t-lg aspect-video object-cover" />
                                <CardTitle className="mt-4">{offer.title}</CardTitle>
                                <CardDescription>{offer.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end">
                                <p className="text-2xl font-bold text-gray-800 my-4">{offer.price}</p>
                                <Button onClick={() => handleAcceptOffer(offer.title)} className="w-full bg-green-500 hover:bg-green-600">
                                    Sim, eu quero!
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Button onClick={handleDeclineOffer} variant="link" className="mt-12 text-gray-600">
                    Não, obrigado. Talvez na próxima vez.
                </Button>
            </main>
            <Footer />
        </div>
    );
};

export default Upsell;