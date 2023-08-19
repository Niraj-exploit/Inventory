import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isTokenExpired()) {
        console.log('Token has expired, please log in again');
        this.authService.clearToken(); // Optionally clear the expired token
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      console.log('Please login to view the resource', 'Unauthorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
