import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() start: string = '';
  @Input() end: string = '';
  _eventName: string = '';

  @Input()
  get eventName(): string {
    return this._eventName;
  }
  set eventName(val: string) {
    this._eventName = val;
  }
}
