import React from 'react';

const images = [
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&q=80&w=500",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=500",
];

export default function ImageMarquee() {
  return (
    <div className="relative overflow-hidden bg-slate-950 py-10 border-y border-white/5">
      <div className="flex w-[200%] gap-4 animate-scroll">
        {[...images, ...images].map((img, i) => (
          <div key={i} className="h-64 w-96 flex-shrink-0 rounded-[2rem] overflow-hidden border border-white/10">
            <img src={img} alt="Constitution" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}