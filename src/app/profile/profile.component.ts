import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  currentUser: { username: string; email: string; password: string } | null =
    null;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }

  navigateToSettings(): void {
    this.router.navigate(['/profile-settings']);
  }
}
