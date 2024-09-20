import {Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';
import { HomeComponent } from "../../pages/home/home.component";
import {User} from "../../utils/types/user.types";

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
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  get userInfo(): Partial<User> {
    return this.authService.user;
  }

  ngOnInit() {
    this.authService.getUserInfo();
  }

}
