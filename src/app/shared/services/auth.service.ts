import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { url } from 'src/app/shared/endpoints';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';


export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  apiUrl = url.auth;
  tokenKey = 'auth_token';
  token: string;
  jwtService: JwtHelperService;
  errorFromServer = '';

  constructor(private http: HttpClient,
              private loadingState: LoadingStateService) {
    this.jwtService = new JwtHelperService();
  }

  getUser(): User {
    const tok = localStorage.getItem(this.tokenKey);
    return this.jwtService.decodeToken(tok);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }


}
