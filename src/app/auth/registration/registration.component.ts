import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.services';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (!this.email.includes('@')) {
      this.errorMessage = 'Email must contain the "@" symbol.';
      return;
    }

    if (this.username === this.password) {
      this.errorMessage = 'Username and password cannot be the same.';
      return;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'Password should be at least 8 characters long';
      return;
    }

    if (!/\d/.test(this.password)) {
      this.errorMessage = 'Password should contain at least one number';
      return;
    }
    if (!/[A-Z]/.test(this.password)) {
      this.errorMessage =
        'Password should contain at least one uppercase letter';
      return;
    }

    if (this.authService.register(this.username, this.email, this.password)) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'User with same Username or Email already exists';
    }
  }
}
