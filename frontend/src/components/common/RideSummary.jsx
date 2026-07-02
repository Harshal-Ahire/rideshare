import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function RideSummary({ pickup, dropoff, price, eta }) {
  return (
    <div className="bg-light/60 border border-gray-100 rounded-2xl p-4 space-y-4 w-full">
      <div className="space-y-3 relative pl-4">
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200" />
        <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-brand border-2 border-white" />
        <div className="absolute left-0 bottom-1.5 w-3 h-3 bg-dark border-2 border-white" />
        
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Pickup</p>
          <p className="text-xs font-bold text-dark truncate mt-0.5">{pickup}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Destination</p>
          <p className="text-xs font-bold text-dark truncate mt-0.5">{dropoff}</p>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-dark">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Estimated Cost</p>
          <p className="text-sm font-extrabold text-dark mt-0.5">${price.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Duration Limit</p>
          <p className="text-sm font-extrabold text-brand mt-0.5">{eta}</p>
        </div>
      </div>
    </div>
  );
}