'use client';
import { FaTiktok, FaTelegram, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Blog() {
  const posts = [
    { cat: "BREWING GUIDE", title: "How to Brew the Perfect Cup of Coffee", img: "coffeeseekoblue.jpg" },
    { cat: "COFFEE TIPS", title: "7 Simple Tips to Make Your Coffee Taste Better", img: "coffeesekobrown.jpg" },
    { cat: "COFFEE STORIES", title: "The Journey of a Bean: From Farm to Your Cup", img: "coffeeseeko.png" },
    { cat: "COFFEE STORIES", title: "The Journey of a Bean: From Farm to Your Cup", img: "coffeeseekogreen.jpg" },
    { cat: "COFFEE STORIES", title: "The Journey of a Bean: From Farm to Your Cup", img: "coffeeseekopink.jpg" },
    { cat: "COFFEE STORIES", title: "The Journey of a Bean: From Farm to Your Cup", img: "coffeeseekoyellow.jpg" }
  ];

  return (
    <div className="font-sans overflow-x-hidden">

      {/* BLOG SECTION */}
      <section className="bg-[#f3eadc] py-20 px-6 md:px-24">
        <div className="mb-12 animate-[fadeIn_1s_ease-in]">
          <p className="text-green-800 font-bold text-sm tracking-widest mb-2">🌿 FEATURED POSTS</p>
          <h2 className="text-4xl font-bold text-gray-900">Fresh Reads for Coffee Minds</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl animate-[fadeIn_1.5s_ease-in]">
              <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={post.img} alt={post.title} className="w-full h-full object-contain transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold text-green-800 tracking-widest">{post.cat}</span>
                <h3 className="text-xl font-bold my-3">{post.title}</h3>
                <p className="text-gray-500 text-sm">May 18, 2024</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 px-8 md:px-16 border-t border-white/20 bg-black/5">
        <div className="flex flex-col md:flex-row justify-between items-center text-base gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-bold text-xl text-white shadow-lg border border-white">N</div>
            <p className="text-black/80 font-medium">© 2026 Coffee Seeko. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-blue-600 font-semibold text-lg"><span>Facebook</span> <FaFacebook size={26} /></a>
            <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-black font-semibold text-lg"><span>TikTok</span> <FaTiktok size={26} /></a>
            <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-blue-400 font-semibold text-lg"><span>Telegram</span> <FaTelegram size={26} /></a>
            <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-pink-600 font-semibold text-lg"><span>Instagram</span> <FaInstagram size={26} /></a>
            <a href="#" className="flex items-center gap-2 hover:scale-110 transition-all text-red-600 font-semibold text-lg"><span>YouTube</span> <FaYoutube size={26} /></a>
          </div>

          <div className="flex gap-8 text-black/80 font-medium text-lg">
            <a href="#" className="hover:text-black transition-colors hover:underline">Privacy</a>
            <a href="#" className="hover:text-black transition-colors hover:underline">Terms</a>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
