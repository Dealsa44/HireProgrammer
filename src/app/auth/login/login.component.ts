import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  failedAttempts = 0;
  isBlocked = false;
  countdown = 20;
  countDownInterval: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.isBlocked) {
      this.errorMessage = `Login is blocked, please try again in ${this.countdown} seconds`;
      return;
    }

    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/profile']);
    } else {
      this.failedAttempts++;
      if (this.failedAttempts >= 3) {
        this.blockLogin();
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

  blockLogin(): void {
    this.isBlocked = true;
    this.errorMessage = `Too many failed attmpts. Login is blocked for ${this.countdown} seconds`;
    this.password = '';
    this.username = '';
    this.countDownInterval = setInterval(() => {
      this.countdown--;
      this.errorMessage = `Too many failed attmpts. Login is blocked for ${this.countdown} seconds`;

      if (this.countdown <= 0) {
        clearInterval(this.countDownInterval);
        this.isBlocked = false;
        this.failedAttempts = 0;
        this.countdown = 20;
        this.errorMessage = '';
      }
    }, 1000);
  }
}
