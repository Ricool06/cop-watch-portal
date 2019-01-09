import { ApiStopAndSearch } from 'src/app/model/stop-and-search';

export const stopsStreetError = {
  errors: [
    {
      message: 'Cannot query field "notAValidField" on type "Query". Did you mean "stopsStreet"?',
      locations: [
        {
          line: 1,
          column: 2,
        },
      ],
    },
  ],
};

export const stopsStreetGoodData = {
  endpoint: '/graphql',
  mockData: {
    data: {
      stopsStreet: [
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-01T12:40:00+00:00',
          type: 'over 34',
          object_of_search: 'Stolen goods',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'A no further action disposal',
        },
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-04T12:10:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Female',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.503381', longitude: '-0.112226' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.505700', longitude: '-0.087053' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.505700', longitude: '-0.087053' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.505700', longitude: '-0.087053' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.505700', longitude: '-0.087053' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.505700', longitude: '-0.087053' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.499414', longitude: '-0.094338' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.495851', longitude: '-0.100278' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.510790', longitude: '-0.086052' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.510790', longitude: '-0.086052' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.504200', longitude: '-0.109192' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
        {
          location: { latitude: '51.504200', longitude: '-0.086052' },
          datetime: '2018-06-06T12:20:00+00:00',
          type: 'Person search',
          object_of_search: 'Controlled drugs',
          self_defined_ethnicity: 'White - English\/Welsh\/Scottish\/Northern Irish\/British',
          age_range: '18-24',
          gender: 'Male',
          outcome: 'Summons \/ charged by post',
        },
      ] as ApiStopAndSearch[],
    },
  },
};
