import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  username = '';
  email = '';
  currentPassword: string | null = null;
  newPassword = '';
  errorMessage = '';
  passwordErrorMessage = '';
  successMessage = '';
  showChangePasswordForm = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.currentPassword = this.authService.getPassword(
      this.username,
      this.email,
    );
    if (this.currentPassword) {
      this.errorMessage = '';
      this.showChangePasswordForm = true;
    } else {
      this.errorMessage = 'Invalid username or email';
      this.showChangePasswordForm = false;
    }
  }

  onChangePassword(): void {
    this.errorMessage = '';

    if (!this.newPassword) {
      this.passwordErrorMessage = 'Password cannot be empty';
      return;
    }
    if (this.newPassword === this.currentPassword) {
      this.passwordErrorMessage =
        'New password cannot be the same as the current password';
      return;
    }
    if (this.newPassword.length < 8) {
      this.passwordErrorMessage =
        'Password should be at least 8 characters long';
      return;
    }
    if (!/\d/.test(this.newPassword)) {
      this.passwordErrorMessage = 'Password should contain at least one number';
      return;
    }
    if (!/[A-Z]/.test(this.newPassword)) {
      this.passwordErrorMessage =
        'Password should contain at least one uppercase letter';
      return;
    }
    if (this.username === this.newPassword) {
      this.passwordErrorMessage = 'Username and password cannot be the same';
      return;
    }
    if (this.authService.changePassword(this.username, this.newPassword)) {
      this.successMessage = 'Password changed successfully';
      this.errorMessage = '';
      this.passwordErrorMessage = '';
      this.currentPassword = null;
      this.newPassword = '';
      this.showChangePasswordForm = false;
      this.router.navigate(['/login']);
    } else {
      this.passwordErrorMessage = 'Could not change password';
    }
  }
  onKeepPassword(): void {
    this.successMessage = 'You can keep using your current password';
    this.errorMessage = '';
    this.showChangePasswordForm = false;
    this.router.navigate(['/login']);
  }
}
