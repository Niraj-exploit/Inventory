import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userRoles = 'userRoles';
  constructor(private http: HttpClient) {}
  private tokenKey = 'token';

  private apiUrl = 'http://localhost:3000/users/';

  getRoll(): string {
    return localStorage.getItem(this.userRoles) || '';
  }
  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}login`, user);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && token !== '';
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; // Token is not available, consider it as expired
    }

    const tokenExpiration = this.extractTokenExpiration(token);
    const currentTime = new Date().getTime() / 1000; // Current time in seconds

    return tokenExpiration <= currentTime;
  }
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  clearuserRoles(): void {
    localStorage.removeItem(this.userRoles);
  }

  private extractTokenExpiration(token: string): number {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.exp;
    } catch (error) {
      return 0; // Invalid token format, consider it as expired
    }
  }
}
