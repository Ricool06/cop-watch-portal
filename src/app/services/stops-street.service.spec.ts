import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StopsStreetService } from './stops-street.service';
import { LatLngBounds, LatLng } from 'leaflet';
import { environment } from '../../environments/environment';
import { ApiStopAndSearch } from '../model/stop-and-search';

describe('Service: StopsStreet', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StopsStreetService],
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be injectable', inject([StopsStreetService], (service: StopsStreetService) => {
    expect(service).toBeTruthy();
  }));

  it('should get stop and search data in a polygon from api', inject([StopsStreetService], (service: StopsStreetService) => {
    const southWest: LatLng = new LatLng(50.431541, -4.073792);
    const northEast: LatLng = new LatLng(50.739528, -3.640042);
    const bounds: LatLngBounds = new LatLngBounds(southWest, northEast);
    const expectedPoly = [
      bounds.getSouthWest(),
      bounds.getNorthWest(),
      bounds.getNorthEast(),
      bounds.getSouthEast(),
    ];

    const expectedPolyString = expectedPoly
      .map((currentLatLng: LatLng) => `${currentLatLng.lat},${currentLatLng.lng}`)
      .join(':');

    const stopsStreet: ApiStopAndSearch[] = [
      {
        location: {
          latitude: '50.5',
          longitude: '-3.892244',
        },
      },
      {
        location: {
          latitude: '50.688224',
          longitude: '-3.94',
        },
      },
    ];

    const mockResponse = {
      data: {
        stopsStreet,
      },
    };

    const expectedResult = mockResponse.data.stopsStreet.map((stopAndSearch: any) => {
      return {
        location: {
          latLng: new LatLng(Number(stopAndSearch.location.latitude), Number(stopAndSearch.location.longitude)),
        },
      };
    });

    service.getFromBounds(bounds).subscribe((data: any) => {
      expect(data).toEqual(expectedResult);
    });

    const requester = httpMock.expectOne(`/graphql?query={stopsStreet(poly: "${expectedPolyString}"){location{latitude longitude}}}`);
    expect(requester.request.method).toBe('GET');
    expect(requester.request.headers.get('X-Event-Type')).toBe('police-data');

    requester.flush(mockResponse);

    httpMock.verify();
  }));
});
