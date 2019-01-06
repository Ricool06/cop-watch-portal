/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';

import { MapComponent } from './map.component';
import { LoadMap } from 'src/app/actions/map';
import { StoreModule, Store } from '@ngrx/store';

@Component({
  selector: 'app-map-view',
  template: '',
})
class MockMapViewComponent {}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({

      })],
      declarations: [ MapComponent, MockMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a map presentational component', () => {
    expect(fixture.debugElement.query(By.css('app-map-view'))).toBeTruthy();
  });

  it('should dispatch a GetStopAndSearchDataAction upon creation', () => {
    expect();
  });
});
