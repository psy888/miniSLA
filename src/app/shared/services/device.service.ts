import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { url } from 'src/app/shared/endpoints';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';

export enum State {
  CONNECTED,
  DISCONNECTED
}

export enum Series {
  T1000,
  T2000,
  T3000,
  LIQUID
}

export interface Device {
  readonly id: number; // not editable
  name: string; // input
  ip: string; // input with ip validation
  regDate: Date; // datePicker
  description: string; // textarea
  state: State; // select
  workingCondition: boolean; // checkbox
  series: Series; // select with autocomplete
  procFrequency: number; // scroll
  ramMb: number; // radio btn
}

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  lastEdited: Device;

  constructor(private http: HttpClient,
              private loadingState: LoadingStateService,
              private router: Router) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(url.deviceList);
  }

  editDevice(device: Device): void {
    this.lastEdited = device;
    this.router.navigate(['/edit']);
  }

  updateDevice(device: Device): Observable<any> {
    return this.http.post(url.update, device);
  }

  addDevice(device: Device): void {
    this.http.post(url.add, device);
  }
}
