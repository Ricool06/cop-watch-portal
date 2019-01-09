import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { StopsStreetService } from '../services/stops-street.service';
import {
  ActionTypes,
  GetStopAndSearchData,
  GetStopAndSearchDataSuccess,
  GetStopAndSearchDataFailure,
  GetStopAndSearchDataAction,
} from '../actions/stop-and-search-data';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LatLngBounds } from 'leaflet';
import { StopAndSearch } from '../model/stop-and-search';
import { MatSnackBarRef, MatSnackBar, SimpleSnackBar } from '@angular/material';

@Injectable()
export class StopAndSearchEffects {

  constructor(
    private actions$: Actions,
    private stopsStreetService: StopsStreetService,
    private snackBarService: MatSnackBar,
  ) { }

  @Effect()
  getStopAndSearchData$: Observable<GetStopAndSearchDataAction> = this.actions$.pipe(
    ofType(ActionTypes.GetStopAndSearchData),
    map((action: GetStopAndSearchData) => action.payload),
    switchMap((payload: LatLngBounds) => {
      return this.stopsStreetService.getFromBounds(payload).pipe(
        map((stopAndSearches: StopAndSearch[]) => new GetStopAndSearchDataSuccess(stopAndSearches)),
        catchError((error: any) => {
          const message = typeof error === 'string' ? error : '';
          return of(new GetStopAndSearchDataFailure(message));
        }),
      );
    }),
  );

  @Effect({ dispatch: false })
  showErrorSnackBar$: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.GetStopAndSearchDataFailure),
    map((action: GetStopAndSearchDataFailure) => {
      const message = (action.payload && action.payload.length !== 0)
        ? action.payload
        : 'Couldn\'t fetch the data! We\'re sorry. 😞';
      return this.snackBarService.open(message, 'OK');
    }),
  );
}
