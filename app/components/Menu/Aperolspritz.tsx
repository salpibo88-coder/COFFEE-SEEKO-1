"use client";
import Image from "next/image";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";

const aperolSpritzItems = [
  { name: "Classic Piña Colada", category: "Coffee SEEKO", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://png.pngtree.com/png-clipart/20250224/original/pngtree-slushies-isolated-on-white-background-png-image_20505580.png" },
  { name: "Frozen Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "9,000៛ ($2.25)", img: "https://png.pngtree.com/png-vector/20240628/ourmid/pngtree-glass-of-aperol-spritz-cocktail-isolated-png-image_12915431.png" },
  { name: "Coconut Piña Colada", category: "Coffee SEEKO", date: "May 25, 2024", price: "9,500៛ ($2.40)", img: "https://thumbs.dreamstime.com/b/coca-cola-fanta-sprite-glass-bottles-chisinau-moldova-november-white-background-three-drinks-most-popular-brands-65196256.jpg" },
  { name: "Mango Piña Colada",   category: "Coffee SEEKO", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://png.pngtree.com/png-vector/20240524/ourmid/pngtree-fresh-lemon-soft-drink-in-aluminum-can-on-white-background-for-png-image_12492702.png" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-kUc3oO7rWNnWhrOcHkR8fG4kLN_Vi8pvHRk6IcOhJH_ok_IFMWVMpS2&s=10" },
  { name: "Virgin Piña Colada",  category: "Coffee SEEKO", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-shot-white-background-png-image_18489145.webp" },
];

export default function Pinacolada() {
  const [buying, setBuying] = useState<{ name: string; price: string; img: string; category: string } | null>(null);

  return (
    <>
      <div className="bg-white py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Setup: 2 columns mobile, 3 columns tablet, 4 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {aperolSpritzItems.map((p, i) => (
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
                  <button 
                    onClick={() => setBuying({ name: p.name, price: p.price, img: p.img, category: p.category })} 
                    className="bg-amber-50 text-amber-500 p-1.5 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
                  >
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