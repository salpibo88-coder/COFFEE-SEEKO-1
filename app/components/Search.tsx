'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import PaymentModal from '@/app/components/Shop/PaymentModal';

/* ── Complete product list: Shop + Menu ────────────────────── */
export const allProducts = [
  // ── Shop Coffee (colored latte cups) ──
  { id: 'red',        name: 'Red Coffee',        price: '$1.25', riel: '5,000',  img: '/redjpg.jpg',           href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'green',      name: 'Green Coffee',       price: '$1.25', riel: '5,000',  img: '/coffeeseekogreen.jpg', href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'pink',       name: 'Pink Coffee',        price: '$1.25', riel: '5,000',  img: '/coffeeseekopink.jpg',  href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'yellow',     name: 'Yellow Coffee',      price: '$1.25', riel: '5,000',  img: '/coffeeseekoyellow.jpg',href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'blue',       name: 'Blue Coffee',        price: '$1.25', riel: '5,000',  img: '/coffeeseekoblue.jpg',  href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'orange',     name: 'Orange Coffee',      price: '$1.25', riel: '5,000',  img: '/orange.jpg',           href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'brown',      name: 'Brown Coffee',       price: '$1.25', riel: '5,000',  img: '/brown.jpg',            href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'white',      name: 'White Coffee',       price: '$1.25', riel: '5,000',  img: '/coffeeseekowhite.jpg', href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'cyan',       name: 'Cyan Coffee',        price: '$1.25', riel: '5,000',  img: '/cyan.jpg',             href: '/shop', tag: 'coffee',   src: 'Shop' },
  { id: 'maroon',     name: 'Maroon Coffee',      price: '$1.25', riel: '5,000',  img: '/maroon.jpg',           href: '/shop', tag: 'coffee',   src: 'Shop' },
  // ── Menu — Margarita ──
  { id: 'mg1',        name: 'Margarita',          price: '$1.25', riel: '5,000',  img: 'https://zevia.com/cdn/shop/files/us_energy_RaspberryLime_Dry_NTWT_NewColor.png?v=1755805046',                     href: '/menu', tag: 'margarita', src: 'Menu' },
  { id: 'mg2',        name: 'Wild Bills Cola',    price: '$1.25', riel: '5,000',  img: 'https://drinkwildbills.com/cdn/shop/files/WildBills_BigCan_12Pack_2025_UNTAMED_f01f905f-623a-4539-aae8-a3de08363e44.png?v=1762180273', href: '/menu', tag: 'margarita', src: 'Menu' },
  { id: 'mg3',        name: 'Rocket Pop',         price: '$1.25', riel: '5,000',  img: 'https://drinkwildbills.com/cdn/shop/files/WildBills_RocketPop_BigCan_12Pack_2025.png?v=1762177512',                href: '/menu', tag: 'margarita', src: 'Menu' },
  { id: 'mg4',        name: 'Bourbon Bottle',     price: '$1.25', riel: '5,000',  img: 'https://www.kentucky.com/public/latest-news/p0eoiy/picture316269710/alternates/FREE_1200/Red,%20White%20%26%20Roost%20Toasted%20Single%20Barrel%20Bourbon%20Bottle%20Image%20White%20Background.png', href: '/menu', tag: 'margarita', src: 'Menu' },
  // ── Menu — Pina Colada ──
  { id: 'pc1',        name: 'Classic Piña Colada', price: '$2.00', riel: '8,000', img: 'https://www.theisopurecompany.com/cdn/shop/files/US_Protein_Water_RTD_20OZ_StrawberryKiwi_6077850-Front.png?v=1768318059&width=2000', href: '/menu', tag: 'pina colada', src: 'Menu' },
  { id: 'pc2',        name: 'Frozen Piña Colada',  price: '$2.25', riel: '9,000', img: 'https://static.gnc.com.ro/media/catalog/product/i/m/image20260304121005.png',                                     href: '/menu', tag: 'pina colada', src: 'Menu' },
  { id: 'pc3',        name: 'Coconut Piña Colada', price: '$2.40', riel: '9,500', img: 'https://8thwonder.com/cdn/shop/files/Ocho_Verde_Agave_Web01.png?v=1765307390&width=1200',                          href: '/menu', tag: 'pina colada', src: 'Menu' },
  { id: 'pc4',        name: 'Mango Piña Colada',   price: '$2.50', riel: '10,000', img: 'https://zevia.com/cdn/shop/files/us_tea_GreenTea_Dry_NTWT.png?v=1755805015',                                     href: '/menu', tag: 'pina colada', src: 'Menu' },
  // ── Menu — Passion Martini ──
  { id: 'pm1',        name: 'Passion Martini',     price: '$2.00', riel: '8,000', img: 'https://www.craftzero.com.au/cdn/shop/files/Naked-Life-Non-Alcoholic-Passion-Martini-250ml-Craftzero-34617975800067.png?v=1779312807&width=1946', href: '/menu', tag: 'passion martini', src: 'Menu' },
  { id: 'pm2',        name: 'Monster Energy',      price: '$2.50', riel: '10,000', img: 'https://png.pngtree.com/png-vector/20260112/ourlarge/pngtree-monster-energy-much-gooder-can-product-shot-white-background-png-image_18489148.webp', href: '/menu', tag: 'passion martini', src: 'Menu' },
  { id: 'pm3',        name: 'Italian Spritz',      price: '$1.75', riel: '7,000', img: 'https://lyres.com/cdn/shop/files/USAUUKEU_Italian_Spritz_ROPP_white_background_with_drink_2.png?v=1767102009',     href: '/menu', tag: 'passion martini', src: 'Menu' },
  // ── Menu — Aperol Spritz ──
  { id: 'as1',        name: 'Aperol Slushie',      price: '$2.00', riel: '8,000', img: 'https://png.pngtree.com/png-clipart/20250224/original/pngtree-slushies-isolated-on-white-background-png-image_20505580.png', href: '/menu', tag: 'aperol spritz', src: 'Menu' },
  { id: 'as2',        name: 'Aperol Spritz Glass', price: '$2.25', riel: '9,000', img: 'https://png.pngtree.com/png-vector/20240628/ourmid/pngtree-glass-of-aperol-spritz-cocktail-isolated-png-image_12915431.png', href: '/menu', tag: 'aperol spritz', src: 'Menu' },
  { id: 'as3',        name: 'Lemon Soda',          price: '$2.40', riel: '9,500', img: 'https://png.pngtree.com/png-vector/20240524/ourmid/pngtree-fresh-lemon-soft-drink-in-aluminum-can-on-white-background-for-png-image_12492702.png', href: '/menu', tag: 'aperol spritz', src: 'Menu' },
  // ── Menu — Mojito ──
  { id: 'mj1',        name: 'Cherry Lime Energy',  price: '$2.00', riel: '8,000', img: 'https://getjoggy.com/cdn/shop/files/as_joggy_energy_cherry_lime_heroic_can_004.jpg?v=1757719019&width=1920',       href: '/menu', tag: 'mojito', src: 'Menu' },
  { id: 'mj2',        name: 'Solar Mango Energy',  price: '$2.25', riel: '9,000', img: 'https://getjoggy.com/cdn/shop/files/as_joggy_energy_solar_mango_heroic_can_004.jpg?v=1757719019&width=1920',       href: '/menu', tag: 'mojito', src: 'Menu' },
  { id: 'mj3',        name: 'Red Bull Classic',    price: '$2.40', riel: '9,500', img: 'https://thumbs.dreamstime.com/b/red-bull-energy-drink-isolated-white-background-red-bull-energy-drink-sold-red-bull-gmbh-austrian-company-created-191517596.jpg', href: '/menu', tag: 'mojito', src: 'Menu' },
  { id: 'mj4',        name: 'Blue Raspberry RTD',  price: '$1.75', riel: '7,000', img: 'https://www.theisopurecompany.com/cdn/shop/files/US_32GRTD_500ML_BlueRaspberry_6075763-2000x2000-064a3d6.png?v=1762189495&width=2000', href: '/menu', tag: 'mojito', src: 'Menu' },
];

type Product = typeof allProducts[0];

/* ── Props ─────────────────────────────────────────────────── */
interface SearchProps {
  variant?: 'bar' | 'icon';
  inputRef?: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

export default function Search({
  variant = 'bar',
  inputRef: externalRef,
  placeholder = 'Search...',
  inputClassName = '',
  wrapperClassName = '',
}: SearchProps) {
  const [query, setQuery]     = useState('');
  const [open, setOpen]       = useState(false);
  const [focused, setFocused] = useState(false);
  const [buying, setBuying]   = useState<Product | null>(null);
  const internalRef           = useRef<HTMLInputElement>(null);
  const ref                   = externalRef ?? internalRef;
  const dropdownRef           = useRef<HTMLDivElement>(null);

  const results = query.trim().length > 0
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tag.toLowerCase().includes(query.toLowerCase()) ||
        p.src.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        ref.current && !ref.current.contains(e.target as Node)
      ) setFocused(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setQuery(''); setFocused(false); setOpen(false); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open && variant === 'icon') ref.current?.focus();
  }, [open, variant, ref]);

  const showDrop = focused && query.trim().length > 0;

  function handleBuy(p: Product, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setBuying(p);
  }

  /* ── Icon variant ── */
  if (variant === 'icon') {
    return (
      <>
        <div className={`flex items-center relative ${wrapperClassName}`}>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${open ? 'w-36 lg:w-44 xl:w-52 2xl:w-72 opacity-100' : 'w-0 opacity-0'}`}>
            <div className="flex items-center bg-white border border-[#e8dfd3] rounded-full px-3 lg:px-4 2xl:px-5 py-1.5 lg:py-2 2xl:py-3 shadow-sm mr-2 2xl:mr-3">
              <input ref={ref} type="text" value={query}
                onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)}
                placeholder={placeholder}
                className={`w-full bg-transparent text-xs lg:text-sm 2xl:text-base text-[#3d2b1f] placeholder-[#3d2b1f]/40 outline-none ${inputClassName}`}
              />
              {query && <button onClick={() => setQuery('')} className="ml-1 text-[#3d2b1f]/40 hover:text-[#3d2b1f] shrink-0 transition-colors"><FiX size={13} /></button>}
            </div>
          </div>
          {open && showDrop && (
            <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-80 2xl:w-96 bg-white border border-[#e8dfd3] rounded-2xl shadow-2xl z-99 overflow-hidden">
              <SearchResults results={results} query={query} onBuy={handleBuy}
                onSelect={() => { setQuery(''); setOpen(false); setFocused(false); }} />
            </div>
          )}
          <button onClick={() => { setOpen(v => !v); if (open) { setQuery(''); setFocused(false); } }}
            className={`transition-colors ${open ? 'text-amber-700' : 'text-[#3d2b1f] hover:text-amber-700'}`}>
            <FiSearch className="w-5 h-5 2xl:w-7 2xl:h-7" strokeWidth={2} />
          </button>
        </div>
        {buying && (
          <PaymentModal
            product={{ name: buying.name, price: `${buying.riel}៛ (${buying.price})`, img: buying.img, category: buying.tag }}
            onClose={() => setBuying(null)}
          />
        )}
      </>
    );
  }

  /* ── Bar variant ── */
  return (
    <>
      <div className={`flex-1 relative ${wrapperClassName}`}>
        <div className="flex items-center bg-white border border-[#e8dfd3] rounded-full px-4 py-2 shadow-sm w-full">
          <input ref={ref} type="text" value={query}
            onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className={`flex-1 bg-transparent text-sm text-[#3d2b1f] placeholder-[#3d2b1f]/40 outline-none min-w-0 ${inputClassName}`}
          />
          {query && <button onClick={() => setQuery('')} className="ml-2 text-[#3d2b1f]/40 hover:text-[#3d2b1f] shrink-0 transition-colors"><FiX size={14} /></button>}
        </div>
        {showDrop && (
          <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e8dfd3] rounded-2xl shadow-2xl z-99 overflow-hidden">
            <SearchResults results={results} query={query} onBuy={handleBuy}
              onSelect={() => { setQuery(''); setFocused(false); }} />
          </div>
        )}
      </div>
      {buying && (
        <PaymentModal
          product={{ name: buying.name, price: `${buying.riel}៛ (${buying.price})`, img: buying.img, category: buying.tag }}
          onClose={() => setBuying(null)}
        />
      )}
    </>
  );
}

/* ── Results dropdown ─────────────────────────────────────── */
function SearchResults({
  results, query, onSelect, onBuy,
}: {
  results: Product[];
  query: string;
  onSelect: () => void;
  onBuy: (p: Product, e: React.MouseEvent) => void;
}) {
  if (results.length === 0) {
    return (
      <div className="px-4 py-5 text-sm text-[#6b5040] text-center">
        <div className="text-3xl mb-2">☕</div>
        No results for <strong>"{query}"</strong>
      </div>
    );
  }

  // Group by source
  const shopItems = results.filter(p => p.src === 'Shop');
  const menuItems = results.filter(p => p.src === 'Menu');

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

  function highlight(text: string) {
    return text.split(regex).map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-amber-200 text-amber-900 rounded px-0.5 not-italic">{part}</mark>
        : <span key={i}>{part}</span>
    );
  }

  function renderGroup(items: Product[], label: string, color: string) {
    if (items.length === 0) return null;
    return (
      <>
        <div className="px-4 py-2 flex items-center justify-between" style={{ background: '#faf7f4' }}>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#b09a8a]">{label}</span>
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color }}>{items.length} found</span>
        </div>
        {items.map(p => (
          <Link key={p.id} href={p.href} onClick={onSelect}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 transition-colors group">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#e8dfd3]">
              <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1a1411] leading-tight">{highlight(p.name)}</p>
              <p className="text-[10px] text-[#8c7a6e] capitalize mt-0.5">{p.tag}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <p className="text-[10px] font-black text-amber-600">{p.price}</p>
                <p className="text-[9px] text-[#b09a8a]">{p.riel}៛</p>
              </div>
              <button
                onClick={e => onBuy(p, e)}
                className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-colors shrink-0"
              >
                <FiShoppingCart size={12} />
              </button>
            </div>
          </Link>
        ))}
      </>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto divide-y divide-[#f0ebe3]">
      {renderGroup(shopItems, '☕ Shop', '#d97706')}
      {renderGroup(menuItems, '🍹 Menu', '#0891b2')}
      <div className="px-4 py-2.5 bg-[#faf7f4] text-center">
        <Link href={`/shop?search=${encodeURIComponent(query)}`} onClick={onSelect}
          className="text-xs font-bold text-amber-700 hover:text-amber-500 transition-colors">
          View all results →
        </Link>
      </div>
    </div>
  );
}
