'use client';
import { FaTiktok, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer 
      className="w-full bg-cover bg-center"
      style={{ 
        backgroundImage: "url('https://img.magnific.com/premium-photo/sketch-flower-white-background_970907-11702.jpg?semt=ais_hybrid&w=740&q=80')" 
      }}
    >
      <div className="w-full bg-[#ffece4]/10 text-black py-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* Navigation Columns */}
          {[
          
            { title: "Learn", links: ["Brew Guides", "Coffee Origins",  "Workshops", "Sustainability"] },
            { title: "Help", links: [ "Shipping Info", "Returns", "Support", "Contact Us"] },
            
          ].map((col) => (
            <div key={col.title} className="md:col-span-1 col-span-1">
              <h4 className="text-amber-600 text-base mb-3 font-bold uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-2 text-xs font-medium text-black">
                {col.links.map(link => (
                  <li key={link} className="hover:text-amber-400 transition-colors cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Column */}
          <div className="col-span-2 flex flex-col items-start md:items-end">
            <h4 className="text-black text-base mb-3 font-bold uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs mb-3 text-black max-w-xs md:text-right">Join for brewing tips and offers.</p>
            
            <div className="flex w-full max-w-sm gap-0 border border-white/20 rounded-full overflow-hidden">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-transparent text-white w-full text-xs placeholder:text-gray-500 focus:outline-none" 
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-black px-4 py-2 font-black uppercase text-[10px] tracking-widest transition-colors">
                Join
              </button>
            </div>

            {/* Colored Social Icons */}
            <div className="flex gap-6 mt-6">
              <FaInstagram size={22} className="text-[#ff002f] hover:scale-125 transition-all cursor-pointer" />
              <FaFacebook size={22} className="text-[#006eff] hover:scale-125 transition-all cursor-pointer" />
              <FaTwitter size={22} className="text-[#009dff] hover:scale-125 transition-all cursor-pointer" />
              <FaTiktok size={22} className="text-black hover:scale-125 transition-all cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-black gap-2">
          <p>© 2026 Coffee Seeko. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}