import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StopsStreetService } from './stops-street.service';
import { LatLngBounds, LatLng } from 'leaflet';
import { environment } from '../../environments/environment';

fdescribe('Service: StopsStreet', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StopsStreetService]
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
      bounds.getSouthEast()
    ];

    const expectedPolyString = expectedPoly
      .map((currentLatLng: LatLng) => currentLatLng.lat + ',' + currentLatLng.lng)
      .join(':');

    const mockResponse = [
      {
        latitude: '50.5',
        longitude: '-3.892244',
      },
      {
        latitude: '50.688224',
        longitude: '-3.94',
      }
    ];

    const expectedResult = mockResponse.map((stopAndSearch: any) => {
      return {
        location: {
          latLng: new LatLng(Number(stopAndSearch.latitude), Number(stopAndSearch.longitude))
        },
      };
    });

    service.getFromBounds(bounds).subscribe((data: any) => {
      expect(data).toEqual(expectedResult);
    });

    const requester = httpMock.expectOne(`${environment.apiUrl}/graphql?query=${expectedPolyString}`);
    expect(requester.request.method).toBe('GET');
    console.log(requester.request);
    expect(requester.request.headers.get('X-Event-Type')).toBe('police-data');

    requester.flush(mockResponse);

    httpMock.verify();
  }));
});
