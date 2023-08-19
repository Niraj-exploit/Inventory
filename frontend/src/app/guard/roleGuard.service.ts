import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const allowedRoles = route.data['allowedRoles'] as string[]; // Roles allowed to access the route
    const userRole = this.authService.getRoll(); // Get the role of the logged-in user
    if (allowedRoles.includes(userRole)) {
      return true; // User's role is allowed to access the route
    } else {
      // Redirect to an appropriate route (e.g., dashboard) if the role is not allowed
      return this.router.parseUrl('/dashboard');
    }
  }
}
