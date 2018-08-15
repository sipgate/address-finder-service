import GeolocationPosition from "../geolocation.model";

export function parseGeolocationPosition({latitude, longitude}: { latitude?: string, longitude?: string }): (GeolocationPosition | undefined) {
  if (!(latitude && longitude)) {
    return void 0;
  }

  const parsedLatitude: number = Number.parseFloat(latitude);
  const parsedLongitude: number = Number.parseFloat(longitude);

  if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
    return void 0;
  }

  return {latitude: parsedLatitude, longitude: parsedLongitude};
}


const toRad: (num: number) => number = num =>
    num * Math.PI / 180;

export const buildBounds: (position: GeolocationPosition, distanceMeters?: number) => string = (position, distanceMeters = 10000) => {

  const {latitude, longitude} = position;

  const latRadian: number = toRad(latitude);

  const degLatKm: number = 110.574235;
  const degLongKm: number = 110.572833 * Math.cos(latRadian);
  const deltaLat: number = distanceMeters / 1000.0 / degLatKm;
  const deltaLong: number = distanceMeters / 1000.0 / degLongKm;

  const topLat: number = latitude + deltaLat;
  const bottomLat: number = latitude - deltaLat;
  const leftLng: number = longitude - deltaLong;
  const rightLng: number = longitude + deltaLong;

  return `${bottomLat.toFixed(6)},${leftLng.toFixed(6)}|${topLat.toFixed(6)},${rightLng.toFixed(6)}`;
};
