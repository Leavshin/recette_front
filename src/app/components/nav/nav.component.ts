import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';
import { HomeComponent } from "../../pages/home/home.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    HomeComponent
],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.updateLoginStatus();
  }
}
