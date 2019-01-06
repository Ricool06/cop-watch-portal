import { State, selectStopAndSearches } from '.';
import { StopAndSearch } from '../model/stop-and-search';
import { LatLng } from 'leaflet';

describe('Root state', () => {
  describe('stopAndSearches selector', () => {
    it('should retrieve all stop and seaches from the state', () => {
      const mockStopAndSearches: StopAndSearch[] = [
        { location: { latLng: new LatLng(1, 1) } },
        { location: { latLng: new LatLng(2, 2) } },
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
