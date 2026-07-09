'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Coffee {
  id: number;
  x: number; // percentage from left (0 to 90)
  y: number; // percentage from top (0 to 100)
  type: 'espresso' | 'boba' | 'matcha' | 'trap';
  points: number;
  speed: number;
}

const CUP_TYPES = [
  { 
    key: 'espresso', 
    label: 'Espresso', 
    points: 10, 
    speed: 2.0, 
    src: 'https://static.vecteezy.com/system/resources/previews/030/809/213/non_2x/banana-bunch-fruit-no-background-free-png.png',
    style: 'border-amber-500 text-amber-100' 
  },
  { 
    key: 'espresso', 
    label: 'Espresso', 
    points: 10, 
    speed: 2.0, 
    src: 'https://static.vecteezy.com/system/resources/previews/030/809/213/non_2x/banana-bunch-fruit-no-background-free-png.png',
    style: 'border-amber-500 text-amber-100' 
  },
  { 
    key: 'boba', 
    label: 'Boba Tea', 
    points: 15, 
    speed: 1.5, 
    src: 'https://static.vecteezy.com/system/resources/thumbnails/036/152/966/small/fruit-strawberry-isolated-with-clipping-path-png.png',
    style: 'border-orange-400 text-amber-950' 
  },
  { 
    key: 'matcha', 
    label: 'Matcha', 
    points: 20, 
    speed: 2.2, 
    src: 'https://www.pngarts.com/files/3/Blackberry-Fruit-Transparent-Image.png',
    style: 'border-emerald-400 text-emerald-50' 
  },
  { 
    key: 'trap', 
    label: 'Spill', 
    points: -25, 
    speed: 4.0, 
    src: 'https://png.pngtree.com/png-vector/20250320/ourmid/pngtree-rotten-apple-with-mold-and-wormhole-isolated-on-transparent-background-png-image_15795488.png',
    style: 'border-red-300 text-white animate-pulse' 
  },
] as const;

const GAME_DURATION = 45;

export default function CoffeeCatcher() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [over, setOver] = useState(false);
  const [coffees, setCoffees] = useState<Coffee[]>([]);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  // 1. Countdown Timer
  useEffect(() => {
    if (over) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [over]);

  // 2. Game Loop (Spawning & Falling Physics)
  useEffect(() => {
    if (over) return;

    const spawnInterval = setInterval(() => {
      const config = CUP_TYPES[Math.floor(Math.random() * CUP_TYPES.length)];
      const newCoffee: Coffee = {
        id: idCounter.current++,
        x: Math.floor(Math.random() * 80) + 10,
        y: -12,
        type: config.key,
        points: config.points,
        speed: config.speed + Math.random() * 1.2,
      };
      setCoffees((prev) => [...prev, newCoffee]);
    }, 550);

    const animationTicker = setInterval(() => {
      setCoffees((prev) =>
        prev
          .map((c) => ({ ...c, y: c.y + c.speed }))
          .filter((c) => c.y < 110)
      );
    }, 16);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(animationTicker);
    };
  }, [over]);

  function handleCatch(id: number, points: number) {
    if (over) return;
    setCoffees((prev) => prev.filter((c) => c.id !== id));
    setScore((s) => {
      const nextScore = Math.max(0, s + points);
      setBest((b) => Math.max(b, nextScore));
      return nextScore;
    });
  }

  function restart() {
    setCoffees([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setOver(false);
  }

  // Helper component to render the external images cleanly with default sizing
  function renderCupGraphic(type: 'espresso' | 'boba' | 'matcha' | 'trap') {
    const config = CUP_TYPES.find((c) => c.key === type);
    if (!config) return null;

    // Optional animation configurations applied on top of the images
    const specialEffects = type === 'trap' ? 'animate-spin [animation-duration:5s]' : '';

    return (
      <div className={`w-14 h-14 relative flex items-center justify-center rounded-xl  p-1 shadow-md ${specialEffects}`}>
        {/* Using native img here so you don't need to configure remotePatterns in next.config.js for sandbox testing */}
        <img 
          src={config.src} 
          alt={config.label}
          className="w-full h-full object-contain rounded-lg"
          draggable="false"
        />
      </div>
    );
  }

  return (
    <div
         className="min-h-screen w-full flex flex-col items-center justify-start py-8 px-4 select-none touch-none"
              style={{
          backgroundImage: `
            radial-gradient(circle, rgba(167, 139, 250, 0.18) 1px, transparent 1px),
            linear-gradient(135deg, #13081f 0%, #43206e 50%, #13081f 100%)
          `,
          backgroundSize: '32px 32px, 100% 100%',
        }}
    >
      {/* ── Top Bar ── */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4">
        <Link href="/home" className="text-amber-400/60 hover:text-amber-400 text-sm font-bold transition-colors">
          ← Back
        </Link>
        <div className="text-center">
          <p className="text-amber-400 text-xs font-black uppercase tracking-[0.25em]"> Visual Arcade</p>
          <h1 className="text-white text-2xl font-black">Coffee Rush</h1>
        </div>
        <button onClick={restart} className="text-amber-400/60 hover:text-amber-400 text-sm font-bold transition-colors">
          Reset ↺
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="w-full max-w-lg grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Score', value: score, color: 'text-amber-400' },
          { label: 'Time Left', value: `${timeLeft}s`, color: timeLeft <= 10 ? 'text-red-500 animate-pulse font-extrabold' : 'text-white' },
          { label: 'Best', value: best, color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl py-3 text-center border border-white/10">
            <p className={`text-3xl font-black leading-none ${s.color}`}>{s.value}</p>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Real-Time Graphical Stage ── */}
      <div
        ref={gameAreaRef}
        className="w-full max-w-lg h-[60vh] bg-neutral-950/60 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-sm cursor-crosshair"
      >
        {coffees.map((coffee) => (
          <button
            key={coffee.id}
            onClick={() => handleCatch(coffee.id, coffee.points)}
            className="absolute p-2 active:scale-75 transition-transform duration-75 select-none focus:outline-none"
            style={{
              left: `${coffee.x}%`,
              top: `${coffee.y}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          >
            {renderCupGraphic(coffee.type)}
          </button>
        ))}

        {coffees.length === 0 && !over && (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-bold uppercase tracking-widest">
            Tap the items falling down!
          </div>
        )}
      </div>

      {/* ── Visual Menu Legend ── */}
      <div className="w-full max-w-lg mt-4 bg-white rounded-2xl p-4 border border-white/5 grid grid-cols-4 gap-2 text-center text-[10px] text-white/70 font-bold uppercase tracking-wider">
        <div className="flex flex-col items-center gap-1">
          {renderCupGraphic('espresso')}
          <span className="text-amber-400 mt-1">+10</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          {renderCupGraphic('boba')}
          <span className="text-orange-300 mt-1">+15</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          {renderCupGraphic('matcha')}
          <span className="text-emerald-400 mt-1">+20</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          {renderCupGraphic('trap')}
          <span className="text-red-400 mt-1">-25</span>
        </div>
      </div>

      {/* ── Game Over Screen ── */}
      {over && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a0a00] border border-amber-800/50 rounded-3xl p-8 text-center max-w-xs w-full shadow-2xl space-y-4">
            <div className="flex justify-center">{renderCupGraphic('espresso')}</div>
            <h2 className="text-3xl font-black text-white">Time's Up!</h2>
            <p className="text-amber-400 text-3xl font-black">{score} pts</p>
            {score >= best && score > 0 && (
              <p className="text-emerald-400 text-sm font-bold">🏆 New High Score!</p>
            )}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={restart}
                className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-black uppercase tracking-widest text-sm px-8 py-3 rounded-full transition-all"
              >
                ↺ Play Again
              </button>
              <Link
                href="/home"
                className="text-white/40 hover:text-white text-xs font-bold transition-colors underline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}