"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import PaymentModal from "@/app/components/Shop/PaymentModal";

const drinks = [
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "1.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "10.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "2.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "15.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "16.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "3.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "7.jpg" },
  { name: "COFFEE SEEKO", category: "COFFEE SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "9.jpg" },
];

type Product = { name: string; price: string; img: string; category: string };

export default function FeaturedDrinksSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [buying, setBuying] = useState<Product | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <>
      <section className="py-4 xl:py-6 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Featured Drinks</h2>
          <button className="text-sm md:text-base font-extrabold text-[#4d4d4d] hover:underline">View all →</button>
        </div>

        <div className="relative group">
          <button onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FiChevronLeft size={20} />
          </button>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
            {drinks.map((p, index) => (
              <div key={index}
                className="shrink-0 flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] xl:w-[calc(16.666%-14px)]">
                <div className="relative w-full aspect-square bg-gray-50">
                  <span className="absolute top-2 left-2 z-10 text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-md">NEW</span>
                  <Image src={`/${p.img}`} alt={p.name} fill className="object-contain p-3" unoptimized />
                </div>
                <div className="flex flex-col flex-1 p-3">
                  <h3 className="text-sm md:text-base font-extrabold text-gray-800 leading-snug">{p.name}</h3>
                  <p className="text-xs md:text-sm text-gray-400 font-bold mt-0.5">{p.category}</p>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-green-500 font-black text-sm md:text-base">{p.price}</span>
                    <button
                      onClick={() => setBuying({ name: p.name, price: p.price, img: `/${p.img}`, category: p.category })}
                      className="bg-amber-50 text-amber-500 p-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors">
                      <FiShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FiChevronRight size={20} />
          </button>
        </div>
      </section>

      {buying && <PaymentModal product={buying} onClose={() => setBuying(null)} />}
    </>
  );
}
