import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { DATE_FORMATS } from 'src/app/shared/constants';
import { IEventUI } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() eventSpan: number | null = null;
  @Input() eventUI: IEventUI = {
    eventBackColor: '#1a73e8',
    eventHoverColor: '#4285f4',
    eventBorderColor: '#ffffff',
    eventFontColor: '#ffffff',
  }
  @Input() eventDuration = {
    startTime: '',
    endTime: '',
    date: '',
  }
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
  changeDateFormat(date: string): string {
    return DateTime.fromISO(date).toFormat(DATE_FORMATS.WEEKDAY_FORMAT);
  }
}

