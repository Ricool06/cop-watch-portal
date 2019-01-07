import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { StopAndSearch } from 'src/app/model/stop-and-search';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit, OnChanges {
  @Input()
  public stopAndSearches: StopAndSearch[];

  @Output()
  public mapBounds = new EventEmitter<L.LatLngBounds>();

  // Ideally, this would be private.
  // However testing the emission of events from this component is nigh on
  // impossible without directly moving the map in the tests. I would rather
  // the map component is tested and we lose some encapsulation. Therefore,
  // this is tech debt.
  public leafletMap: L.Map;
  private markers: L.Marker[] = [];

  constructor() { }

  ngOnInit() {
    this.leafletMap = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafletMap);

    this.leafletMap.on('moveend', () => {
      this.mapBounds.emit(this.leafletMap.getBounds());
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const newStopAndSearches: StopAndSearch[] = changes.stopAndSearches.currentValue;

    this.markers.map((marker: L.Marker) => this.leafletMap.removeLayer(marker));
    newStopAndSearches.map((stopAndSearch: StopAndSearch) => {
      this.markers.push(L.marker(stopAndSearch.location.latLng).addTo(this.leafletMap));
    });
  }
}
