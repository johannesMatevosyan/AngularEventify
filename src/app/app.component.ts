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
    console.log('Event created successfully: ', event);
  }

  onEventUpdated(event: {
    id?: string;
    name: string;
    startTime: string;
    endTime: string;
    date: string;
    description: string;
  }): void {
    console.log('Event updated successfully: ', event);
  }

  onEventDeleted(eventData: {
    name: string,
    id: string
  }): void {
    console.log('Deleted event info: ', eventData);
  }

  onEventCreationFailed(errorMessage: string): void {
    console.log('Event cration error: ', errorMessage);
  }

  onEventUpdateFailed(errorMessage: string): void {
    console.log('Event update error: ', errorMessage);
  }

  onEventDeleteFailed(errorMessage: string): void {
    console.log('Event delete error: ', errorMessage);
  }
}
