import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient;
  private readonly router: Router;
  private readonly APIUrl: string = environment.baseAPIUrl + "/api/account";

  get userToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private set userToken(newToken: string | null) {
    if (!newToken)
      throw new Error("Token wasn't specified");
    localStorage[ACCESS_TOKEN_KEY] = newToken;
  }

  get userId() {
    if (this.userToken)
      return (jwt_decode(this.userToken) as any).id;
    return undefined;
  }

  get userLogin() {
    if(this.userToken)
      return (jwt_decode(this.userToken) as any).login;
    return undefined;
  }

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
  }

  async register(form: FormGroup) {
    await this.http.post(this.APIUrl + "/register", form.getRawValue(), { observe: "response", responseType: "text" as "json" }).toPromise();
  }

  async login(form: FormGroup): Promise<boolean> {
    await this.http.post<string>(this.APIUrl + "/login", form.getRawValue(), { responseType: "text" as "json" }).pipe(tap(token => this.userToken = token)).toPromise();
    return !!this.userToken && !this.isTokenExpired(this.userToken);
  }

  isUserAuthenticated(): boolean {
    let token: string | null = this.userToken;
    return (!!token && !this.isTokenExpired(token)) as boolean;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([""]);
  }

  isTokenExpired(token: string) {
    const decodedToken: any = jwt_decode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    return expirationDate < new Date();
  }
}
