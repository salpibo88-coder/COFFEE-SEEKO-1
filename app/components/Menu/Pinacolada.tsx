"use client";
import Image from "next/image";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
const pinacoladaItems = [
  { name: "Classic Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "8,000៛ ($2.00)", img: "https://thumbs.dreamstime.com/b/tasty-pina-colada-cocktail-white-background-236924205.jpg" },
  { name: "Frozen Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "9,000៛ ($2.25)", img: "https://static.vecteezy.com/system/resources/previews/026/516/065/non_2x/ideal-pina-colada-cocktail-in-a-hurricane-glass-isolated-on-white-background-photo.jpg" },
  { name: "Coconut Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "9,500៛ ($2.40)", img: "https://st.depositphotos.com/16122460/53628/i/1600/depositphotos_536284946-stock-photo-tasty-pina-colada-cocktail-white.jpg" },
  { name: "Mango Piña Colada", category: "Cocktail Blend", date: "May 25, 2024", price: "10,000៛ ($2.50)", img: "https://thumbs.dreamstime.com/b/glass-pina-colada-cocktail-white-background-pineapple-milkshake-transparent-glass-glass-pina-colada-cocktail-293395328.jpg" },
  { name: "Virgin Piña Colada", category: "Mocktail", date: "May 25, 2024", price: "7,000៛ ($1.75)", img: "https://static.vecteezy.com/system/resources/previews/026/516/065/non_2x/ideal-pina-colada-cocktail-in-a-hurricane-glass-isolated-on-white-background-photo.jpg" },
];
export default function Pinacolada() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };
  return (
    <div className="bg-white py-2 sm:py-3 md:py-4 lg:py-4 xl:py-5 2xl:py-5 w-full max-w-400 2xl:max-w-450 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg"
        >
          <FiChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-3 lg:gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {pinacoladaItems.map((p, index) => (
            <div
              key={index}
              className="shrink-0 w-[28vw] sm:w-[29vw] md:w-[29vw] lg:w-[24vw] xl:w-[18vw] 2xl:w-[14vw] bg-white border border-gray-100 rounded-2xl p-2 sm:p-3 lg:p-4 flex flex-col hover:shadow-lg transition-all"
            >
              <div className="w-full aspect-square bg-gray-50 rounded-xl mb-1.5 sm:mb-2 lg:mb-3 relative overflow-hidden flex items-center justify-center">
                <span className="absolute top-2 left-2 z-20 text-[7px] md:text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md bg-green-500">
                  NEW
                </span>
                <Image src={p.img} alt={p.name} fill className="object-contain p-2" unoptimized />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="text-[11px] md:text-xs font-extrabold text-gray-800 leading-snug">{p.name}</h3>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mt-0">{p.category}</p>
                <div className="flex items-center justify-between mt-auto pt-0">
                  <span className="text-green-500 font-black text-[11px] md:text-xs">{p.price}</span>
                  <button className="bg-[#fff7e6] text-[#00ffd5] p-1.5 rounded-lg hover:bg-[#f7b500] hover:text-white transition-colors">
                    <FiShoppingCart size={14} />
                  </button>
                </div>
                <p className="text-[7px] md:text-[8px] text-gray-300 pt-1 font-medium">Arrived: {p.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
