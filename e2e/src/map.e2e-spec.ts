import { MapPage } from './map.po';
import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'http';
import { stopsStreetGoodData } from './mock-data';
import { from } from 'rxjs';
import { distinct, toArray } from 'rxjs/operators';

describe('MapPage', () => {
  let page: MapPage;
  let mockApi: express.Express;
  let mockHttpServer: Server;

  beforeAll(() => {
    mockApi = express();
    mockHttpServer = mockApi.listen(3000);

    mockApi.use(cors());
    mockApi.get(stopsStreetGoodData.endpoint, (req: express.Request, res: express.Response) => {
      res.json(stopsStreetGoodData.mockData);
    });
  });

  afterAll(() => {
    mockHttpServer.close();
  });

  beforeEach(() => {
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
});
