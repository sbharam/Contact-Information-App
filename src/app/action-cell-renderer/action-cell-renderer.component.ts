import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css']
})
export class ActionCellRendererComponent implements OnInit {
  public params: any;

  constructor() { }

  ngOnInit() { }

  agInit(params) {
    this.params = params;
  }

  onCellButtonClick(actionType) {
    this.params.context.componentParent.fireAction(actionType, this.params.node.rowIndex);
  }

}
