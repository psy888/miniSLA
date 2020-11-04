import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();

    if (token === '') {
      this.toLoginPage();
      return false;
    }

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.toLoginPage();
    return false;
  }

  private toLoginPage(): void {
    this.router.navigate(['/login']);
  }
}
