'use client';

export default function CoffeeLanding() {
  return (
    <div
      className="h-150 w-full font-sans overflow-x-hidden"
      style={{
        backgroundColor: '#A8E6C3',
        backgroundImage: 'radial-gradient(circle, #89c083 1.5px, transparent 1.5px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* Header */}
      <nav className="w-full py-6 px-6 md:px-12 flex justify-start items-center">
        <div className=" text-shadow-[2px_1px_1px_black]  text-xl md:text-2xl lg:text-3xl tracking-[8px] text-[#1F5A3A] font-semibold uppercase animate-pulse">
          Coffee Seeko
        </div>
      </nav>

      {/* Main Content */}
      <main className="w-full px-6 md:px-12 pt-0 pb-10 flex flex-col lg:flex-row items-center justify-center gap-12 min-h-[auto]">
        {/* Left: Images Container */}
        <div className="flex-[1.5] w-full flex justify-center items-center gap-2 animate-[float_4s_ease-in-out_infinite]">
          <img 
            src="https://png.pngtree.com/png-clipart/20240810/original/pngtree-flying-cup-of-coffee-with-splash-and-png-image_15739217.png" 
            alt="Flying coffee cup" 
            className="w-[45%] max-w-[500px] object-contain hover:scale-105 transition-transform duration-300"
          />
          <img 
            src="https://png.pngtree.com/png-clipart/20250103/original/pngtree-coffee-splash-on-transparent-background-png-image_19847354.png" 
            alt="Coffee splash" 
            className="w-[45%] max-w-[500px] object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Text Content with Animation */}
        <div className="flex-1 w-full text-center lg:text-left space-y-6 animate-[slideInUp_1s_ease-out]">
          <h1 className=" text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] text-white drop-shadow-lg animate-[fadeIn_1.5s_ease-in]">
            Everything<br />
            only <span className="line-through decoration-4 animate-pulse text-shadow-[2px_1px_1px_black]  text-[#ff1346]"> $1.25 </span><br />
            Coffee +<br />
            Fresh Brew
          </h1>
          <p className=" text-lg  sm:text-xl text-white font-medium max-w-md mx-auto lg:mx-0 animate-[fadeIn_2s_ease-in]">
            Experience the finest roasted coffee, delivered fresh to your door or available in-store.
          </p>
        </div>
      </main>

      {/* CSS Keyframes for Animation */}
      <style jsx global>{`
        @keyframes slideInUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}