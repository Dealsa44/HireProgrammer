import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
