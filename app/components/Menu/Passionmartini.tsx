"use client";
import Image from "next/image";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";

const pinacoladaItems = [
  { name: "Classic Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://www.craftzero.com.au/cdn/shop/files/Naked-Life-Non-Alcoholic-Passion-Martini-250ml-Craftzero-34617975800067.png?v=1779312807&width=1946" },
  { name: "Mango Piña Colada",   category: "Cocktail Blend", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-shot-white-background-png-image_18489148.webp" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-photography-png-image_18489142.webp" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://lyres.com/cdn/shop/files/USAUUKEU_Italian_Spritz_ROPP_white_background_with_drink_2.png?v=1767102009" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://lyres.com/cdn/shop/files/UKEU_RosaNegroniSet.png?v=1765471454" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://media.istockphoto.com/id/513932740/photo/coca-cola-fanta-and-sprite-can.jpg?s=612x612&w=0&k=20&c=dnCW_KVXX3Y9crN3TQ1zDHgKNqLLDy0k0djEnQMOt-M=" },
  { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://st.depositphotos.com/1024764/1853/i/450/depositphotos_18538825-stock-photo-group-of-various-soda-drinks.jpg" },
   { name: "Virgin Piña Colada",  category: "Mocktail",       date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://lyres.com/cdn/shop/files/USAUUKEU_Italian_Spritz_ROPP_white_background_with_drink_2.png?v=1767102009" },
];

export default function Pinacolada() {
  const [buying, setBuying] = useState<{ name: string; price: string; img: string; category: string } | null>(null);

  return (
    <>
      <div className="bg-white py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
            GRID CONFIGURATION:
            grid-cols-2: 2 columns on mobile
            md:grid-cols-3: 3 columns on tablet
            xl:grid-cols-4: 4 columns on desktop
        */}
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
  );
}