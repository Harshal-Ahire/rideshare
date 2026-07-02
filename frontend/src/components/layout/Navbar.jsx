import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Car } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 bg-white z-[1000] shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-[#111111] flex items-center gap-2">
          <span className="bg-dark text-white p-1 rounded">RS</span>
          <span>Ride<span className="text-[#00B14F]">Share</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors ${isActive('/') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
          >
            Ride
          </Link>
          <Link 
            to="/book" 
            className={`transition-colors ${isActive('/book') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
          >
            Book
          </Link>
          <Link 
            to="/track" 
            className={`transition-colors ${isActive('/track') ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
          >
            Track Trip
          </Link>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          to="/profile" 
          className={`flex items-center justify-center w-9 h-9 rounded-full transition ${
            isActive('/profile') ? 'bg-dark text-white' : 'bg-[#F6F6F6] text-black hover:bg-gray-200'
          }`}
        >
          <User size={18} />
        </Link>
      </div>
    </header>
  );
}