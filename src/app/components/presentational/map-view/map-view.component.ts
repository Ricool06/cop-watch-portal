import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { StopAndSearch } from 'src/app/model/stop-and-search';
import { from } from 'rxjs';
import { distinct, filter } from 'rxjs/operators';

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

  @Output()
  public markerClicked = new EventEmitter<L.Marker>();

  // Ideally, this would be private.
  // However testing the emission of events from this component is nigh on
  // impossible without directly moving the map in the tests. I would rather
  // the map component is tested and we lose some encapsulation. Therefore,
  // this is tech debt.
  public leafletMap: L.Map;
  private markers: L.Marker[] = [];
  private markerOptions: L.MarkerOptions;

  constructor() {
    this.markerOptions = {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    };
  }

  ngOnInit() {
    this.leafletMap = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafletMap);

    this.leafletMap.on('moveend', () => this.mapBounds.emit(this.leafletMap.getBounds()));
    this.mapBounds.emit(this.leafletMap.getBounds());
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentStops: StopAndSearch[] = changes.stopAndSearches.currentValue;
    const previousStops: StopAndSearch[] = changes.stopAndSearches.previousValue || [];

    this.createNewMarkers(currentStops);
    this.removeOutOfViewMarkers();
  }

  private createNewMarkers(currentStops: StopAndSearch[]) {
    from(currentStops).pipe(
      distinct(stopAndSearch => stopAndSearch.location.latLng),
      filter(stopAndSearch => this.markers.length === 0 || !this.alreadyHasMarker(stopAndSearch)),
    ).subscribe(stopAndSearch => this.addMarkerForStopAndSearch(stopAndSearch));
  }

  private removeOutOfViewMarkers() {
    this.markers
      .filter(marker => !this.leafletMap.getBounds().contains(marker.getLatLng()))
      .forEach((marker) => {
        this.leafletMap.removeLayer(marker);
        this.markers.splice(this.markers.indexOf(marker), 1);
      });
  }

  private alreadyHasMarker(stopAndSearch: StopAndSearch): boolean {
    return this.markers.some(marker => this.isAtMarker(stopAndSearch, marker));
  }

  private isAtMarker(stopAndSearch: StopAndSearch, marker: L.Marker): boolean {
    return !marker || marker.getLatLng().equals(stopAndSearch.location.latLng);
  }

  private addMarkerForStopAndSearch(stopAndSearch: StopAndSearch) {
    const newMarker = L.marker(stopAndSearch.location.latLng, this.markerOptions);
    newMarker.on('click', (event: L.LeafletEvent) => {
      this.markerClicked.emit(event.target);
    });
    this.markers.push(newMarker.addTo(this.leafletMap));
  }
}
