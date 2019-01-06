import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromStopAndSearches from './stop-and-searches.reducer';

export interface State {
  stopAndSearches: fromStopAndSearches.State;
}

export const reducers: ActionReducerMap<State> = {
  stopAndSearches: fromStopAndSearches.reducer,
};
