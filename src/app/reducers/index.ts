import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromStopAndSearches from './stop-and-searches.reducer';

export interface State {
  stopAndSearchState: fromStopAndSearches.StopAndSearchState;
}

export const reducers: ActionReducerMap<State> = {
  stopAndSearchState: fromStopAndSearches.reducer,
};

export const selectStopAndSearches = createSelector(
  (state: State) => state.stopAndSearchState,
  (state: fromStopAndSearches.StopAndSearchState) => state.stopAndSearches,
);
