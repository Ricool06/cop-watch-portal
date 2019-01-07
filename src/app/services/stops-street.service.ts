import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds, LatLng } from 'leaflet';
import { flatMap, toArray, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { StopAndSearch } from '../model/stop-and-search';

@Injectable({
  providedIn: 'root',
})
export class StopsStreetService {

  constructor(private httpClient: HttpClient) { }

  public getFromBounds(latLngBounds: LatLngBounds): Observable<StopAndSearch[]> {
    const polyString = this.convertLatLngBoundsToPolyString(latLngBounds);

    return this.httpClient.get(
      `/graphql?query=${polyString}`,
      { headers: { 'X-Event-Type': 'police-data' } },
    ).pipe(
      flatMap((stops: any[]) => from(stops)),
      map(stopAndSearchFromApi => this.convertApiStopAndSearchToModelStopAndSearch(stopAndSearchFromApi)),
      toArray(),
    );
  }

  private convertLatLngBoundsToPolyString(latLngBounds: LatLngBounds): string {
    return [
      latLngBounds.getSouthWest(),
      latLngBounds.getNorthWest(),
      latLngBounds.getNorthEast(),
      latLngBounds.getSouthEast(),
    ].map((currentLatLng: LatLng) => `${currentLatLng.lat},${currentLatLng.lng}`)
    .join(':');
  }

  private convertApiStopAndSearchToModelStopAndSearch(stopAndSearchFromApi: any): StopAndSearch {
    return {
      location: {
        latLng: new LatLng(
          Number(stopAndSearchFromApi.latitude),
          Number(stopAndSearchFromApi.longitude),
        ),
      },
    };
  }
}
