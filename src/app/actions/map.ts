import { Action } from '@ngrx/store';
import { LatLngBounds } from 'leaflet';

export enum ActionTypes {
  LoadMap = '[Map Page] LoadMap',
}

export class LoadMap implements Action {
  readonly type = ActionTypes.LoadMap;

  constructor(public payload: LatLngBounds) {}
}
