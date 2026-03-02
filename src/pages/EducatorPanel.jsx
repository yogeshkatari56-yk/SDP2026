import React, { useState } from 'react';
import axios from 'axios';
import { Send, LogOut, BookOpen } from 'lucide-react';

export default function EducatorPanel() {
  const [formData, setFormData] = useState({ title: '', category: 'Fundamental Rights', body: '', insight: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sdp2026backend.onrender.com/api/content/publish', { ...formData, authorEmail: user.email });
      alert("🚀 Insight Sent for Admin Review");
      setFormData({ title: '', category: 'Fundamental Rights', body: '', insight: '' });
    } catch (err) { 
      alert("Submission Failed: Ensure server is running"); 
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50/30 p-6 pt-32 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-[3rem] overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-indigo-600 p-10 text-white flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter flex items-center gap-3 uppercase">
              <BookOpen className="text-indigo-200" size={32} /> Educator Studio
            </h2>
            <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mt-2">
              Expert: <span className="underline decoration-indigo-400">{user?.name || "Verified Educator"}</span>
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            className="p-4 bg-white/10 hover:bg-red-500 rounded-2xl transition-all border border-white/20 group"
            title="Logout"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Article Identification</label>
            <input 
              className="w-full border-2 border-slate-50 p-5 rounded-3xl bg-slate-50 outline-none focus:ring-2 ring-indigo-500 font-bold text-slate-800 transition-all" 
              placeholder="e.g. Article 21: Right to Life" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Official Constitution Text</label>
            <textarea 
              className="w-full border-2 border-slate-50 p-5 rounded-3xl bg-slate-50 outline-none focus:ring-2 ring-indigo-500 h-32 text-slate-600 transition-all" 
              placeholder="Enter the raw legal text here..." 
              value={formData.body} 
              onChange={e => setFormData({...formData, body: e.target.value})} 
              required 
            />
          </div>

          <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-dashed border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-900 pointer-events-none">
                <BookOpen size={80} />
            </div>
            <label className="text-xs font-black text-amber-800 uppercase tracking-widest block mb-4 italic">The "Citizen-First" Insight</label>
            <textarea 
              className="w-full bg-transparent outline-none text-amber-900 h-24 font-medium italic placeholder:text-amber-200 resize-none" 
              placeholder="Explain this law like you're talking to a citizen..." 
              value={formData.insight} 
              onChange={e => setFormData({...formData, insight: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 group"
          >
            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
            Publish to Oversight
          </button>
        </form>
      </div>
    </div>
  );
}