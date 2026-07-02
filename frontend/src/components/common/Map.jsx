import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const createMarkerIcon = (color, emoji) => {
  return new L.DivIcon({
    html: `<div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2" style="border-color: ${color}">
            <span class="text-sm">${emoji}</span>
          </div>`,
    className: 'custom-reusable-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function Map({ center = [40.7128, -74.0060], zoom = 14, markers = [] }) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-inner border border-gray-100 min-h-[300px]">
      <MapContainer center={center} zoom={zoom} zoomControl={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position} 
            icon={createMarkerIcon(marker.color || '#111111', marker.emoji || '📍')} 
          />
        ))}
      </MapContainer>
    </div>
  );
}