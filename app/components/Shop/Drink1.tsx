"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";

const newArrivals = [
  { name: "Coffee TeaKhoj", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://thumbs.dreamstime.com/b/iced-coffee-whipped-cream-bubble-tea-pearls-isolated-white-background-refreshing-topped-chocolate-shavings-432814821.jpg" },
  { name: "Coffee Milk", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://png.pngtree.com/png-vector/20251204/ourmid/pngtree-iced-latte-in-clear-plastic-cup-with-red-straw-and-ice-png-image_18103196.webp" },
  { name: "Coffee Kheav", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://png.pngtree.com/png-clipart/20241110/original/pngtree-isolate-iced-coffee-on-a-white-transparent-background-png-image_16857863.png" },
  { name: "Passion Cream", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://www.sunnysyrup.com/proimages/recipe/04Fruit_Tea/15%20Mango%20Green%20Tea%20with%20Cheese%20Cream%20Topping.jpg" },
  { name: "Coffee Khoj", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://aeoncambodia.sgp1.digitaloceanspaces.com/image/catalog/product/2323526000001-d.jpg" },
  { name: "Coffee Doug", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://thumbs.dreamstime.com/b/iced-coffee-latte-plastic-cup-isolated-white-background-c-clipping-path-included-69896396.jpg" },
  { name: "Coffee Chocolate", category: "Coffee SEEKO", date: "May 25, 2024", price: "5,000៛ ($1.25)", img: "https://static.vecteezy.com/system/resources/previews/061/482/190/non_2x/clear-plastic-cup-filled-with-double-chocolate-chip-frappe-isolated-on-white-background-photo.jpg" },
];


export default function NewArrivalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white py-2 sm:py-3 md:py-4 lg:py-4 xl:py-5 2xl:py-5 w-full max-w-400 2xl:max-w-450 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative group">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg">
          <FiChevronLeft size={20} />
        </button>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none" }}>
          {newArrivals.map((p, index) => (
            <div
              key={index}
              className="shrink-0 w-[29vw] xl:w-[21vw] 2xl:w-[16vw] 3xl:w-[14vw] bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-lg transition-all"
            >
              <div className="w-full aspect-square bg-gray-50 rounded-xl mb-3 relative overflow-hidden flex items-center justify-center">
                <span className="absolute top-2 left-2 z-20 text-[7px] md:text-[8px] font-bold text-white px-1.5 py-0.5 rounded-md bg-green-500">NEW</span>
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

        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg">
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
