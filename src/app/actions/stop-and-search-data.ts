import { Action } from '@ngrx/store';
import { LatLngBounds } from 'leaflet';
import { StopAndSearch } from '../model/stop-and-search';

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

  constructor(public payload: string) {}
}

export class GetStopAndSearchDataSuccess implements Action {
  readonly type = ActionTypes.GetStopAndSearchDataSuccess;

  constructor(public payload: StopAndSearch[]) {}
}

export type GetStopAndSearchDataAction =
  GetStopAndSearchData |
  GetStopAndSearchDataFailure |
  GetStopAndSearchDataSuccess;
