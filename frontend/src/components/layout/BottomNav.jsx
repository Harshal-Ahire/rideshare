import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Car, MapPin, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/book', icon: Car, label: 'Book' },
    { to: '/track', icon: MapPin, label: 'Track' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 z-[1000] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors w-16 py-1 ${
                isActive ? 'text-[#00B14F] font-semibold' : 'text-gray-400 hover:text-black'
              }`
            }
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}