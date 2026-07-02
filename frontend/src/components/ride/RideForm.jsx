import React from 'react';
import { MapPin, ArrowRight, Shield } from 'lucide-react';

export default function RideForm({ 
  pickup, 
  setPickup, 
  dropoff, 
  setDropoff, 
  onSubmit, 
  isSearching,
  rideTiers = [],
  selectedTier,
  setSelectedTier
}) {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-gray-100 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-dark">Request a ride</h2>
        <form onSubmit={onSubmit} className="space-y-3 relative">
          <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 z-10" />
          
          <div className="relative flex items-center border border-gray-200 focus-within:border-dark transition-all rounded-xl bg-light px-4 py-3.5 z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-brand mr-3 shrink-0" />
            <input type="text" placeholder="Pickup location (try 'Airport')" value={pickup} onChange={(e) => setPickup(e.target.value)} className="bg-transparent w-full text-sm font-medium focus:outline-none placeholder-gray-400" required />
          </div>

          <div className="relative flex items-center border border-gray-200 focus-within:border-dark transition-all rounded-xl bg-light px-4 py-3.5 z-20">
            <div className="w-2.5 h-2.5 bg-dark mr-3 shrink-0" />
            <input type="text" placeholder="Where to? (try 'Downtown')" value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="bg-transparent w-full text-sm font-medium focus:outline-none placeholder-gray-400" required />
          </div>
        </form>
      </div>

      <div className="p-6 flex-1 overflow-y-auto space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Available Options</p>
        {rideTiers.map((tier) => (
          <div key={tier.id} onClick={() => setSelectedTier(tier.id)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTier === tier.id ? 'border-dark bg-light' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl shadow-sm">{tier.icon}</div>
              <div>
                <h4 className="font-bold text-sm text-dark flex items-center gap-2">{tier.title} <span className="text-xs font-normal text-gray-400">👤{tier.capacity}</span></h4>
                <p className="text-xs text-gray-500">ETA: {tier.eta}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-dark">${tier.price.toFixed(2)}</p>
              <p className="text-[10px] text-gray-400">Fixed Fare</p>
            </div>
          </div>
        ))}
        
        <div className="flex gap-2 p-3 bg-brand-light/40 rounded-xl text-xs text-gray-600 mt-4 border border-brand/10">
          <Shield size={14} className="shrink-0 text-brand mt-0.5" />
          <p>Prices include standard toll calculations. Dynamic rates are disabled during simulation monitoring.</p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-30">
        <button onClick={onSubmit} disabled={isSearching || !pickup || !dropoff} className="w-full bg-dark text-white hover:bg-neutral-800 disabled:bg-gray-100 disabled:text-gray-400 transition-all py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-lg">
          {isSearching ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Matching with Drivers...</span>
            </>
          ) : (
            <>
              <span>Confirm Route Selection</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}