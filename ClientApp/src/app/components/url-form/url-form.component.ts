import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  private readonly formBuilder: FormBuilder;
  private readonly authService: AuthService;
  private readonly urlService: UrlService;

  constructor(formBuilder: FormBuilder, authService: AuthService, urlService: UrlService) {
    this.formBuilder = formBuilder;
    this.authService = authService;
    this.urlService = urlService;
    this.form = this.getFormGroupInstance();
  }

  submit() {
    this.urlService.createUrl(this.form);
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      url: new FormControl(null, Validators.required),
      creatorId: new FormControl(this.authService.userId)
    });
    return registrationForm;
  }
}
