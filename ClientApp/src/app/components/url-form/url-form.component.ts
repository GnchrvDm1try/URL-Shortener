import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class UrlFormComponent {
  form: FormGroup;
  errorMessage: string | undefined;

  private readonly urlService: UrlService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  constructor(urlService: UrlService, formBuilder: FormBuilder, router: Router) {
    this.urlService = urlService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.form = this.getFormGroupInstance();
  }

  submit() {
    this.urlService.createUrl(this.form);
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      url: new FormControl(null, Validators.required)
    });
    return registrationForm;
  }
}
