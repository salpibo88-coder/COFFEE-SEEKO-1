'use client';
import { Coffee, Globe, Flame } from 'lucide-react'; // Added imports

export default function AboutHeader() {
  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <section
        className="relative w-full h-160 flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #01796F 0%, #01796F 40%, #01796F 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #f5c87a 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-25 -right-25 w-125 h-125 rounded-full bg-amber-500 opacity-10 blur-[120px]" />
        <div className="absolute -bottom-20 -left-15 w-87.5 h-87.5 rounded-full bg-orange-700 opacity-10 blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 w-full flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <span className="inline-block text-amber-400 uppercase tracking-[0.35em] text-xs font-bold border border-amber-400/40 px-4 py-1.5 rounded-full bg-amber-400/10">
              Our Story
            </span>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] text-white">
              About<br />
              <span className="text-amber-400">Coffee</span><br />
              <span className="text-amber-200">Seeko</span>
            </h1>
            <p className="text-white/60 text-lg max-w-md leading-relaxed mx-auto lg:mx-0">
              Every cup we serve carries the heart of our team and the soul of the finest beans from around the world. Born in Phnom Penh, brewed with passion.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="/shop" className="inline-block bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/30">
                Explore Our Shop
              </a>
              <a href="/contact" className="inline-block border border-white/30 hover:border-amber-400 text-white hover:text-amber-400 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all">
                Contact Us
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-amber-400/20" />
              <div className="absolute -inset-8 rounded-3xl border border-amber-400/10" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-2xl">
                <img
                  src="https://thumbs.dreamstime.com/b/coffee-shop-staff-cartoon-character-white-background-illustration-coffee-shop-staff-cartoon-character-white-background-239952205.jpg"
                  alt="Coffee shop staff"
                  className="w-80 md:w-96 object-contain drop-shadow-2xl rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-amber-500 text-black font-black text-sm px-4 py-2 rounded-full shadow-lg">Since 2018</div>
                <div className="absolute -bottom-4 -left-4 bg-[#1a0a00] border border-amber-400/30 text-amber-400 font-bold text-xs px-4 py-2 rounded-full shadow-lg">Phnom Penh, Cambodia</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#f5f0e8] to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="bg-amber-50 py-10 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#1a1411]">
          {[
            { value: '2018', label: 'Founded' },
            { value: '12+', label: 'Bean Origins' },
            { value: '4.8★', label: 'Customer Rating' },
            { value: '3', label: 'Cafés in Phnom Penh' },
          ].map((s) => (
            <div key={s.label} className="group">
              <p className="text-5xl font-black group-hover:scale-110 transition-transform">{s.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest mt-2 opacity-70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-[#f5f0e8] py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-3">What drives us</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1411]">More than just coffee</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Who We Are', icon: <Coffee className="w-12 h-12 text-amber-600" />, gradient: 'from-amber-500 to-orange-600', body: 'A small, independent roastery dedicated to sourcing the finest single-origin beans.' },
              { title: 'Our Mission', icon: <Globe className="w-12 h-12 text-emerald-600" />, gradient: 'from-emerald-500 to-teal-600', body: 'Connecting people with extraordinary coffee — from farm to cup — while supporting sustainability.' },
              { title: 'Our Roastery', icon: <Flame className="w-12 h-12 text-rose-600" />, gradient: 'from-rose-500 to-red-600', body: 'Since 2018, small-batch roasting brings out the unique character of each origin.' },
            ].map((item) => (
              <div key={item.title} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`h-2 w-full bg-linear-to-r ${item.gradient}`} />
                <div className="p-8">
                  <div className="mb-5">{item.icon}</div>
                  <h3 className="text-xl font-black text-[#1a1411] mb-3">{item.title}</h3>
                  <p className="text-[#5a3e2b] leading-relaxed text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}