/**
 * Haversine Formula helper to compute aerial distance between coordinates
 * returns distance in miles or kilometers for accurate billing generation metrics.
 */
export function calculateDistance(lat1, lon1, lat2, lon2, unit = 'K') {
  if ((lat1 === lat2) && (lon1 === lon2)) return 0;
  
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;
  
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  
  if (unit === 'K') dist = dist * 1.609344; // Kilometers
  return parseFloat(dist.toFixed(2));
}

/**
 * Helper to dynamically generate pricing calculations based on distances and tier multipliers
 */
export function estimateFare(distanceInKm, baseMultiplier = 1.0) {
  const baseFare = 2.50;
  const perKmRate = 1.20;
  const finalFare = (baseFare + (distanceInKm * perKmRate)) * baseMultiplier;
  return parseFloat(finalFare.toFixed(2));
}