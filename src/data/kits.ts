export interface Kit {
  id: number;
  title: string;
  price: string;
  originalPrice: string;
  items: number;
  save: string | null;
  bestChoice: boolean;
  gift: string;
}

export const kits: Kit[] = [
  { id: 1, title: "Kit Explorador", price: "97,90", originalPrice: "149,90", items: 12, save: null, bestChoice: false, gift: "Toalhinha Mágica que Cresce na Água" },
  { id: 2, title: "Kit Aventura em Dobro", price: "175,90", originalPrice: "299,80", items: 24, save: "123,90", bestChoice: true, gift: "Toalhinha Mágica + Rede Organizadora para Brinquedos" },
  { id: 3, title: "Kit Família Mágica", price: "249,90", originalPrice: "449,70", items: 36, save: "199,80", bestChoice: false, gift: "Toalhinha + Rede Organizadora + Livro de Colorir à Prova d'Água" },
];