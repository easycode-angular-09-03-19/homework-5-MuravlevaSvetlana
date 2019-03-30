import { Component, OnInit } from '@angular/core';
import { AlertMessageService } from '../../services/alert-message.service';


@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  classDelete = false;
  classedit = false;
  constructor(
    public messageService: AlertMessageService
  ) { }

  ngOnInit() {
    this.messageService.alertMessageObservableSubject.subscribe((value: any) => {
      if (typeof value === 'number') {
        this.classDelete = true;        
      } else if (typeof value === 'object' && value.id) {
        this.classedit = true;
      } else {
        this.classedit = false;
        this.classDelete = false;
      }
    });
  }

  hideElement() {
    this.classDelete = false;
    this.classedit = false;
  }
}


