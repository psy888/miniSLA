import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Device, DeviceService, Series, State } from 'src/app/shared/services/device.service';
import { ramValidation, seriesValidation } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  deviceForm: FormGroup;
  statesArr = Object.keys(State).filter(value => isNaN(Number(value)));
  seriesArr = Object.keys(Series).filter(value => isNaN(Number(value)));
  filterOptions: Observable<string[]>;

  private editableDevice: Device;

  constructor(private activeRoute: ActivatedRoute,
              private deviceService: DeviceService) {

  }

  ngOnInit(): void {
    this.editableDevice = this.deviceService.lastEdited;

    this.deviceForm = new FormGroup({
      name: new FormControl(this.editableDevice.name, Validators.required),
      ip: new FormControl(this.editableDevice.ip, Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')),
      regDate: new FormControl(this.editableDevice.regDate),
      description: new FormControl(this.editableDevice.description, Validators.maxLength(255)),
      state: new FormControl(this.editableDevice.state),
      workingCondition: new FormControl(this.editableDevice.workingCondition),
      series: new FormControl(this.seriesArr[this.editableDevice.series], seriesValidation),
      procFrequency: new FormControl(this.editableDevice.procFrequency, Validators.pattern(/^\d{1,4}$/)),
      ramMb: new FormControl(this.editableDevice.ramMb, [ramValidation, Validators.max(65536)]),
    });

    this.filterOptions = this.deviceForm.controls.series.valueChanges.pipe(
      startWith(''),
      map(value => this.filterArray(value, this.seriesArr)),
    );
  }


  filterArray(searchQuery: string, arr: string[]): string[] {
    return arr.filter(arrItem => arrItem.toLowerCase().indexOf(searchQuery.toLowerCase()) === 0);
  }

  submit(): void {
    for (let key of Object.keys(this.editableDevice)) {
      if (key !== 'id') {
        this.editableDevice[key] = this.deviceForm.controls[key];
      }
    }
    this.deviceService.updateDevice(this.editableDevice);
  }

}
