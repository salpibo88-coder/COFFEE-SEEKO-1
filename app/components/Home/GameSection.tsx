import Link from 'next/link';

export default function GameSection() {
  return (
    <section className="w-full bg-[#e1eee1] py-14 px-8 flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-BLACK uppercase tracking-[0.3em] text-xs font-black">Take a Break ☕</p>
      <h2 className="text-3xl md:text-4xl font-black text-black">
        Play Coffee Match!
      </h2>
      <p className="text-black text-sm max-w-sm leading-relaxed">
        Match 3 coffee cups, earn points, and beat your high score while waiting for your brew.
      </p>
      <Link
        href="/game"
        className="mt-2 inline-block bg-[#9afa00] hover:bg-[#8ffd00] active:scale-95 text-black font-black uppercase tracking-widest text-sm px-10 py-4 rounded-full transition-all shadow-lg shadow-amber-500/30 hover:scale-105"
      >
        ▶ Play Now
      </Link>
    </section>
  );
}
