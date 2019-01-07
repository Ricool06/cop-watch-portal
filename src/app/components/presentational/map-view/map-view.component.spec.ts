import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MapViewComponent } from './map-view.component';
import { Component, ViewChild } from '@angular/core';
import { StopAndSearch } from 'src/app/model/stop-and-search';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: `<app-map-view
  [stopAndSearches]="stopAndSearches"
  (mapBounds)="onMapBoundsChange($event)"></app-map-view>`,
})
class MockParentComponent {
  @ViewChild(MapViewComponent) childComponent: MapViewComponent;
  stopAndSearches: StopAndSearch[] = [];
  mapBounds: L.LatLngBounds;

  onMapBoundsChange(newMapBounds: L.LatLngBounds) {
    this.mapBounds = newMapBounds;
  }
}

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let parentComponent: MockParentComponent;
  let fixture: ComponentFixture<MockParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapViewComponent, MockParentComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockParentComponent);
    parentComponent = fixture.componentInstance;

    component = parentComponent.childComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a leaflet map', () => {
    const compiled = fixture.nativeElement;
    const leafletMap = compiled.querySelector('#map > .leaflet-pane');

    expect(leafletMap).toBeTruthy();
  });

  it('should have a stopAndSearches input', () => {
    const mockStopAndSearches: StopAndSearch[] = [
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(2, 2) } },
    ];

    expect(component.stopAndSearches).toEqual([]);

    parentComponent.stopAndSearches = mockStopAndSearches;

    fixture.detectChanges();
    expect(component.stopAndSearches).toEqual(mockStopAndSearches);
  });

  it('should emit event from mapBounds when map bounds change', (done) => {
    spyOn(parentComponent, 'onMapBoundsChange');
    const mockBounds = new L.LatLngBounds([45, 45], [1, 1]);

    fixture.whenStable().then(() => {
      component.leafletMap.flyToBounds(mockBounds);
      component.leafletMap.on('moveend', () => {
        fixture.detectChanges();
        expect(parentComponent.onMapBoundsChange).toHaveBeenCalledWith(jasmine.any(L.LatLngBounds));
        done();
      });
    });
  });

  it('should place markers at stop and search locations every time they update', () => {
    const mockStopAndSearches: StopAndSearch[] = [
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(2, 2) } },
    ];

    let marker: L.Marker;

    const realLMarkerFunc = L.marker;
    const markers = [];
    spyOn(L, 'marker').and.callFake((...args) => {
      marker = realLMarkerFunc(args[0], args[1]);
      spyOn(marker, 'addTo');
      markers.push(marker);
      return marker;
    });

    expect(marker).toBeFalsy();
    parentComponent.stopAndSearches = mockStopAndSearches;

    fixture.detectChanges();
    expect(markers.length).toBe(mockStopAndSearches.length);
    markers.map((thisMarker: L.Marker) => expect(thisMarker.addTo).toHaveBeenCalledWith(component.leafletMap));
  });
});
