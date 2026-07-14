'use client';

export default function CoffeeLanding() {
  return (
    <div className="relative  h-189 w-full overflow-hidden">
      
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/060/004/938/large_2x/coffee-cup-on-plain-background-with-copyspace-for-text-minimalist-style-aesthetic-drink-focus-free-photo.jpeg" 
          alt="Coffee Background" 
          className="w-full h-full object-cover"
        />
        {/* Optional Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 h-190 flex flex-col px-6 sm:px-12 py-10 justify-between">
        
        {/* Top Left Header */}
        <nav>
          <div className="text-white font-bold tracking-[4px] text-lg">COFFEE SEEKO</div>
        </nav>

        {/* Hero Text Section */}
       {/* Hero Text Section */}
          {/* បានបង្កើនតម្លៃ mt- ដើម្បីរុញអត្ថបទឱ្យឡើងទៅលើកាន់តែខ្ពស់ */}
          <div className="max-w-3xl  xl:mt-[-350px] 2xl:mt-[-500px]">
            <h1 className="text-6xl  sm:text-7xl lg:text-9xl font-black leading-[0.9] track80ng-tighter text-amber-800 text-shadow-[2px_2px_1px_black] mb-6">
              TIME TO DISCOVER<br />COFFEE HOUSE
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg">
              The coffee is brewed by first roasting the green coffee beans over hot coals in a brazier, given an opportunity to sample.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 w-70 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all">
                TASTY COFFEE
              </button>
              <button className="px-8 w-70 py-4 border-1 bg-black border-white text-white font-bold rounded-full hover:bg-white/20 transition-all">
                LEARN MORE
              </button>
            </div>
        </div>

      </div>
    </div>
  );
}