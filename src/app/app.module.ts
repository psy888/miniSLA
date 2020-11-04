import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootPageComponent } from 'src/app/pages/root-page/root-page.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './pages/root-page/main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    RootPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MainMenuComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
