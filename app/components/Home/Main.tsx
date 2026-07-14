"use client";

import { FiCoffee } from "react-icons/fi";

export default function CoffeeSereneSection() {
  return (
    <section className="min-h-screen  w-full bg-[#e2eee2] flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16 xl:p-24 overflow-hidden relative">
      
      {/* Background shape */}
      <div className="absolute  top-0 right-0 w-1/3 h-full bg-[#e1eee1] rounded-l-[100px] -z-0 opacity-50 hidden lg:block" />

      <div className="max-w-7xl mt-2 2xl:max-w-[1500px] w-full flex flex-col xl:grid xl:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center z-10 py-6">
        
        {/* TEXT: នៅខាងលើជានិច្ចលើ sm / md / lg (order-1) */}
        <div className="flex flex-col items-center xl:items-start text-center xl:text-left order-1 xl:order-2">
          <div className="text-[#2d5a27] mb-4 sm:mb-6">
            <FiCoffee className="w-10 h-10 sm:w-12 sm:h-12 xl:w-16 xl:h-16" strokeWidth={1} />
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-gray-900 mb-4 sm:mb-6 leading-tight">
            The Art of <br /> 
            <span className="text-[#2d5a27] italic">Serene Coffee</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl xl:text-xl 2xl:text-2xl text-gray-600 leading-relaxed max-w-lg sm:max-w-xl md:max-w-2xl mb-8">
            Coffee Seeko blends Japanese minimalist architecture with the soul of Cambodia. 
            Experience hand-selected Arabica beans, roasted in small, deliberate batches.
          </p>

          <button className="group bg-gray-900 hover:bg-[#2d5a27] text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-sm sm:text-base 2xl:text-lg tracking-widest uppercase transition-all duration-500 flex items-center gap-3 shadow-xl hover:shadow-2xl">
            Explore Menu
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>

        {/* IMAGE: នៅខាងក្រោមលើ sm / md / lg (order-2) */}
        <div className="flex justify-center xl:justify-end relative order-2 xl:order-1">
          <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] xl:w-[550px] xl:h-[550px] 2xl:w-[650px] 2xl:h-[650px] flex items-center justify-center transition-transform duration-700 hover:scale-105">
            <img 
              src="https://png.pngtree.com/png-clipart/20250218/original/pngtree-coffee-cup-transparent-background-png-image_19737464.png" 
              alt="Serene Coffee Cup" 
              className="w-full h-auto object-contain drop-shadow-2xl" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}