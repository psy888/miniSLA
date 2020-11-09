import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device, DeviceColumns, DeviceService, Series, State } from 'src/app/shared/services/device.service';
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
  columnLabels = DeviceColumns;
  columns: string[];
  displayedColumns;
  hiddenColumns: string[] = [];
  seriesEnum = Series;


  constructor(private deviceService: DeviceService,
              private loadingState: LoadingStateService) {
    this.columns = this.deviceColumns();
    this.displayedColumns = this.columns.slice();
  }

  private deviceColumns(): string[] {
    let colArr = [];
    for (let col in this.columnLabels) {
      colArr.push(col);
    }
    return colArr;
  }

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


  selectRow(row: any): void {
    this.deviceService.editDevice(row);
  }

  hideColumn(colName: string): void {
    this.hiddenColumns.push(colName);
    this.filterColumns();

  }

  addColumn(colName: string): void {
    this.hiddenColumns = this.hiddenColumns.filter(value => value !== colName);
    this.filterColumns();
  }

  private filterColumns(): void {
    this.displayedColumns = this.columns.filter(value => this.hiddenColumns.indexOf(value) < 0);
  }
}
