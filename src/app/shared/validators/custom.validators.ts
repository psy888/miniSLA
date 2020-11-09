import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Series } from 'src/app/shared/services/device.service';

export const seriesValidation: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  if (Object.keys(Series).includes(control.value)) {
    return null;
  }
  return { error: true };
};

export const ramValidation: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  if (control.value % 8 === 0) {
    return null;
  }
  return { error: true };

};

export const futureDate: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  if (control.value.getTime() < Date.now()) {
    return null;
  }
  return { error: true };
};
