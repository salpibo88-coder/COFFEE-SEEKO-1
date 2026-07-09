'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  { 
    id: 1, 
    text: "COFFEE SEEKO", 
    sub: "Experience the perfect moment.",
    desc: "Our signature blend is sourced from the highest altitude farms, ensuring a crisp, smooth finish in every single cup.",
    image: "https://png.pngtree.com/png-clipart/20250810/original/pngtree-latte-with-coffee-beans-png-image_21713469.png" 
  },
  { 
    id: 2, 
    text: "BREW YOUR WAY", 
    sub: "At our cafe or on the go.", 
    desc: "Whether you prefer a slow-drip pour-over or a lightning-fast espresso, our master baristas craft your drink with precision.",
    image: "https://png.pngtree.com/png-clipart/20250524/original/pngtree-top-view-of-coffee-cup-with-latte-art-png-image_21067778.png" 
  },
  { 
    id: 3, 
    text: "PREMIUM BEANS", 
    sub: "Starting at just $1.25.", 
    desc: "We believe quality should be accessible. Discover our curated selection of ethical, organic, and flavor-rich coffee beans.",
    image: "https://png.pngtree.com/png-clipart/20231226/original/pngtree-coffee-splash-with-beans-on-a-wooden-table-background-png-image_13939278.png" 
  }
];

const CoffeeSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#e2eee2] flex items-center justify-center overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 border-2 border-[#c5a059]/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-10 gap-10">
        
        {/* Text Section */}
        <div className="flex-1 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`text-${current}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[#c5a059] font-bold tracking-[0.2em] uppercase">{slides[current].sub}</h2>
              <h1 className="text-7xl md:text-9xl font-black text-[#2a1d17] tracking-tighter leading-[0.85]">
                {slides[current].text}
              </h1>
              <p className="mt-6 text-lg text-[#4a3120] max-w-md leading-relaxed">
                {slides[current].desc}
              </p>
              <button className="mt-8 px-8 py-4 bg-[#3d2b1f] text-[#d4b996] rounded-full font-bold uppercase tracking-widest hover:bg-[#2a1d17] transition-all">
                Order Now
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Section (Transparent PNGs) */}
        <div className="flex-1 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.img 
              key={`img-${current}`}
              src={slides[current].image}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="max-w-[400px] md:max-w-[550px] h-auto drop-shadow-2xl"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-12 flex gap-3">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${current === idx ? 'bg-[#3d2b1f] w-12' : 'bg-[#3d2b1f]/20 w-4'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CoffeeSlideshow;