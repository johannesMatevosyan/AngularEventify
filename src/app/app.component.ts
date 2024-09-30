import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularEventify';
  constructor() {}
  onEventCreated(event: {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    date: string;
    description: string;
  }): void {
    console.log('Event created ', event);
  }
}
