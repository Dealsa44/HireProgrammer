import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false; 
  private users: { username: string; email: string; password: string }[] = []; 

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.isLoggedIn = true;
      return true; 
    }
    return false; 
  }

  register(username: string, email: string, password: string): boolean {
   
    const userExists = this.users.some(
      (u) => u.username === username || u.email === email
    );
    if (userExists) {
      return false; 
    }
    this.users.push({ username, email, password });
    return true; 
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}