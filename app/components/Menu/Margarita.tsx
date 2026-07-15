"use client";
import Image from "next/image";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";


		const newArrivals = [
  { name: "Margarita", category: "Coffee SEEKO", date: "May 25, 2025", price: "5,000? ($1.25)", img: "https://zevia.com/cdn/shop/files/us_energy_RaspberryLime_Dry_NTWT_NewColor.png?v=1755805046" },
  { name: "Margarita", category: "Coffee SEEKO", date: "May 25, 2025", price: "5,000? ($1.25)", img: "https://drinkwildbills.com/cdn/shop/files/WildBills_BigCan_12Pack_2025_UNTAMED_f01f905f-623a-4539-aae8-a3de08363e44.png?v=1762180273" },
  { name: "Margarita", category: "Coffee SEEKO", date: "May 25, 2025", price: "5,000? ($1.25)", img: "https://drinkwildbills.com/cdn/shop/files/WildBills_RocketPop_BigCan_12Pack_2025.png?v=1762177512" },
  { name: "Margarita", category: "Coffee SEEKO", date: "May 25, 2025", price: "5,000? ($1.25)", img: "https://www.kentucky.com/public/latest-news/p0eoiy/picture316269710/alternates/FREE_1200/Red,%20White%20%26%20Roost%20Toasted%20Single%20Barrel%20Bourbon%20Bottle%20Image%20White%20Background.png" },
  { name: "Margarita", category: "Coffee SEEKO", date: "May 25, 2025", price: "5,000? ($1.25)", img: "https://shopmari.gold/cdn/shop/files/65270b59bda17979e8d6f5e03ad5002b0d616f5014c3a2f9bf88dfb440f51472.jpg?v=1758592970&width=533" },
  { name: "Margarita", category: "Coffee SEEKO", date: "May 25, 2025", price: "5,000? ($1.25)", img: "https://www.bundabergrum.com.au/cdn/shop/files/diag_9311866009320-1_2.jpg?v=1777569224" },
];

interface MojitoProps {
  onBuy?: (p: { name: string; price: string; img: string; category: string }) => void;
}

export default function Pinacolada({ onBuy: _onBuy }: MojitoProps) {
  const [buying, setBuying] = useState<{ name: string; price: string; img: string; category: string } | null>(null);

  return (
    <>
      <div className="bg-white py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
            GRID SETUP: 
            grid-cols-2 = 2 columns on mobile
            md:grid-cols-3 = 3 columns on tablet
            xl:grid-cols-4 = 4 columns on large screens
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {newArrivals.map((p, i) => (
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