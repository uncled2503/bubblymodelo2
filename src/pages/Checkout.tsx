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

const orderBumps = [
    { id: "espuma_banho", label: "Sim, quero adicionar uma espuma de banho mágica que muda de cor por apenas R$ 19,90!", price: 19.90 },
    { id: "brinquedo_extra", label: "Quero adicionar +2 brinquedos surpresa do oceano por apenas R$ 14,90!", price: 14.90 },
    { id: "adesivos_parede", label: "Transforme o banheiro em um oceano! Leve um kit de adesivos temáticos por R$ 24,90.", price: 24.90 },
    { id: "embalagem_presente", label: "Seu pedido é um presente? Adicione nossa embalagem especial com laço por R$ 9,90.", price: 9.90 },
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

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    const toastId = showLoading("Enviando seu pedido...");
    
    const selectedBumps = values.orderBumps?.join(", ") || "";

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
        order_bumps: selectedBumps,
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
                    <h3 className="text-xl font-semibold">Turbine seu Pedido!</h3>
                    <FormField
                      control={form.control}
                      name="orderBumps"
                      render={() => (
                        <FormItem>
                          {orderBumps.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="orderBumps"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-amber-50 border-amber-200"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.label)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.label])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.label
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-amber-900">
                                      {item.label}
                                    </FormLabel>
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

                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">
                  Finalizar Compra e Pagar
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