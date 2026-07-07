'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const COLS = 7;
const ROWS = 8;
const CUPS = ['☕', '🧋', '🍵', '🥤', '🫖'];

function makeGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => CUPS[Math.floor(Math.random() * CUPS.length)])
  );
}

function findMatches(grid: string[][]) {
  const m = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS - 2; c++)
      if (grid[r][c] && grid[r][c] === grid[r][c+1] && grid[r][c] === grid[r][c+2])
        m[r][c] = m[r][c+1] = m[r][c+2] = true;
  for (let c = 0; c < COLS; c++)
    for (let r = 0; r < ROWS - 2; r++)
      if (grid[r][c] && grid[r][c] === grid[r+1][c] && grid[r][c] === grid[r+2][c])
        m[r][c] = m[r+1][c] = m[r+2][c] = true;
  return m;
}

function applyMatches(grid: string[][], matched: boolean[][]): { grid: string[][], score: number } {
  let score = 0;
  const result: string[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
  for (let c = 0; c < COLS; c++) {
    const col = grid.map((row, r) => { if (matched[r][c]) { score += 10; return ''; } return row[c]; }).filter(Boolean);
    while (col.length < ROWS) col.unshift(CUPS[Math.floor(Math.random() * CUPS.length)]);
    for (let r = 0; r < ROWS; r++) result[r][c] = col[r];
  }
  return { grid: result, score };
}

export default function Game() {
  const [grid, setGrid]           = useState<string[][]>(makeGrid);
  const [selected, setSelected]   = useState<[number,number]|null>(null);
  const [score, setScore]         = useState(0);
  const [best, setBest]           = useState(0);
  const [moves, setMoves]         = useState(25);
  const [over, setOver]           = useState(false);
  const [matched, setMatched]     = useState<boolean[][]>(() => Array.from({ length: ROWS }, () => Array(COLS).fill(false)));
  const [animating, setAnimating] = useState(false);

  const clearMatches = useCallback((g: string[][]) => {
    const m = findMatches(g);
    if (!m.some(r => r.some(Boolean))) { setAnimating(false); return; }
    setMatched(m);
    setTimeout(() => {
      const { grid: next, score: gained } = applyMatches(g, m);
      setGrid(next);
      setScore(s => { const n = s + gained; setBest(b => Math.max(b, n)); return n; });
      setMatched(Array.from({ length: ROWS }, () => Array(COLS).fill(false)));
      setAnimating(false);
      clearMatches(next);
    }, 350);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { clearMatches(grid); }, []);

  function handleCell(r: number, c: number) {
    if (animating || over) return;
    if (!selected) { setSelected([r, c]); return; }
    const [sr, sc] = selected;
    if (sr === r && sc === c) { setSelected(null); return; }
    if (Math.abs(r - sr) + Math.abs(c - sc) === 1) {
      const next = grid.map(row => [...row]);
      [next[sr][sc], next[r][c]] = [next[r][c], next[sr][sc]];
      const m = findMatches(next);
      if (m.some(row => row.some(Boolean))) {
        const newMoves = moves - 1;
        setMoves(newMoves);
        setAnimating(true);
        setGrid(next);
        setMatched(m);
        setTimeout(() => {
          const { grid: g2, score: gained } = applyMatches(next, m);
          setGrid(g2);
          setScore(s => { const n = s + gained; setBest(b => Math.max(b, n)); return n; });
          setMatched(Array.from({ length: ROWS }, () => Array(COLS).fill(false)));
          if (newMoves <= 0) { setOver(true); setAnimating(false); }
          else clearMatches(g2);
        }, 350);
      }
    }
    setSelected(null);
  }

  function restart() {
    const g = makeGrid();
    setGrid(g); setScore(0); setMoves(25);
    setOver(false); setSelected(null);
    setMatched(Array.from({ length: ROWS }, () => Array(COLS).fill(false)));
    clearMatches(g);
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start py-8 px-4"
      style={{
        background: 'linear-gradient(135deg, #1a0a00 0%, #3d1f08 50%, #1a0a00 100%)',
        backgroundImage: 'radial-gradient(circle, #f5c87a 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* dot grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle, #f5c87a 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
      />

      {/* ── Top bar ── */}
      <div className="w-full max-w-lg flex items-center justify-between mb-6">
        <Link href="/home" className="text-amber-400/60 hover:text-amber-400 text-sm font-bold transition-colors flex items-center gap-1">
          ← Back
        </Link>
        <div className="text-center">
          <p className="text-amber-400 text-xs font-black uppercase tracking-[0.25em]">☕ Coffee Seeko</p>
          <h1 className="text-white text-2xl font-black">Coffee Match</h1>
        </div>
        <button
          onClick={restart}
          className="text-amber-400/60 hover:text-amber-400 text-sm font-bold transition-colors"
        >
          New ↺
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="w-full max-w-lg grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Score',  value: score,          color: 'text-amber-400' },
          { label: 'Moves',  value: moves,          color: moves <= 5 ? 'text-red-400 animate-pulse' : 'text-white' },
          { label: 'Best',   value: best,           color: 'text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 rounded-2xl py-3 text-center border border-white/10">
            <p className={`text-3xl font-black leading-none ${s.color}`}>{s.value}</p>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Grid ── */}
      <div className="w-full max-w-lg bg-white/5 rounded-3xl p-3 border border-white/10 shadow-2xl">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isSel   = selected?.[0] === r && selected?.[1] === c;
              const isMatch = matched[r][c];
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCell(r, c)}
                  className={`aspect-square rounded-xl flex items-center justify-center select-none transition-all duration-200
                    text-2xl md:text-3xl
                    ${isSel   ? 'bg-amber-500 scale-110 shadow-xl shadow-amber-500/50 ring-2 ring-amber-300' : 'bg-white/10 hover:bg-white/20 active:scale-95'}
                    ${isMatch ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                >
                  {cell}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Hint ── */}
      <p className="text-white/20 text-[10px] uppercase tracking-widest mt-4">
        Tap a cup · Tap adjacent to swap · Match 3+
      </p>

      {/* ── Game Over ── */}
      {over && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a0a00] border border-amber-800/50 rounded-3xl p-8 text-center max-w-xs w-full shadow-2xl space-y-4">
            <span className="text-6xl block">☕</span>
            <h2 className="text-3xl font-black text-white">Game Over!</h2>
            <p className="text-amber-400 text-2xl font-bold">{score} pts</p>
            {score >= best && score > 0 && (
              <p className="text-emerald-400 text-sm font-bold">🏆 New Best Score!</p>
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
