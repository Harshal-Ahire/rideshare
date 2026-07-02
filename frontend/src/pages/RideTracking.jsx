import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import RideTracker from '../components/ride/RideTracker'; // 👈 Fixed folder path

const createCustomIcon = (html, size = 32) => {
  return new L.DivIcon({
    html,
    className: 'tracking-marker-container',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function MapController({ driverLoc, userLoc }) {
  const map = useMap();
  useEffect(() => {
    if (driverLoc && userLoc) {
      const bounds = L.latLngBounds([driverLoc, userLoc]);
      map.fitBounds(bounds, { padding: [80, 80], animate: true });
    }
  }, [driverLoc, userLoc, map]);
  return null;
}

export default function RideTracking() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userLocation = location.state?.userCoords || [19.0596, 72.8295]; 
  
  const [driverLocation, setDriverLocation] = useState([
    userLocation[0] - 0.0125,
    userLocation[1] + 0.0075
  ]);
  
  const [eta, setEta] = useState(5);
  const [status, setStatus] = useState('en_route');

  const rideDetails = {
    pickup: location.state?.pickup || "My Location",
    dropoff: location.state?.dropoff || "Chhatrapati Shivaji Terminus (CSMT)",
    price: location.state?.tier === 'premium' ? 280.00 : location.state?.tier === 'auto' ? 60.00 : 150.00
  };

  useEffect(() => {
    const trackingInterval = setInterval(() => {
      setDriverLocation((prev) => {
        const latDiff = userLocation[0] - prev[0];
        const lngDiff = userLocation[1] - prev[1];
        
        if (Math.abs(latDiff) < 0.0006 && Math.abs(lngDiff) < 0.0006) {
          clearInterval(trackingInterval);
          setEta(0);
          setStatus('arrived');
          return userLocation;
        }
        return [prev[0] + latDiff * 0.25, prev[1] + lngDiff * 0.25];
      });

      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 3500);

    return () => clearInterval(trackingInterval);
  }, [userLocation]);

  const handleCancelRide = () => {
    if (window.confirm('Are you sure you want to cancel your ride?')) {
      navigate('/book');
    }
  };

  const handleShareSafety = () => {
    alert('Emergency contacts notified. Real-time encryption tracking link shared successfully!');
  };

  return (
    <div className="flex-1 relative h-[calc(100vh-69px)] w-full overflow-hidden flex flex-col justify-end bg-light animate-fadeIn">
      <div className="absolute inset-0 z-10">
        <MapContainer center={driverLocation} zoom={15} zoomControl={false} className="w-full h-full">
          <TileLayer attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <MapController driverLoc={driverLocation} userLoc={userLocation} />
          <Marker position={userLocation} icon={createCustomIcon('<div class="w-5 h-5 bg-brand rounded-full border-4 border-white shadow-lg animate-pulse"></div>', 20)} />
          <Marker position={driverLocation} icon={createCustomIcon('<div class="w-10 h-10 bg-dark text-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white text-lg transform hover:scale-105 transition-transform">🚗</div>', 40)} />
          {status === 'en_route' && <Polyline positions={[driverLocation, userLocation]} color="#00B14F" weight={4} opacity={0.6} dashArray="6, 10" />}
        </MapContainer>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-md bg-dark text-white py-3.5 px-6 rounded-2xl shadow-2xl flex items-center justify-between border border-neutral-800 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${status === 'en_route' ? 'bg-brand animate-ping' : 'bg-amber-400'}`} />
          <p className="text-sm font-semibold tracking-wide">
            {status === 'en_route' ? 'Driver approaching pickup point' : 'Your driver has arrived!'}
          </p>
        </div>
        <span className="text-xs bg-neutral-800 px-2.5 py-1 rounded-lg font-black tracking-wider border border-neutral-700">
          {eta > 0 ? `${eta} MINS` : 'ARRIVED'}
        </span>
      </div>

      <div className="relative z-20 w-full transition-transform duration-500 ease-out transform translate-y-0">
        <RideTracker 
          status={status}
          eta={eta}
          pickup={rideDetails.pickup}
          dropoff={rideDetails.dropoff}
          price={rideDetails.price}
          onCancel={handleCancelRide}
          onShareSafety={handleShareSafety}
        />
      </div>
    </div>
  );
}
