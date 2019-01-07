import { MapPage } from './map.po';
import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'http';
import { stopsStreetGoodData } from './mock-data';

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
});
