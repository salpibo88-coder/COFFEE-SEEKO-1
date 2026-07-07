'use client';

export default function CoffeeLanding() {
  return (
    <div
      className="h-159 text-black font-sans overflow-hidden"
      style={{
        backgroundColor: '#A8E6C3',
        backgroundImage: 'radial-gradient(circle, #89c083 1.5px, transparent 1.5px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl tracking-[8px] text-black/80 font-semibold">
          COFFEE SEEKO
        </div>
      </div>

      {/* Hero Section - Much Bigger Image */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-12 xl:gap-16">
        
        {/* Left: Text Content (slightly smaller to give image more space) */}
        <div className="flex-1 max-w-lg">
          <h1 className="text-[56px] sm:text-[64px] lg:text-[72px] xl:text-[84px] 2xl:text-[92px] font-bold leading-[0.9] tracking-[-3px]">
            TIME TO DISCOVER<br />COFFEE HOUSE
          </h1>
         
          <p className="mt-6 max-w-sm text-lg text-black/70">
            The coffee is brewed by first roasting the green coffee beans over hot coals in a brazier, given an opportunity to sample.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button 
              className="px-9 py-3.5 bg-[#E8C9A0] hover:bg-[#d9b98a] text-black font-semibold text-sm tracking-wider rounded-lg transition-all active:scale-[0.985]"
            >
              TASTY COFFEE
            </button>
           
            <button 
              className="px-9 py-3.5 border border-black/80 hover:bg-black hover:text-white text-sm tracking-wider rounded-lg transition-all active:scale-[0.985]"
            >
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Right: MUCH BIGGER Hero Image */}
        <div className="flex-1 w-full max-w-[820px] lg:max-w-[900px] xl:max-w-[1000px]">
          <img 
            src="https://png.pngtree.com/png-clipart/20240103/original/pngtree-cup-of-coffee-with-splash-and-beans-png-image_14002919.png" 
            alt="Premium coffee cup with splash and beans" 
            className="w-full h-auto object-contain drop-shadow-[0_25px_80px_rgb(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-3 text-black/60">
          <div className="w-9 h-9 flex items-center justify-center border border-black/30 rounded-full">
            <span className="text-xl">☕</span>
          </div>
          <span className="text-xs tracking-[2px] font-medium">SCROLL TO EXPLORE</span>
        </div>
      </div>
    </div>
  );
}
