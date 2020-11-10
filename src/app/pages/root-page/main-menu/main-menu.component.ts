import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/shared/services/auth.service';
import { ThemeService } from 'src/app/shared/services/theme.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  darkTheme = false;

  constructor(private authService: AuthService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.darkThemeFlag.subscribe(themeFlag => this.darkTheme = themeFlag);
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUser(): User {
    return this.authService.getUser();
  }

  toggleTheme(): void {
    console.log('toggle is dark from localStorage', localStorage.getItem('miniSLADarkTheme'));
    const curState = !this.darkTheme;
    this.themeService.darkThemeFlag.next(curState);
    localStorage.setItem('miniSLADarkTheme', '' + curState);
  }


}
