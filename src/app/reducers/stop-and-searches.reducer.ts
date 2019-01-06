import { StopAndSearch } from '../model/stop-and-search';
import { ActionTypes, GetStopAndSearchDataAction } from '../actions/stop-and-search-data';

export interface State {
  stopAndSearches: StopAndSearch[];
}

export const initialState: State = {
  stopAndSearches: [],
};

export function reducer(state = initialState, action: GetStopAndSearchDataAction): State {
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
