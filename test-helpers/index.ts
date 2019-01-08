import { StopAndSearch, ApiStopAndSearch, LatLngStrings } from 'src/app/model/stop-and-search';
import * as moment from 'moment';

export function createStopAndSearch(latLng: L.LatLng): StopAndSearch {
  return {
    location: { latLng },
    datetime: moment('2018-12-28T10:00:00+00:00'),
    type: 'Person search',
    object_of_search: 'Controlled drugs',
    self_defined_ethnicity: 'White - English/Welsh/Scottish/Northern Irish/British',
    age_range: '18-24',
    gender: 'Male',
    outcome: 'Summons / charged by post',
  };
}
export function createApiStopAndSearch(latLngStrings: LatLngStrings): ApiStopAndSearch {
  return {
    location: latLngStrings,
    datetime: moment('2018-12-28T10:00:00+00:00').format(),
    type: 'Person search',
    object_of_search: 'Controlled drugs',
    self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
    age_range: '18-24',
    gender: 'Male',
    outcome: 'Summons \/ charged by post',
  };
}
