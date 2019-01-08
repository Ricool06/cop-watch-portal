import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should emit event from mapBounds at startup', () => {
    fixture.whenStable().then(() => {
      expect(parentComponent.mapBounds).toBeDefined();
    });
  });

  it('should emit event from mapBounds when map bounds change', (done) => {
    spyOn(parentComponent, 'onMapBoundsChange');
    const mockBounds = new L.LatLngBounds([52, 45], [1, 1]);

    fixture.whenStable().then(() => {
      component.leafletMap.flyToBounds(mockBounds);
      component.leafletMap.on('moveend', () => {
        fixture.detectChanges();
        expect(parentComponent.onMapBoundsChange).toHaveBeenCalledWith(jasmine.any(L.LatLngBounds));
        done();
      });
    });
  });

  it('should place markers at stop and search locations every time they update, and use the correct icon', async () => {
    const mockStopAndSearches: StopAndSearch[] = [
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(2, 2) } },
    ];
    const expectedMarkerOptions = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    };

    const realLMarkerFunc = L.marker;
    const markers = [];

    spyOn(L, 'marker').and.callFake((...args) => {
      expect(args[1]).toEqual(expectedMarkerOptions);

      const marker: L.Marker = realLMarkerFunc(args[0], args[1]);
      markers.push(marker);
      spyOn(marker, 'addTo').and.callThrough();
      return marker;
    });

    expect(markers.length).toBe(0);
    parentComponent.stopAndSearches = mockStopAndSearches;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(markers.length).toBe(mockStopAndSearches.length);
    markers.map((thisMarker: L.Marker) => expect(thisMarker.addTo).toHaveBeenCalledWith(component.leafletMap));
  });

  it('should conglomerate markers at the same location', () => {
    const identicalStopAndSearches: StopAndSearch[] = [
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(1, 1) } },
    ];

    const realLMarkerFunc = L.marker;
    const markers = [];

    spyOn(L, 'marker').and.callFake((...args) => {
      const marker: L.Marker = realLMarkerFunc(args[0], args[1]);
      markers.push(marker);
      return marker;
    });

    expect(markers.length).toBe(0);
    parentComponent.stopAndSearches = identicalStopAndSearches;

    fixture.detectChanges();
    expect(markers.length).toBe(1);
  });

  it('should add markers idempotently', async () => {
    const mockStopAndSearches: StopAndSearch[] = [
      { location: { latLng: new L.LatLng(51.505, -0.09) } },
      { location: { latLng: new L.LatLng(51.5064, -0.09) } },
    ];

    const realLMarkerFunc = L.marker;
    const markers = [];

    spyOn(L, 'marker').and.callFake((...args) => {
      const marker: L.Marker = realLMarkerFunc(args[0], args[1]);
      markers.push(marker);
      return marker;
    });

    expect(markers.length).toBe(0);
    parentComponent.stopAndSearches = mockStopAndSearches;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(markers.length).toBe(2);

    parentComponent.stopAndSearches = mockStopAndSearches.concat([
      { location: { latLng: new L.LatLng(51.5042, -0.09) } },
    ]);
    spyOn(component.leafletMap, 'removeLayer').and.callThrough();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.leafletMap.removeLayer).not.toHaveBeenCalled();
    expect(markers.length).toBe(3);
  });

  it('should remove markers not in view', async () => {
    const mockStopAndSearches: StopAndSearch[] = [
      { location: { latLng: new L.LatLng(1, 1) } },
      { location: { latLng: new L.LatLng(2, 2) } },
      { location: { latLng: new L.LatLng(1, 2) } },
      { location: { latLng: new L.LatLng(51.505, -0.09) } },
    ];

    const realLMarkerFunc = L.marker;
    const markers = [];

    spyOn(L, 'marker').and.callFake((...args) => {
      const marker: L.Marker = realLMarkerFunc(args[0], args[1]);
      markers.push(marker);
      return marker;
    });

    expect(markers.length).toBe(0);
    parentComponent.stopAndSearches = mockStopAndSearches;

    spyOn(component.leafletMap, 'removeLayer').and.callThrough();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(markers.length).toBe(mockStopAndSearches.length);

    parentComponent.stopAndSearches = [{ location: { latLng: new L.LatLng(1, 1) } }];

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.leafletMap.removeLayer).not.toHaveBeenCalledWith(markers[3]);
    expect(component.leafletMap.removeLayer).toHaveBeenCalledWith(markers[1]);
  });
});
