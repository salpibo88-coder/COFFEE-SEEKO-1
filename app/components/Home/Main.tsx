"use client";

import { FiCoffee } from "react-icons/fi";

export default function CoffeeSeekoPremium() {
  return (
    <section className="h-dvh w-full bg-[#e2eee2] flex items-center justify-center p-6 md:p-12 overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#e1eee1] rounded-l-[100px] -z-0 opacity-50 hidden lg:block" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
        
        {/* Left Column: Image with "floating" effect */}
        <div className="flex justify-center lg:justify-end relative">
          <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-3xl  shadow-green-900/10 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-700">
            <img 
              src="/form1.png" 
              alt="Iced Coffee Seeko" 
              className="w-[80%] h-auto object-contain drop-shadow-2xl" 
            />
          </div>
        </div>

        {/* Right Column: Editorial Typography */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="text-[#2d5a27] mb-6">
             <FiCoffee size={48} strokeWidth={1} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
            The Art of <br/> 
            <span className="text-[#2d5a27] italic">Serene Coffee</span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md mb-8">
            Coffee Seeko blends Japanese minimalist architecture with the soul of Cambodia. 
            Experience hand-selected Arabica beans, roasted in small, deliberate batches.
          </p>

          <button className="group bg-gray-900 hover:bg-[#2d5a27] text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-500 flex items-center gap-3 shadow-xl hover:shadow-2xl">
            Explore Menu
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}