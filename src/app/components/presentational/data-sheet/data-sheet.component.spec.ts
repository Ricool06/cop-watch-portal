import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSheetComponent } from './data-sheet.component';
import { MAT_BOTTOM_SHEET_DATA, MatTableModule } from '@angular/material';
import { StopAndSearch } from 'src/app/model/stop-and-search';
import { createStopAndSearch } from 'test-helpers';
import { LatLng } from 'leaflet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MomentModule } from 'ngx-moment';

describe('DataSheetComponent', () => {
  let component: DataSheetComponent;
  let fixture: ComponentFixture<DataSheetComponent>;

  const createComponentWithData = (mockData: StopAndSearch[]) => {
    TestBed.overrideProvider(MAT_BOTTOM_SHEET_DATA, { useValue: mockData });

    fixture = TestBed.createComponent(DataSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule, NoopAnimationsModule, MomentModule],
      declarations: [DataSheetComponent],
      providers: [{ provide: MAT_BOTTOM_SHEET_DATA, useValue: [] }],
    })
    .compileComponents();
  }));

  it('should create', () => {
    createComponentWithData([]);
    expect(component).toBeTruthy();
  });

  it('should display all stop and search data in a table', () => {
    const mockData = [
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(1, 2)),
      createStopAndSearch(new LatLng(1, 2)),
    ];
    createComponentWithData(mockData);

    const rows = fixture.nativeElement.querySelectorAll('.mat-row');
    expect(rows.length).toBe(mockData.length);
  });

  it('should display all relevant properties of each stop and search', () => {
    const mockData = [
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(1, 2)),
      createStopAndSearch(new LatLng(1, 2)),
    ];
    createComponentWithData(mockData);

    const firstRow: Element = fixture.nativeElement.querySelector('.mat-row');
    const cellsInFirstRow: NodeListOf<Element> = firstRow.querySelectorAll('.mat-cell');

    expect(cellsInFirstRow[0].textContent).toBe(` ${mockData[0].datetime.format('DD-MM-YYYY HH:mm')} `);
    expect(cellsInFirstRow[1].textContent).toBe(` ${mockData[0].type} `);
    expect(cellsInFirstRow[2].textContent).toBe(` ${mockData[0].object_of_search} `);
    expect(cellsInFirstRow[3].textContent).toBe(` ${mockData[0].outcome} `);
    expect(cellsInFirstRow[4].textContent).toBe(` ${mockData[0].age_range} `);
    expect(cellsInFirstRow[5].textContent).toBe(` ${mockData[0].self_defined_ethnicity} `);
    expect(cellsInFirstRow[6].textContent).toBe(` ${mockData[0].gender} `);
  });

  it('should show nicely formatted headers', () => {
    const mockData = [
      createStopAndSearch(new LatLng(1, 1)),
      createStopAndSearch(new LatLng(1, 2)),
      createStopAndSearch(new LatLng(1, 2)),
    ];
    createComponentWithData(mockData);

    const headerCells: Element = fixture.nativeElement.querySelectorAll('.mat-header-row > .mat-header-cell');

    expect(headerCells[0].textContent).toBe(' Time ');
    expect(headerCells[1].textContent).toBe(' Type ');
    expect(headerCells[2].textContent).toBe(' Reason ');
    expect(headerCells[3].textContent).toBe(' Outcome ');
    expect(headerCells[4].textContent).toBe(' Age Range ');
    expect(headerCells[5].textContent).toBe(' Ethnicity ');
    expect(headerCells[6].textContent).toBe(' Gender ');
  });
});
