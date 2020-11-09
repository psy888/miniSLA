import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Device, DeviceService, Series, State } from 'src/app/shared/services/device.service';
import { LoadingStateService } from 'src/app/shared/services/loading-state.service';
import { futureDate, ramValidation, seriesValidation } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  deviceForm: FormGroup;
  statesArr = Object.keys(State).filter(value => isNaN(Number(value)));
  seriesArr = Object.keys(Series).filter(value => isNaN(Number(value)));
  filterOptions: Observable<string[]>;
  maxDate = new Date();

  newDevice: Device = {
    name: '',
    description: '',
    series: undefined,
    regDate: new Date(),
    ip: '',
    workingCondition: undefined,
    ramMb: undefined,
    state: undefined,
    procFrequency: undefined,
    id: undefined,
  };

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              private loadingState: LoadingStateService) {
  }

  ngOnInit(): void {
    this.initFormGroup();
    this.initFilterOptions();
  }

  private initFormGroup(): void {
    this.deviceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ip: new FormControl('', Validators.pattern('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')),
      regDate: new FormControl(new Date(), futureDate),
      description: new FormControl('', Validators.maxLength(255)),
      state: new FormControl(''),
      workingCondition: new FormControl(''),
      series: new FormControl('', seriesValidation),
      procFrequency: new FormControl('', Validators.pattern(/^\d{1,4}$/)),
      ramMb: new FormControl('', [ramValidation, Validators.max(65536)]),
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
    for (let key of Object.keys(this.newDevice)) {
      if (key !== 'id') {
        this.newDevice[key] = this.deviceForm.controls[key].value;
      }
      if (key === 'series') {
        // @ts-ignore
        this.editableDevice.series = Series[this.deviceForm.controls[key].value];
      }
    }
    this.deviceService.addDevice(this.newDevice);
    this.router.navigate(['/list']);
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}
