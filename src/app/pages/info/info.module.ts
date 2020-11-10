import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';


@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    InfoRoutingModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ],
})
export class InfoModule { }
