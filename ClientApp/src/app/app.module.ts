import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UrlsTableComponent } from './components/urls-table/urls-table.component';
import { UrlDetailsComponent } from './components/url-details/url-details.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UrlFormComponent } from './components/url-form/url-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UrlsTableComponent,
    UrlDetailsComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    UrlFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: UrlsTableComponent, pathMatch: 'full' },
      { path: 'Details/:id', component: UrlDetailsComponent },
      { path: 'Login', component: LoginFormComponent },
      { path: 'Register', component: RegistrationFormComponent }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
