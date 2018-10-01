import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  emailValidator(control: FormControl): ValidationErrors {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-z]{2,3})+$/;
    return (pattern).test(control.value) ? null : { 'emailValidator': true };
  }

  phoneNumberValidator(control: FormControl): ValidationErrors {
    var pattern = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
    return (pattern).test(control.value) ? null : { 'phoneNumberValidator': true };
  }

}
