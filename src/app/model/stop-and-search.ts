import { LatLng } from 'leaflet';
import { Moment } from 'moment';

export interface Location {
  latLng: LatLng;
}

export interface StopAndSearch {
  location: Location;
  datetime: Moment;
  type: string;
  object_of_search: string;
  self_defined_ethnicity: string;
  age_range: string;
  gender: string;
  outcome: string;
}

export interface LatLngStrings {
  latitude: string;
  longitude: string;
}

export interface ApiStopAndSearch {
  location: LatLngStrings;
  datetime: string;
  type: string;
  object_of_search: string;
  self_defined_ethnicity: string;
  age_range: string;
  gender: string;
  outcome: string;
}
