"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";
import { getAllDrinks } from "./menu";

export default function Pinacolada() {
  const [buying, setBuying] = useState<any>(null);
  // ១. បង្កើត state ដើម្បីផ្ទុកទិន្នន័យពី API
  const [drinks, setDrinks] = useState<any[]>([]); 

  useEffect(() => {
    getAllDrinks()
      .then((data) => {
        // ២. បញ្ជូនទិន្នន័យដែលទាញបាន ចូលទៅក្នុង state
        setDrinks(data); 
      })
      .catch((err) => {
        console.error("មានកំហុសពេលហៅ API:", err);
      });
  }, []);

  return (
    <>
      <div className="bg-white py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* ៣. ផ្លាស់ប្តូរពី pinacoladaItems.map មកជា drinks.map */}
          {drinks.map((p, i) => (
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