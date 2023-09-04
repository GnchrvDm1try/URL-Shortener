import { Component, OnInit } from '@angular/core';
import { Url } from '../../models/url';
import { UrlService } from '../../services/url.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-urls-table-component',
  templateUrl: './urls-table.component.html',
  styleUrls: ['../../../styles/tables.css']
})
export class UrlsTableComponent implements OnInit {
  urls: Url[] = [];
  private readonly urlService: UrlService;
  private readonly authService: AuthService;

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  constructor(urlService: UrlService, authService: AuthService) {
    this.urlService = urlService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getUrls();
  }

  navigate(shortenUrl: string) {
    this.urlService.navigate(shortenUrl)
  }

  getUrls() {
    this.urlService.getUrls().subscribe(response => this.urls = response);
  }

  addUrl(url: Url) {
    console.log(url)
    console.log(this.urls)
    this.urls.push(url);
    console.log(this.urls)
  }
}
