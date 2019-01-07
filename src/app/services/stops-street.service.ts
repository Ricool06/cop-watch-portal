import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLngBounds, LatLng } from 'leaflet';
import { flatMap, toArray, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { StopAndSearch, ApiStopAndSearch } from '../model/stop-and-search';

@Injectable({
  providedIn: 'root',
})
export class StopsStreetService {

  constructor(private httpClient: HttpClient) { }

  public getFromBounds(latLngBounds: LatLngBounds): Observable<StopAndSearch[]> {
    const polyString = this.convertLatLngBoundsToPolyString(latLngBounds);

    return this.httpClient.get(
      `/graphql?query={stopsStreet(poly: "${polyString}"){location{latitude longitude}}}`,
      { headers: { 'X-Event-Type': 'police-data' } },
    ).pipe(
      map((data: any) => data.data.stopsStreet),
      flatMap((stops: ApiStopAndSearch[]) => from(stops)),
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

  private convertApiStopAndSearchToModelStopAndSearch(stopAndSearchFromApi: ApiStopAndSearch): StopAndSearch {
    return {
      location: {
        latLng: new LatLng(
          Number(stopAndSearchFromApi.location.latitude),
          Number(stopAndSearchFromApi.location.longitude),
        ),
      },
    };
  }
}
