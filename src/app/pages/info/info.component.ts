import { Component, OnInit } from '@angular/core';
import { DeviceService, State } from 'src/app/shared/services/device.service';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';

export interface Report {
  totalDevs: number;
  workingDevs: number;
  connectedDevs: number;
}


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  report: Report;

  constructor(private deviceService: DeviceService,
              private loadingState: LoadingStateService) {
    this.report = {
      totalDevs: 0,
      workingDevs: 0,
      connectedDevs: 0,
    };
  }

  ngOnInit(): void {
    this.loadingState.startLoading();
    this.deviceService.getDevices().subscribe(value => {
      value.forEach(value1 => {
        if (value1.state === State.CONNECTED) {
          this.report.connectedDevs++;
        }
        if (value1.workingCondition) {
          this.report.workingDevs++;
        }
      });
      this.report.totalDevs = value.length;
      this.loadingState.endLoading();
    });
  }


  getNumColor(num: number): string {
    if (num === this.report.totalDevs) {
      return 'primary';
    }
    if (num > this.report.totalDevs / 2) {
      return 'accent';
    }
    return 'warn';
  }
}
