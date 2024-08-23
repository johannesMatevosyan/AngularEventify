import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() eventSpan: number | null = null;
  @Input() eventBackColor: string = '#1a73e8';
  @Input() eventHoverColor: string = '#4285f4';
  @Input() eventFontColor: string = '#ffffff';
  @Input() eventBorderColor: string = '#ffffff';
  isHovered = false;
  _title: string = '';
  _description: string = '';

  @Input()
  get title(): string {
    return this._title;
  }
  set title(name: string) {
    this._title = name[0].toUpperCase() + name.slice(1);
  }

  @Input()
  get description(): string {
    return this._description;
  }
  set description(text: string) {
    this._description = text;
  }
}

