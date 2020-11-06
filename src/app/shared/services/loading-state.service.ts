import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {

  curState: BehaviorSubject<boolean>;

  constructor() {
    this.curState = new BehaviorSubject<boolean>(false);
  }

  public startLoadig(): void {
    this.curState.next(true);
  }

  public endLoading(): void {
    this.curState.next(false);
  }


}
