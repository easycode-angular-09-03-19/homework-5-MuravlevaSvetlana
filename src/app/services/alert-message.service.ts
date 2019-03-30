import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {
  private alertMessageSource = new BehaviorSubject({});
  public  alertMessageObservableSubject = this.alertMessageSource.asObservable();

  constructor() { }

  emitShowMessage(value: any) {
    this.alertMessageSource.next(value);
  }
}
