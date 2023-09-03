import { Component, OnInit } from '@angular/core';
import { Url } from '../../models/url';
import { UrlService } from '../../services/url.service';

@Component({
  selector: 'app-urls-table-component',
  templateUrl: './urls-table.component.html',
  styleUrls: ['../../../styles/tables.css']
})
export class UrlsTableComponent implements OnInit {
  urls: Url[] = [];
  private urlService: UrlService;

  constructor(urlService: UrlService) {
    this.urlService = urlService;
  }

  ngOnInit(): void {
    this.getUrls();
  }

  getUrls() {
    this.urlService.getUrls().subscribe(response => this.urls = response);
  }
}
