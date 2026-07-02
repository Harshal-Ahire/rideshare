import React from 'react';
import { MessageSquare, Phone, Star } from 'lucide-react';

export default function DriverCard({ name, rating, vehicle, plateNumber, image, onMessage, onCall }) {
  return (
    <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex items-center justify-between w-full">
      <div className="flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-neutral-100 shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base text-dark">{name}</h4>
            <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              <Star size={12} fill="currentColor" /> {rating}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-0.5">{vehicle}</p>
          <span className="inline-block text-[11px] font-bold tracking-wider text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 mt-1.5">
            {plateNumber}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button onClick={onMessage} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-dark hover:bg-light transition-colors shadow-sm">
          <MessageSquare size={16} />
        </button>
        <button onClick={onCall} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-dark hover:bg-light transition-colors shadow-sm">
          <Phone size={16} />
        </button>
      </div>
    </div>
  );
}