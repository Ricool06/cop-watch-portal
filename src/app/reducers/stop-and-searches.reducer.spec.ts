import { reducer, initialState, StopAndSearchState } from './stop-and-searches.reducer';
import { GetStopAndSearchDataSuccess } from '../actions/stop-and-search-data';
import { StopAndSearch } from '../model/stop-and-search';
import { LatLng } from 'leaflet';
import { TestBed } from '@angular/core/testing';
import { createStopAndSearch } from 'test-helpers';

describe('StopAndSearches Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const newState = reducer(initialState, action);

      expect(newState).toBe(initialState);
    });
  });

  describe('GetStopAndSearchDataSuccess action', () => {
    it('should set stopAndSearches', () => {
      const mockStopAndSearches: StopAndSearch[] = [
        createStopAndSearch(new LatLng(1, 1)),
        createStopAndSearch(new LatLng(2, 2)),
      ];

      const action = new GetStopAndSearchDataSuccess(mockStopAndSearches);

      const newState: StopAndSearchState = reducer(initialState, action);

      expect(newState.stopAndSearches).toBe(mockStopAndSearches);
    });
  });
});
