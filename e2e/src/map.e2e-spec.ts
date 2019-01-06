import { MapPage } from './map.po';
import { async } from '@angular/core/testing';

describe('MapPage', () => {
  let page: MapPage;

  beforeEach(() => {
    page = new MapPage();
  });

  it('should display a map', async () => {
    await page.navigateTo();
    expect(page.getMapElement().isDisplayed()).toBeTruthy();
  });

  it('should have clickable markers', () => {
    expect(page.clickAMarker).not.toThrowError();
  });
});
