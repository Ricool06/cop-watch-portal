import { LatLng } from 'leaflet';

export interface Location {
  latLng: LatLng;
}

export interface StopAndSearch {
  location: Location;
}
