'use client';
import { FaTiktok, FaTelegram, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-8 md:px-16 border-t border-white/20 bg-black/5">
      <div className="flex flex-col md:flex-row justify-between items-center text-base gap-8">
        
        {/* Logo and Copyright */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-bold text-xl text-white shadow-lg border border-white">
            N
          </div>
          <p className="text-black/80 font-medium">© 2026 Coffee Seeko. All rights reserved.</p>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-blue-600 font-semibold text-lg">
            <span>Facebook</span> <FaFacebook size={26} />
          </a>
          <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-black font-semibold text-lg">
            <span>TikTok</span> <FaTiktok size={26} />
          </a>
          <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-blue-400 font-semibold text-lg">
            <span>Telegram</span> <FaTelegram size={26} />
          </a>
          <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-pink-600 font-semibold text-lg">
            <span>Instagram</span> <FaInstagram size={26} />
          </a>
          <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-red-600 font-semibold text-lg">
            <span>YouTube</span> <FaYoutube size={26} />
          </a>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-black/80 font-medium text-lg">
          <a href="#" className="hover:text-black transition-colors hover:underline">Privacy</a>
          <a href="#" className="hover:text-black transition-colors hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}