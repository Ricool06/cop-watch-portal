import { LatLng } from 'leaflet';

export interface Location {
  latLng: LatLng;
}

export interface StopAndSearch {
  location: Location;
}

export interface LatLngStrings {
  latitude: string;
  longitude: string;
}

export interface ApiStopAndSearch {
  location: LatLngStrings;
}
