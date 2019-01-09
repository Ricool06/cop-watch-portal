import { Component, OnInit } from '@angular/core';
import { LatLngBounds, Marker } from 'leaflet';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import { GetStopAndSearchData } from 'src/app/actions/stop-and-search-data';
import { Observable, from } from 'rxjs';
import { StopAndSearch } from 'src/app/model/stop-and-search';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DataSheetComponent } from '../../presentational/data-sheet/data-sheet.component';
import { filter, flatMap, toArray, tap } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public stopAndSearches$: Observable<StopAndSearch[]>;

  constructor(private store: Store<fromRoot.State>, private bottomSheet: MatBottomSheet) {
    this.stopAndSearches$ = this.store.pipe(select(fromRoot.selectStopAndSearches));
  }

  ngOnInit() {
  }

  public onMapBoundsChange(newBounds: LatLngBounds) {
    this.store.dispatch(new GetStopAndSearchData(newBounds));
  }

  public onMarkerClick(marker: Marker) {
    this.bottomSheet.open(DataSheetComponent, {
      panelClass: 'data-sheet',
      data: this.getStopAndSearchesAtMarker(marker),
    });
  }

  private getStopAndSearchesAtMarker(marker: Marker): StopAndSearch[] {
    const stopsAtMarker: StopAndSearch[] = [];

    this.stopAndSearches$.pipe(
      flatMap(stopAndSearches => from(stopAndSearches)),
      filter((stopAndSearch: StopAndSearch) => marker.getLatLng().equals(stopAndSearch.location.latLng)),
    ).subscribe(stopAndSearch => stopsAtMarker.push(stopAndSearch));

    return stopsAtMarker;
  }
}
