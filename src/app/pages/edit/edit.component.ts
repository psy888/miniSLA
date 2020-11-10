import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Device, DeviceService, Series, State } from 'src/app/shared/services/device.service';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';
import { futureDate, ramValidation, seriesValidation } from 'src/app/shared/validators/custom.validators';

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
  maxDate = new Date();

  editableDevice: Device;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              private loadingState: LoadingStateService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.loadingState.startLoading();
    this.deviceService.getLastModified().subscribe(value => {
      this.editableDevice = value;
      this.loadingState.endLoading();
      if (!this.editableDevice) {
        alert('Последнее редактируемое устройство не найдено');
      } else {
        this.updateFormGroup();
        this.initFilterOptions();
      }
    });


  }

  private initFormGroup(): void {
    this.deviceForm = new FormGroup({
      name: new FormControl(),
      ip: new FormControl(),
      regDate: new FormControl(),
      description: new FormControl(),
      state: new FormControl(),
      workingCondition: new FormControl(),
      series: new FormControl(),
      procFrequency: new FormControl(),
      ramMb: new FormControl(),
    });
  }

  private updateFormGroup(): void {
    this.deviceForm = new FormGroup({
      name: new FormControl(this.editableDevice.name, Validators.required),
      ip: new FormControl(this.editableDevice.ip, Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')),
      regDate: new FormControl(this.editableDevice.regDate, futureDate),
      description: new FormControl(this.editableDevice.description, Validators.maxLength(255)),
      state: new FormControl(this.editableDevice.state),
      workingCondition: new FormControl(this.editableDevice.workingCondition),
      series: new FormControl(Series[this.editableDevice.series], seriesValidation),
      procFrequency: new FormControl(this.editableDevice.procFrequency, Validators.pattern(/^\d{1,4}$/)),
      ramMb: new FormControl(this.editableDevice.ramMb, [ramValidation, Validators.max(65536)]),
    });
  }

  private initFilterOptions(): void {
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
        this.editableDevice[key] = this.deviceForm.controls[key].value;
      }
      if (key === 'series') {
        // @ts-ignore
        this.editableDevice.series = Series[this.deviceForm.controls[key].value];
      }
    }
    console.log(this.editableDevice);
    this.deviceService.updateDevice(this.editableDevice);
    this.router.navigate(['/list']);
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}
