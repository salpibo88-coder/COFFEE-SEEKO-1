'use client';
import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, text: "COFFEE SEEKO", sub: "Experience the perfect moment." },
  { id: 2, text: "BREW YOUR WAY", sub: "At our cafe or on the go." },
  { id: 3, text: "PREMIUM BEANS", sub: "Starting at just $1.25." }
];

const CoffeeSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#e2eee2] flex items-center justify-center overflow-hidden transition-all duration-1000">
      
      {/* Decorative Gold Leaf Overlays */}
      <div className="absolute top-10 left-10 w-48 h-48 border-l-2 border-t-2 border-[#c5a059] opacity-30" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border-r-2 border-b-2 border-[#c5a059] opacity-30" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 max-w-7xl mx-auto">
        
        {/* Text Section */}
        <div key={current} className="text-center md:text-left flex-1 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-8xl font-black text-[#2a1d17] tracking-tighter leading-[0.9] drop-shadow-md">
            {slides[current].text}
          </h1>
          <p className="mt-6 text-xl text-[#4a3120] font-medium tracking-wide">
            {slides[current].sub}
          </p>
          <button className="mt-8 px-10 py-4 bg-[#3d2b1f] text-[#d4b996] border border-[#d4b996] rounded-full font-bold uppercase tracking-widest hover:bg-[#2a1d17] transition-all shadow-2xl">
            Order Now
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center animate-in zoom-in duration-1000">
          <img 
            src="https://png.pngtree.com/png-vector/20250326/ourmid/pngtree-flying-coffee-cup-beans-clipart-png-image_15876291.png"
            alt="Coffee Seeko"
            className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Premium Indicators */}
      <div className="absolute bottom-10 flex gap-4">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 w-3 rounded-full border-2 border-[#3d2b1f] transition-all duration-300 ${current === idx ? 'bg-[#3d2b1f] scale-110' : 'bg-transparent'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CoffeeSlideshow;