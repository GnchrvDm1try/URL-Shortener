import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class LoginFormComponent {
  form: FormGroup;
  errorMessage: string | undefined;

  private readonly authService: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  constructor(authService: AuthService, formBuilder: FormBuilder, router: Router) {
    this.authService = authService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.form = this.getFormGroupInstance();
  }

  submit() {
    this.authService.login(this.form)
      .then(() => this.router.navigate([""]))
      .catch((HTTPError: HttpErrorResponse) => {
        if (HTTPError.status === 400) this.errorMessage = HTTPError.error
        else this.errorMessage = "Unknown error occurred";
      });
  }

  private getFormGroupInstance() {
    let loginForm: FormGroup;
    loginForm = this.formBuilder.group({
      login: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")])
    });
    return loginForm;
  }
}
