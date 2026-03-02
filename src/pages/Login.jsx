import React, { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, ShieldCheck } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://sdp2026backend.onrender.com/api/users/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate(res.data.role === 'admin' ? '/admin' : '/educator');
    } catch (err) { alert("Access Denied: Invalid Credentials"); }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      {/* Progress Bar Header */}
      <div className="fixed top-0 w-full flex h-1">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-emerald-600"></div>
      </div>

      <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-zinc-500 hover:text-white transition-all font-black uppercase text-[10px] tracking-[0.3em]">
        <ArrowLeft size={16} /> Exit Path
      </Link>

      <div className="w-full max-w-md bg-zinc-900 border border-white/5 p-12 rounded-[3rem] shadow-2xl">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center rotate-3 mb-6 shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Portal <span className="text-orange-500">Login.</span></h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2 underline decoration-orange-500/50">Restricted Authority Area</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-orange-500 transition-all font-bold" placeholder="EMAIL" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="w-full bg-black border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-emerald-500 transition-all font-bold" type="password" placeholder="PASSKEY" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-emerald-900/40">Authorize Access</button>
        </form>
      </div>
    </div>
  );
}