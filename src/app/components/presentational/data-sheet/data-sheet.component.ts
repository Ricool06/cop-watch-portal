import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { StopAndSearch } from 'src/app/model/stop-and-search';

@Component({
  selector: 'app-data-sheet',
  templateUrl: './data-sheet.component.html',
  styleUrls: ['./data-sheet.component.scss'],
})
export class DataSheetComponent implements OnInit {
  public columnsToDisplay = ['datetime', 'type', 'object_of_search', 'outcome', 'age_range', 'self_defined_ethnicity', 'gender'];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public stopAndSearches: StopAndSearch[]) { }

  ngOnInit() {
  }

}
