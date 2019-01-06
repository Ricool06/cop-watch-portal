import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { StopAndSearchEffects } from './stop-and-search.effects';
import * as ActionsModule from '../actions/stop-and-search-data';
import { LatLngBounds, LatLng } from 'leaflet';
import { StopsStreetService } from '../services/stops-street.service';
import { StopAndSearch } from '../reducers';

describe('StopAndSearchEffects', () => {
  let actions$: Observable<any>;
  let effects: StopAndSearchEffects;
  let stopsStreetService: jasmine.SpyObj<StopsStreetService>;

  beforeEach(() => {
    stopsStreetService = jasmine.createSpyObj('stopsStreetService', ['getFromBounds']);

    TestBed.configureTestingModule({
      providers: [
        StopAndSearchEffects,
        provideMockActions(() => actions$),
        { provide: StopsStreetService, useValue: stopsStreetService },
      ],
    });

    effects = TestBed.get(StopAndSearchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should emit a success action upon getting data', () => {
    const mockStopAndSearches = [
      { location: { latLng: new LatLng(1, 1) } },
      { location: { latLng: new LatLng(2, 2) } },
    ];
    stopsStreetService.getFromBounds.and.returnValue(of(mockStopAndSearches));

    const mockBounds = new LatLngBounds([0, 0], [4, 4]);
    const inputAction = new ActionsModule.GetStopAndSearchData(mockBounds);
    const successAction = new ActionsModule.GetStopAndSearchDataSuccess(mockStopAndSearches);

    actions$ = hot('--i-', { i: inputAction });
    const expected$ = cold('--s', { s: successAction });

    expect(effects.getStopAndSearchData$).toBeObservable(expected$);
  });

  it('should emit a failure action upon getting error', () => {
    const errorMessage = 'Service failed!';
    stopsStreetService.getFromBounds.and.returnValue(throwError(errorMessage));

    const mockBounds = new LatLngBounds([0, 0], [4, 4]);
    const inputAction = new ActionsModule.GetStopAndSearchData(mockBounds);
    const failureAction = new ActionsModule.GetStopAndSearchDataFailure(errorMessage);

    actions$ = hot('--i-', { i: inputAction });
    const expected$ = cold('--f', { f: failureAction });

    expect(effects.getStopAndSearchData$).toBeObservable(expected$);
  });
});
