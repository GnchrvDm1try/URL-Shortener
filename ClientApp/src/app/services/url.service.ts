import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Url } from '../models/url';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private http: HttpClient;
  private readonly APIUrl: string = environment.baseAPIUrl + '/api/urls';

  constructor(http: HttpClient) {
    this.http = http;
  }

  navigate(shortenUrl: string) {
    this.http.get(this.APIUrl + `/Navigate/${shortenUrl}`).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error(error);
      });
  }

  getUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(this.APIUrl + '/GetAllUrls');
  }

  getUrl(id: number): Observable<Url> {
    return this.http.get<Url>(this.APIUrl + `/Details/${id}`);
  }

  createUrl(form: FormGroup): Observable<HttpResponse<Url>> {
    return this.http.post<Url>(this.APIUrl + "/create", form.getRawValue(), { observe: "response", responseType: "json" });
  }
}
