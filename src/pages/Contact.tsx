import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white">
      <Header />
      <main className="container max-w-5xl mx-auto py-16 px-6">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">Entre em Contato</h1>
            <p className="mt-4 text-lg text-gray-600">
                Tem alguma dúvida ou sugestão? Adoraríamos ouvir de você!
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mt-12">
            <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Envie uma mensagem</h2>
                <form className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="font-semibold">Nome</Label>
                        <Input id="name" type="text" placeholder="Seu nome completo" className="mt-2"/>
                    </div>
                    <div>
                        <Label htmlFor="email" className="font-semibold">Email</Label>
                        <Input id="email" type="email" placeholder="seu@email.com" className="mt-2"/>
                    </div>
                    <div>
                        <Label htmlFor="message" className="font-semibold">Mensagem</Label>
                        <Textarea id="message" placeholder="Digite sua mensagem aqui..." rows={5} className="mt-2"/>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">Enviar Mensagem</Button>
                </form>
            </div>
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800">Informações de Contato</h2>
                <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-gray-600">suporte@tikatoys.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Telefone</h3>
                        <p className="text-gray-600">(11) 98765-4321</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-teal-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Endereço</h3>
                        <p className="text-gray-600">Rua da Imaginação, 123, São Paulo - SP</p>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;