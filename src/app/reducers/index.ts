import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { LatLng } from 'leaflet';

export interface Location {
  latLng: LatLng;
}

export interface StopAndSearch {
  location: Location;
}

export interface State {
  stopAndSearches: StopAndSearch[];
}

// export const reducers: ActionReducerMap<State> = {

// };
