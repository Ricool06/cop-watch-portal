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
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LatLngBounds } from 'leaflet';
import { StopAndSearch } from '../model/stop-and-search';

@Injectable()
export class StopAndSearchEffects {

  constructor(private actions$: Actions, private stopsStreetService: StopsStreetService) { }

  @Effect()
  getStopAndSearchData$: Observable<GetStopAndSearchDataAction> = this.actions$.pipe(
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
