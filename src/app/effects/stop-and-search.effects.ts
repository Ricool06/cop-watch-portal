import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { StopsStreetService } from '../services/stops-street.service';
import {
  ActionTypes,
  GetStopAndSearchData,
  GetStopAndSearchDataSuccess,
  GetStopAndSearchDataFailure,
} from '../actions/stop-and-search-data';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { StopAndSearch } from '../reducers';
import { LatLngBounds } from 'leaflet';

@Injectable()
export class StopAndSearchEffects {

  constructor(private actions$: Actions, private stopsStreetService: StopsStreetService) { }

  @Effect()
  getStopAndSearchData$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.GetStopAndSearchData),
    map((action: GetStopAndSearchData) => action.payload),
    switchMap((payload: LatLngBounds) => {
      return this.stopsStreetService.getFromBounds(payload).pipe(
        map((stopAndSearches: StopAndSearch[]) => new GetStopAndSearchDataSuccess(stopAndSearches)),
        catchError((error: any) => of(new GetStopAndSearchDataFailure(error))),
      );
    }),
  );
}
