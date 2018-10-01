import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormControl, Validators, NgForm } from "@angular/forms";
import { GridOptions, ColumnApi, GridReadyEvent } from "ag-grid/main";
import { errorMessagesDescriptor } from "../constants/error-messages";
import { ValidationService } from "../services/validations.service";
import { tableDescriptor } from "../constants/table-descriptor";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactInfoService } from "../services/contact-info.service";

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  gridData: any[];
  columnDefs: any[];
  gridOptions: GridOptions;

  frmContactInfo: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  phoneNumber: FormControl;
  status: FormControl;
  statusList: { value: string; viewValue: string; }[];

  rowIndex: any;
  actionType: string = 'Add';

  constructor(private validationService: ValidationService,
    private contactInfoService: ContactInfoService,
    private notificationBar: MatSnackBar) { }

  ngOnInit() {
    this.gridOptions = <GridOptions>{
      enableFilter: true,
      enableSorting: true,
      enableColResize: true,
      animateRows: false,
      suppressMenuHide: false,
      suppressCellSelection: true,
      suppressRowClickSelection: true,
      context: {
        componentParent: this
      },
      overlayLoadingTemplate: '<div>Loading...</div>',
      overlayNoRowsTemplate: '<div>No rows/data in grid.</div>',
      onGridReady: (event: GridReadyEvent) => { }
    };

    this.columnDefs = tableDescriptor.CONTACT_INFO_VIEW_TABLE_DESC;
    this.gridData = this.contactInfoService.getGridData();

    this.createFormControls();
    this.createForm();

    this.statusList = this.contactInfoService.getStatusList();
  }

  createFormControls(): any {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, this.validationService.emailValidator]);
    this.phoneNumber = new FormControl('', [Validators.required, this.validationService.phoneNumberValidator]);
    this.status = new FormControl('', [Validators.required]);
  }

  createForm(): any {
    this.frmContactInfo = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      status: this.status
    });
  }

  getErrorMessage(controlName) {
    let formField = this.frmContactInfo.controls[controlName];
    return formField.hasError('required') ? errorMessagesDescriptor.REQUIRED :
      formField.hasError('phoneNumberValidator') ? errorMessagesDescriptor.PHONENUMBERVALIDATOR :
        formField.hasError('emailValidator') ? errorMessagesDescriptor.EMAILVALIDATOR : '';
  }

  checkDuplicate() {
    let index = this.gridData.findIndex(item => item.phoneNumber === this.frmContactInfo.value.phoneNumber && item.firstName === this.frmContactInfo.value.firstName && item.lastName === this.frmContactInfo.value.lastName && item.email === this.frmContactInfo.value.email && item.status === this.frmContactInfo.value.status);
    return index >= 0 ? true : false;
  }

  fireAction(actionType, rowIndex) {
    this.actionType = actionType;
    this.rowIndex = rowIndex;
    if (this.actionType === 'Edit') {
      this.frmContactInfo.setValue(this.gridData[this.rowIndex]);
    } else if (this.actionType === 'Delete') {
      this.onReset();
      this.gridData.splice(this.rowIndex, 1);
    }
    if (this.gridOptions.api.setRowData) {
      this.gridOptions.api.setRowData(this.gridData);
    }
  }

  onReset() {
    this.frmContactInfo.reset();
    this.actionType = 'Add';
    this.rowIndex = 0;
  }

  onFrmSubmit() {
    if (this.frmContactInfo.valid) {
      console.log(this.frmContactInfo.value);
      if (!this.checkDuplicate()) {
        if (this.actionType === 'Add') {
          this.gridData.push(this.frmContactInfo.value);
        } else if (this.actionType === 'Edit') {
          this.gridData.splice(this.rowIndex, 1);
          this.gridData.splice(this.rowIndex, 0, this.frmContactInfo.value);
        }
        if (this.gridOptions.api) {
          this.gridOptions.api.setRowData(this.gridData);
        }
        this.onReset();
      } else {
        this.notificationBar.open("Can't enter duplicate record. Please change the fields.", "Close", {
          duration: 2000,
        });
      }
    }
  }
}
