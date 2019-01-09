import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

import { StopAndSearchEffects } from './stop-and-search.effects';
import * as ActionsModule from '../actions/stop-and-search-data';
import { LatLngBounds, LatLng } from 'leaflet';
import { StopsStreetService } from '../services/stops-street.service';
import { StopAndSearch } from '../model/stop-and-search';
import { createStopAndSearch } from 'test-helpers';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

describe('StopAndSearchEffects', () => {
  let actions$: Observable<ActionsModule.GetStopAndSearchDataAction>;
  let effects: StopAndSearchEffects;
  let stopsStreetService: jasmine.SpyObj<StopsStreetService>;
  let snackBarService;
  const fakeSnackBar = 'I am a string, not a snackBar';

  beforeEach(() => {
    snackBarService = { open: () => undefined };
    spyOn(snackBarService, 'open').and.returnValue(fakeSnackBar);

    stopsStreetService = jasmine.createSpyObj('stopsStreetService', ['getFromBounds']);

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        StopAndSearchEffects,
        provideMockActions(() => actions$),
        { provide: StopsStreetService, useValue: stopsStreetService },
        { provide: MatSnackBar, useValue: snackBarService },
      ],
    });

    effects = TestBed.get(StopAndSearchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should emit a success action upon getting data', () => {
    const mockStopAndSearches: StopAndSearch[] = [
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(2, 2)),
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

  it('should convert object error messages to empty strings', () => {
    const badErrorMessage = { amIAnObject: 'yes!' };
    stopsStreetService.getFromBounds.and.returnValue(throwError(badErrorMessage));

    const mockBounds = new LatLngBounds([0, 0], [4, 4]);
    const inputAction = new ActionsModule.GetStopAndSearchData(mockBounds);
    const failureAction = new ActionsModule.GetStopAndSearchDataFailure('');

    actions$ = hot('--i-', { i: inputAction });
    const expected$ = cold('--f', { f: failureAction });

    expect(effects.getStopAndSearchData$).toBeObservable(expected$);
  });

  it('should create an error snackbar upon receiving a failure action', () => {
    const errorMessage = 'Service failed!';

    const inputAction = new ActionsModule.GetStopAndSearchDataFailure(errorMessage);

    actions$ = hot('--i-', { i: inputAction });
    const expected$ = cold('--f', { f: fakeSnackBar });

    expect(effects.showErrorSnackBar$).toBeObservable(expected$);
    expect(snackBarService.open).toHaveBeenCalledWith(errorMessage, 'OK');
  });

  it('should create an error snackbar with a default message upon receiving a failure action with no message', () => {
    const inputAction = new ActionsModule.GetStopAndSearchDataFailure('');

    actions$ = hot('--i-', { i: inputAction });
    const expected$ = cold('--f', { f: fakeSnackBar });

    expect(effects.showErrorSnackBar$).toBeObservable(expected$);
    expect(snackBarService.open).toHaveBeenCalledWith('Couldn\'t fetch the data! We\'re sorry. 😞', 'OK');
  });
});
