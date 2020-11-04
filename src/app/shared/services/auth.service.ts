import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/app/shared/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';


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

  constructor(private http: HttpClient) {
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

  login(email: string, password: string): void {
    this.http.post(this.apiUrl, { email, password }).subscribe((response: any) => {
      // todo navigate to some page
      localStorage.setItem(this.tokenKey, response.token);
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
