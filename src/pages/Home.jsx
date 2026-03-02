import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, Quote, MoveRight, CheckCircle2 } from 'lucide-react';
import ImageMarquee from '../components/ImageMarquee';

export default function Home() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content/public')
      .then(res => setFeed(res.data))
      .catch(err => console.error("Expert feed offline"));
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  return (
    <div className="bg-black min-h-screen text-white pb-40 font-sans">
      
      {/* TRICOLOR HEADER */}
      <section className="pt-48 pb-20 px-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-12"
        >
          <Star size={12} fill="currentColor" /> Satyam Eva Jayate
        </motion.div>
        
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-12">
          Samvidhan <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-emerald-500">
            Path.
          </span>
        </h1>
      </section>

      <ImageMarquee />

      {/* FEED WITH TRICOLOR ACCENTS */}
      <section className="max-w-7xl mx-auto px-8 mt-40 space-y-60">
        {feed.map((item, idx) => (
          <motion.div 
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
          >
            {/* Media Block (Green Glow on Hover) */}
            <div className="w-full lg:w-3/5">
              <div className="rounded-[2.5rem] overflow-hidden border-2 border-white/5 bg-zinc-900 shadow-2xl hover:border-emerald-500/30 transition-all duration-700 group relative">
                {item.videoUrl ? (
                  <div className="aspect-video">
                    <iframe className="w-full h-full" src={getEmbedUrl(item.videoUrl)} title="Video" frameBorder="0" allowFullScreen />
                  </div>
                ) : (
                  <img src={item.imageUrl || "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200"} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000" alt="content" />
                )}
              </div>
            </div>

            {/* Content Side (Saffron Headers) */}
            <div className="w-full lg:w-2/5 space-y-8">
              <div>
                <span className="text-orange-500 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Section // {item.category}</span>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none text-white">{item.title}</h2>
              </div>

              <div className="relative p-10 bg-zinc-900/50 border-l-4 border-emerald-500 rounded-r-[2.5rem] backdrop-blur-sm">
                <Quote className="text-orange-500/10 absolute -top-4 -right-4" size={64} />
                <p className="text-xl text-zinc-100 leading-relaxed font-medium italic relative z-10">
                  "{item.insight}"
                </p>
                
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest italic">Official Expert Clarification</span>
                  </div>
                  <button className="p-3 bg-white/5 hover:bg-orange-500 text-white rounded-full transition-all">
                    <MoveRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}