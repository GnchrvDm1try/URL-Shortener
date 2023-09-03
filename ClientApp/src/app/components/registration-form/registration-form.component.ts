import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class RegistrationFormComponent {
  form: FormGroup;
  errorMessage: string | undefined;

  private readonly authService: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  constructor(formBuilder: FormBuilder, authService: AuthService, router: Router) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.router = router;
    this.form = this.getFormGroupInstance();
  }

  submit() {
    this.authService.register(this.form)
      .then(() => this.router.navigate(["Login"]))
      .catch((HTTPError: HttpErrorResponse) => {
        if (HTTPError.status === 400) this.errorMessage = HTTPError.error
        else this.errorMessage = "Unknown error occurred";
      });
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      login: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
      passwordConfirm: new FormControl(null, [Validators.required])
    }, { validators: this.matchValidator("password", "passwordConfirm") });
    return registrationForm;
  }

  private matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}
