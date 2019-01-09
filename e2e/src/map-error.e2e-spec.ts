import { MapPage } from './map.po';
import * as express from 'express';
import * as cors from 'cors';
import { Server } from 'http';
import { stopsStreetGoodData, stopsStreetError } from './mock-data';

describe('MapPage - error', () => {
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

  it('should show an error message when the api returns an error', async () => {
    await page.navigateTo();
    await page.waitForErrorSnackbarToAppear();

    expect(page.getSnackbar().isDisplayed()).toBe(true);
  });
});
