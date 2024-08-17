import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() eventSpan: number | null = null;
  _title: string = '';
  _description: string = '';

  @Input()
  get title(): string {
    return this._title;
  }
  set title(val: string) {
    this._title = val;
  }

  @Input()
  get description(): string {
    return this._description;
  }
  set description(val: string) {
    this._description = val;
  }
}

