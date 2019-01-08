import { State, selectStopAndSearches } from '.';
import { StopAndSearch } from '../model/stop-and-search';
import { LatLng } from 'leaflet';
import { createStopAndSearch } from 'test-helpers';

describe('Root state', () => {
  describe('stopAndSearches selector', () => {
    it('should retrieve all stop and seaches from the state', () => {
      const mockStopAndSearches: StopAndSearch[] = [
        createStopAndSearch(new LatLng(1, 1)),
        createStopAndSearch(new LatLng(2, 2)),
      ];

      const state: State = {
        stopAndSearchState: {
          stopAndSearches: mockStopAndSearches,
        },
      };

      expect(selectStopAndSearches(state)).toBe(mockStopAndSearches);
    });
  });
});
