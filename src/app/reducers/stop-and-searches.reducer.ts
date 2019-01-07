import { StopAndSearch } from '../model/stop-and-search';
import { ActionTypes, GetStopAndSearchDataAction } from '../actions/stop-and-search-data';

export interface StopAndSearchState {
  stopAndSearches: StopAndSearch[];
}

export const initialState: StopAndSearchState = {
  stopAndSearches: [],
};

export function reducer(state = initialState, action: GetStopAndSearchDataAction): StopAndSearchState {
  switch (action.type) {
    case (ActionTypes.GetStopAndSearchDataSuccess):
      return {
        ...state,
        stopAndSearches: action.payload,
      };
    default:
      return state;
  }
}
