'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiMapPin, FiPhone, FiClock, FiShoppingCart, FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

/* ── All drinks + menu items ──────────────────────────────────── */
const allProducts = [
  // Coffee — colored latte cup images
  { id: 'red',       name: '',       price: 1.25, img: '1.jpg',    cat: '☕ Coffee' },
  { id: 'green',     name: 'Green Coffee',     price: 1.25, img: '8.jpg',  cat: '☕ Coffee' },
  { id: 'pink',      name: 'Pink Coffee',      price: 1.25, img: 'https://cdn.shopify.com/s/files/1/0610/3498/7607/files/Ocho_Verde_Citrus_Web01.png?v=1765308048',  cat: ' Coffee' },
  { id: 'yellow',    name: 'Yellow Coffee',    price: 1.25, img: 'https://www.bundabergrum.com.au/cdn/shop/files/diag_9311866009320-1_2.jpg?v=1777569224', cat: ' Coffee' },
  { id: 'blue',      name: 'Blue Coffee',      price: 1.25, img: '6.jpg',  cat: '☕ Coffee' },
  { id: 'orange',    name: 'Orange Coffee',    price: 1.25, img: 'https://cdn.shopify.com/s/files/1/0059/1111/7922/files/Mock_NRF_4499c8ab-4a21-4529-aadd-f8b3a160d038.png?v=1771014296', cat: ' Coffee' },
  { id: 'brown',     name: 'Brown Coffee',     price: 1.25, img: 'https://media.istockphoto.com/id/513932740/photo/coca-cola-fanta-and-sprite-can.jpg?s=612x612&w=0&k=20&c=dnCW_KVXX3Y9crN3TQ1zDHgKNqLLDy0k0djEnQMOt-M=', cat: ' Coffee' },
  { id: 'white',     name: 'White Coffee',     price: 1.25, img: 'https://www.theisopurecompany.com/cdn/shop/files/US_32GRTD_500ML_BlueRaspberry_6075763-2000x2000-064a3d6.png?v=1762189495&width=2000', cat: ' Coffee' },
  // Drinks — from Menu components
  { id: 'margarita', name: 'Margarita',        price: 2.00, img: 'https://zevia.com/cdn/shop/files/us_energy_RaspberryLime_Dry_NTWT_NewColor.png?v=1755805046',                     cat: ' Drinks' },
  { id: 'pinacolada',name: 'Piña Colada',      price: 2.25, img: 'https://8thwonder.com/cdn/shop/files/Ocho_Verde_Agave_Web01.png?v=1765307390&width=1200',                          cat: ' Drinks' },
  { id: 'passion',   name: 'Passion Martini',  price: 2.50, img: 'https://www.craftzero.com.au/cdn/shop/files/Naked-Life-Non-Alcoholic-Passion-Martini-250ml-Craftzero-34617975800067.png?v=1779312807&width=1946', cat: ' Drinks' },
  { id: 'aperol',    name: 'Aperol Spritz',    price: 2.00, img: 'https://png.pngtree.com/png-vector/20240628/ourmid/pngtree-glass-of-aperol-spritz-cocktail-isolated-png-image_12915431.png', cat: ' Drinks' },
  { id: 'mojito',    name: 'Mojito',           price: 2.00, img: 'https://getjoggy.com/cdn/shop/files/as_joggy_energy_cherry_lime_heroic_can_004.jpg?v=1757719019&width=1920',        cat: ' Drinks' },
  { id: 'redbull',   name: 'Red Bull',         price: 1.75, img: 'https://thumbs.dreamstime.com/b/red-bull-energy-drink-isolated-white-background-red-bull-energy-drink-sold-red-bull-gmbh-austrian-company-created-191517596.jpg', cat: '🍹 Drinks' },
  { id: 'monster',   name: 'Monster Energy',   price: 2.00, img: 'https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-shot-white-background-png-image_18489145.webp', cat: ' Drinks' },
  { id: 'wildbills', name: 'Wild Bills',       price: 2.25, img: 'https://drinkwildbills.com/cdn/shop/files/WildBills_BigCan_12Pack_2025_UNTAMED_f01f905f-623a-4539-aae8-a3de08363e44.png?v=1762180273', cat: ' Drinks' },
  { id: 'rocketpop', name: 'Rocket Pop',       price: 2.25, img: 'https://drinkwildbills.com/cdn/shop/files/WildBills_RocketPop_BigCan_12Pack_2025.png?v=1762177512',                cat: ' Drinks' },
  { id: 'lemon',     name: 'Lemon Soda',       price: 1.75, img: 'https://png.pngtree.com/png-vector/20240524/ourmid/pngtree-fresh-lemon-soft-drink-in-aluminum-can-on-white-background-for-png-image_12492702.png', cat: ' Drinks' },
  { id: 'trip1',     name: 'Trip Sicilian',    price: 2.00, img: 'https://static.gnc.com.ro/media/catalog/product/i/m/image20260304121005.png',                                       cat: ' Drinks' },
  { id: 'trip2',     name: 'Trip CBD Infused', price: 2.00, img: 'https://www.theisopurecompany.com/cdn/shop/files/US_Protein_Water_RTD_20OZ_StrawberryKiwi_6077850-Front.png?v=1768318059&width=2000', cat: ' Drinks' },
];

const CATS = ['All', '☕ Coffee', '🍹 Drinks'];

type CartItem = { id: string; qty: number };

function estimateDelivery(address: string): string {
  if (!address.trim()) return '';
  const l = address.toLowerCase();
  if (l.includes('bkk') || l.includes('ចំការ') || l.includes('chamkar')) return '🚴 ~10–15 min';
  if (l.includes('toul') || l.includes('tuol')) return '🛵 ~15–20 min';
  if (l.includes('daun penh') || l.includes('riverside')) return '🛵 ~20–25 min';
  if (l.includes('sen sok') || l.includes('russey')) return '🚗 ~25–35 min';
  return '📍 ~20–30 min';
}

/* ── Drink Picker Modal ─────────────────────────────────────── */
function DrinkPicker({ cart, onToggle, onClose }: {
  cart: CartItem[];
  onToggle: (id: string) => void;
  onClose: () => void;
}) {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allProducts.filter(p => {
    const matchCat = activeCat === 'All' || p.cat === activeCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl flex flex-col overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-gray-900">Choose Your Drinks ☕</h2>
            <p className="text-xs text-gray-400 mt-0.5">{totalItems} item{totalItems !== 1 ? 's' : ''} selected</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors p-1">
            <FiX size={22} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pt-3 pb-2 shrink-0">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search drinks..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all"
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 px-5 pb-3 shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all
                ${activeCat === c ? 'bg-amber-500 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-y-auto flex-1 px-4 pb-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {filtered.map(p => {
              const inCart = cart.find(c => c.id === p.id);
              const qty = inCart?.qty ?? 0;
              return (
                <div
                  key={p.id}
                  onClick={() => onToggle(p.id)}
                  className={`relative flex flex-col rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 select-none
                    ${qty > 0 ? 'border-amber-500 bg-amber-50 shadow-md scale-[1.02]' : 'border-gray-100 bg-white hover:border-amber-300 hover:shadow-sm'}`}
                >
                  {/* check badge */}
                  {qty > 0 && (
                    <div className="absolute top-2 right-2 z-10 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-[9px] font-black shadow">
                      {qty}
                    </div>
                  )}
                  {/* image */}
                  <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                    <Image src={p.img} alt={p.name} fill unoptimized className="object-contain p-2" />
                  </div>
                  {/* info */}
                  <div className="p-2">
                    <p className="text-[10px] font-black text-gray-800 leading-snug line-clamp-2">{p.name}</p>
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Done button */}
        <div className="px-5 py-4 border-t border-gray-100 shrink-0 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-black font-black py-3.5 rounded-2xl transition-all shadow-md text-sm tracking-wide flex items-center justify-center gap-2"
          >
            <FiCheck size={18} />
            Done — {totalItems} item{totalItems !== 1 ? 's' : ''} selected
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Delivery Component ────────────────────────────────── */
export default function Delivery() {
  const router = useRouter();
  const [showPicker, setShowPicker]   = useState(false);
  const [cart, setCart]               = useState<CartItem[]>([]);
  const [name, setName]               = useState('');
  const [phone, setPhone]             = useState('');
  const [address, setAddress]         = useState('');
  const [locLoading, setLocLoading]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  const eta   = estimateDelivery(address);
  const total = cart.reduce((s, c) => {
    const p = allProducts.find(x => x.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);

  function toggleDrink(id: string) {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing) return prev.filter(c => c.id !== id);
      return [...prev, { id, qty: 1 }];
    });
  }

  function changeQty(id: string, delta: number) {
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c));
  }

  function handleGPS() {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(r => r.json())
          .then(d => setAddress(d.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`))
          .catch(() => setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`))
          .finally(() => setLocLoading(false));
      },
      () => setLocLoading(false)
    );
  }

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (cart.length === 0) { alert('Please select at least one drink ☕'); return; }
    setSubmitted(true);
    setTimeout(() => {
      const ids = cart.map(c => c.id).join(',');
      router.push(`/shop?order=${ids}`);
    }, 1800);
  }

  const cartProducts = cart.map(c => ({ ...c, product: allProducts.find(p => p.id === c.id)! })).filter(c => c.product);

  return (
    <div className="w-full bg-[#fcfaf7] font-sans">

      {/* ── Order Form ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleOrder} className="bg-white rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-stone-100 overflow-hidden">

            {/* Selected drinks preview */}
            <div className="px-6 pt-7 pb-5 border-b border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-black uppercase tracking-widest text-amber-500">
                  🛒 Your Order
                </p>
                <button
                  type="button"
                  onClick={() => setShowPicker(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200"
                >
                  <FiShoppingCart size={13} />
                  {cart.length === 0 ? 'Select Drinks' : 'Edit Order'}
                </button>
              </div>

              {cart.length === 0 ? (
                <button
                  type="button"
                  onClick={() => setShowPicker(true)}
                  className="w-full py-8 rounded-2xl border-2 border-dashed border-amber-200 text-amber-400 font-bold text-sm hover:bg-amber-50 transition-colors flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">☕</span>
                  Tap to choose your drinks
                </button>
              ) : (
                <div className="space-y-2">
                  {cartProducts.map(({ id, qty, product: p }) => (
                    <div key={id} className="flex items-center gap-3 bg-[#faf7f4] rounded-2xl px-4 py-3 border border-[#e8e0d4]">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-gray-100 shrink-0">
                        <Image src={p.img} alt={p.name} width={40} height={40} unoptimized className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">{p.name}</p>
                        <p className="text-xs text-amber-600 font-bold">${(p.price * qty).toFixed(2)}</p>
                      </div>
                      {/* qty controls */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button type="button" onClick={() => changeQty(id, -1)} className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                          <FiMinus size={10} />
                        </button>
                        <span className="text-sm font-black w-5 text-center">{qty}</span>
                        <button type="button" onClick={() => changeQty(id, 1)} className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors">
                          <FiPlus size={10} />
                        </button>
                      </div>
                      <button type="button" onClick={() => toggleDrink(id)} className="text-gray-300 hover:text-red-400 transition-colors ml-1">
                        <FiX size={16} />
                      </button>
                    </div>
                  ))}
                  {/* total */}
                  <div className="flex justify-between items-center px-4 py-2 text-sm">
                    <span className="text-gray-500">{cart.reduce((s,c)=>s+c.qty,0)} items</span>
                    <span className="font-black text-amber-700 text-base">${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Info fields */}
            <div className="px-6 py-5 border-b border-stone-100 space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-amber-500">① Your Info</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', val: name, set: setName, type: 'text', ph: 'e.g. Dara Chan' },
                  { label: 'Phone Number', val: phone, set: setPhone, type: 'tel', ph: '+855 12 345 678' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input required value={f.val} onChange={e => f.set(e.target.value)} type={f.type} placeholder={f.ph}
                      className="w-full bg-[#faf7f4] border border-[#e8e0d8] rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery location */}
            <div className="px-6 py-5 border-b border-stone-100 space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-amber-500">② Delivery Location</p>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 pointer-events-none" size={15} />
                <input required value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="Type your address or use GPS..."
                  className="w-full bg-[#faf7f4] border border-[#e8e0d8] rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all" />
              </div>
              <button type="button" onClick={handleGPS}
                className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2.5 rounded-2xl transition-all">
                {locLoading ? '⏳ Getting location...' : '📡 Use My GPS Location'}
              </button>
              {eta && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">AI Estimated Delivery</p>
                    <p className="text-sm font-bold text-emerald-800">{eta}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="px-6 py-6">
              {submitted ? (
                <div className="text-center space-y-2">
                  <div className="text-4xl animate-bounce">☕</div>
                  <p className="font-black text-gray-800">Order Placed! Redirecting to Shop…</p>
                </div>
              ) : (
                <button type="submit"
                  className="w-full bg-[#1a0a00] hover:bg-amber-600 active:scale-[0.98] text-white font-black py-4 rounded-2xl transition-all shadow-lg text-sm tracking-wide flex items-center justify-center gap-2">
                  🛵 Confirm Order
                </button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Drink Picker Modal */}
      {showPicker && (
        <DrinkPicker
          cart={cart}
          onToggle={toggleDrink}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
