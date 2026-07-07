"use client";

import { FiCoffee } from "react-icons/fi";

export default function CoffeeSeekoResponsive() {
  return (
    <div className="h-120 bg-[#e1eee1] p-6 md:p-12 lg:p-24 flex items-center justify-center">
      
      {/* Grid container: stays side-by-side on all screens */}
      <div className="max-w-7xl w-full grid grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Image */}
        <div className="flex justify-center lg:justify-end">
          <img 
            src="/form1.png" 
            alt="Iced Coffee Seeko" 
            className="w-full max-w-[150px] md:max-w-[300px] lg:max-w-[450px] h-auto object-contain animate-bounce drop-shadow-xl" 
          />
        </div>

        {/* Right Column: Responsive Text Content */}
        <div className="space-y-3 md:space-y-6">
          <div className="text-[#0026ff]">
             <FiCoffee size={32} className="md:size-[48px]" />
          </div>
          {/* Responsive Paragraph: Smaller text (text-xs/sm) for mobile readability */}
          <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-sm">
            Coffee Seeko combines minimalist, Japanese-inspired architecture with 
            warm Cambodian hospitality. We use hand-selected Arabica beans, roasted 
            in small batches to provide a complex, aromatic profile that offers 
            a true serene escape for every coffee lover.
          </p>

          <button className="bg-[#0026ff] hover:bg-blue-700 text-white font-bold py-2 md:py-4 px-4 md:px-8 rounded-lg text-[10px] md:text-sm lg:text-base transition-all flex items-center gap-2">
            EXPLORE MENU →
          </button>
        </div>
      </div>
    </div>
  );
}