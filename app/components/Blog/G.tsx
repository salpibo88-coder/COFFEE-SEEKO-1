'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaNewspaper, FaArrowRight } from 'react-icons/fa';

interface Article {
  id: number;
  title_km: string;
  title_en: string;
  excerpt_km: string;
  excerpt_en: string;
  image: string;
  category: string;
}

interface GProps {
  related?: Article[];
  lang?: 'km' | 'en';
}

const defaultArticles: Article[] = [
  {
    id: 1,
    title_en: 'How to Brew the Perfect Cup',
    title_km: 'របៀបញ៉ាំកាហ្វេឱ្យឆ្ងាញ់',
    excerpt_en: 'Discover the secrets behind a perfect brew every morning.',
    excerpt_km: 'ស្វែងយល់ពី비結ក្ខណ្ឌនៃការញ៉ាំកាហ្វេឱ្យឆ្ងាញ់រាល់ព្រឹក។',
    image: '/2.jpg',
    category: 'Brewing Guide',
  },
  {
    id: 2,
    title_en: '7 Tips to Make Better Coffee',
    title_km: 'គន្លឹះ ៧ ចំណុចធ្វើកាហ្វេ',
    excerpt_en: 'Simple tips that will elevate your daily coffee routine.',
    excerpt_km: 'គន្លឹះងាយៗដើម្បីធ្វើឱ្យកាហ្វេប្រចាំថ្ងៃរបស់អ្នកកាន់តែឆ្ងាញ់។',
    image: '/5.jpg',
    category: 'Coffee Tips',
  },
  {
    id: 3,
    title_en: 'From Farm to Your Cup',
    title_km: 'ពីចំការដល់ពែងរបស់អ្នក',
    excerpt_en: 'The incredible journey of a coffee bean before it reaches you.',
    excerpt_km: 'ការធ្វើដំណើររបស់គ្រាប់កាហ្វេមុនពេលដល់ដៃអ្នក។',
    image: '/7.jpg',
    category: 'Coffee Stories',
  },
  {
    id: 4,
    title_en: 'Our New Pink Seeko Blend',
    title_km: 'មិញSeekoពណ៌ផ្កាឈូកថ្មី',
    excerpt_en: 'Try our latest seasonal blend — fruity, floral, and unforgettable.',
    excerpt_km: 'សាកល្បងការលាយថ្មីរបស់យើង — ផ្លែឈើ ផ្កា និងមិនអាចភ្លេចបាន។',
    image: '/9.jpg',
    category: 'New Arrivals',
  },
];

export default function G({ related = defaultArticles, lang = 'en' }: GProps) {
  return (
    <div className="py-12 px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
      <div className="w-full mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-[#1a1a1a] font-extrabold text-lg sm:text-xl flex items-center gap-2.5">
            <FaNewspaper size={15} />
            {lang === 'km' ? 'ព័ត៌មានបន្ថែម' : 'More Stories'}
          </h2>
          <Link
            href="/blog"
            className="text-[#f7b500] text-xs font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all duration-200"
          >
            {lang === 'km' ? 'ទាំងអស់' : 'View all'} <FaArrowRight size={9} />
          </Link>
        </div>

        {/* Grid — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((r, i) => {
            const rt = lang === 'km' ? r.title_km : r.title_en;
            const re = lang === 'km' ? r.excerpt_km : r.excerpt_en;
            return (
              <div
                key={r.id}
                className="opacity-0 animate-[fadeSlideUp_0.4s_ease_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Link
                  href={`/blog`}
                  className="group flex flex-col bg-green-50 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={rt}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#2ceb46] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                        {r.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-[#1a1a1a] text-sm leading-snug line-clamp-2 group-hover:text-[#f7b500] transition-colors mb-2 flex-1">
                      {rt}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{re}</p>
                    <span className="flex items-center gap-1.5 text-[#00ff55] text-[11px] font-bold group-hover:gap-2.5 transition-all duration-200">
                      {lang === 'km' ? 'អានបន្ថែម' : 'Read more'} <FaArrowRight size={8} />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
