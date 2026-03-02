import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { UserPlus, ShieldCheck, Users, Trash2, RefreshCcw, LogOut, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard() {
  const [educators, setEducators] = useState([]);
  const [pending, setPending] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const fetchData = useCallback(async () => {
    try {
      const eduRes = await axios.get('http://localhost:5000/api/admin/educators');
      const penRes = await axios.get('http://localhost:5000/api/admin/pending');
      setEducators(eduRes.data);
      setPending(penRes.data);
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/onboard', form);
      setEducators([...educators, res.data]);
      setForm({ name: '', email: '', password: '' });
      alert("✅ Educator Registered Successfully");
    } catch (err) { alert("Registration Failed"); }
  };

  const handleVerify = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/verify-content/${id}`);
      setPending(pending.filter(p => p._id !== id));
      alert("🚀 Content Published to Home Page");
    } catch (err) { alert("Verification failed"); }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen pt-28 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Control Bar */}
        <div className="flex justify-between items-center mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic border-l-8 border-indigo-600 pl-4">Authority Oversight</h1>
          <div className="flex gap-4">
            <button onClick={fetchData} className="p-3 bg-slate-100 rounded-full hover:rotate-180 transition-all duration-500 text-indigo-600"><RefreshCcw /></button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"><LogOut size={16}/> Logout</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Section 1: Create */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-indigo-600"><UserPlus /> Onboard Educator</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input className="w-full border-2 border-slate-50 p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-indigo-500 transition-all" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input className="w-full border-2 border-slate-50 p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-indigo-500 transition-all" placeholder="Official Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input className="w-full border-2 border-slate-50 p-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 ring-indigo-500 transition-all" type="password" placeholder="Temporary Passkey" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:bg-indigo-700 transition-all uppercase tracking-widest text-xs">Grant Portal Access</button>
            </form>
          </div>

          {/* Section 2: List */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800"><Users /> Verified Experts</h2>
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
              {educators.map(edu => (
                <div key={edu._id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-transparent hover:border-slate-200 transition-all">
                  <div className="truncate pr-4">
                    <p className="font-bold text-slate-700">{edu.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">{edu.email}</p>
                  </div>
                  <button className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Queue */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-600"><ShieldCheck /> Verification Queue</h2>
            <div className="space-y-4">
              {pending.length === 0 ? (
                <p className="text-slate-400 text-center py-10 text-sm italic">Queue is currently empty</p>
              ) : (
                pending.map(item => (
                  <div key={item._id} className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 group">
                    <p className="font-black text-slate-800 text-sm mb-1 uppercase tracking-tighter">{item.title}</p>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase mb-3">Pending Approval</p>
                    <button 
                      onClick={() => handleVerify(item._id)} 
                      className="w-full bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={14} /> Approve & Publish
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}