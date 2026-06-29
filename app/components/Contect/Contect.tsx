'use client';

import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#2d241e] p-6 md:p-12 lg:p-24 flex justify-center items-center">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100">
        
        {/* Left Side: Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-serif mb-6 text-[#1a1411]">Let's Talk Coffee</h1>
            <p className="text-lg text-[#6b5040] leading-relaxed mb-8">
              Have questions about our beans, wholesale inquiries, or just want to share your favorite brew method? We're here for you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#6b5040]">
              <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center text-lg">📍</div>
              <p>123 Coffee Lane, Brew City</p>
            </div>
            <div className="flex items-center gap-4 text-[#6b5040]">
              <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center text-lg">📧</div>
              <p>hello@mycoffee.com</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-[#f5f0e8] p-8 rounded-3xl">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm">☕</div>
              <h2 className="text-2xl font-bold text-[#2d5a27]">Message Sent!</h2>
              <p className="text-[#6b5040] mt-2">Our team will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { label: 'Name', type: 'text', placeholder: 'John Doe' },
                { label: 'Email', type: 'email', placeholder: 'john@example.com' }
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#8c7a6e] mb-2">{field.label}</label>
                  <input
                    required
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-white border border-[#e5dcd3] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2d5a27]/20 focus:border-[#2d5a27] transition-all outline-none"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8c7a6e] mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full bg-white border border-[#e5dcd3] rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2d5a27]/20 focus:border-[#2d5a27] transition-all outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2d5a27] text-white font-semibold py-4 rounded-xl hover:bg-[#1e3d1a] shadow-lg shadow-[#2d5a27]/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}