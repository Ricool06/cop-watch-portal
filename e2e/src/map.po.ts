import { browser, by, element } from 'protractor';

export class MapPage {
  navigateTo() {
    return browser.get('/');
  }

  getMapElement() {
    return element(by.css('app-root app-map'));
  }

  clickAMarker() {
    return element(by.css('app-root app-map .leaflet-marker-pane')).click();
  }
}
