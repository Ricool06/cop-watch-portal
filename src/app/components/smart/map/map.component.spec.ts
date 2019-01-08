/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Output, EventEmitter, Input } from '@angular/core';

import { MapComponent } from './map.component';
import { StoreModule, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import * as fromRoot from '../../../reducers';
import * as ActionsModule from '../../../actions/stop-and-search-data';
import { LatLngBounds, LatLng } from 'leaflet';
import { StopAndSearch } from 'src/app/model/stop-and-search';
import { createStopAndSearch } from 'test-helpers';

@Component({
  selector: 'app-map-view',
  template: '',
})
class MockMapViewComponent {
  @Output()
  public mapBounds = new EventEmitter<LatLngBounds>();

  @Input()
  public stopAndSearches: StopAndSearch[];
}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({
        ...fromRoot.reducers,
      })],
      declarations: [MapComponent, MockMapViewComponent],
      providers: [{ provide: MockMapViewComponent, useClass: MockMapViewComponent }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a map presentational component', () => {
    expect(fixture.debugElement.query(By.css('app-map-view'))).toBeTruthy();
  });

  it('should dispatch a GetStopAndSearchDataAction with map bounds when child component emits event', () => {
    const mockMapViewComponent: MockMapViewComponent = fixture.debugElement
      .query(By.directive(MockMapViewComponent)).componentInstance;

    const mockMapBounds = new LatLngBounds([0, 0], [4, 4]);
    const action = new ActionsModule.GetStopAndSearchData(mockMapBounds);
    spyOn(store, 'dispatch').and.stub();

    mockMapViewComponent.mapBounds.emit(mockMapBounds);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should pass down stop and searches for the map view to display', () => {
    const mockMapViewComponent: MockMapViewComponent = fixture.debugElement
      .query(By.directive(MockMapViewComponent)).componentInstance;

    expect(mockMapViewComponent.stopAndSearches).toEqual([]);

    const mockStopAndSearches: StopAndSearch[] = [
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(2, 2)),
    ];
    const action = new ActionsModule.GetStopAndSearchDataSuccess(mockStopAndSearches);
    store.dispatch(action);

    component.stopAndSearches$.subscribe(data => expect(data).toBe(mockStopAndSearches));

    fixture.detectChanges();
    expect(mockMapViewComponent.stopAndSearches).toEqual(mockStopAndSearches);
  });
});
