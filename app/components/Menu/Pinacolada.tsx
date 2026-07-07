"use client";
import Image from "next/image";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";

const pinacoladaItems = [
  { name: "Classic Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://www.theisopurecompany.com/cdn/shop/files/US_Protein_Water_RTD_20OZ_StrawberryKiwi_6077850-Front.png?v=1768318059&width=2000" },
  { name: "Frozen Piña Colada",  category: "Cocktail Blend", date: "May 25, 2024", price: "9,000៛ ($2.25)", img: "https://static.gnc.com.ro/media/catalog/product/i/m/image20260304121005.png" },
  { name: "Coconut Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "9,500៛ ($2.40)", img: "https://8thwonder.com/cdn/shop/files/Ocho_Verde_Agave_Web01.png?v=1765307390&width=1200" },
  { name: "Mango Piña Colada",   category: "Cocktail Blend", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://zevia.com/cdn/shop/files/us_tea_GreenTea_Dry_NTWT.png?v=1755805015" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://www.bargainbooze.co.uk/wp-content/uploads/2025/05/vk-lemon-and-lime.png" },
];

interface PinacoladaProps {
  onBuy?: (p: { name: string; price: string; img: string; category: string }) => void;
}

export default function Pinacolada({ onBuy: _onBuy }: PinacoladaProps) {
  const [buying, setBuying] = useState<{ name: string; price: string; img: string; category: string } | null>(null);

  return (
    <>
      <div className="bg-white py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Changed to grid. Change grid-cols-2 to grid-cols-3 if you want 3 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {pinacoladaItems.map((p, i) => (
            <div key={i} className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                <span className="absolute top-2 left-2 z-10 text-[9px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-md">NEW</span>
                <Image src={p.img} alt={p.name} fill className="object-contain p-3" unoptimized />
              </div>
              <div className="flex flex-col flex-1 p-3">
                <h3 className="text-xs md:text-sm font-extrabold text-gray-800 leading-snug line-clamp-1">{p.name}</h3>
                <p className="text-[10px] md:text-xs text-gray-400 font-bold mt-0.5">{p.category}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-green-500 font-black text-xs md:text-sm">{p.price}</span>
                  <button onClick={() => setBuying({ name: p.name, price: p.price, img: p.img, category: p.category })} className="bg-amber-50 text-amber-500 p-1.5 rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
                    <FiShoppingCart size={14} />
                  </button>
                </div>
                <p className="text-[8px] text-gray-300 mt-1">Arrived: {p.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {buying && <PaymentModal product={buying} onClose={() => setBuying(null)} />}
    </>
  )
}