'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/home' },
  { label: 'About', href: '/about' },
  { label: 'Menu', href: '/menu' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f5f0e8]/95 backdrop-blur-sm border-b border-[#e8dfd3]">
      <div className="w-full max-w-screen-2xl mx-auto flex items-center h-14 sm:h-16 md:h-17 lg:h-18 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 gap-4 md:gap-6">

        {/* Logo */}
        <Link href="/home" className="flex items-center shrink-0">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/023/617/247/small/coffee-shop-logo-free-png.png"
            alt="Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 object-contain"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          />
        </Link>

        {/* Centered nav — md and up */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[11px] lg:text-xs xl:text-[13px] font-bold uppercase tracking-[0.12em] lg:tracking-[0.15em] pb-1 transition-colors group ${
                  isActive ? 'text-[#3d2b1f]' : 'text-[#3d2b1f]/50 hover:text-[#3d2b1f]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#3d2b1f] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-3 lg:gap-4 shrink-0">

          {/* Search box — visible md+ */}
          <div className="hidden md:flex items-center bg-white border border-[#e8dfd3] rounded-full px-3 lg:px-4 py-1.5 lg:py-2 shadow-sm w-28 lg:w-36 xl:w-44 2xl:w-52">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-xs lg:text-sm text-[#3d2b1f] placeholder-[#3d2b1f]/40 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#3d2b1f]/40 hover:text-[#3d2b1f] transition-colors ml-1 shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search icon */}
          <button className="text-[#3d2b1f] hover:text-amber-700 transition-colors" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Cart */}
          <button className="relative text-[#3d2b1f] hover:text-amber-700 transition-colors" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-amber-600 text-white text-[8px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>
          {/* Order Now — hidden on mobile */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex bg-[#3d2b1f] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full hover:bg-amber-800 transition-colors shadow-md whitespace-nowrap"
          >
            Order Now
          </Link>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-[#3d2b1f] hover:text-amber-700 transition-colors ml-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden w-full bg-[#f5f0e8] border-t border-[#e8dfd3] px-6 py-5 flex flex-col gap-1">
          {/* Mobile search */}
          <div className="flex items-center bg-white border border-[#e8dfd3] rounded-full px-4 py-2 mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#3d2b1f]/40 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-sm text-[#3d2b1f] placeholder-[#3d2b1f]/40 outline-none"
            />
          </div>

          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest py-3 border-b border-[#e8dfd3]/50 transition-colors ${
                  isActive ? 'text-[#3d2b1f]' : 'text-[#3d2b1f]/50 hover:text-[#3d2b1f]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex justify-center bg-[#3d2b1f] text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-amber-800 transition-colors"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}
