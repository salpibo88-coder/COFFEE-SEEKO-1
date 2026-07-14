import React from 'react';

const CoffeeSeekoInfo = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#e1eee1] px-8 py-20">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Header Section: Scaled up for 17.3-inch display */}
        <div className="text-center mb-16">
          <span className="block text-xl md:text-2xl font-black text-[#22c55e] tracking-[0.3em] uppercase mb-6">
            WHY CHOOSE COFFEE SEEKO?
          </span>
          <h2 className="text-4xl md:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Brew your way at our cafe or on the go, <br className="hidden md:block" />
            all starting at just $1.25
          </h2>
        </div>

        {/* Feature Grid: Full width and responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              title: "Premium Quality", 
              desc: "We source the finest beans to ensure every cup delivers a rich, aromatic experience at an unbeatable price of $1.25." 
            },
            { 
              title: "Hybrid Experience", 
              desc: "Whether you want to relax in our ambient Phnom Penh cafes or need a quick cup via our app, we provide both." 
            },
            { 
              title: "Seamless Payments", 
              desc: "Experience fast, secure, and hassle-free transactions through our integration with all major local banks." 
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:border-emerald-200 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Tagline Footer */}
        <div className="mt-2 text-center">
          <p className="text-2xl md:text-2xl text-gray-800 font-medium italic border-t border-gray-200 pt-10">
            Fast, convenient, and budget-friendly — Coffee SEEko is designed to fit your lifestyle.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CoffeeSeekoInfo;