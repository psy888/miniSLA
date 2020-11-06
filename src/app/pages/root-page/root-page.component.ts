import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.scss'],
})
export class RootPageComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer') mainMenu: MatSidenav;

  loadingData = false;

  constructor(private router: Router,
              private loadingService: LoadingStateService) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => this.closeMenuDrawer());
  }

  ngAfterViewInit(): void {
    this.loadingService.curState.pipe(
      delay(0), // fix problem with ngIf
    ).subscribe(value => this.loadingData = value);
  }


  closeMenuDrawer(): void {
    this.mainMenu.close();
  }


}
