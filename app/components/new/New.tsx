'use client';

const articles = [
  {
    id: 1,
    date: 'June 15, 2026',
    title: 'New Single-Origin from Ethiopia',
    desc: "We just received a limited harvest from the Yirgacheffe region — floral, bright, and unlike anything we've served before.",
  },
  {
    id: 2,
    date: 'May 28, 2026',
    title: 'Summer Cold Brew Menu Launches',
    desc: 'Beat the heat with our new cold brew lineup, including a new Nitro Lavender and Vanilla Cold Brew.',
  },
  {
    id: 3,
    date: 'May 10, 2026',
    title: 'We Won Best Local Roastery 2026',
    desc: 'Honored to be voted Best Local Roastery by Brew City Magazine for the second year in a row.',
  },
];

export default function New() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1411] p-12">
      <header className="mb-16">
        <h1 className="text-4xl font-serif">News</h1>
        <p className="text-[#6b5040] mt-2">Updates, stories, and announcements.</p>
      </header>

      <main className="max-w-2xl space-y-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="border border-[#c8b89a] rounded-2xl p-8 hover:border-amber-600/60 transition bg-white/50"
          >
            <p className="text-xs text-[#8a6a55] uppercase tracking-widest mb-2">{article.date}</p>
            <h2 className="text-xl font-bold mb-3">{article.title}</h2>
            <p className="text-[#5a3e2b] leading-relaxed">{article.desc}</p>
          </article>
        ))}
      </main>
    </div>
  );
}
