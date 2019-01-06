import { Action } from '@ngrx/store';
import { StopAndSearch } from '../reducers';
import { LatLngBounds } from 'leaflet';

export enum ActionTypes {
  GetStopAndSearchData = '[StopsStreetService] GetStopAndSearchData',
  GetStopAndSearchDataFailure = '[StopsStreetService] GetStopAndSearchDataFailure',
  GetStopAndSearchDataSuccess = '[StopsStreetService] GetStopAndSearchDataSuccess',
}

export class GetStopAndSearchData implements Action {
  readonly type = ActionTypes.GetStopAndSearchData;

  constructor(public payload: LatLngBounds) {}
}

export class GetStopAndSearchDataFailure implements Action {
  readonly type = ActionTypes.GetStopAndSearchDataFailure;

  constructor(public payload: Error) {}
}

export class GetStopAndSearchDataSuccess implements Action {
  readonly type = ActionTypes.GetStopAndSearchDataSuccess;

  constructor(public payload: StopAndSearch[]) {}
}
