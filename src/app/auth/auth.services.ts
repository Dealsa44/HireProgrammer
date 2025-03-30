import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private users: { username: string; email: string; password: string }[] = [];

  private currentUser: {
    username: string;
    email: string;
    password: string;
  } | null = null;
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      this.isLoggedIn = true;
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(username: string, email: string, password: string): boolean {
    const userExists = this.users.some(
      (u) => u.username === username || u.email === email,
    );
    if (userExists) {
      return false;
    }
    this.users.push({ username, email, password });
    return true;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getPassword(username: string, email: string): string | null {
    const user = this.users.find(
      (u) => u.username === username && u.email === email,
    );

    return user ? user.password : null;
  }

  changePassword(username: string, newPassword: string): boolean {
    const user = this.users.find((u) => u.username === username);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }

  updateUser(
    username: string,
    newUsername?: string,
    newEmail?: string,
    newPassword?: string,
  ): boolean {
    const user = this.users.find((u) => u.username === username);
    if (user) {
      if (newUsername) {
        const usernameExists = this.users.some(
          (u) => u.username === newUsername,
        );
        if (usernameExists) return false;
        user.username = newUsername;
      }
      if (newEmail) user.email = newEmail;
      if (newPassword) user.password = newPassword;

      if (newUsername && this.currentUser) {
        this.currentUser.username = newUsername;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  getCurrentUser(): {
    username: string;
    email: string;
    password: string;
  } | null {
    return this.currentUser;
  }
}
