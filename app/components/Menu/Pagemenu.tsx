'use client';
import React, { useState } from 'react';
import Margarita from '@/app/components/Menu/Margarita';
import Pinacolada from '@/app/components/Menu/Pinacolada';
import Passionmartini from '@/app/components/Menu/Passionmartini';
import Aperolspritz from '@/app/components/Menu/Aperolspritz';
import Mojito from '@/app/components/Menu/Mojito';

const navItems = [
  { label: 'Margarita', icon: '≡' },
  { label: 'Pina colada', icon: '≡' },
  { label: 'Passion fruit martini', icon: '≡' },
  { label: 'Aperol spritz', icon: '≡' },
  { label: 'Mojito', icon: '≡' },
];

function PageContent({ active }: { active: string }) {
  switch (active) {
    case 'Margarita':
      return <Margarita />;
    case 'Pina colada':
      return <Pinacolada />;
    case 'Passion fruit martini':
      return <Passionmartini />;
    case 'Aperol spritz':
      return <Aperolspritz />;
    case 'Mojito':
      return <Mojito />;
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
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar — horizontal scrollable boxes on mobile/tablet, vertical sidebar on lg+ */}
      <aside className="w-full lg:w-44 lg:shrink-0 bg-[#a4ada7] flex flex-row lg:flex-col px-2 py-2 lg:px-0 lg:py-6 gap-2 lg:gap-1 overflow-x-auto lg:overflow-x-visible">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`flex shrink-0 items-center gap-2 lg:gap-3 px-3 lg:px-5 py-1.5 lg:py-3 text-xs lg:text-sm font-bold transition-all text-left whitespace-nowrap
              rounded-lg lg:rounded-none
              border lg:border-0
              ${
                active === item.label
                  ? 'bg-[#818b86] text-black border-amber-400 lg:border-r-4 lg:border-amber-400'
                  : 'text-black border-gray-500 hover:bg-black hover:text-white hover:border-black'
              }`}
          >
            <span className="text-sm lg:text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children ?? <PageContent active={active} />}
      </main>
    </div>
  );
}
