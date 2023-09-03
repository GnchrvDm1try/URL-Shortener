import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  private readonly authService: AuthService;
  private readonly router: Router;
  login: string | undefined;

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
    this.login = this.authService.userLogin;
  }

  public get isLoggedIn(): boolean {
    console.log(this.authService.isUserAuthenticated())
    return this.authService.isUserAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
