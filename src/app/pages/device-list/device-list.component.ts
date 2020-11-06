import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Device, DeviceService, State } from 'src/app/shared/services/device.service';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  devices: MatTableDataSource<Device>;
  columns: string[] = ['name', 'ip', 'regDate', 'state', 'workingCondition', 'series', 'procFrequency', 'ramMb'];
  displayedColumns = this.columns.slice();


  constructor(private deviceService: DeviceService,
              private loadingState: LoadingStateService) { }

  ngOnInit(): void {
    this.loadingState.startLoadig();
    this.deviceService.getDevices().subscribe(value => {
      this.devices = new MatTableDataSource<Device>(value);
      this.devices.sort = this.sort;
      this.devices.paginator = this.paginator;
      this.loadingState.endLoading();
    });
  }

  ngAfterViewInit(): void {

  }


  getConnectionStateIcon(state: State): string {
    switch (state) {
      case State.CONNECTED:
        return 'wifi';
      case State.DISCONNECTED:
        return 'wifi_off';
      default:
        return 'priority_high';
    }
  }

  removeColumn(columnName: string): void {
    this.displayedColumns = this.displayedColumns.filter(value => value !== columnName);
  }

  selectRow(row: any): void {
    this.deviceService.editDevice(row);
  }
}
