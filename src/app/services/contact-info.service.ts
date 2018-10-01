import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  getGridData() {
    return [
      { firstName: 'Sagar', lastName: 'Bh', email: 'sb@gmail.com', phoneNumber: '(526)788-6789', status: 'inactive' },
      { firstName: 'Evolent', lastName: 'Health', email: 'abc@evolenth.co', phoneNumber: '204-445-9789', status: 'active' }
    ];
  }

  getStatusList() {
    return [
      { value: 'active', viewValue: 'Active' },
      { value: 'inactive', viewValue: 'Inactive' }
    ];
  }

}
