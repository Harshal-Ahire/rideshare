import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import RideForm from '../components/common/RideForm'; 
import LoadingSpinner from '../components/common/LoadingSpinner';

const createCustomIcon = (color, text) => {
  return new L.DivIcon({
    html: `<div class="relative flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="${color}" stroke="white" stroke-width="2"/>
            </svg>
            <span class="absolute top-1.5 text-[10px] font-bold text-white">${text}</span>
          </div>`,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

function MapController({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points && points.length > 0) {
      const validPoints = points.filter(p => p !== null);
      if (validPoints.length === 1) {
        map.setView(validPoints[0], 15, { animate: true });
      } else if (validPoints.length > 1) {
        const bounds = L.latLngBounds(validPoints);
        map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.2 });
      }
    }
  }, [points, map]);
  return null;
}

export default function BookRide() {
  const location = useLocation();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(location.state?.initialPickup || 'My Location');
  const [dropoff, setDropoff] = useState('');
  const [selectedTier, setSelectedTier] = useState('economy');
  const [isSearching, setIsSearching] = useState(false);

  const [pickupCoords, setPickupCoords] = useState([19.0596, 72.8295]); 
  const [dropoffCoords, setDropoffCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPickupCoords([latitude, longitude]);
        },
        (error) => {
          console.warn("Geolocation permission denied. Defaulting to baseline Mumbai coordinates.");
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  }, []);

  useEffect(() => {
    const term = pickup.toLowerCase().trim();
    if (term === 'juhu' || term === 'juhu beach') {
      setPickupCoords([19.0988, 72.8264]);
    } else if (term === 'bandra') {
      setPickupCoords([19.0596, 72.8295]);
    }
  }, [pickup]);

  useEffect(() => {
    const term = dropoff.toLowerCase().trim();
    if (term === 'cst' || term === 'csmt') {
      setDropoffCoords([18.9400, 72.8354]);
    } else {
      setDropoffCoords(null);
    }
  }, [dropoff]);

  const handleConfirmRide = (formData) => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate('/track', { 
        state: { 
          pickup: formData.pickup || pickup, 
          dropoff: formData.dropoff || dropoff,
          tier: formData.selectedTier || selectedTier,
          userCoords: pickupCoords 
        } 
      });
    }, 2500);
  };

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden h-[calc(100vh-69px)] relative bg-light animate-fadeIn">
      {isSearching && (
        <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white transition-all duration-500">
          <div className="bg-white text-dark p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm text-center mx-4 border border-gray-100 scale-100 transition-transform">
            <LoadingSpinner size="lg" />
            <h3 className="text-xl font-bold mt-4 tracking-tight">Finding your driver</h3>
            <p className="text-sm text-gray-500 mt-2">Matching your request with closest vehicles near your pickup location...</p>
          </div>
        </div>
      )}

      <div className="md:col-span-5 lg:col-span-4 bg-white border-r border-gray-100 shadow-2xl flex flex-col z-20 order-2 md:order-1 overflow-y-auto max-h-[50vh] md:max-h-full transition-all duration-300">
        <RideForm 
          pickup={pickup}
          setPickup={setPickup}
          dropoff={dropoff}
          setDropoff={setDropoff}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
          onSubmit={handleConfirmRide}
          isSubmitting={isSearching}
        />
      </div>

      <div className="md:col-span-7 lg:col-span-8 h-full w-full order-1 md:order-2 relative z-10 transition-opacity duration-500">
        <MapContainer center={pickupCoords} zoom={13} zoomControl={false} className="w-full h-full">
          <TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <MapController points={[pickupCoords, dropoffCoords]} />
          {pickupCoords && <Marker position={pickupCoords} icon={createCustomIcon('#00B14F', 'A')} />}
          {dropoffCoords && <Marker position={dropoffCoords} icon={createCustomIcon('#111111', 'B')} />}
          {pickupCoords && dropoffCoords && <Polyline positions={[pickupCoords, dropoffCoords]} color="#111111" weight={4} opacity={0.6} dashArray="5, 10" />}
        </MapContainer>
      </div>
    </div>
  );
}