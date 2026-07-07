'use client';
import React, { useState } from 'react';
import Margarita from '@/app/components/Menu/Margarita';
import Pinacolada from '@/app/components/Menu/Pinacolada';
import Passionmartini from '@/app/components/Menu/Passionmartini';
import Aperolspritz from '@/app/components/Menu/Aperolspritz';
import Mojito from '@/app/components/Menu/Mojito';
import AllDrink from '@/app/components/Menu/Alldrink';

const navItems = [
  { label: 'Margarita', icon: '' },
  { label: 'Pina colada', icon: '' },
  { label: 'Passion fruit martini', icon: '' },
  { label: 'Aperol spritz', icon: '' },
  { label: 'Mojito', icon: '' },
  { label: 'All Drinks', icon: '' },
];

function PageContent({ active }: { active: string }) {
  switch (active) {
    case 'Margarita': return <Margarita />;
    case 'Pina colada': return <Pinacolada />;
    case 'Passion fruit martini': return <Passionmartini />;
    case 'Aperol spritz': return <Aperolspritz />;
    case 'Mojito': return <Mojito />;
    case 'All Drinks': return <AllDrink />;
    default:
      return (
        <div className="flex items-center justify-center h-full min-h-[60vh] text-gray-400 text-lg font-semibold">
          {active} — coming soon
        </div>
      );
  }
}

export default function Pagemenu({ children }: { children?: React.ReactNode }) {
  const [active, setActive] = useState('Margarita');

  return (
    // Changed to lg:flex for desktop alignment
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Sidebar: Added lg:sticky and lg:top-0 to keep it in place */}
      <aside className="w-full lg:w-44 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen bg-[#d6f0ce] flex flex-row lg:flex-col px-2 py-2 lg:px-0 lg:py-6 gap-2 lg:gap-1 overflow-x-auto lg:overflow-y-auto lg:overflow-x-visible z-10">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex shrink-0 items-center gap-2 lg:gap-3 px-3 lg:px-5 py-1.5 lg:py-3 text-xs lg:text-sm font-bold transition-all text-left whitespace-nowrap
              rounded-lg lg:rounded-none
              border lg:border-0
              ${
                active === item.label
                  ? 'bg-[#e0e6d1] text-black border-white lg:border-r-4 lg:border-amber-400'
                  : 'text-black border-white hover:bg-[#e0f896] hover:text-[#b0bdb0] hover:border-[#ffffff]'
              }`}
          >
            <span className="text-sm lg:text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main content: Added flex-1 so it occupies the remaining space */}
      <main className="flex-1">
        {children ?? <PageContent active={active} />}
      </main>
    </div>
  );
}