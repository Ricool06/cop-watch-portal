/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Output, EventEmitter, Input } from '@angular/core';

import { MapComponent } from './map.component';
import { StoreModule, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import * as fromRoot from '../../../reducers';
import * as ActionsModule from '../../../actions/stop-and-search-data';
import { Marker, LatLngBounds, LatLng } from 'leaflet';
import { StopAndSearch } from 'src/app/model/stop-and-search';
import { createStopAndSearch } from 'test-helpers';
import { MatBottomSheet } from '@angular/material';
import { DataSheetComponent } from '../../presentational/data-sheet/data-sheet.component';

@Component({
  selector: 'app-map-view',
  template: '',
})
class MockMapViewComponent {
  @Output()
  public mapBounds = new EventEmitter<LatLngBounds>();

  @Output()
  public markerClicked = new EventEmitter<L.Marker>();

  @Input()
  public stopAndSearches: StopAndSearch[];
}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let store: Store<State>;
  let mockBottomSheet: jasmine.SpyObj<MatBottomSheet>;

  beforeEach(async(() => {
    mockBottomSheet = jasmine.createSpyObj('bottomSheet', ['open']);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({
        ...fromRoot.reducers,
      })],
      declarations: [MapComponent, MockMapViewComponent],
      providers: [
        { provide: MockMapViewComponent, useClass: MockMapViewComponent },
        { provide: MatBottomSheet, useValue: mockBottomSheet },
      ],
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

  it('should open a DataSheetComponent with data in a MatBottomSheet when it receives a marker click event', () => {
    const mockMapViewComponent: MockMapViewComponent = fixture.debugElement
      .query(By.directive(MockMapViewComponent)).componentInstance;

    const mockStopAndSearches: StopAndSearch[] = [
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(2, 2)),
    ];

    mockStopAndSearches[1].outcome = 'Swan was pursued but officers failed to apprehend';

    const action = new ActionsModule.GetStopAndSearchDataSuccess(mockStopAndSearches);
    store.dispatch(action);

    fixture.detectChanges();

    const marker = new Marker(mockStopAndSearches[1].location.latLng);
    mockMapViewComponent.markerClicked.emit(marker);

    fixture.detectChanges();

    mockStopAndSearches.pop();
    expect(mockBottomSheet.open).toHaveBeenCalledWith(DataSheetComponent, {
      panelClass: 'data-sheet',
      data: mockStopAndSearches,
    });
  });
});
