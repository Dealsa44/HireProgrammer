import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  toggleMenu(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('active');
    }
  }

  closeMenu(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('active');
    }
  }
}
