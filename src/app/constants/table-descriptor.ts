import { ActionCellRendererComponent } from "../action-cell-renderer/action-cell-renderer.component";

export const tableDescriptor = {
  CONTACT_INFO_VIEW_TABLE_DESC: [
    { headerName: 'First Name', field: 'firstName', width: 160 },
    { headerName: 'Last Name', field: 'lastName', width: 160 },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone Number', field: 'phoneNumber' },
    { headerName: 'Status ', field: 'status', width: 130 },
    { headerName: 'Action ', cellRendererFramework: ActionCellRendererComponent, suppressSorting: true, suppressFilter: true }
  ]
}
