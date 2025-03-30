import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.services';

@Component({
  selector: 'app-profile-settings',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent {
  selectedOption: 'email' | 'username' | 'password' | null = null;
  newValue = '';
  currentPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = 'User not found';
      return;
    }
    if (this.currentPassword !== currentUser.password) {
      this.errorMessage = 'Current password is incorrect';
      return;
    }
    if (this.selectedOption === 'email' && !this.validateEmail(this.newValue)) {
      return;
    }
    if (
      this.selectedOption === 'username' &&
      !this.validateUsername(this.newValue, currentUser.password)
    ) {
      return;
    }
    if (
      this.selectedOption === 'password' &&
      !this.validatePassword(this.newValue, currentUser.username)
    ) {
      return;
    }

    let updated = false;
    switch (this.selectedOption) {
      case 'email':
        updated = this.authService.updateUser(
          currentUser.username,
          undefined,
          this.newValue,
          undefined,
        );
        break;
      case 'username':
        updated = this.authService.updateUser(
          currentUser.username,
          this.newValue,
          undefined,
          undefined,
        );
        break;
      case 'password':
        updated = this.authService.updateUser(
          currentUser.username,
          undefined,
          undefined,
          this.newValue,
        );
        break;
      default:
        this.errorMessage = 'Invalid option';
        return;
    }

    if (updated) {
      this.successMessage = 'Profile updated successfully';
      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 1000);
    } else {
      this.errorMessage = 'Profile update failed';
    }
  }

  validatePassword(password: string, username: string): boolean {
    if (!password) {
      this.errorMessage = 'Password is required.';
      return false;
    }
    if (password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return false;
    }
    if (!/\d/.test(password)) {
      this.errorMessage = 'Password must contain at least one number.';
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      this.errorMessage =
        'Password must contain at least one uppercase letter.';
      return false;
    }
    if (password === username) {
      this.errorMessage = 'Password cannot be the same as username.';
      return false;
    }
    return true;
  }

  validateUsername(username: string, password: string): boolean {
    if (username === password) {
      this.errorMessage = 'Username and password cannot be the same';
      return false;
    }
    return true;
  }
  validateEmail(email: string): boolean {
    if (!email.includes('@')) {
      this.errorMessage = 'Invalid email';
      return false;
    }
    return true;
  }
}
