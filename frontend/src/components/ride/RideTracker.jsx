import React from 'react';
import { Shield, X } from 'lucide-react';
import DriverCard from './DriverCard';
import RideSummary from '../common/RideSummary';

export default function RideTracker({ 
  status, 
  eta, 
  driver = {
    name: "Rahul Javkar",
    rating: "4.94",
    vehicle: "Maruti Suzuki Ertiga • White",
    plateNumber: "MH-01-DR-4812",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120"
  },
  pickup = "Bandra West Terminal Point",
  dropoff = "Chhatrapati Shivaji Terminus (CSMT)",
  price = 150.00,
  onCancel,
  onShareSafety
}) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl shadow-[0_-12px_40px_rgba(0,0,0,0.12)] border-t border-gray-100 p-6 space-y-4 pb-8">
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-2" />
      
      <DriverCard 
        name={driver.name} 
        rating={driver.rating} 
        vehicle={driver.vehicle} 
        plateNumber={driver.plateNumber} 
        image={driver.image} 
        onMessage={() => alert('Mock chat window opened.')} 
        onCall={() => alert('Establishing connection via encrypted voice lines.')} 
      />
      
      <RideSummary 
        pickup={pickup} 
        dropoff={dropoff} 
        price={price} 
        eta={`${eta} mins`} 
      />

      <div className="grid grid-cols-6 gap-3 pt-2">
        <button 
          onClick={onCancel} 
          className="col-span-2 border border-gray-200 text-gray-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all rounded-xl py-3.5 font-bold text-xs flex flex-col items-center justify-center gap-1"
        >
          <X size={16} /> Cancel Ride
        </button>
        <button 
          onClick={onShareSafety} 
          className="col-span-4 bg-dark text-white hover:bg-neutral-800 transition rounded-xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 shadow-md"
        >
          <Shield size={16} className="text-brand" /> Share Safety Hub Toolkit
        </button>
      </div>
    </div>
  );
}
