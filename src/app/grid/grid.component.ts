import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions, ColumnApi, GridReadyEvent } from "ag-grid/main";
import { tableDescriptor } from "src/app/constants/table-descriptor";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() columnDefs: any;
  @Input() rowData: any[];
  @Input() gridOptions: any;

  constructor() { }

  ngOnInit() { }

}
