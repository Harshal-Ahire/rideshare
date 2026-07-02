import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, Clock, Award, Star } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (pickup.trim()) {
      navigate('/book', { state: { initialPickup: pickup } });
    }
  };

  const featureCards = [
    { title: 'Safety integrated layers', description: 'Comprehensive real-time tracking protocols protecting every sequence.', icon: Shield },
    { title: 'Predictive ETA scheduling', description: 'Advanced dynamic estimation maps matching localized transport pipelines.', icon: Clock },
    { title: 'Five-star professional verification', description: 'Top rated operators maintaining exceptional performance limits.', icon: Award },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white">
      <section className="relative overflow-hidden py-16 md:py-32 px-4 md:px-8 border-b border-gray-50 flex items-center bg-gradient-to-b from-white to-light/30">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-dark text-white text-xs font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
              <Star size={12} fill="#00B14F" color="#00B14F" /> High Performance Transport Ecosystem
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark leading-[1.05]">
              Move fluidly <br />
              across your <span className="text-brand">city</span>
            </h1>
            <p className="text-gray-500 font-medium text-base sm:text-lg max-w-md mx-auto md:mx-0">
              Premium localized ride tracking tools ensuring premium transit pipelines anytime.
            </p>
            <form onSubmit={handleSearchSubmit} className="space-y-3 max-w-md mx-auto md:mx-0">
              <div className="relative flex items-center border border-gray-200 focus-within:border-dark transition-all rounded-xl bg-white px-4 py-4 shadow-sm">
                <MapPin className="text-brand mr-3 shrink-0" size={22} />
                <input type="text" placeholder="Where should we pick you up? (try 'Airport')" value={pickup} onChange={(e) => setPickup(e.target.value)} className="bg-transparent w-full text-dark font-semibold placeholder-gray-400 focus:outline-none text-base" />
              </div>
              <button type="submit" className="w-full bg-dark text-white hover:bg-neutral-800 transition-all py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 group shadow-lg">
                <span>Configure Journey Matrix</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
          
          <div className="hidden md:block md:col-span-6 relative h-[500px] bg-light rounded-2xl border border-gray-100 overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white text-lg">✨</div>
                  <div>
                    <p className="font-bold text-sm text-dark">RideShare Premium Activated</p>
                    <p className="text-xs text-gray-400">Arriving in 2 mins</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-brand bg-brand-light px-2 py-1 rounded">$34.20</span>
              </div>
              <div className="w-full h-3 bg-light rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-brand rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-dark">Engineered for seamless movement</h2>
            <p className="text-sm text-gray-400 font-medium">Architected layouts prioritizing accessibility analytics and user parameters.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl border border-gray-100 bg-light/30 hover:bg-white hover:shadow-xl hover:border-gray-200 transition-all space-y-4 group">
                  <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-dark group-hover:bg-dark group-hover:text-white transition-all shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-lg text-dark">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}