import React from 'react';
import { ShieldCheck, Scale, Book } from 'lucide-react';

const ConstitutionalCard = ({ content }) => {
  // Dynamic icon based on constitutional category
  const renderIcon = (cat) => {
    if (cat === "Fundamental Rights") return <ShieldCheck className="text-blue-600" />;
    if (cat === "Citizens Duties") return <Scale className="text-orange-600" />;
    return <Book className="text-indigo-600" />;
  };

  return (
    <div className="bg-white border-t-4 border-indigo-600 rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-3">
        {renderIcon(content.category)}
        <span className="text-xs font-bold uppercase text-gray-400">{content.category}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{content.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">{content.body}</p>
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-xs italic text-gray-400">Verified for Accuracy</span>
        <button className="text-indigo-600 font-semibold text-sm hover:underline">
          Read Detailed Info →
        </button>
      </div>
    </div>
  );
};

export default ConstitutionalCard;