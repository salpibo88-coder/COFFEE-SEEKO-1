'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FiShoppingBag, FiX } from 'react-icons/fi';
import { Home, Coffee, ClipboardList, ShoppingBag, Newspaper, PhoneCall } from 'lucide-react';
import Search from '@/app/components/Search';

const navLinks = [
  { label: 'Home',    href: '/home',    icon: <Home className="w-4 h-4 md:w-5 md:h-5 text-[#0000FF]" /> },
  { label: 'About',   href: '/about',   icon: <Coffee className="w-4 h-4 md:w-5 md:h-5 text-[#15ff00]" /> },
  { label: 'Menu',    href: '/menu',    icon: <ClipboardList className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" /> },
  { label: 'Shop',    href: '/shop',    icon: <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-[#ff4800]" /> },
  { label: 'Blog',    href: '/blog',    icon: <Newspaper className="w-4 h-4 md:w-5 md:h-5 text-blue-600" /> },
  { label: 'Contact', href: '/contact', icon: <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-rose-600" /> },
];

export default function Navbar() {
  const pathname        = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef       = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // close on Escape
  useEffect(() => {
    function handler(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-[#e8dfd3]">

        {/* ── SM / MD / LG layout (hidden on xl+) ── */}
        <div className="flex xl:hidden items-center h-14 sm:h-16 md:h-18 lg:h-20 px-4 sm:px-6 md:px-8 lg:px-10 gap-3 md:gap-4 lg:gap-5">
          <Link href="/home" className="shrink-0">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/023/617/247/small/coffee-shop-logo-free-png.png"
              alt="Coffee Seeko"
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </Link>

          <Search variant="bar" />

          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 shrink-0">
            <Link href="/game" className="relative text-[#3d2b1f] hover:text-amber-700 transition-colors">
              <FiShoppingBag className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" strokeWidth={2.2} />
              <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 bg-amber-600 text-white text-[9px] md:text-[10px] font-black rounded-full flex items-center justify-center">2</span>
            </Link>

            {/* hamburger */}
            <button
              onClick={() => setOpen(v => !v)}
              className="text-[#3d2b1f] hover:text-amber-700 transition-colors p-1"
              aria-label="Menu"
            >
              {open
                ? <FiX className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" strokeWidth={2.2} />
                : (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                    <line x1="3" y1="6"  x2="21" y2="6"  />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )
              }
            </button>
          </div>
        </div>

        {/* ── MD+ layout (hidden below xl) ── */}
        <div className="hidden xl:flex items-center h-16 lg:h-18 xl:h-20 2xl:h-24 px-8 lg:px-12 xl:px-16 2xl:px-28 gap-4 md:gap-6 2xl:gap-10 max-w-screen-2xl mx-auto w-full">
          <Link href="/home" className="shrink-0">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/023/617/247/small/coffee-shop-logo-free-png.png"
              alt="Coffee Seeko"
              className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 2xl:w-16 2xl:h-16 object-contain"
              style={{ animation: 'float 3s ease-in-out infinite' }}
            />
          </Link>

          <nav className="flex flex-1 justify-center items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-14">
            {navLinks.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className={`relative text-[11px] lg:text-xs xl:text-[13px] 2xl:text-base font-bold uppercase tracking-[0.12em] lg:tracking-[0.15em] 2xl:tracking-[0.2em] pb-1 transition-colors group
                    ${active ? 'text-[#3d2b1f]' : 'text-[#3d2b1f]/50 hover:text-[#3d2b1f]'}`}
                >
                  {label}
                  <span className={`absolute bottom-0 left-0 h-0.5 2xl:h-0.75 bg-[#3d2b1f] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 lg:gap-4 2xl:gap-6 shrink-0">
            <Search variant="icon" />
            <Link href="/game" className="relative text-[#3d2b1f] hover:text-amber-700 transition-colors">
              <FiShoppingBag className="w-5 h-5 2xl:w-7 2xl:h-7" strokeWidth={2} />
              <span className="absolute -top-1.5 -right-1.5 2xl:-top-2 2xl:-right-2 w-4 h-4 2xl:w-5 2xl:h-5 bg-amber-600 text-white text-[8px] 2xl:text-[10px] font-black rounded-full flex items-center justify-center">2</span>
            </Link>
            <Link href="/shop"
              className="inline-flex bg-[#3d2b1f] hover:bg-amber-800 text-white text-[10px] md:text-xs 2xl:text-sm font-bold uppercase tracking-widest px-4 md:px-5 lg:px-6 2xl:px-8 py-2 md:py-2.5 lg:py-3 2xl:py-4 rounded-full transition-colors shadow-md whitespace-nowrap">
              Order Now
            </Link>
          </div>
        </div>

        <style jsx global>{`
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        `}</style>
      </header>

      {/* ── Right-side drawer (sm only) ── */}
      {/* dim overlay */}
      <div
        className={`xl:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* drawer panel */}
      <div
        ref={drawerRef}
        className={`xl:hidden fixed top-0 right-0 z-50 h-full w-52 md:w-64 lg:w-72 bg-[#f5f0e8] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* drawer header */}
        <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-[#e8dfd3]">
          <span className="font-black text-[#3d2b1f] text-xs md:text-sm uppercase tracking-widest flex items-center gap-1.5">
            <Coffee className="w-4 h-4 text-amber-700" /> Seeko
          </span>
          <button onClick={() => setOpen(false)} className="text-[#3d2b1f]/50 hover:text-[#3d2b1f] transition-colors">
            <FiX size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        {/* links */}
        <nav className="flex-1 flex flex-col px-3 md:px-4 py-2 md:py-3 gap-0.5 md:gap-1 overflow-y-auto">
          {navLinks.map(({ label, href, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl transition-all duration-150
                  ${active ? 'bg-[#3d2b1f] text-white' : 'text-[#3d2b1f]/60 hover:bg-[#ede8df] hover:text-[#3d2b1f]'}`}
              >
                <span className={`w-7 h-7 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0
                  ${active ? 'bg-white/15 [&>svg]:text-white' : 'bg-[#e8e0d4]'}`}>
                  {icon}
                </span>
                <span className="font-bold text-xs md:text-sm uppercase tracking-widest">{label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400 shrink-0" />}
              </Link>
            );
          })}
        </nav> 
        {/* footer */}
        <div className="px-3 md:px-4 pb-5 md:pb-6 pt-2 md:pt-3 border-t border-[#e8dfd3]">
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-[#3d2b1f] hover:bg-amber-800 active:scale-[0.98] text-white font-black uppercase tracking-widest text-[10px] md:text-xs py-3 md:py-4 rounded-xl transition-all shadow-md"
          >
            <Coffee className="w-4 h-4 text-amber-400" /> Order Now
          </Link>
        </div>
      </div>
    </>
  );
}