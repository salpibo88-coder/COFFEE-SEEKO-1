'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] font-sans text-[#1a1411] py-16 px-6 md:px-12">
      <header className="max-w-4xl mx-auto mb-16 border-b border-[#dcd6ce] pb-8">
        <h1 className="text-5xl font-sans md:text-6xl font-serif text-[#1a1411]">About Us</h1>
        <p className="text-xl text-[#6b5040] mt-4 italic">Our story, our passion, our coffee.</p>
      </header>

      <main className="max-w-3xl mx-auto space-y-16">
        <section aria-labelledby="who-we-are">
          <h2 id="who-we-are" className="text-3xl font-serif text-amber-900 mb-4">Who We Are</h2>
          <p className="text-lg text-[#5a3e2b] leading-relaxed">
            We are a small, independent coffee roastery dedicated to sourcing the finest single-origin 
            beans from around the world. Every cup we serve is a reflection of the farmers, the land, 
            and the meticulous craft that brought it to life.
          </p>
        </section>

        <section aria-labelledby="our-mission">
          <h2 id="our-mission" className="text-3xl font-serif text-amber-900 mb-4">Our Mission</h2>
          <p className="text-lg text-[#5a3e2b] leading-relaxed">
            To connect people with extraordinary coffee experiences—from the farm to your cup—while 
            championing sustainable and ethical sourcing practices that provide long-term benefits 
            to growers worldwide.
          </p>
        </section>

        <section aria-labelledby="our-roastery">
          <h2 id="our-roastery" className="text-3xl font-serif text-amber-900 mb-4">Our Roastery</h2>
          <p className="text-lg text-[#5a3e2b] leading-relaxed">
            Founded in 2018, our roastery utilizes precise, small-batch techniques to unlock the 
            unique flavor profiles inherent in every origin. We roast fresh weekly to ensure 
            that every bag you receive is at its peak flavor potential.
          </p>
        </section>
      </main>

      <footer className="max-w-3xl mx-auto mt-20 pt-10 border-t border-[#dcd6ce] text-center">
        <p className="text-[#6b5040]">Ready to brew? Visit us at our flagship roastery.</p>
      </footer>
    </div>
  );
}