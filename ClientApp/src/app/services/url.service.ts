import { HttpClient } from '@angular/common/http';
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

  getUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(this.APIUrl + '/GetAllUrls');
  }

  getUrl(id: number): Observable<Url> {
    return this.http.get<Url>(this.APIUrl + `/Details/${id}`);
  }

  async createUrl(form: FormGroup) {
    await this.http.post(this.APIUrl + "/create", form.getRawValue(), { observe: "response", responseType: "text" as "json" }).toPromise();
  }
}
