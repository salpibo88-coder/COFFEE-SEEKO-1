'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    label: 'Home',
    href: '/home',
    icon: (active: boolean) => (
      // Coffee cup with steam
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke={active ? '#b45309' : '#9ca3af'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {/* steam */}
        <path d="M11 7 Q12 4 11 2" />
        <path d="M16 7 Q17 4 16 2" />
        <path d="M21 7 Q22 4 21 2" />
        {/* cup body */}
        <path d="M6 10 h20 l-2 13 a2 2 0 0 1-2 2 H10 a2 2 0 0 1-2-2 Z" fill={active ? '#fef3c7' : 'none'} />
        {/* handle */}
        <path d="M26 13 q5 0 5 4.5 t-5 4.5" />
        {/* saucer */}
        <path d="M4 25 h24" />
      </svg>
    ),
  },
  {
    label: 'Menu',
    href: '/menu',
    icon: (active: boolean) => (
      // Coffee beans / menu
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke={active ? '#b45309' : '#9ca3af'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {/* bean 1 */}
        <ellipse cx="11" cy="11" rx="6" ry="9" transform="rotate(-30 11 11)" fill={active ? '#fef3c7' : 'none'} />
        <path d="M6 5 Q11 11 16 17" />
        {/* bean 2 */}
        <ellipse cx="21" cy="21" rx="6" ry="9" transform="rotate(-30 21 21)" fill={active ? '#fef3c7' : 'none'} />
        <path d="M16 15 Q21 21 26 27" />
      </svg>
    ),
  },
  {
    label: 'Search',
    href: '/shop',
    icon: (active: boolean) => (
      // Search with coffee drop
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke={active ? '#b45309' : '#9ca3af'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="8" fill={active ? '#fef3c7' : 'none'} />
        <path d="M20 20 l7 7" />
        {/* coffee drop inside */}
        <path d="M14 10 Q17 13 14 17 Q11 13 14 10 Z" fill={active ? '#b45309' : '#d1d5db'} stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Order',
    href: '/contact',
    icon: (active: boolean) => (
      // Takeaway bag with coffee logo
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke={active ? '#b45309' : '#9ca3af'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {/* bag */}
        <rect x="6" y="12" width="20" height="16" rx="2" fill={active ? '#fef3c7' : 'none'} />
        {/* bag handle */}
        <path d="M11 12 V9 a5 5 0 0 1 10 0 v3" />
        {/* coffee cup on bag */}
        <path d="M13 19 h6 l-1 5 h-4 Z" fill={active ? '#b45309' : '#d1d5db'} stroke="none" />
        <path d="M19 20.5 q2 0 2 2 t-2 2" stroke={active ? '#b45309' : '#9ca3af'} strokeWidth={1.4} fill="none" />
      </svg>
    ),
  },
  {
    label: 'Game',
    href: '/game',
    icon: (active: boolean) => (
      // Coffee cup as game controller / star
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" stroke={active ? '#b45309' : '#9ca3af'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {/* mug */}
        <rect x="7" y="13" width="14" height="12" rx="2" fill={active ? '#fef3c7' : 'none'} />
        <path d="M21 15 q5 0 5 4 t-5 4" />
        {/* steam */}
        <path d="M11 10 Q12 7 11 5" />
        <path d="M16 10 Q17 7 16 5" />
        {/* play button */}
        <path d="M12 17.5 l5 2.5 l-5 2.5 Z" fill={active ? '#b45309' : '#9ca3af'} stroke="none" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="h-20 md:h-24 lg:h-28 xl:hidden" />

      <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#f5f0e8]/95 backdrop-blur-sm border-t border-[#e8dfd3] shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-screen-sm mx-auto flex items-end justify-around px-2 md:px-6 lg:px-10 py-2 md:py-3 pb-3 md:pb-4">
          {tabs.map((tab) => {
            const active = pathname === tab.href || (tab.href === '/home' && pathname === '/');
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center gap-0.5 min-w-0 flex-1 group"
              >
                {/* icon */}
                <div className={`flex items-center justify-center w-12 h-10 md:w-14 md:h-12 lg:w-16 lg:h-14 rounded-2xl transition-all duration-200
                  ${active ? 'bg-amber-100 scale-110' : 'group-hover:bg-stone-100'}`}>
                  {tab.icon(active)}
                </div>
                {/* label */}
                <span className={`text-[10px] md:text-xs lg:text-sm font-bold tracking-wide transition-colors duration-200
                  ${active ? 'text-amber-700' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
