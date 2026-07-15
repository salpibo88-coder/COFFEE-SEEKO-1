'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

// ==================== GAME TYPES ====================
type GameType = 'fight' | 'race' | 'clicker' | 'memory' | 'flappy';

interface GameOption {
  id: GameType;
  title: string;
  emoji: string;
}

// ==================== SHARED HEADER ====================
function GameHeader({ title, emoji, onBack }: { title: string; emoji: string; onBack: () => void }) {
  return (
    <div className="bg-zinc-950/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-lg font-semibold text-white/80 hover:text-white transition-colors"
      >
        ← Back to Arcade
      </button>
      <div className="flex items-center gap-4">
        <div className="text-4xl drop-shadow-lg">{emoji}</div>
        <h1 className="text-3xl font-black tracking-tighter text-white">{title}</h1>
      </div>
      <div className="w-10" />
    </div>
  );
}

// Simple sound effect
const playSound = (freq: number, duration: number, type: 'sine' | 'square' | 'sawtooth' = 'sine') => {
  try {
    const audio = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.value = freq;
    gain.gain.value = 0.3;
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), duration);
  } catch (e) {}
};

// ==================== 1. FIGHTING GAME ====================
function FightingGame({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [combo, setCombo] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);

  const attack = (power: number, soundFreq: number) => {
    if (enemyHealth <= 0) return;
    setIsAttacking(true);
    playSound(soundFreq, 80, 'sawtooth');
    
    const damage = power + combo * 3;
    setEnemyHealth(h => Math.max(0, h - damage));
    setScore(s => s + damage);
    setCombo(c => c + 1);

    setTimeout(() => setIsAttacking(false), 150);

    if (Math.random() > 0.55) {
      setTimeout(() => {
        setPlayerHealth(h => Math.max(0, h - 12));
        playSound(180, 120);
      }, 400);
    }
  };

  const reset = () => {
    setScore(0); setPlayerHealth(100); setEnemyHealth(100); setCombo(0);
  };

  const isGameOver = playerHealth <= 0 || enemyHealth <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-red-950 to-black text-white overflow-hidden">
      <GameHeader title="NEON FIGHTER" emoji="🥊" onBack={onBack} />
      <div className="p-6">
        <div className="flex justify-between mb-8">
          <div className="text-center">
            <div className="text-sm text-red-400">YOU</div>
            <div className="text-3xl font-bold text-red-400">{playerHealth}</div>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">VS</div>
            <div className="text-xl text-yellow-400">COMBO x{combo}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-cyan-400">ENEMY</div>
            <div className="text-3xl font-bold text-cyan-400">{enemyHealth}</div>
          </div>
        </div>

        <div className="relative h-80 flex items-center justify-center text-[180px] mb-12">
          <div className={`transition-transform ${isAttacking ? 'scale-125' : ''}`}>🥊</div>
          <div className="absolute text-8xl right-12 top-12">🥷</div>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={() => attack(18, 320)} className="flex-1 bg-red-600 hover:bg-red-500 py-6 rounded-2xl text-2xl font-bold active:scale-95 transition">LIGHT COMBO</button>
          <button onClick={() => attack(32, 180)} className="flex-1 bg-orange-600 hover:bg-orange-500 py-6 rounded-2xl text-2xl font-bold active:scale-95 transition">ULTIMATE STRIKE</button>
        </div>
      </div>

      {isGameOver && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-6xl font-black mb-4 text-yellow-400">{enemyHealth <= 0 ? "VICTORY!" : "DEFEATED"}</h2>
            <p className="text-5xl mb-10">FINAL SCORE: {score}</p>
            <button onClick={reset} className="bg-white text-black px-16 py-5 rounded-2xl text-2xl font-bold">FIGHT AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 2. RACING GAME ====================
function RacingGame({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState(50);
  const [speed, setSpeed] = useState(8);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const spawn = setInterval(() => {
      setObstacles(o => [...o, { id: Date.now(), x: Math.random() * 75 + 12, y: -30 }]);
    }, 550);

    const gameTick = setInterval(() => {
      setObstacles(prev => {
        const newObs = prev.map(o => ({ ...o, y: o.y + speed })).filter(o => o.y < 130);
        newObs.forEach(o => {
          if (Math.abs(o.x - position) < 18 && o.y > 55 && o.y < 85) setGameOver(true);
        });
        return newObs;
      });
      setScore(s => s + 1);
      if (speed < 14) setSpeed(s => s + 0.008);
    }, 40);

    return () => { clearInterval(spawn); clearInterval(gameTick); };
  }, [position, speed]);

  const move = (dir: number) => setPosition(p => Math.max(12, Math.min(82, p + dir)));

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <GameHeader title="NEON RACER" emoji="🏎️" onBack={onBack} />
      <div className="text-center py-3 text-2xl font-mono">DISTANCE: {score}m</div>

      <div className="relative mx-auto w-[360px] h-[560px] bg-gradient-to-b from-slate-900 to-black overflow-hidden border-8 border-yellow-400/80 rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent_0,transparent_60px,#eab308_60px,#eab308_64px)] opacity-30" />
        <div className="absolute text-7xl transition-all duration-75" style={{ left: `${position}%`, top: '65%' }}>🏎️</div>
        {obstacles.map(o => (
          <div key={o.id} className="absolute text-6xl transition-all" style={{ left: `${o.x}%`, top: `${o.y}%` }}>🚧</div>
        ))}
      </div>

      <div className="flex gap-6 justify-center mt-8">
        <button onClick={() => move(-22)} className="w-28 h-28 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-5xl active:scale-90">←</button>
        <button onClick={() => move(22)} className="w-28 h-28 bg-zinc-800 hover:bg-zinc-700 rounded-2xl text-5xl active:scale-90">→</button>
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl font-black mb-6 text-red-500">CRASHED!</h2>
            <p className="text-6xl mb-8">FINAL: {score}m</p>
            <button onClick={() => window.location.reload()} className="bg-yellow-400 text-black px-16 py-6 rounded-2xl text-2xl font-bold">RESTART RACE</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 3. MEGA CLICKER ====================
function MegaClicker({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [multi, setMulti] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timeLeft]);

  const handleClick = () => {
    playSound(800 + Math.random() * 400, 40);
    setScore(s => s + multi);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 80);
    if (Math.random() > 0.8) setMulti(m => Math.min(12, m + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-950 to-black text-white flex flex-col items-center justify-center">
      <GameHeader title="MEGA CLICKER" emoji="⚡" onBack={onBack} />
      <div className="text-center mt-8 mb-12">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">{score}</div>
        <div className="text-3xl text-purple-300">×{multi} MULTIPLIER</div>
      </div>

      <button 
        onClick={handleClick}
        className={`w-72 h-72 rounded-full text-8xl font-black shadow-2xl transition-all active:scale-95 border-8 border-white/30 ${isPressed ? 'scale-95 bg-purple-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}
      >
        TAP!
      </button>

      <div className="mt-12 text-4xl font-mono">TIME: {timeLeft}s</div>

      {timeLeft <= 0 && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-7xl font-black mb-6">HIGH SCORE!</h2>
            <p className="text-7xl mb-10 text-purple-400">{score}</p>
            <button onClick={() => window.location.reload()} className="bg-white text-black px-16 py-6 rounded-3xl text-2xl font-bold">PLAY AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 4. MEMORY MATCH ====================
function MemoryMatch({ onBack }: { onBack: () => void }) {
  const symbols = ['🌟','🔥','🌀','⚡','🌊','🍄'];
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5)
      .map((symbol, i) => ({ id: i, symbol }));
    setCards(deck);
  }, []);

  const flip = (id: number) => {
    if (flipped.length === 2 || matched.includes(id)) return;
    setFlipped(prev => [...prev, id]);
    playSound(600, 60);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (cards[a].symbol === cards[b].symbol) {
        setMatched(m => [...m, a, b]);
        setScore(s => s + 50);
        playSound(1200, 200);
      } else {
        playSound(300, 150);
      }
      setTimeout(() => setFlipped([]), 700);
    }
  }, [flipped, cards]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <GameHeader title="NEON MEMORY" emoji="🧠" onBack={onBack} />
      <div className="text-center py-6 text-3xl">Score: <span className="text-yellow-400">{score}</span></div>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto p-6">
        {cards.map((card, i) => (
          <button
            key={i}
            onClick={() => flip(i)}
            className={`aspect-square text-6xl flex items-center justify-center rounded-3xl transition-all border-2 ${flipped.includes(i) || matched.includes(i) ? 'bg-zinc-800 border-yellow-400' : 'bg-zinc-900 border-zinc-700 hover:border-white/30'}`}
          >
            {(flipped.includes(i) || matched.includes(i)) ? card.symbol : '❓'}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==================== 5. FLAPPY GAME ====================
function FlappyGame({ onBack }: { onBack: () => void }) {
  const [birdY, setBirdY] = useState(220);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const flap = useCallback(() => {
    if (gameOver) return;
    setVelocity(-13);
    playSound(750, 60);
  }, [gameOver]);

  useEffect(() => {
    const loop = setInterval(() => {
      setVelocity(v => v + 0.75);
      setBirdY(y => {
        const newY = y + velocity;
        if (newY > 480 || newY < 0) setGameOver(true);
        return newY;
      });
    }, 25);
    return () => clearInterval(loop);
  }, [velocity]);

  useEffect(() => {
    const spawn = setInterval(() => {
      if (!gameOver) {
        const gap = 160 + Math.random() * 60;
        setObstacles(o => [...o, { x: 420, gap, passed: false }]);
      }
    }, 1400);
    return () => clearInterval(spawn);
  }, [gameOver]);

  useEffect(() => {
    obstacles.forEach((o, i) => {
      if (o.x < 60 && o.x > 30 && (birdY < o.gap - 60 || birdY > o.gap + 60)) {
        setGameOver(true);
      }
      if (o.x < 30 && !o.passed) {
        setScore(s => s + 1);
        setObstacles(prev => prev.map((obs, idx) => idx === i ? {...obs, passed: true} : obs));
      }
    });
  }, [obstacles, birdY]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-indigo-950 relative overflow-hidden" onClick={flap}>
      <GameHeader title="SKY DASH" emoji="🐦" onBack={onBack} />
      <div className="relative h-[560px] mx-auto max-w-md border-4 border-white/40 overflow-hidden">
        <div className="absolute text-7xl transition-all duration-75 z-10" style={{ left: 90, top: birdY }}>🐦</div>
        {obstacles.map((o, i) => (
          <div key={i}>
            <div className="absolute w-20 bg-emerald-700" style={{ left: o.x, top: 0, height: o.gap - 40 }} />
            <div className="absolute w-20 bg-emerald-700" style={{ left: o.x, top: o.gap + 80, height: 600 }} />
          </div>
        ))}
      </div>
      <div className="text-center text-6xl font-black text-white mt-6">SCORE: {score}</div>
      <div className="text-center text-white/60 mt-2">TAP TO FLY</div>

      {gameOver && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="text-center">
            <h2 className="text-6xl font-black mb-8">GAME OVER</h2>
            <p className="text-7xl text-yellow-400 mb-12">FINAL SCORE: {score}</p>
            <button onClick={() => window.location.reload()} className="bg-white text-black px-16 py-6 rounded-3xl text-2xl font-bold">TRY AGAIN</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== MAIN HUB ====================
export default function ArcadeHub() {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);

  const games: GameOption[] = [
    { id: 'fight', title: 'NEON FIGHTER', emoji: '🥊' },
    { id: 'race', title: 'NEON RACER', emoji: '🏎️' },
    { id: 'clicker', title: 'MEGA CLICKER', emoji: '⚡' },
    { id: 'memory', title: 'NEON MEMORY', emoji: '🧠' },
    { id: 'flappy', title: 'SKY DASH', emoji: '🐦' },
  ];

  if (selectedGame) {
    const props = { onBack: () => setSelectedGame(null) };
    switch (selectedGame) {
      case 'fight': return <FightingGame {...props} />;
      case 'race': return <RacingGame {...props} />;
      case 'clicker': return <MegaClicker {...props} />;
      case 'memory': return <MemoryMatch {...props} />;
      case 'flappy': return <FlappyGame {...props} />;
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-7xl font-black tracking-tighter mb-4">PRO ARCADE</h1>
        <p className="text-2xl text-white/60">Choose a premium experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {games.map(g => (
          <button
            key={g.id}
            onClick={() => setSelectedGame(g.id)}
            className="group bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 hover:border-white/40 rounded-3xl p-10 text-left transition-all hover:scale-[1.02] active:scale-95"
          >
            <div className="text-8xl mb-8 transition-transform group-hover:rotate-6">{g.emoji}</div>
            <h3 className="text-4xl font-black mb-2">{g.title}</h3>
            <p className="text-white/60">High quality mini game</p>
          </button>
        ))}
      </div>
    </div>
  );
}