"use client";

import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Header = () => {
  return (
    <>
      <div className="bg-teal-500 text-white text-center text-sm py-2 px-4 font-semibold">
        🚚 Frete grátis para todo Brasil!
      </div>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container relative flex h-20 max-w-6xl items-center justify-between">
          {/* Left side: nav on desktop, hamburger on mobile */}
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="#inicio" className="transition-colors hover:text-teal-500">Início</a>
              <a href="#oferta" className="transition-colors hover:text-teal-500">Loja</a>
              <a href="#contato" className="transition-colors hover:text-teal-500">Contato</a>
            </nav>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4 mt-8 text-lg">
                    <a href="#inicio" className="transition-colors hover:text-teal-500">Início</a>
                    <a href="#oferta" className="transition-colors hover:text-teal-500">Loja</a>
                    <a href="#contato" className="transition-colors hover:text-teal-500">Contato</a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="/" className="flex items-center">
              <img src="/images/logotipo.png" alt="Tika Toys" className="h-24" />
            </a>
          </div>

          {/* Right side: cart */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};