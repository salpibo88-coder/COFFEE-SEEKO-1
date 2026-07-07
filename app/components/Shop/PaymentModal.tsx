'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  FiX, FiMapPin, FiMinus, FiPlus, FiCheckCircle,
  FiInfo, FiNavigation, FiTruck, FiStar, FiCreditCard,
  FiSmartphone, FiDollarSign, FiClock,
} from 'react-icons/fi';
import {
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { MdOutlineLocalCafe } from 'react-icons/md';
import { RiMotorbikeLine } from 'react-icons/ri';

interface Product {
  name: string;
  price: string | number;
  img: string;
  category?: string;
}

interface PaymentModalProps {
  product: Product;
  onClose: () => void;
}

const paymentMethods = [
  {
    id: 'aba',     name: 'ABA Bank',         icon: <FiSmartphone size={18} />,
    qr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png',
    color: '#0066cc', label: 'Scan with ABA Mobile',
  },
  {
    id: 'acleda',  name: 'ACLEDA Bank',      icon: <FiCreditCard size={18} />,
    qr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png',
    color: '#c8201a', label: 'Scan with ACLEDA Unity',
  },
  {
    id: 'wing',    name: 'Wing Bank',        icon: <FiSmartphone size={18} />,
    qr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png',
    color: '#ff6600', label: 'Scan with Wing App',
  },
  {
    id: 'canadia', name: 'Canadia Bank',     icon: <FiCreditCard size={18} />,
    qr: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png',
    color: '#006b3c', label: 'Scan with Canadia App',
  },
  {
    id: 'cash',    name: 'Cash on Delivery', icon: <FiDollarSign size={18} />,
    qr: null, color: '#888', label: 'Pay when delivered',
  },
];

function estimateDelivery(address: string): string {
  if (!address.trim()) return '';
  const l = address.toLowerCase();
  if (l.includes('bkk') || l.includes('ចំការ') || l.includes('chamkar')) return '~10–15 min';
  if (l.includes('toul') || l.includes('tuol')) return '~15–20 min';
  if (l.includes('daun penh') || l.includes('riverside')) return '~20–25 min';
  if (l.includes('sen sok') || l.includes('russey')) return '~25–35 min';
  return '~20–30 min';
}

export default function PaymentModal({ product, onClose }: PaymentModalProps) {
  const [step, setStep]             = useState<'info' | 'payment' | 'qr' | 'done'>('info');
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [address, setAddress]       = useState('');
  const [qrMethod, setQrMethod]     = useState<typeof paymentMethods[0] | null>(null);
  const [qty, setQty]               = useState(1);
  const [payMethod, setPayMethod]   = useState('aba');
  const [locLoading, setLocLoading] = useState(false);

  // Parse price correctly — extract the $X.XX part from strings like "9,500៛ ($2.40)"
  function parsePrice(raw: string | number): { usd: number; riel: number } {
    if (typeof raw === 'number') return { usd: raw, riel: Math.round(raw * 4100) };
    // Try to find pattern like ($2.40) or $2.40
    const dollarMatch = String(raw).match(/\$\s*([\d]+\.[\d]+)/);
    const usd = dollarMatch ? parseFloat(dollarMatch[1]) : 1.25;
    // Try to find riel amount like 5,000 before ៛
    const rielMatch = String(raw).match(/([\d,]+)\s*៛/);
    const riel = rielMatch ? parseInt(rielMatch[1].replace(/,/g, '')) : Math.round(usd * 4100);
    return { usd, riel };
  }

  const { usd: priceUSD, riel: priceRiel } = parsePrice(product.price);
  const totalUSD  = (priceUSD  * qty).toFixed(2);
  const totalRiel = (priceRiel * qty).toLocaleString();
  const eta       = estimateDelivery(address);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  function handleGPS() {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(r => r.json())
          .then(d => setAddress(d.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`))
          .catch(() => setAddress(`${lat.toFixed(5)}, ${lng.toFixed(5)}`))
          .finally(() => setLocLoading(false));
      },
      () => setLocLoading(false)
    );
  }

  function handleConfirm(e: React.FormEvent) { e.preventDefault(); setStep('payment'); }
  function handlePay() {
    const selected = paymentMethods.find(m => m.id === payMethod);
    if (selected?.qr !== null) {
      // bank method → show QR
      setQrMethod(selected ?? null);
      setStep('qr');
    } else {
      // cash on delivery → go straight to done
      setStep('done');
    }
  }

  const goldText = { color: 'rgba(245,215,142,0.8)' } as const;
  const dimText  = { color: 'rgba(245,215,142,0.4)' } as const;
  const divider  = { borderBottom: '1px solid rgba(139,105,20,0.2)' } as const;
  const glassInput = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(139,105,20,0.35)',
    color: 'rgba(245,215,142,0.8)',
  } as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-sm flex flex-col overflow-hidden"
        style={{ maxHeight: '95vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Brand header ── */}
        <div className="text-center pb-2 sm:pb-4 shrink-0">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <MdOutlineLocalCafe size={16} className="text-amber-500 sm:hidden" />
            <MdOutlineLocalCafe size={20} className="text-amber-500 hidden sm:block" />
            <h1 className="text-lg sm:text-2xl font-black tracking-[0.18em] uppercase"
              style={{
                background: 'linear-gradient(180deg,#f5d78e 0%,#c8921a 60%,#a06b10 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontFamily: 'Georgia, serif',
              }}>
              Coffee Seeko
            </h1>
            <MdOutlineLocalCafe size={16} className="text-amber-500 sm:hidden" />
            <MdOutlineLocalCafe size={20} className="text-amber-500 hidden sm:block" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 sm:w-16 bg-linear-to-r from-transparent to-amber-600/50" />
            <FiStar size={8} className="text-amber-500" />
            <div className="h-px w-12 sm:w-16 bg-linear-to-l from-transparent to-amber-600/50" />
          </div>
        </div>

        {/* ── Card ── */}
        <div className="flex-1 overflow-y-auto rounded-2xl border"
          style={{
            background: 'linear-gradient(160deg, #0a1b2e 0%, #0f2d4a 60%, #07101a 100%)',
            borderColor: '#8b691',
            boxShadow: '0 0 40px rgba(139,105,20,0.25), inset 0 1px 0 rgba(245,215,142,0.08)',
          }}>

          {/* ── Done ── */}
          {step === 'done' && (
            <div className="flex flex-col items-center justify-center text-center px-6 py-12 gap-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(139,105,20,0.2)', border: '1px solid #8b6914' }}>
                <MdOutlineLocalCafe size={40} className="text-amber-400 animate-bounce" />
              </div>
              <h3 className="text-xl font-black text-amber-300">Order Confirmed!</h3>
              <p className="text-sm max-w-xs leading-relaxed" style={dimText}>
                Your <strong className="text-amber-300">{product.name}</strong> × {qty} is on the way!
              </p>
              {eta && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <RiMotorbikeLine size={18} /> {eta}
                </div>
              )}
              <div className="px-5 py-2 rounded-full text-sm font-bold text-amber-300"
                style={{ background: 'rgba(139,105,20,0.2)', border: '1px solid #8b6914' }}>
                Total: ${totalUSD} / {totalRiel}៛
              </div>
              <button onClick={onClose}
                className="mt-2 font-black px-10 py-3 rounded-xl text-sm tracking-wide text-black transition-all"
                style={{ background: 'linear-gradient(135deg, #a8f5c5, #1a9c5f)' }}>
                Done
              </button>
            </div>
          )}

          {/* ── QR step ── */}
          {step === 'qr' && qrMethod && (
            <div className="flex flex-col items-center px-5 py-6 gap-4 text-center">
              {/* Bank name */}
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] mb-1" style={{ color: 'rgba(245,215,142,0.5)' }}>
                  Scan to Pay
                </p>
                <p className="text-lg font-black text-amber-300">{qrMethod.name}</p>
              </div>

              {/* QR Code — dynamically encodes amount + bank in the data */}
              <div className="relative p-3 rounded-2xl"
                style={{ background: 'white', border: `3px solid ${qrMethod.color}`, boxShadow: `0 0 24px ${qrMethod.color}55` }}>
                {/* Use qrserver API — encodes payment data as QR */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    `COFFESEEKO|BANK:${qrMethod.id.toUpperCase()}|AMT_USD:${totalUSD}|AMT_KHR:${totalRiel}|ITEM:${product.name}|QTY:${qty}`
                  )}`}
                  alt={`QR code for ${qrMethod.name}`}
                  width={200}
                  height={200}
                  className="block"
                />
                {/* Overlay logo in center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: '#1a0900', border: `2px solid ${qrMethod.color}` }}>
                    <MdOutlineLocalCafe size={20} className="text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl font-black text-base text-amber-300"
                  style={{ background: 'rgba(139,105,20,0.2)', border: '1px solid rgba(139,105,20,0.5)' }}>
                  ${totalUSD}
                </div>
                <div className="text-amber-500/50 font-bold">/</div>
                <div className="px-4 py-2 rounded-xl font-black text-base"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,105,20,0.3)', color: 'rgba(245,215,142,0.6)' }}>
                  {totalRiel}៛
                </div>
              </div>

              <p className="text-xs max-w-xs leading-relaxed" style={{ color: 'rgba(245,215,142,0.4)' }}>
                Open your <strong className="text-amber-400">{qrMethod.name}</strong> app and scan this QR code to pay automatically.
              </p>

              {/* Simulate payment confirmed */}
              <button
                onClick={() => setStep('done')}
                className="w-full font-black py-3.5 rounded-xl text-sm tracking-wide text-black transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg,#f5d78e,#c8921a)', boxShadow: '0 4px 20px rgba(200,146,26,0.4)' }}>
                ✓ Payment Done
              </button>
            </div>
          )}

          {/* ── Payment step ── */}
          {step === 'payment' && (
            <div className="px-5 py-5 space-y-4">
              <div className="flex items-center gap-3 rounded-xl p-4"
                style={{ background: 'rgba(139,105,20,0.12)', border: '1px solid rgba(139,105,20,0.3)' }}>
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/30">
                  <Image src={product.img} alt={product.name} width={48} height={48} unoptimized className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-amber-200 truncate">{product.name}</p>
                  <p className="text-xs" style={dimText}>{qty} × ${priceUSD.toFixed(2)}</p>
                </div>
                <span className="text-amber-400 font-black text-sm">${totalUSD}</span>
              </div>

              <p className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2" style={dimText}>
                <FiCreditCard size={13} className="text-amber-500" /> Choose Payment
              </p>
              <div className="space-y-2">
                {paymentMethods.map(m => (
                  <button key={m.id} type="button" onClick={() => setPayMethod(m.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all"
                    style={{
                      background: payMethod === m.id ? 'rgba(139,105,20,0.2)' : 'rgba(255,255,255,0.03)',
                      borderColor: payMethod === m.id ? '#c8921a' : 'rgba(139,105,20,0.2)',
                    }}>
                    <span className="text-amber-400">{m.icon}</span>
                    <span className="font-bold text-sm flex-1 text-left" style={goldText}>{m.name}</span>
                    {payMethod === m.id && <FiCheckCircle className="text-amber-400 shrink-0" size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Info step ── */}
          {step === 'info' && (
            <form id="pay-form" onSubmit={handleConfirm}>

              {/* Product row */}
              <div className="flex flex-col items-center gap-2 sm:gap-3 px-4 sm:px-5 pt-4 sm:pt-6 pb-4 sm:pb-5" style={divider}>
                {/* Product image — smaller on mobile */}
                <div className="relative w-24 h-24 sm:w-36 sm:h-36 flex items-end justify-center">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-3 rounded-full blur-md"
                    style={{ background: 'radial-gradient(ellipse,rgba(245,215,142,0.3) 0%,transparent 70%)' }} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-2 rounded-full"
                    style={{ background: 'rgba(245,215,142,0.10)', border: '1px solid rgba(245,215,142,0.12)' }} />
                  <div className="relative w-20 h-20 sm:w-32 sm:h-32 drop-shadow-2xl">
                    <Image src={product.img} alt={product.name} fill unoptimized
                      className="object-contain" style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.6))' }} />
                  </div>
                </div>

                {/* name + qty row */}
                <div className="w-full flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="font-black text-amber-200 text-sm leading-snug truncate">{product.name}</p>
                    <p className="text-xs mt-0.5 uppercase tracking-wide" style={dimText}>{product.category || 'Coffee Seeko'}</p>
                    {/* Two price boxes — show TOTAL (updates with qty) */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(139,105,20,0.2)', border: '1px solid rgba(139,105,20,0.4)' }}>
                        <span className="text-[10px] font-black text-amber-400">$</span>
                        <span className="text-xs font-black text-amber-300">{totalUSD}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,105,20,0.25)' }}>
                        <span className="text-[10px] font-black text-amber-500/70">៛</span>
                        <span className="text-xs font-black" style={{ color: 'rgba(245,215,142,0.6)' }}>{totalRiel}</span>
                      </div>
                      {qty > 1 && (
                        <span className="text-[9px] font-semibold" style={{ color: 'rgba(245,215,142,0.35)' }}>
                          ×{qty}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* qty stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(139,105,20,0.3)' }}>
                      <FiMinus size={13} className="text-amber-300" />
                    </button>
                    <span className="w-6 text-center font-black text-amber-200 text-sm">{qty}</span>
                    <button type="button" onClick={() => setQty(q => q + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      style={{ background: 'linear-gradient(135deg,#c8921a,#a06b10)' }}>
                      <FiPlus size={13} className="text-black" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ① Your Info */}
              <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3 sm:space-y-4" style={divider}>
                <p className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2" style={dimText}>
                  <FiInfo size={13} className="text-amber-500" /> Your Info
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Full Name',    val: name,  set: setName,  type: 'text', ph: 'e.g. Dara Chan' },
                    { label: 'Phone Number', val: phone, set: setPhone, type: 'tel',  ph: '+855 12 345 678' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={dimText}>
                        {f.label}
                      </label>
                      <input required value={f.val} onChange={e => f.set(e.target.value)}
                        type={f.type} placeholder={f.ph}
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none transition-all placeholder:opacity-30"
                        style={glassInput}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ② Delivery Location */}
              <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-2 sm:space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2" style={dimText}>
                  <HiOutlineLocationMarker size={14} className="text-amber-500" /> Delivery Location
                </p>

                {/* address input */}
                <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,105,20,0.35)' }}>
                  <div className="w-14 shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(139,105,20,0.15)' }}>
                    <FiMapPin size={18} className="text-rose-400" />
                  </div>
                  <input required value={address} onChange={e => setAddress(e.target.value)}
                    placeholder="Type your address or use GPS..."
                    className="flex-1 px-3 py-3 text-sm outline-none placeholder:opacity-30"
                    style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(245,215,142,0.7)' }}
                  />
                </div>

                {/* GPS button */}
                <button type="button" onClick={handleGPS}
                  className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                  style={{ background: 'rgba(139,105,20,0.15)', border: '1px solid rgba(139,105,20,0.4)', color: '#f5d78e' }}>
                  {locLoading
                    ? <><FiClock size={14} className="animate-spin" /> Getting location...</>
                    : <><FiNavigation size={14} /> Use My GPS Location</>
                  }
                </button>

                {/* ETA */}
                {eta && (
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    <RiMotorbikeLine size={22} className="text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">AI Estimated Delivery</p>
                      <p className="text-sm font-bold text-emerald-300">{eta}</p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* ── Footer button ── */}
        {step !== 'done' && step !== 'qr' && (
          <div className="pt-3 shrink-0">
            {step === 'info' ? (
              <button form="pay-form" type="submit"
                className="w-full font-black py-4 rounded-2xl text-sm tracking-widest flex items-center justify-center relative overflow-hidden transition-all active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg,#2a1800 0%,#3d2200 50%,#2a1800 100%)',
                  border: '1px solid rgba(139,105,20,0.5)',
                  color: '#f5d78e',
                  boxShadow: '0 4px 20px rgba(139,105,20,0.25)',
                }}>
                <RiMotorbikeLine size={18} className="absolute left-5 opacity-70" />
                <span className="font-black tracking-widest whitespace-nowrap">Confirm Order</span>
                <FiStar size={13} className="absolute right-5 text-amber-600/50" />
              </button>
            ) : (
              <button type="button" onClick={handlePay}
                className="w-full font-black py-4 rounded-2xl text-sm tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg,#f5d78e,#c8921a)',
                  color: '#1a0900',
                  boxShadow: '0 4px 24px rgba(200,146,26,0.4)',
                }}>
                <FiCreditCard size={18} />
                Pay ${totalUSD} Now
              </button>
            )}
          </div>
        )}

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(245,215,142,0.5)' }}>
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}
