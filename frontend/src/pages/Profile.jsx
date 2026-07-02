import React from 'react';
import { User, CreditCard, Clock, Settings, ShieldCheck, MapPin, ChevronRight, LogOut } from 'lucide-react';

export default function Profile() {
  // Mock Data for User Context
  const user = {
    name: "Alex Mercer",
    email: "alex.mercer@design.io",
    phone: "+1 (555) 234-5678",
    rating: "4.89",
    joinDate: "Member since 2024"
  };

  const rideHistory = [
    {
      id: "TRIP-8831",
      date: "Jun 28, 2026",
      time: "4:15 PM",
      pickup: "JFK International Airport",
      dropoff: "125 midtown Manhattan St",
      price: 54.20,
      tier: "Premium ✨",
      status: "Completed"
    },
    {
      id: "TRIP-7290",
      date: "Jun 22, 2026",
      time: "8:45 AM",
      pickup: "Brooklyn Tech Hub",
      dropoff: "Williamsburg Diner",
      price: 18.50,
      tier: "Economy 🚗",
      status: "Completed"
    },
    {
      id: "TRIP-6102",
      date: "Jun 14, 2026",
      time: "11:30 PM",
      pickup: "Madison Square Garden",
      dropoff: "Queens Plaza West",
      price: 32.10,
      tier: "Economy 🚗",
      status: "Cancelled",
      isCancelled: true
    }
  ];

  const paymentMethods = [
    { id: "pm-1", type: "Visa", last4: "4242", isDefault: true },
    { id: "pm-2", type: "Apple Pay", last4: "Link", isDefault: false }
  ];

  return (
    <div className="flex-1 bg-light min-h-[calc(100vh-69px)] py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Account Profile Summary */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-dark text-white rounded-full flex items-center justify-center font-bold text-2xl tracking-wide mb-4 relative">
              {user.name.split(' ').map(n => n[0]).join('')}
              <span className="absolute bottom-0 right-0 bg-brand text-white border-2 border-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                ★ {user.rating}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-dark">{user.name}</h3>
            <p className="text-gray-400 text-xs mb-4">{user.joinDate}</p>
            
            <div className="w-full pt-4 border-t border-gray-50 text-left space-y-2 text-sm">
              <p className="text-gray-500 font-medium text-xs uppercase tracking-wider text-gray-400">Contact Info</p>
              <p className="text-dark font-medium truncate">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>

          {/* Quick Shortcuts List Options */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <button className="w-full px-5 py-4 flex items-center justify-between text-left border-b border-gray-50 hover:bg-light transition">
              <div className="flex items-center gap-3 text-dark">
                <Settings size={18} className="text-gray-400" />
                <span className="text-sm font-medium">Account Settings</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
            <button className="w-full px-5 py-4 flex items-center justify-between text-left border-b border-gray-50 hover:bg-light transition">
              <div className="flex items-center gap-3 text-dark">
                <ShieldCheck size={18} className="text-gray-400" />
                <span className="text-sm font-medium">Privacy & Security</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
            <button className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-red-50/30 text-red-500 transition">
              <div className="flex items-center gap-3">
                <LogOut size={18} />
                <span className="text-sm font-medium">Sign Out</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Wallet & Ride History Management */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Payment Options Methods Ledger */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-base text-dark mb-4 flex items-center gap-2">
              <CreditCard size={18} /> Wallet Balance & Payments
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="border border-gray-200 p-4 rounded-xl flex items-center justify-between bg-white relative overflow-hidden group hover:border-dark transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-8 bg-neutral-100 rounded flex items-center justify-center font-bold text-xs tracking-wider text-dark">
                      {pm.type === 'Visa' ? '💳' : '🍎'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark">
                        {pm.type === 'Visa' ? `•••• ${pm.last4}` : pm.type}
                      </p>
                      <p className="text-xs text-gray-400">Personal Account</p>
                    </div>
                  </div>
                  {pm.isDefault && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand-light px-2 py-0.5 rounded">
                      Primary
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Past Ride History List */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-base text-dark mb-4 flex items-center gap-2">
              <Clock size={18} /> Ride History Activity
            </h3>
            
            <div className="space-y-4">
              {rideHistory.map((trip) => (
                <div key={trip.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition bg-white space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-2 font-medium">
                      <span>{trip.date} • {trip.time}</span>
                      <span className="bg-light px-2 py-0.5 rounded text-dark font-normal">{trip.tier}</span>
                    </div>
                    <span className={`font-bold ${trip.isCancelled ? 'text-red-400' : 'text-brand'}`}>
                      {trip.isCancelled ? 'Cancelled' : `$${trip.price.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="space-y-2 relative pl-4">
                    {/* Visual Vertical Map Route Pipeline Connecting Dots */}
                    <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                    <div className="absolute left-0.5 top-1 w-2 h-2 rounded-full bg-brand"></div>
                    <div className="absolute left-0.5 bottom-1 w-2 h-2 rounded-full bg-dark"></div>

                    <div className="text-xs">
                      <p className="text-gray-400 font-medium">Pickup</p>
                      <p className="text-dark font-medium truncate">{trip.pickup}</p>
                    </div>
                    <div className="text-xs">
                      <p className="text-gray-400 font-medium">Dropoff</p>
                      <p className="text-dark font-medium truncate">{trip.dropoff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}