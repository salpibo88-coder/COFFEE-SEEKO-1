"use client";

import { useRef } from "react";
import { FiChevronRight, FiSearch, FiChevronLeft } from "react-icons/fi";

const categories = [
  { name: "REDCOFFEE", count: "1.25$", img: "redjpg.jpg" },
  { name: "GREENCOFFEE", count: "1.25$", img: "https://thumbs.dreamstime.com/b/green-matcha-latte-isolated-white-background-creamy-texture-vibrant-color-perfect-refreshing-drink-matcha-365772125.jpg" },
  { name: "PINKCOFFEE", count: "1.25$", img: "Pink.jpg" },
  { name: "YELLOWCOFFEE", count: "1.25$", img: "yellow.jpg" },
  { name: "BLUECOFFEE", count: "1.25$", img: "blue.jpg" },
  { name: "ORANGECOFFEE", count: "1.25$", img: "orange.jpg" },
  { name: "CYANCOFFEE", count: "1.25$", img: "cyan.jpg" },
  { name: "MSROONCOFFEE", count: "1.25$", img: "maroon.jpg" },
  { name: "BROWNCOFFEE", count: "1.25$", img: "brown.jpg" },
];

export default function Menufrom() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto py-6 px-4">
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search products..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#37f541]" />
          </div>
          <button className="bg-[#a6eb9d] text-[#000000] px-8 py-3 rounded-xl font-bold hover:bg-[#caf5db] transition">Search</button>
        </div>
      </div>

      <div className="relative group">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black">Shop by Category</h2>
        </div>

        <button onClick={() => scroll("left")} className="absolute -left-4 top-[60%] z-10 p-2 bg-white rounded-full shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity">
          <FiChevronLeft size={20} />
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat, index) => (
            <div key={`${cat.name}-${index}`} className="shrink-0 w-48 border border-gray-100 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition cursor-pointer group">
              <div className="w-full aspect-square relative mb-3 overflow-hidden">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <h3 className="text-sm font-bold leading-tight">{cat.name}</h3>
              <p className="text-xs text-[#2a4931]">{cat.count}</p>
            </div>
          ))}
        </div>

        <button onClick={() => scroll("right")} className="absolute -right-4 top-[60%] z-10 p-2 bg-white rounded-full shadow-lg border opacity-0 group-hover:opacity-100 transition-opacity">
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}