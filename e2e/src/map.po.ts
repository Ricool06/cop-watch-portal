import { browser, by, element, protractor, $, ElementFinder } from 'protractor';

const until = protractor.ExpectedConditions;

export class MapPage {
  private firstMarkerSelector = '#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img:nth-child(1)';
  private markersSelector = '#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img';
  private dataTableSelector = 'app-data-sheet';
  private snackbarSelector = 'simple-snackbar';

  navigateTo() {
    return browser.get('/');
  }

  getMapElement() {
    return element(by.css('app-root app-map'));
  }

  waitForMarkersToAppear() {
    return browser.wait(
      until.presenceOf($(this.firstMarkerSelector)),
      1000,
      'Markers taking too long to appear');
  }

  waitForErrorSnackbarToAppear() {
    return browser.wait(
      until.presenceOf($(this.snackbarSelector)),
      1000,
      'Snackbar taking too long to appear');
  }

  getAllMarkers() {
    return element.all(by.css(this.markersSelector));
  }

  clickAMarker() {
    return element(by.css(this.firstMarkerSelector)).click();
  }

  getDataTable(): ElementFinder {
    return element(by.css(this.dataTableSelector));
  }

  getSnackbar(): ElementFinder {
    return element(by.css(this.snackbarSelector));
  }
}
