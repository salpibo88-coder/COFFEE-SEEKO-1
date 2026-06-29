'use client';

import { useState } from 'react';

const products = [
  { id: 1, name: 'Ethiopian Yirgacheffe', price: '$22.00', desc: 'Floral and citrus notes.' },
  { id: 2, name: 'Sumatra Mandheling', price: '$24.00', desc: 'Earthy and full-bodied.' },
  { id: 3, name: 'Colombian Supremo', price: '$19.00', desc: 'Balanced caramel sweetness.' },
];

function generateCode(productId: number) {
  const ts = Date.now().toString(36).toUpperCase();
  return `ORD-${productId}${ts}`;
}

export default function ShopPage() {
  const [orders, setOrders] = useState<{ code: string; product: string }[]>([]);
  const [latest, setLatest] = useState<string | null>(null);

  function handleAdd(product: (typeof products)[0]) {
    const code = generateCode(product.id);
    setOrders((prev) => [...prev, { code, product: product.name }]);
    setLatest(code);
    setTimeout(() => setLatest(null), 4000);
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1411] p-12">
      <header className="mb-16">
        <h1 className="text-4xl font-serif">Our Collection</h1>
        <p className="text-[#6b5040] mt-2">Discover our curated selection of premium beans.</p>
      </header>

      {/* Toast notification */}
      {latest && (
        <div className="fixed top-6 right-6 z-50 bg-amber-500 text-black px-6 py-4 rounded-2xl shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1">Order Placed</p>
          <p className="text-lg font-bold font-mono">{latest}</p>
          <p className="text-xs mt-1 opacity-70">Show this code to the seller</p>
        </div>
      )}

      <main className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="border border-[#c8b89a] p-8 rounded-2xl hover:border-amber-600/60 transition bg-white/50">
            <div className="w-full h-40 bg-[#c8b89a]/30 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-4xl">☕</span>
            </div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-[#8a6a55] text-sm mt-2 mb-4">{product.desc}</p>
            <div className="flex justify-between items-center mt-6">
              <span className="text-amber-700 font-bold">{product.price}</span>
              <button
                onClick={() => handleAdd(product)}
                className="bg-[#1a1411] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-amber-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Order history for seller */}
      {orders.length > 0 && (
        <section className="mt-16 border-t border-[#c8b89a] pt-10">
          <h2 className="text-2xl font-serif mb-6 text-amber-700">Seller — Order Codes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {orders.map((order, i) => (
              <div key={i} className="bg-white border border-amber-600/30 rounded-xl p-5">
                <p className="text-xs text-[#8a6a55] uppercase tracking-widest mb-1">{order.product}</p>
                <p className="text-xl font-mono font-bold text-amber-700">{order.code}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
