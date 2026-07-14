'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMapPin, FiClock, FiPhone, FiTruck } from 'react-icons/fi';

/* ─── Location data ─────────────────────────────────────────── */
const locations = [
  {
    name: 'Coffee Seeko — ចំការលើ',
    address: 'Street 278, ផ្សារថ្នល់បែក, កំពង់ចាម',
    hours: 'Mon–Sun · 7:00 AM – 10:00 PM',
    phone: '+855 23 456 789',
    color: 'from-amber-500 to-orange-500',
    img: 'shop.jpg',
    mapUrl: 'https://maps.google.com/?q=Boeng+Keng+Kang+Phnom+Penh',
  },
  {
    name: 'Coffee Seeko — តាំងគោក',
    address: 'Street 6A,ផ្សារតាំងគោក , កំពង់ធំ',
    hours: 'Mon–Sun · 7:00 AM – 10:00 PM',
    phone: '+855 23 567 890',
    color: 'from-emerald-500 to-teal-500',
    img: 'shop.jpg',
    mapUrl: 'https://maps.google.com/?q=Toul+Tom+Poung+Phnom+Penh',
  },
  {
    name: 'Coffee Seeko — បែកអន្លូង',
    address: 'Street 19, ផ្សារអារក្យត្នោត, កំពង់ចាម',
    hours: 'Mon–Sun · 7:00 AM – 10:00 PM',
    phone: '+855 23 678 901',
    color: 'from-rose-500 to-pink-500',
    img: 'shop2.jpg',
    mapUrl: 'https://maps.google.com/?q=Daun+Penh+Phnom+Penh',
  },
];

/* ─── Drink menu ────────────────────────────────────────────── */
const drinks = [
  { id: 'red',    name: 'Red Coffee',    price: 1.25, img: 'redjpg.jpg' },
  { id: 'green',  name: 'Green Coffee',  price: 1.25, img: 'https://thumbs.dreamstime.com/b/green-matcha-latte-isolated-white-background-creamy-texture-vibrant-color-perfect-refreshing-drink-matcha-365772125.jpg' },
  { id: 'pink',   name: 'Pink Coffee',   price: 1.25, img: 'Pink.jpg' },
  { id: 'yellow', name: 'Yellow Coffee', price: 1.25, img: 'yellow.jpg' },
  { id: 'blue',   name: 'Blue Coffee',   price: 1.25, img: 'blue.jpg' },
  { id: 'orange', name: 'Orange Coffee', price: 1.25, img: 'orange.jpg' },
  { id: 'brown',  name: 'Brown Coffee',  price: 1.25, img: 'brown.jpg' },
  { id: 'white',  name: 'White Coffee',  price: 1.25, img: 'coffeeseekowhite.jpg' },
];

/* ─── AI delivery estimator ─────────────────────────────────── */
function estimateDelivery(address: string): string {
  if (!address.trim()) return '';
  const l = address.toLowerCase();
  if (l.includes('bkk') || l.includes('boeng keng') || l.includes('chamkar') || l.includes('ចំការ')) return '🚴 ~10–15 min';
  if (l.includes('toul') || l.includes('tuol') || l.includes('psa') || l.includes('psah')) return '🛵 ~15–20 min';
  if (l.includes('daun penh') || l.includes('riverside') || l.includes('wat phnom')) return '🛵 ~20–25 min';
  if (l.includes('sen sok') || l.includes('russey keo') || l.includes('ស្ទឹងមានជ័យ')) return '🚗 ~25–35 min';
  if (l.includes('mean chey') || l.includes('meanchey') || l.includes('chbar ampov')) return '🚗 ~30–40 min';
  return '📍 ~20–30 min';
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Contact() {
  const router = useRouter();

  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [deliveryAddr, setDeliveryAddr]     = useState('');
  const [name, setName]                     = useState('');
  const [phone, setPhone]                   = useState('');
  const [locLoading, setLocLoading]         = useState(false);
  const [gpsOk, setGpsOk]                   = useState(false);

  const eta = estimateDelivery(deliveryAddr);
  const total = (selectedDrinks.length * 1.25).toFixed(2);

  function toggleDrink(id: string) {
    setSelectedDrinks(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  }

  function handleGetLocation() {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(r => r.json())
          .then(d => { setDeliveryAddr(d.display_name || `${latitude}, ${longitude}`); setGpsOk(true); })
          .catch(() => setDeliveryAddr(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`))
          .finally(() => setLocLoading(false));
      },
      () => setLocLoading(false)
    );
  }

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (selectedDrinks.length === 0) { alert('Please select at least one drink ☕'); return; }
    if (!deliveryAddr.trim()) { alert('Please enter your delivery address 📍'); return; }
    const params = new URLSearchParams({ order: selectedDrinks.join(','), name, phone, address: deliveryAddr });
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="w-full font-sans bg-[#fcfaf7]">

      {/* ── Hero ── */}
      {/* ── Enhanced Hero Section ── */}
<section className="relative w-full py-24 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-12 overflow-hidden bg-stone-900">
  
  {/* Background Image with Overlay */}
  <div className="absolute inset-0">
    <img 
      src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
      alt="Coffee Background" 
      className="w-full h-full object-cover opacity-30"
    />
    <div className="absolute inset-0  bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent" />
  </div>

  {/* Content (Left) */}
  <div className="relative z-10 w-full  lg:w-1/2 max-w-2xl text-left space-y-6">
    <span className="inline-block text-amber-400 uppercase tracking-[0.35em] text-xs font-bold border border-amber-400/30 px-4 py-1.5 rounded-full bg-amber-400/10">
      Premium Delivery
    </span>
    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
      Order Your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Coffee Now</span>
    </h1>
    <p className="text-stone-300 text-lg leading-relaxed max-w-md">
      Hand-crafted brews delivered fresh to your door. Experience the taste of Coffee Seeko.
    </p>
    <div className="pt-4">
      <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-stone-900 font-black uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-500/20">
        Order Now
      </button>
    </div>
  </div>

  {/* Visual Element (Right) - Image with Float Effect */}
  <div className="relative z-10 w-full lg:w-1/3 flex justify-center">
    <div className="relative animate-[float_6s_ease-in-out_infinite]">
      <img 
        src="https://static.vecteezy.com/system/resources/previews/027/244/724/non_2x/contact-us-or-the-customer-support-hotline-people-connect-businessman-touching-virtual-icons-doing-to-customer-service-call-center-free-png.png" 
        alt="Coffee Splash" 
        className="w-[300px] md:w-[450px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
      />
      {/* Decorative Glow */}
      <div className="absolute -z-10 inset-0 bg-amber-500/20 blur-[80px] rounded-full" />
    </div>
  </div>

  {/* Keyframe for floating effect (Add this to your CSS or use Tailwind config) */}
  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-30px); }
    }
  `}</style>
</section>

      {/* ── Cafés ── */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-2">Find Us</p>
            <h2 className="text-4xl font-black text-[#1a1411]">Our 3 Cafés in Phnom Penh 🇰🇭</h2>
            <p className="text-[#6b5040] mt-3 text-sm max-w-md mx-auto">Drop by or order delivery straight to your door!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <div key={loc.name} className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                  {/* Logo badge */}
                  <div className="absolute top-3 right-3 w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-black">
                    <img src="/coffeelogo.jpg" alt="Coffee Seeko logo" className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${loc.color}`} />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-black text-[#1a1411] text-lg">{loc.name}</h3>
                  <div className="space-y-2 text-sm text-[#6b5040]">
                    <p className="flex items-start gap-2">
                      <FiMapPin className="mt-0.5 shrink-0 text-rose-500" size={15} />
                      {loc.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiClock className="shrink-0 text-[#6b5040]" size={15} />
                      {loc.hours}
                    </p>
                    <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 font-bold text-amber-700 hover:text-amber-500 transition-colors">
                      <FiPhone className="shrink-0 text-amber-600" size={15} />
                      {loc.phone}
                    </a>
                  </div>
                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#c1ecca] hover:bg-[#c1ecca] hover:text-gray-800 text-gray-500 text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all mt-1">
                    Open in Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order Form ── */}
      <section className="pb-28 px-8">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-10">
            <p className="text-amber-600 uppercase tracking-widest text-xs font-bold mb-2">Place Your Order</p>
            <h2 className="text-4xl font-black text-[#1a1411]">Order for Delivery <FiTruck className="inline" /></h2>
            <p className="text-[#6b5040] mt-2 text-sm">Select drinks → enter location → click Order</p>
          </div>

          <form onSubmit={handleOrder} className="bg-white rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-stone-100 overflow-hidden">

            {/* ① Info */}
            

          

            
          </form>
        </div>
      </section>

    </div>
  );
}