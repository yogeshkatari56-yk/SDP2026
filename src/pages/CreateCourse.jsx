import { useState } from 'react';
import { createCourse } from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateCourse() {
  const [form, setForm] = useState({ title: '', description: '', price: '', thumbnail: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(form);
      navigate('/');
    } catch (err) { alert("Error creating course. Are you logged in?"); }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Course Title" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
          onChange={(e) => setForm({...form, title: e.target.value})} required />
        <textarea placeholder="Description" className="w-full p-3 border rounded-lg h-32"
          onChange={(e) => setForm({...form, description: e.target.value})} required />
        <input type="number" placeholder="Price ($)" className="w-full p-3 border rounded-lg"
          onChange={(e) => setForm({...form, price: e.target.value})} required />
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
          Publish Course
        </button>
      </form>
    </div>
  );
}