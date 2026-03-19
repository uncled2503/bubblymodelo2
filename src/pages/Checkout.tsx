"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCPF, formatPhone, formatZipCode } from "@/lib/formatters";
import { useState, useEffect } from "react";

const orderBumps = [
    { id: "espuma_banho", title: "Espuma Mágica que Muda de Cor", description: "Adicione por apenas", price: 19.90, image: "/images/order-bumps/espuma.png" },
    { id: "brinquedo_extra", title: "+2 Brinquedos Surpresa", description: "Adicione por apenas", price: 14.90, image: "/images/order-bumps/brinquedos.png" },
    { id: "adesivos_parede", title: "Kit de Adesivos Oceano", description: "Adicione por apenas", price: 24.90, image: "/images/order-bumps/adesivos.png" },
    { id: "embalagem_presente", title: "Embalagem Especial para Presente", description: "Adicione por apenas", price: 9.90, image: "/images/order-bumps/presente.png" },
];

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(14, "CPF inválido").max(14, "CPF inválido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(14, "Telefone inválido"),
  zipCode: z.string().min(9, "CEP inválido"),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  orderBumps: z.array(z.string()).optional(),
});

const Checkout = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      email: "",
      phone: "",
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      orderBumps: [],
    },
  });

  const BASE_PRICE = 175.90; // Preço do "Kit Aventura em Dobro"
  const [total, setTotal] = useState(BASE_PRICE);
  const selectedBumpsIds = form.watch("orderBumps") || [];

  useEffect(() => {
    const bumpsTotal = selectedBumpsIds.reduce((acc, bumpId) => {
        const item = orderBumps.find(ob => ob.id === bumpId);
        return acc + (item ? item.price : 0);
    }, 0);
    setTotal(BASE_PRICE + bumpsTotal);
  }, [selectedBumpsIds]);

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    const toastId = showLoading("Enviando seu pedido...");
    
    const selectedBumpsLabels = values.orderBumps
        ?.map(id => orderBumps.find(b => b.id === id)?.title)
        .filter(Boolean)
        .join(", ") || "";

    const { data, error } = await supabase.from("leads").insert({
        full_name: values.fullName,
        cpf: values.cpf,
        email: values.email,
        phone: values.phone,
        zip_code: values.zipCode,
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
        order_bumps: selectedBumpsLabels,
    }).select("id").single();

    dismissToast(toastId);

    if (error || !data) {
        showError("Ocorreu um erro ao enviar seu pedido. Tente novamente.");
        console.error("Error inserting lead:", error);
    } else {
        showSuccess("Seu pedido foi recebido! Só mais um passo...");
        form.reset();
        navigate(`/upsell/${data.id}`);
    }
  }

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container max-w-4xl mx-auto py-16 px-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Finalizar Compra</CardTitle>
            <CardDescription>Preencha seus dados para completar o pedido.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Informações Pessoais</h3>
                    <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="cpf" render={({ field }) => (<FormItem><FormLabel>CPF</FormLabel><FormControl><Input placeholder="000.000.000-00" {...field} onChange={(e) => field.onChange(formatCPF(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefone</FormLabel><FormControl><Input placeholder="(XX) XXXXX-XXXX" {...field} onChange={(e) => field.onChange(formatPhone(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="seu@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Endereço de Envio</h3>
                    <FormField control={form.control} name="zipCode" render={({ field }) => (<FormItem><FormLabel>CEP</FormLabel><FormControl><Input placeholder="00000-000" {...field} onChange={(e) => field.onChange(formatZipCode(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="street" render={({ field }) => (<FormItem><FormLabel>Rua</FormLabel><FormControl><Input placeholder="Nome da sua rua" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="number" render={({ field }) => (<FormItem><FormLabel>Número</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="complement" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Complemento</FormLabel><FormControl><Input placeholder="Apto, bloco, etc. (opcional)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={form.control} name="neighborhood" render={({ field }) => (<FormItem><FormLabel>Bairro</FormLabel><FormControl><Input placeholder="Seu bairro" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>Cidade</FormLabel><FormControl><Input placeholder="Sua cidade" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>Estado</FormLabel><FormControl><Input placeholder="UF" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-extrabold text-teal-600">🔥 Sim, eu quero turbinar meu pedido! 🔥</h3>
                        <p className="text-gray-600 mt-1">Selecione abaixo para adicionar esses itens exclusivos com um super desconto. <span className="font-bold">Oferta válida apenas nesta página!</span></p>
                    </div>
                    <FormField
                      control={form.control}
                      name="orderBumps"
                      render={() => (
                        <FormItem className="space-y-4">
                          {orderBumps.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="orderBumps"
                              render={({ field }) => {
                                const isChecked = field.value?.includes(item.id);
                                return (
                                  <FormItem
                                    key={item.id}
                                    className={`flex flex-row items-center gap-4 rounded-xl border-2 p-4 transition-all cursor-pointer ${isChecked ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                    onClick={() => {
                                        const newValue = isChecked
                                        ? field.value?.filter((value) => value !== item.id)
                                        : [...(field.value || []), item.id];
                                        field.onChange(newValue);
                                    }}
                                  >
                                    <img src={item.image} alt={item.title} className="w-20 h-20 rounded-md object-cover flex-shrink-0" />
                                    <div className="flex-grow">
                                        <FormLabel className="font-bold text-lg text-gray-800 cursor-pointer">
                                            {item.title}
                                        </FormLabel>
                                        <p className="text-gray-600">{item.description} <span className="font-bold text-green-600">{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
                                    </div>
                                    <FormControl>
                                        <Checkbox
                                            checked={isChecked}
                                            className="h-6 w-6"
                                        />
                                    </FormControl>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <div className="space-y-2 rounded-lg bg-gray-100 p-6">
                    <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>
                    <div className="flex justify-between text-lg">
                        <span>Kit Aventura em Dobro</span>
                        <span className="font-semibold">{BASE_PRICE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    {selectedBumpsIds.map(bumpId => {
                        const item = orderBumps.find(ob => ob.id === bumpId);
                        if (!item) return null;
                        return (
                            <div key={item.id} className="flex justify-between text-lg text-gray-600">
                                <span>{item.title}</span>
                                <span className="font-semibold">{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                        )
                    })}
                    <div className="border-t border-gray-300 my-2 !mt-4 !mb-2"></div>
                    <div className="flex justify-between text-2xl font-bold text-gray-800">
                        <span>Total</span>
                        <span>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg h-14 shine-effect">
                  Finalizar Compra e Pagar {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;