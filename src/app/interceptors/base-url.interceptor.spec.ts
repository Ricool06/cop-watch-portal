import { TestBed, inject } from '@angular/core/testing';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Interceptor: BaseUrl', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: BaseUrlInterceptor,
        multi: true,
      }],
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it(
    'should replace the base url in any request with the env var for the base url',
    inject([HttpClient], (httpClient: HttpClient) => {
      const mockPath = '/give-me-a-base-url';

      httpClient.get(mockPath).subscribe(response => expect(response).toBeTruthy());
      const receivedRequest = httpMock.expectOne(environment.apiUrl + mockPath);

      receivedRequest.flush({ data: '¯\_(ツ)_/¯' });
      httpMock.verify();
    }),
  );
});
