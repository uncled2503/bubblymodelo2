"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer id="contato" className="bg-gray-800 text-white">
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src="/images/logotipo.png" alt="Tika Toys" className="h-24" />
            <p className="mt-2 text-gray-400">Unleashing a World of Joy!</p>
          </div>
          <div>
            <h4 className="font-semibold">Links Rápidos</h4>
            <ul className="mt-2 space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Newsletter</h4>
            <p className="mt-2 text-gray-400">Receba ofertas exclusivas!</p>
            <div className="flex mt-2">
              <Input type="email" placeholder="Seu e-mail" className="bg-gray-700 border-gray-600 text-white" />
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600">Inscrever</Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Pagamento Seguro</h4>
            <p className="mt-2 text-gray-400">Aceitamos os principais cartões e PIX.</p>
            {/* Placeholder for payment flags */}
            <div className="flex space-x-2 mt-2">
                <span>💳 Visa</span> <span> Mastercard</span> <span> PIX</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Tika Toys. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};