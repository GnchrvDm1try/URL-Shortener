import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Url } from '../../models/url';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-url-details',
  templateUrl: './url-details.component.html',
  styleUrls: ['./url-details.component.css']
})
export class UrlDetailsComponent implements OnInit {
  private readonly route: ActivatedRoute;
  private readonly authService: AuthService;
  private readonly urlService: UrlService;
  url: Url | undefined;

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  constructor(route: ActivatedRoute, authService: AuthService, urlService: UrlService) {
    this.route = route;
    this.authService = authService;
    this.urlService = urlService;
  }

  ngOnInit(): void {
    this.getUrl();
  }

  getUrl() {
    const urlId = +this.route.snapshot.paramMap.get('id')!;
    this.urlService.getUrl(urlId).subscribe(data => {
      this.url = data;
    });
  }
}
