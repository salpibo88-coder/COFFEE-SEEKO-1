"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    heading: <>COFFEE<br />SEEKO SHOP</>,
    sub: <>Every sip tells <span className="text-[#e53935] font-extrabold">a story.</span></>,
    body: "SEEKO brings you hand-picked single-origin beans roasted to perfection — crafted for those who take their coffee seriously.",
    image: "https://png.pngtree.com/png-clipart/20240810/original/pngtree-flying-cup-of-coffee-with-splash-and-png-image_15739217.png",
  },
  {
    id: 2,
    heading: <>SEEKO<br />Fresh Every Week</>,
    sub: <>Small-batch craft, <span className="text-red-500 font-extrabold">big soul.</span></>,
    body: "From Ethiopian highlands to Sumatran rainforests — SEEKO sources only the world's finest beans, roasted fresh for you.",
    image: "https://png.pngtree.com/png-clipart/20240810/original/pngtree-flying-cup-of-coffee-with-splash-and-png-image_15739217.png",
  },
];

const INTERVAL = 5000;

export default function ProductSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = slides[index];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#A8E6C3]"
      style={{
        backgroundImage: "radial-gradient(circle, #85c985 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 80, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -80, scale: 0.96 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-full px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20 2xl:px-28 3xl:px-40">
            <div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">

              {/* TEXT */}
              <div className="flex flex-col items-start text-left w-1/2 md:w-5/12
                              py-4
                              sm:py-6
                              md:py-8
                              lg:py-10
                              xl:py-12
                              2xl:py-14
                              3xl:py-16">
                <h1 className="font-black leading-tight text-[#111827] tracking-tight whitespace-nowrap
                               text-xl
                               sm:text-3xl
                               md:text-3xl
                               lg:text-4xl
                               xl:text-5xl
                               2xl:text-8xl
                               3xl:text-9xl">
                  {slide.heading}
                </h1>
                <p className="mt-1 sm:mt-2 md:mt-3 font-bold text-gray-900 leading-snug
                              text-[10px]
                              sm:text-sm
                              md:text-base
                              lg:text-lg
                              xl:text-xl
                              2xl:text-3xl
                              3xl:text-4xl">
                  {slide.sub}
                </p>
                <p className="mt-1 sm:mt-2 text-gray-600 hidden sm:block
                              max-w-45 sm:max-w-xs md:max-w-55 lg:max-w-sm xl:max-w-md 2xl:max-w-lg 3xl:max-w-xl
                              text-[10px]
                              sm:text-xs
                              md:text-xs
                              lg:text-sm
                              xl:text-base
                              2xl:text-xl
                              3xl:text-2xl">
                  {slide.body}
                </p>
                <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 flex gap-2 sm:gap-3 flex-wrap">
                  <a
                    href="/shop"
                    className="bg-[#d0ff00] border-[#ffffff] border-2 text-black font-bold uppercase tracking-widest rounded-full
                               hover:bg-[#75ee71] transition
                               text-[7px] px-2 py-1
                               sm:text-[10px] sm:px-4 sm:py-2
                               md:text-[11px] md:px-5 md:py-2.5
                               lg:text-xs lg:px-6 lg:py-3
                               2xl:text-base 2xl:px-9 2xl:py-4
                               3xl:text-base 3xl:px-9 3xl:py-4"
                  >
                    Shop Now
                  </a>
                  <a
                    href="/menu"
                    className="border-2 border-[#ffffff] text-[#111827] font-bold uppercase tracking-widest rounded-full
                               hover:bg-[#111827]/10 transition
                               text-[7px] px-2 py-1
                               sm:text-[10px] sm:px-4 sm:py-2
                               md:text-[11px] md:px-5 md:py-2.5
                               lg:text-xs lg:px-6 lg:py-3
                               2xl:text-base 2xl:px-9 2xl:py-4
                               3xl:text-base 3xl:px-9 3xl:py-4"
                  >
                    View Menu
                  </a>
                </div>
              </div>

              {/* IMAGE WITH FLOATING ANIMATION */}
              <div className="w-1/2 md:w-7/12 flex items-end justify-center">
                <motion.div
                  animate={{
                    y: [-12, 12, -12],
                    rotate: [-1.5, 1.5, -1.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative
                             w-36 h-36
                             sm:w-60 sm:h-60
                             md:w-72 md:h-72
                             lg:w-96 lg:h-96
                             xl:w-[30rem] xl:h-[30rem]
                             2xl:w-[38rem] 2xl:h-[38rem]
                             3xl:w-[48rem] 3xl:h-[48rem]"
                >
                  <Image
                    src={slide.image}
                    alt="Coffee Splash"
                    fill
                    priority
                    className="object-contain object-bottom drop-shadow-2xl"
                    unoptimized
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-1 sm:left-3 lg:left-4 top-1/2 -translate-y-1/2 z-30
                   w-6 h-6 sm:w-9 sm:h-9 lg:w-10 lg:h-10 3xl:w-14 3xl:h-14
                   rounded-full bg-[#beeed3] hover:bg-white shadow-md transition
                   flex items-center justify-center"
      >
        <FiChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 3xl:w-7 3xl:h-7" />
      </button>
      <button
        onClick={next}
        className="absolute right-1 sm:right-3 lg:right-4 top-1/2 -translate-y-1/2 z-30
                   w-6 h-6 sm:w-9 sm:h-9 lg:w-10 lg:h-10 3xl:w-14 3xl:h-14
                   rounded-full bg-[#beeed3] hover:bg-white shadow-md transition
                   flex items-center justify-center"
      >
        <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 3xl:w-7 3xl:h-7" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-4 lg:bottom-5 3xl:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 3xl:h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-[#92ebb7] w-5 sm:w-6 lg:w-8 3xl:w-12"
                : "w-2 3xl:w-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}