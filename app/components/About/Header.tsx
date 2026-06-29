'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1a1411]">

      {/* Hero Section */}
      <section className="relative bg-[#ffffff] text-black py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <p className="text-amber-400 uppercase tracking-widest text-sm font-semibold">Our Story</p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              About <span className="text-amber-400">Us</span>
            </h1>
            <p className="text-white/70 text-lg max-w-md leading-relaxed">
              Our story, our passion, our coffee. Every cup we serve carries the heart of our team and the soul of the finest beans worldwide.
            </p>
            <a href="/shop" className="inline-block bg-amber-500 hover:bg-amber-400 text-[#1a1411] font-bold uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-colors">
              Explore Our Shop
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://thumbs.dreamstime.com/b/coffee-shop-staff-cartoon-character-white-background-illustration-coffee-shop-staff-cartoon-character-white-background-239952205.jpg"
              alt="Coffee shop staff"
              className="w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-500 py-8 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-[#1a1411]">
          {[
            { value: "2018", label: "Founded" },
            { value: "12+", label: "Origins" },
            { value: "4.8★", label: "Customer Rating" },
            { value: "3", label: "Cafés in Phnom Penh" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black">{s.value}</p>
              <p className="text-sm font-semibold uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "Who We Are",
            icon: "☕",
            body: "We are a small, independent coffee roastery dedicated to sourcing the finest single-origin beans from around the world. Every cup we serve is a reflection of the farmers, the land, and the craft that brought it to life.",
          },
          {
            title: "Our Mission",
            icon: "🌍",
            body: "To connect people with extraordinary coffee experiences — from the farm to your cup — while supporting sustainable and ethical sourcing practices that benefit growers worldwide.",
          },
          {
            title: "Our Roastery",
            icon: "🔥",
            body: "Founded in 2018, our roastery uses small-batch techniques to bring out the unique character of each origin. We roast fresh weekly so every bag you receive is at peak flavor.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8dfd3] hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="text-xl font-bold text-[#3d2b1f] mb-3">{item.title}</h2>
            <p className="text-[#5a3e2b] leading-relaxed text-sm">{item.body}</p>
          </div>
        ))}
      </section>

      {/* Team CTA */}
      <section className="bg-[#3d2b1f] text-white py-16 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Come Visit Us</h2>
        <p className="text-white/60 max-w-md mx-auto mb-8">We'd love to welcome you in person. Find us at one of our 3 cafés in Phnom Penh.</p>
        <a href="/contact" className="inline-block bg-amber-500 hover:bg-amber-400 text-[#1a1411] font-bold uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-colors">
          Contact Us
        </a>
      </section>

    </div>
  );
}
