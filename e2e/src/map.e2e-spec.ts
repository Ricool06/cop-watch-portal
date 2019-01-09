import { MapPage } from './map.po';
import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'http';
import { stopsStreetGoodData, stopsStreetError } from './mock-data';
import { from } from 'rxjs';
import { distinct, toArray } from 'rxjs/operators';

let mockApiStatus;
let mockApiResponse;

describe('MapPage', () => {
  let page: MapPage;
  let mockApi: express.Express;
  let mockHttpServer: Server;

  beforeAll(() => {
    mockApi = express();
    mockHttpServer = mockApi.listen(3000);

    mockApi.use(cors());

    mockApi.get(stopsStreetGoodData.endpoint, (req: express.Request, res: express.Response) => {
      sendResponse(req, res);
    });
  });

  afterAll(() => {
    mockHttpServer.close((...args) => {
      console.log('CLOSED GOOD TEST');
    });
  });

  beforeEach(() => {
    mockApiStatus = 200;
    mockApiResponse = stopsStreetGoodData.mockData;
    page = new MapPage();
  });

  it('should display a map', async () => {
    await page.navigateTo();
    expect(page.getMapElement().isDisplayed()).toBeTruthy();
  });

  it('should have markers', async () => {
    await page.waitForMarkersToAppear();
  });

  it('should conglomerate markers at identical locations', async () => {
    const markers = await page.getAllMarkers();

    let stopsAtUniqueLocations;
    from(stopsStreetGoodData.mockData.data.stopsStreet).pipe(
      distinct(stopAndSearch => `${stopAndSearch.location.latitude},${stopAndSearch.location.longitude}`),
      toArray(),
    ).subscribe(stops => stopsAtUniqueLocations = stops);

    expect(markers.length).toBe(stopsAtUniqueLocations.length);
  });

  it('should have clickable markers that display a table of information about stops at that location', async () => {
    await page.clickAMarker();

    expect(page.getDataTable().isDisplayed()).toBe(true);
  });

  it('should show an error message when the api returns an error', async () => {
    mockApiStatus = 500;
    mockApiResponse = stopsStreetError;
    page = new MapPage();

    await page.navigateTo();

    expect(page.findSnackbar()).toBe(true);
  });
});

function sendResponse(req, res) {
  console.log(mockApiStatus);
  res.status(mockApiStatus).json(mockApiResponse);
}
