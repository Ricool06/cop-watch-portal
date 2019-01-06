import { Action } from '@ngrx/store';

export enum ActionTypes {
  StopAndSearchDataFetched = '[StopsStreetService] StopAndSearchDataFetched',
}

export class StopAndSearchDataFetched implements Action {
  readonly type = ActionTypes.StopAndSearchDataFetched;

  constructor(public payload: StopAndSearch[]) {}
}
