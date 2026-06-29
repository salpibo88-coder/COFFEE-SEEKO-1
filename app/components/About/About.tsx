'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1411] p-12">
      <header className="mb-16">
        <h1 className="text-4xl font-serif">About Us</h1>
        <p className="text-[#6b5040] mt-2">Our story, our passion, our coffee.</p>
      </header>

      <main className="max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-serif text-amber-700 mb-3">Who We Are</h2>
          <p className="text-[#5a3e2b] leading-relaxed">
            We are a small, independent coffee roastery dedicated to sourcing the finest single-origin
            beans from around the world. Every cup we serve is a reflection of the farmers, the land,
            and the craft that brought it to life.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-amber-700 mb-3">Our Mission</h2>
          <p className="text-[#5a3e2b] leading-relaxed">
            To connect people with extraordinary coffee experiences — from the farm to your cup —
            while supporting sustainable and ethical sourcing practices that benefit growers worldwide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif text-amber-700 mb-3">Our Roastery</h2>
          <p className="text-[#5a3e2b] leading-relaxed">
            Founded in 2018, our roastery uses small-batch techniques to bring out the unique character
            of each origin. We roast fresh weekly so every bag you receive is at peak flavor.
          </p>
        </section>
      </main>
    </div>
  );
}
