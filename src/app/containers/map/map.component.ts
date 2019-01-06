import { Component, OnInit } from '@angular/core';
import { LatLngBounds } from 'leaflet';
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import { GetStopAndSearchData } from 'src/app/actions/stop-and-search-data';
import { Observable } from 'rxjs';
import { StopAndSearch } from 'src/app/model/stop-and-search';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public stopAndSearches$: Observable<StopAndSearch[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.stopAndSearches$ = this.store.pipe(select(fromRoot.selectStopAndSearches));
  }

  ngOnInit() {
  }

  public onMapBoundsChange(newBounds: LatLngBounds) {
    this.store.dispatch(new GetStopAndSearchData(newBounds));
  }
}
