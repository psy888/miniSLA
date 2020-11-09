import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClockService {

  clock: Observable<Date>;

  constructor() {
    this.clock = interval(1000).pipe(
      map(value => new Date()),
    );
  }
}
