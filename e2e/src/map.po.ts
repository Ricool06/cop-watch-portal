import { browser, by, element, protractor, $ } from 'protractor';

export class MapPage {
  firstMarkerSelector = '#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img:nth-child(1)';

  navigateTo() {
    return browser.get('/');
  }

  getMapElement() {
    return element(by.css('app-root app-map'));
  }

  waitForMarkersToAppear() {
    const until = protractor.ExpectedConditions;
    return browser.wait(until.presenceOf($(this.firstMarkerSelector)), 20000, 'Markers taking too long to appear');
  }

  clickAMarker() {
    return element(by.css(this.firstMarkerSelector)).click();
  }
}
