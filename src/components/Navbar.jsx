import React from 'react';
import { Shield, UserCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b-2 border-orange-500/30">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-orange-500 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] group-hover:rotate-12 transition-transform">
            <Shield className="text-white" size={20} />
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase italic">
            Samvidhan<span className="text-emerald-500">Path</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/educator'} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:border-emerald-500/50 transition-all">
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{user.name}</span>
              <UserCircle className="text-white" size={18} />
            </Link>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-emerald-900/20">
              <Zap size={14} fill="currentColor" /> Authority Portal
            </Link>
          )}
        </div>
      </div>
      {/* Subtle Bottom Accent Gradient */}
      <div className="h-[1px] w-full bg-gradient-to-r from-orange-500 via-white to-emerald-500 opacity-50"></div>
    </nav>
  );
}