import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ContactInfoComponent } from './contact-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule, FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule],
      declarations: [ContactInfoComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Contact Info form invalid when empty', () => {
    expect(component.frmContactInfo.valid).toBeFalsy();
  });

  it('Contact Info form\'s email field validity', () => {
    let errors = {};
    let email = component.frmContactInfo.controls['email'];
    expect(email.valid).toBeFalsy();

    // chk Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something incorrect
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['emailValidator']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['emailValidator']).toBeFalsy();
  });

  it('Contact Info form\'s firstName field validity', () => {
    let errors = {};
    let firstName = component.frmContactInfo.controls['firstName'];

    // chk firstName field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();


    // Set firstName to something correct
    firstName.setValue("Sagar");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Contact Info form\'s lastName field validity', () => {
    let errors = {};
    let lastName = component.frmContactInfo.controls['lastName'];

    // chk lastName field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set lastName to something correct
    lastName.setValue("Bha");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Contact Info form\'s status field validity', () => {
    let errors = {};
    let status = component.frmContactInfo.controls['status'];

    // chk status field is required
    errors = status.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set status to something incorrect
    status.setValue("inactive");
    errors = status.errors || {};
    expect(errors['required']).toBeFalsy();

    // Set status to something correct
    status.setValue("inactive");
    errors = status.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Contact Info form\'s phoneNumber field validity', () => {
    let errors = {};
    let phoneNumber = component.frmContactInfo.controls['phoneNumber'];

    // chk phoneNumber field is required
    errors = phoneNumber.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set phoneNumber to something incorrect
    phoneNumber.setValue("45555");
    errors = phoneNumber.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['phoneNumberValidator']).toBeTruthy();

    // Set phoneNumber to something correct
    phoneNumber.setValue("5554445555");
    errors = phoneNumber.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['phoneNumberValidator']).toBeFalsy();
  });

  it('submitting a Contact Info form enter form fields and checks a gridData', () => {
    expect(component.frmContactInfo.valid).toBeFalsy();
    component.frmContactInfo.controls['firstName'].setValue("Sagar1");
    component.frmContactInfo.controls['lastName'].setValue("Bh");
    component.frmContactInfo.controls['email'].setValue("sbtest@test.com");
    component.frmContactInfo.controls['phoneNumber'].setValue("5554445555");
    component.frmContactInfo.controls['status'].setValue("active");
    expect(component.frmContactInfo.valid).toBeTruthy();

    // Trigger the login function
    let flag = component.checkDuplicate();
    expect(flag).toBe(false);

    component.actionType = 'Add';
    component.onFrmSubmit();

    // Now we can check to make sure the emitted value is correct
    expect(component.gridData[2].firstName).toBe("Sagar1");
    expect(component.gridData[2].lastName).toBe("Bh");
    expect(component.gridData[2].email).toBe("sbtest@test.com");
    expect(component.gridData[2].phoneNumber).toBe("5554445555");
    expect(component.gridData[2].status).toBe("active");
  });

});