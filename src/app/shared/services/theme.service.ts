import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  darkThemeFlag: BehaviorSubject<boolean>;

  constructor() {
    this.darkThemeFlag = new BehaviorSubject<boolean>(localStorage.getItem('miniSLADarkTheme') === 'true');
  }
}
